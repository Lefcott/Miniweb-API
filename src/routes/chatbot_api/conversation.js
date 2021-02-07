import joi from '@hapi/joi';

import { sessionMiddleware } from '../../utils/middlewares';
import { SEARCH_PARAMETERS } from '../../utils/search/constants';

export const list = {
  method: 'get',
  paths: '/projects/:project_code/conversations',
  middlewares: sessionMiddleware,
  params: joi.object().keys({
    project_code: joi.string().required()
  }),
  query: joi.object().keys({
    ...SEARCH_PARAMETERS
  }),
  options: { allowUnknown: true }
};

export const show = {
  method: 'get',
  paths: '/projects/:project_code/conversations/:conversation_id',
  middlewares: sessionMiddleware,
  params: joi.object().keys({
    project_code: joi.string().required(),
    conversation_id: joi.string().required()
  })
};
