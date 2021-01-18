import joi from '@hapi/joi';

export const list = {
  method: 'get',
  paths: '/projects/:project_code/forms',
  query: joi.object().keys({
    showable: joi.bool()
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
