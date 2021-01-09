import joi from '@hapi/joi';

import { sessionMiddleware } from '../utils/middlewares';

export const list = {
  method: 'get',
  paths: '/base_prices',
  query: joi.object().keys({ currency: joi.string().required() })
};
