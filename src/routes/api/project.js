import joi from '@hapi/joi';

import { sessionMiddleware } from '../../utils/middlewares';

export const show = {
  method: 'get',
  paths: '/projects/:project_code_or_token',
  params: joi.object().keys({
    project_code_or_token: joi.string().required()
  }),
  query: joi.object().keys({
    search_by_project_token: joi.bool().default(false)
  })
};

export const list = {
  method: 'get',
  paths: '/projects',
  middlewares: sessionMiddleware
};

export const update_configuration = {
  method: 'put',
  paths: '/projects/:project_id/configuration',
  middlewares: sessionMiddleware,
  params: joi.object().keys({
    project_id: joi.string().required()
  }),
  body: joi.object().required()
};

export const update_chatbot_configuration = {
  method: 'put',
  paths: '/projects/:project_id/chatbot_configuration',
  middlewares: sessionMiddleware,
  params: joi.object().keys({
    project_id: joi.string().required()
  }),
  body: joi.object().required()
};
