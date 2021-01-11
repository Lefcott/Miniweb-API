import joi from '@hapi/joi';

import { sessionMiddleware } from '../../utils/middlewares';

export const create = {
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
