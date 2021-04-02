import joi from '@hapi/joi';

import { sessionMiddleware } from '../../utils/middlewares';

export const list = {
  method: 'get',
  paths: '/projects/:project_code/forms',
  query: joi.object().keys({
    showable: joi.bool(),
    editable: joi.bool(),
  }),
  params: joi.object().keys({
    project_code: joi.string().required()
  })
};

export const show = {
  method: 'get',
  paths: '/projects/:project_code/forms/:form_code',
  params: joi.object().keys({
    project_code: joi.string().required(),
    form_code: joi.string().required()
  })
};

export const update = {
  method: 'patch',
  paths: '/projects/:project_code/forms/:form_code',
  middlewares: sessionMiddleware,
  options: { allowUnknown: true },
  params: joi.object().keys({
    project_code: joi.string().required(),
    form_code: joi.string().required()
  }),
  body: joi.object().keys({
    notifications: joi.object().keys({
      enabled: joi.bool(),
      email_code: joi.string(),
      emails: joi.array().items(joi.string())
    }),
    fields: joi.array().items(
      joi.object().keys({
        key: joi.string().required(),
        name: joi.string(),
        default_value: joi.string(),
        important: joi.bool().default(true),
        input_type: joi.string().required(),
        testing_value: joi.string(),
        fillable_by_user: joi.bool().default(true),
        is_required: joi.bool().default(true),
        subfields: joi.array()
      })
    )
  })
};
