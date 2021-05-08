import joi from '@hapi/joi';

import { sessionMiddleware } from '../../utils/middlewares';
import { SEARCH_PARAMETERS } from '../../utils/search/constants';

export const list = {
  method: 'get',
  paths: '/projects/:project_code/items',
  params: joi.object().keys({
    project_code: joi.string().required()
  }),
  query: joi.object().keys({
    entity: joi.string().required(),
    ...SEARCH_PARAMETERS
  }),
  options: { allowUnknown: true }
};

export const show = {
  method: 'get',
  paths: '/items/:item_id',
  params: joi.object().keys({
    item_id: joi.string().required()
  })
};

export const distinct = {
  method: 'get',
  paths: '/item_distinct',
  options: { allowUnknown: true }
};

export const _delete = {
  method: 'delete',
  paths: '/items/:item_id',
  middlewares: sessionMiddleware
};

export const update = {
  method: 'put',
  paths: '/items/:item_id',
  middlewares: sessionMiddleware
};

export const create = {
  method: 'post',
  paths: '/projects/:project_code/items',
  middlewares: sessionMiddleware,
  params: joi.object().keys({
    project_code: joi.string().required()
  }),
  body: joi.object().keys({
    entity: joi.string().required(),
    value: joi.object().required()
  })
};
