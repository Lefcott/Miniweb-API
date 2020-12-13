/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import joi from '@hapi/joi';
import errorStackParser from 'error-stack-parser';

import fs from 'fs';
import url from 'url';

import env from '../env.json';
import * as middlewares from '../utils/middlewares';
import projectDir from '../utils/projectDir';
import rollbar from '../utils/rollbar';

const SCHEMA = {
  REQUEST_TYPES: ['query', 'body', 'params', 'headers'],
  METHODS: [
    'get',
    'post',
    'put',
    'patch',
    'delete',
    'copy',
    'head',
    'options',
    'purge',
    'lock',
    'unlock',
    'propfind'
  ]
};
const sessionDefaultValues = { language_code: 'es' };

const getSchemaError = (schema = joi.object(), objectToValidate = {}, options) => {
  options = options || { stripUnknown: false };
  const { error, value } = schema.validate(objectToValidate, options);
  const errors = (error && error.details.map(err => err.message)) || null;
  return { errors, value };
};

const getValidator = (schemaName, schema) => async (req, res, next) => {
  const { method } = req;
  const { path } = req.route;
  if (!schema) {
    throw new Error(
      `Couldn't find validations for path "${path}" and method "${method}". Schema: "${schemaName}". Calling next()`
    );
  }
  if (schema.domains) {
    schema.domains = Array.isArray(schema.domains) ? schema.domains : [schema.domains];
    const { host } = url.parse(req.headers.referer || '');
    if (!schema.domains.includes(host)) return res.status(401).json({ error: 'Domain is not in whitelist' });
  }
  const { errorMessage } = schema;
  if (schema.admin && req.headers[`admin_secret_${env.NODE_ENV}`] !== env.ADMIN_SECRET) {
    return res.status(401).json({
      error: "What are you doing ?? You're not an administrator"
    });
  }
  const schemaErrors = [];
  SCHEMA.REQUEST_TYPES.forEach(type => {
    if (schema[type]) {
      if (typeof schema[type].validate !== 'function') {
        const error = `Invalid schema object. path '${path}'. Method '${method}'. Schema: '${schemaName}'. Key:'${type}'`;
        rollbar.error(error);
        return schemaErrors.push(error);
      }
      const validation = getSchemaError(schema[type], req[type], schema.options);
      const { errors } = validation;
      req[type] = validation.value;
      errors && schemaErrors.push(errors);
    }
  });
  if (schemaErrors.length) return res.status(400).json({ errors: errorMessage || schemaErrors });
  if (schema.middlewares) {
    const _middlewares = Array.isArray(schema.middlewares) ? schema.middlewares : [schema.middlewares];
    for (let i = 0; i < _middlewares.length; i += 1) _middlewares[i](req, res, _middlewares[i + 1] || next);
  } else next();
};

const defineRoute = (method, paths, schemaName, schema, epName, logic) => {
  const validator = getValidator(schemaName, schema);
  middlewares.router[method](paths, validator, async (req, res, next) => {
    try {
      if (req.session)
        Object.entries(sessionDefaultValues).forEach(
          ([key, value]) => req.session[key] === undefined && (req.session[key] = value)
        );
      await logic(req, res, next);
    } catch (error) {
      let response;

      if (error instanceof AuthenticationError)
        res.status(403).json({
          message: 'There was an authentication error',
          error: { code: error.name, message: error.message }
        });
      else {
        res.status(500).json({
          message: 'There was an internal server error',
          error: {
            code: error.name,
            message: error.message,
            stack: errorStackParser.parse(error).map(data => data.source)
          }
        });
        rollbar.error(`New internal server error:\n${JSON.stringify(response, null, 2)}`);
      }
    }
  });
};

const defineRoutes = () => {
  const controllerFiles = fs.readdirSync(`${projectDir}/src/controllers`);
  let schemaFiles = fs.readdirSync(__dirname);
  schemaFiles = schemaFiles.filter(file => file !== 'index.js');
  const schemas = {};
  for (let k = 0; k < schemaFiles.length; k += 1) {
    const name = schemaFiles[k].endsWith('.routes.js')
      ? schemaFiles[k].substring(0, schemaFiles[k].length - 10)
      : schemaFiles[k];
    const schema = require(`./${name}.routes`);
    const controllerPath = `${projectDir}/src/controllers/${name}.controller`;
    const controller = require(controllerPath);

    schemas[name] = {};
    const epNames = Object.keys(schema);
    for (let m = 0; m < epNames.length; m += 1) {
      const epName = epNames[m];
      if (!controller[epName]) {
        rollbar.error(
          `No controller was found for route "${name}" and endpoint "${epName}". Won't define that endpoint.
Please review "${controllerPath}"`
        );
        continue;
      }
      let { paths } = schema[epName];
      const { method } = schema[epName];
      if (!method) {
        rollbar.error(
          `No "method" was specified on route "${name}", endpoint "${epName}". This route definition will be ignored`
        );
        continue;
      }
      paths = Array.isArray(paths) ? paths : [paths];
      paths = paths.filter(path => path);
      if (paths.length === 0) {
        rollbar.warn(
          `No "paths" specified at route "${name}", endpoint ${epName}. This route definition will be ignored`
        );
        continue;
      }

      defineRoute(method, paths, name, schema[epName], epName, controller[epName]);
    }
  }
};

defineRoutes();
