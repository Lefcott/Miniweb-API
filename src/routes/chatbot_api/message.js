import joi from '@hapi/joi';

export const create_web_message = {
  method: 'post',
  paths: '/projects/:project_code/web_messages',
  params: joi.object().keys({
    project_code: joi.string().required()
  }),
  body: joi.object().keys({
    from: joi.string().default('user'),
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

export const create_facebook_message = {
  method: 'post',
  paths: '/projects/:project_code/facebook_messages',
  params: joi.object().keys({
    project_code: joi.string().required()
  })
};

export const subscribe_facebook_messages = {
  method: 'get',
  paths: '/projects/:project_code/facebook_messages',
  errorMessage: 'Bad parameters',
  params: joi.object().keys({
    project_code: joi.string().required()
  }),
  query: joi.object().keys({
    'hub.mode': joi.string().valid('subscribe').required(),
    'hub.challenge': joi.string().required(),
    'hub.verify_token': joi.string().required()
  })
};
