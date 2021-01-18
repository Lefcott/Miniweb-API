import joi from '@hapi/joi';

import { sessionMiddleware } from '../../utils/middlewares';

export const list = {
  method: 'get',
  paths: '/client_documents',
  query: joi.object().keys({
    table_name: joi.string().required(),
    page_size: joi.number().min(1).max(100).required(),
    page_number: joi.number().min(1).required(),
    regex_fields: joi.array().default([]),
    regex_flags: joi.string().default(''),
    regex_normalize_characters: joi.boolean().default(true)
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
  paths: '/client_documents',
  middlewares: sessionMiddleware,
  body: joi.object().keys({
    table_name: joi.string().required(),
    value: joi.object().required()
  })
};
