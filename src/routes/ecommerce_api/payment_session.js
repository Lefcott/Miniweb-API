import joi from '@hapi/joi';

export const create = {
  method: 'post',
  paths: '/products/:product_id/payment_sessions',
  body: joi.object().keys({
    product_name: joi.string().required(),
    success_url: joi.string().required(),
    cancel_url: joi.string().required()
  })
};
