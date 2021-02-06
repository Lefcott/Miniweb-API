import joi from '@hapi/joi';

import { sessionMiddleware } from '../../utils/middlewares';

export const show = {
  method: 'get',
  paths: '/language',
  middlewares: sessionMiddleware
};

export const update = {
  method: 'put',
  paths: '/language',
  middlewares: sessionMiddleware,
  body: joi.object().keys({
    code: joi.string().valid('en', 'es').required()
  })
};
