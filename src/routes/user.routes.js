import { sessionMiddleware } from '../utils/middlewares';

const joi = require('@hapi/joi');

export const register = {
  method: 'post',
  paths: '/users',
  middlewares: sessionMiddleware,
  body: joi.object().keys({
    name: joi.string().required(),
    surname: joi.string().required(),
    phone: joi.number().required(),
    email: joi.string().email().required(),
    password: joi.string().required()
  })
};

// export const confirmRegister = {
//   method: 'get',
//   paths: '/confirm_register/:confirmID',
//   middlewares: sessionMiddleware,
//   errorMessage: 'Bad parameters',
//   params: joi.object().keys({ confirmID: joi.string().required() })
// };

// export const login = {
//   method: 'post',
//   paths: '/login',
//   middlewares: sessionMiddleware,
//   domains: process.env.DOMAIN_NAME,
//   errorMessage: 'Bad parameters',
//   body: joi.object().keys({
//     email: joi.string().email().required(),
//     password: joi.string().required()
//   })
// };
