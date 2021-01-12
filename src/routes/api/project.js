import joi from '@hapi/joi';

import { sessionMiddleware } from '../../utils/middlewares';

export const show = {
  method: 'get',
  paths: '/projects/:project_code',
  params: joi.object().keys({
    project_code: joi.string().required()
  })
};

export const list = {
  method: 'get',
  paths: '/users/:user_id/projects',
  middlewares: sessionMiddleware,
  params: joi.object().keys({ user_id: joi.string().required() })
};

export const update_configuration = {
  method: 'put',
  paths: '/user/:user_id/projects/:project_id/configuration',
  middlewares: sessionMiddleware,
  params: joi.object().keys({
    user_id: joi.string().required(),
    project_id: joi.string().required()
  }),
  body: joi.object().required()
};
