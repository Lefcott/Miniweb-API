import joi from '@hapi/joi';

import { sessionMiddleware } from '../../utils/middlewares';

export const list = {
  method: 'get',
  paths: '/projects/:project_code/forms/:form_code/form_responses',
  middlewares: sessionMiddleware,
  query: joi.object().keys({
    page_size: joi.number().min(1).max(100).required(),
    page_number: joi.number().min(1).required(),
    regex_fields: joi.array().default([]),
    regex_flags: joi.string().default(''),
    regex_normalize_characters: joi.boolean().default(true)
  }),
  options: { allowUnknown: true }
};

export const create = {
  method: 'post',
  paths: '/projects/:project_code/forms/:form_code/form_responses',
  body: joi.object()
};
