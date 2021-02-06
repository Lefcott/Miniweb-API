import joi from '@hapi/joi';

import { sessionMiddleware } from '../../utils/middlewares';

export const update = {
  method: 'put',
  paths: '/language',
  middlewares: sessionMiddleware,
  body: joi.object().keys({
    code: joi.string().valid('en', 'es').required()
  })
};
