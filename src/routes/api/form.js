import joi from '@hapi/joi';

export const show = {
  method: 'get',
  paths: '/projects/:project_code/forms/:form_code',
  params: joi.object().keys({
    form_code: joi.string().required(),
    project_code: joi.string().required()
  })
};
