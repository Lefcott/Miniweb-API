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

export const createDevelopmentRequest = {
  method: 'post',
  paths: '/users/:user_id/development_requests',
  middlewares: sessionMiddleware,
  params: joi.object().keys({ user_id: joi.string().required() }),
  body: joi.object().keys({
    name: joi.string().required(),
    summary: joi.string(),
    domain: joi.string(),
    checklist_items: joi.array().items(joi.string()).required()
  })
};

export const getClientModels = {
  method: 'get',
  paths: '/users/:user_id/client_models',
  middlewares: sessionMiddleware,
  params: joi.object().keys({ user_id: joi.string().required() })
};

export const delete_client_document = {
  method: 'delete',
  paths: '/users/:user_id/client_documents/:client_document_id'
};
