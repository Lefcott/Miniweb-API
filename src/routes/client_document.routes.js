import joi from '@hapi/joi';

export const list = {
  method: 'get',
  paths: '/client_documents',
  query: joi.object().keys({
    table_name: joi.string().required(),
    page_size: joi.number().min(1).required(),
    page_number: joi.number().min(1).required()
  }),
  options: { allowUnknown: true }
};
