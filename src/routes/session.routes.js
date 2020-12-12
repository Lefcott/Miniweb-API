import { sessionMiddleware } from '../utils/middlewares';

const joi = require('@hapi/joi');

export const getSessions = {
  method: 'get',
  paths: '/sessions',
  middlewares: sessionMiddleware
};

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
