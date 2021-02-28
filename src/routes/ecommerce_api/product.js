import joi from '@hapi/joi';

export const show = {
  method: 'get',
  paths: '/products/:product_id',
  params: joi.object().keys({
    product_id: joi.string().required()
  })
};

export const list = {
  method: 'get',
  paths: '/projects/:project_code/products',
  params: joi.object().keys({
    project_code: joi.string().required()
  }),
  query: joi.object().keys({
    category: joi.string().required()
  })
};
