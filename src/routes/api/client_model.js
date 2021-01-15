import joi from '@hapi/joi';

import { sessionMiddleware } from '../../utils/middlewares';

export const list = {
  method: 'get',
  paths: '/users/:user_id/projects/:project_code/client_models',
  middlewares: sessionMiddleware,
  params: joi.object().keys({
    user_id: joi.string().required(),
    project_code: joi.string().required()
  })
};
