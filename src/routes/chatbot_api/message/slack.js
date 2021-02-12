import joi from '@hapi/joi';

export const create_slack_message = {
  method: 'post',
  paths: '/projects/:project_code/slack_messages',
  params: joi.object().keys({
    project_code: joi.string().required()
  })
};
