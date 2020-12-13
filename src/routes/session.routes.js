import { sessionMiddleware } from '../utils/middlewares';

const joi = require('@hapi/joi');

export const getSessions = {
  method: 'get',
  paths: '/sessions',
  middlewares: sessionMiddleware
};

export const createSession = {
  method: 'post',
  paths: '/sessions',
  middlewares: sessionMiddleware,
  body: joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().required()
  })
};