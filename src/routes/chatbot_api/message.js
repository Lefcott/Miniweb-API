import joi from '@hapi/joi';

export const create_web_message = {
  method: 'post',
  paths: '/projects/:project_code/web_message',
  body: joi.object().keys({
    type: joi.string().valid('text').required(),
    text: joi.when('type', {
      is: 'text',
      then: joi.string().required(),
      otherwise: joi.forbidden()
    })
  })
};

export const subscribe_facebook_messages = {
  method: 'get',
  paths: '/projects/:project_code/facebook_messages',
  errorMessage: 'Bad parameters',
  params: joi.object().keys({
    teamName: joi.string().required(),
    botName: joi.string().required()
  }),
  query: joi.object().keys({
    'hub.mode': joi.string().valid('subscribe').required(),
    'hub.challenge': joi.string().required(),
    'hub.verify_token': joi.string().required()
  })
};
