import joi from '@hapi/joi';

import { sessionMiddleware } from '../../utils/middlewares';

export const create = {
  method: 'post',
  paths: '/users',
  middlewares: sessionMiddleware,
  body: joi.object().keys({
    login_type: joi.string().valid('email').required(),
    redirect_to: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    data: joi.object().required()
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
