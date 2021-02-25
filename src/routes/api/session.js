import joi from '@hapi/joi';

import { sessionMiddleware } from '../../utils/middlewares';

export const _delete = {
  method: 'delete',
  paths: '/sessions',
  middlewares: sessionMiddleware
};

export const create = {
  method: 'post',
  paths: '/projects/:project_code/sessions',
  middlewares: sessionMiddleware,
  params: joi.object().keys({
    project_code: joi.string().required()
  }),
  body: joi.object().keys({
    email: joi.string().required(),
    password: joi.string().required()
  })
};

export const list = {
  method: 'get',
  paths: '/sessions',
  middlewares: sessionMiddleware
};
