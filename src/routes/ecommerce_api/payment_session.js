import joi from '@hapi/joi';

export const create = {
  method: 'post',
  paths: '/products/:product_id/payment_sessions'
};
