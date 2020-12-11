import joi from '@hapi/joi';
import bodyParser from 'body-parser';

import env from '../../env.json';

module.exports = {
  send: {
    method: 'post',
    paths: '/emails',
    domains: env.DOMAIN_NAME,
    errorMessage: 'Bad parameters',
    body: joi.object().keys({
      from: joi.string(),
      to: joi.string(),
      subject: joi.string().required(),
      html: joi.string().required(),
      text: joi.string().required()
    })
  },
  sendTemplate: {
    method: 'post',
    paths: '/emails/:templateName',
    errorMessage: 'Bad parameters',
    params: joi.object().keys({ templateName: joi.string().required() }),
    body: joi.object().keys({
      from: joi.string(),
      to: joi.string(),
      subject: joi.string().required(),
      data: joi.object().required()
    }),
    query: joi.object().keys({ lang: joi.string() })
  },
  createStatus: {
    method: 'post',
    paths: '/email_status/:emailStatus',
    errorMessage: 'Bad parameters',
    middlewares: bodyParser.text(),
    params: joi.object().keys({ emailStatus: joi.string().required() }),
    headers: joi.object().keys({ 'x-amz-sns-message-type': joi.string().required() })
  }
};
