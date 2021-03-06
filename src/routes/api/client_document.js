import joi from '@hapi/joi';

import { sessionMiddleware } from '../../utils/middlewares';
import { SEARCH_PARAMETERS } from '../../utils/search/constants';

export const list = {
  method: 'get',
  paths: '/projects/:project_code/client_documents',
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
  paths: '/client_documents/:client_document_id',
  params: joi.object().keys({
    client_document_id: joi.string().required()
  })
};

export const distinct = {
  method: 'get',
  paths: '/client_document_distinct',
  options: { allowUnknown: true }
};

export const _delete = {
  method: 'delete',
  paths: '/client_documents/:client_document_id',
  middlewares: sessionMiddleware
};

export const update = {
  method: 'put',
  paths: '/client_documents/:client_document_id',
  middlewares: sessionMiddleware
};

export const create = {
  method: 'post',
  paths: '/projects/:project_code/client_documents',
  middlewares: sessionMiddleware,
  params: joi.object().keys({
    project_code: joi.string().required()
  }),
  body: joi.object().keys({
    entity: joi.string().required(),
    value: joi.object().required()
  })
};
