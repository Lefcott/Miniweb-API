import joi from '@hapi/joi';

export const list = {
  method: 'get',
  paths: '/client_documents',
  query: joi.object().keys({
    table_name: joi.string().required()
  })
};
