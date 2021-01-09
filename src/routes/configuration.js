import joi from '@hapi/joi';

export const list = {
  method: 'get',
  paths: '/configurations',
  query: joi.object().keys({ development_request_id: joi.string().required() })
};
