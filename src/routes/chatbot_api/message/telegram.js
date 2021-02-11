import joi from '@hapi/joi';

export const create_telegram_message = {
  method: 'post',
  paths: '/projects/:project_code/telegram_messages',
  params: joi.object().keys({
    project_code: joi.string().required()
  })
};
