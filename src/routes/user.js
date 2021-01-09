import joi from '@hapi/joi';

import { sessionMiddleware } from '../utils/middlewares';

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

export const confirm_email = {
  method: 'get',
  paths: '/email_confirmation',
  middlewares: sessionMiddleware,
  query: joi.object().keys({ token: joi.string().required() })
};

export const clear_email_confirmation_notification = {
  method: 'delete',
  paths: '/email_confirmation_notification',
  middlewares: sessionMiddleware
};
