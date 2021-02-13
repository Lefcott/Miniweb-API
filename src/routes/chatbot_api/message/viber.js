import joi from '@hapi/joi';

export const create_viber_message = {
  method: 'post',
  paths: '/projects/:project_code/viber_messages',
  params: joi.object().keys({
    project_code: joi.string().required()
  })
};
