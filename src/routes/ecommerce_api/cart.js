import joi from '@hapi/joi';

export const create = {
  method: 'post',
  paths: '/projects/:project_code/forms/:form_code/carts',
  body: joi.object().keys({
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

export const show = {
  method: 'get',
  paths: '/carts/:_id',
  params: joi.object().keys({
    _id: joi.string().required()
  })
};
