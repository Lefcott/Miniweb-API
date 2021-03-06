import joi from '@hapi/joi';

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
