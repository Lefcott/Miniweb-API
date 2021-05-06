import joi from '@hapi/joi';

import { sessionMiddleware } from '../../utils/middlewares';

export const list = {
  method: 'get',
  paths: '/projects/:project_code/client_models',
  middlewares: sessionMiddleware,
  params: joi.object().keys({
    project_code: joi.string().required()
  })
};

export const show = {
  method: 'get',
  paths: '/projects/:project_code/client_models/:client_model_entity',
  middlewares: sessionMiddleware,
  params: joi.object().keys({
    project_code: joi.string().required(),
    client_model_entity: joi.string().required()
  })
};
