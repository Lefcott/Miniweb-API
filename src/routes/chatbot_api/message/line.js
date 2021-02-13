import joi from '@hapi/joi';

export const create_line_message = {
  method: 'post',
  paths: '/projects/:project_code/line_messages',
  params: joi.object().keys({
    project_code: joi.string().required()
  })
};
