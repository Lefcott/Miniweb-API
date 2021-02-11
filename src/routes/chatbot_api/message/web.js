import joi from '@hapi/joi';

export const create_web_message = {
  method: 'post',
  paths: '/projects/:project_code/web_messages',
  params: joi.object().keys({
    project_code: joi.string().required()
  }),
  body: joi.object().keys({
    from: joi.string().default('user'),
    channel: joi.string().required(),
    type: joi.string().valid('text').required(),
    conversation_id: joi.string(),
    text: joi.when('type', {
      is: 'text',
      then: joi.string().required(),
      otherwise: joi.forbidden()
    })
  }),
  query: joi.object().keys({
    respond: joi.bool().required()
  })
};
