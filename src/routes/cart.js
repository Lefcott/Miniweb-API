import joi from '@hapi/joi';

export const create = {
  method: 'post',
  paths: '/ecommerce_api/carts',
  body: joi.object().keys({
    project_code: joi.string().required(),
    data: joi.object().required(),
    items: joi
      .array()
      .min(1)
      .items(
        joi.object().keys({
          product: joi.object().required(),
          count: joi.number().min(1).required()
        })
      )
      .required()
  })
};
