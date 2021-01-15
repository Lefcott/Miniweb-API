/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import joi from '@hapi/joi';
import errorStackParser from 'error-stack-parser';
import { v4 as uuid } from 'uuid';

import fs from 'fs';
import url from 'url';

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

const getSchemaError = (schema = joi.object(), objectToValidate = {}, options = {}) => {
  options = { stripUnknown: false, ...options };
  const { error, value } = schema.validate(objectToValidate, options);
  const errors = (error && error.details.map(err => err.message)) || null;
  return { errors, value };
};

const getValidator = schema => async (req, res, next) => {
  const { method } = req;
  const { path } = req.route;
  if (!schema) {
    throw new Error(`Couldn't find validations for ${method} ${path}`);
  }
  if (schema.domains) {
    schema.domains = Array.isArray(schema.domains) ? schema.domains : [schema.domains];
    const { host } = url.parse(req.headers.referer || '');
    if (!schema.domains.includes(host)) return res.status(401).json({ error: 'Domain is not in whitelist' });
  }
  const { errorMessage } = schema;
  if (schema.admin && req.headers[`admin_secret_${process.env.NODE_ENV}`] !== process.env.ADMIN_SECRET) {
    return res.status(401).json({
      error: "What are you doing ?? You're not an administrator"
    });
  }
  const schemaErrors = [];
  SCHEMA.REQUEST_TYPES.forEach(type => {
    if (schema[type]) {
      if (typeof schema[type].validate !== 'function') {
        const error = `Invalid schema object. path '${path}'. Method '${method}'. Key:'${type}'`;
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

const defineRoute = (method, paths, schema, logic) => {
  const validator = getValidator(schema);

  middlewares.router[method](paths, validator, async (req, res, next) => {
    try {
      if (req.session)
        Object.entries(sessionDefaultValues).forEach(
          ([key, value]) => req.session[key] === undefined && (req.session[key] = value)
        );
      await logic(req, res, next);
    } catch (error) {
      const level = error.level || 'error';
      const response = {
        message: error.generic_message,
        error: {
          id: uuid(),
          code: error.code || 'internal_server_error',
          message: error.message
        }
      };
      const rollbar_log = {
        ...response,
        error: {
          ...response.error,
          meta: error.meta || {},
          stack: error.stack && errorStackParser.parse(error).map(data => data.source)
        },
        status_code: error.status_code,
        request: {
          path: req.url,
          body: req.body,
          params: req.params,
          query: req.query,
          session: req.session,
          headers: req.headers
        }
      };

      res.status(error.status_code || 500).json(response);
      rollbar[level](
        `New ${error.code} error (${response.error.id}):\n${JSON.stringify(rollbar_log, null, 2)}`
      );
    }
  });
};

const defineRoutes = () => {
  const controllerFiles = fs.readdirSync(`${projectDir}/src/controllers`);
  let namespaces = fs.readdirSync(__dirname);
  namespaces = namespaces.filter(file => file !== 'index.js').map(namespace => `/${namespace}`);

  namespaces.forEach(namespace => {
    const routes = fs.readdirSync(`${__dirname}${namespace}`);

    routes.forEach(route => {
      const entity = route.endsWith('.js') ? route.substring(0, route.length - '.js'.length) : route;
      const schemas = require(`.${namespace}/${entity}`);
      const schema_names = Object.keys(schemas);

      schema_names.forEach(schema_name => {
        const schema = schemas[schema_name];
        const paths = Array.isArray(schema.paths) ? schema.paths : [schema.paths].filter(path => path);
        const complete_paths = paths.map(path => `${namespace}${path}`);
        const { default: controller } = require(`${projectDir}/src/controllers/${entity}/${schema_name}`);

        if (!schema.method)
          return rollbar.error(
            `No "method" was specified on route "${entity}", endpoint "${schema_name}". This route definition will be ignored`
          );

        if (!paths.length) {
          return rollbar.warn(
            `No "paths" specified at route "${entity}", endpoint ${schema_name}. This route definition will be ignored`
          );
        }

        defineRoute(schema.method, complete_paths, schema, controller);
      });
    });
  });
};

defineRoutes();
