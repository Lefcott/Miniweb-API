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
