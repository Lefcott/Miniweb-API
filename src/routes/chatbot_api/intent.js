import joi from '@hapi/joi';

import { sessionMiddleware } from '../../utils/middlewares';

export const list = {
  method: 'get',
  paths: '/projects/:project_code/intents',
  middlewares: sessionMiddleware,
  query: joi.object().keys({
    channel: joi.string().valid('web', 'facebook').required()
  })
};
