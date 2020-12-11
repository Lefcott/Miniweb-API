import { sessionMiddleware } from '../../utils/middlewares';

const joi = require('@hapi/joi');

module.exports = {
  continue: {
    method: 'post',
    paths: '/continue',
    middlewares: sessionMiddleware,
    domains: process.env.DOMAIN_NAME,
    errorMessage: 'Bad parameters',
    body: joi.object().keys({
      name: joi.string().required(),
      surname: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
      phone: joi.string().required()
    })
  },
  register: {
    method: 'post',
    paths: '/user',
    middlewares: sessionMiddleware,
    domains: process.env.DOMAIN_NAME,
    errorMessage: 'Bad parameters',
    body: joi.object().keys({
      name: joi.string().required(),
      surname: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
      phone: joi.number().required(),
      phone_code: joi.string().required(),
      language: joi.string().default('en')
    })
  },
  confirmRegister: {
    method: 'get',
    paths: '/confirm_register/:confirmID',
    middlewares: sessionMiddleware,
    errorMessage: 'Bad parameters',
    params: joi.object().keys({ confirmID: joi.string().required() })
  },
  login: {
    method: 'post',
    paths: '/login',
    middlewares: sessionMiddleware,
    domains: process.env.DOMAIN_NAME,
    errorMessage: 'Bad parameters',
    body: joi.object().keys({
      email: joi.string().email().required(),
      password: joi.string().required()
    })
  }
};
