import joi from '@hapi/joi';

export const show = {
  method: 'get',
  paths: '/products/:product_id',
  params: joi.object().keys({
    product_id: joi.string().required()
  })
};
