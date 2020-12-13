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

export const confirmEmail = {
  method: 'get',
  paths: '/email_confirmation',
  middlewares: sessionMiddleware,
  query: joi.object().keys({ token: joi.string().required() })
};

export const clearEmailConfirmationNotification = {
  method: 'delete',
  paths: '/email_confirmation_notification',
  middlewares: sessionMiddleware
};
