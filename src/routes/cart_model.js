import joi from '@hapi/joi';

export const show = {
  method: 'get',
  paths: '/ecommerce_api/projects/:project_code/cart_models',
  params: joi.object().keys({
    project_code: joi.string().required()
  })
};
