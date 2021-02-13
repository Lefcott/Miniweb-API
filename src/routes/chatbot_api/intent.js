import joi from '@hapi/joi';

import { sessionMiddleware } from '../../utils/middlewares';

const channels = ['web', 'facebook', 'telegram', 'slack', 'viber'];
const message_types = ['text', 'image'];

export const list = {
  method: 'get',
  paths: '/projects/:project_code/intents',
  middlewares: sessionMiddleware,
  query: joi.object().keys({
    channel: joi
      .string()
      .valid(...channels)
      .required()
  })
};

export const create = {
  method: 'post',
  paths: '/projects/:project_code/intents',
  middlewares: sessionMiddleware,
  query: joi.object().keys({
    channel: joi
      .string()
      .valid(...channels)
      .required()
  }),
  body: joi.object().keys({
    name: joi.string().required(),
    phrases: joi.array().items(joi.string()).required(),
    answers: joi
      .array()
      .items(
        joi.object().keys({
          possible_messages: joi.array().items(
            joi.object().keys({
              from: joi.string(),
              type: joi.string().valid(...message_types),
              text: joi.string(),
              buttons: joi.array().items(
                joi.object().keys({
                  type: joi.string().required(),
                  text: joi.string().required(),
                  url: joi.string()
                })
              ),
              image_url: joi.string()
            })
          )
        })
      )
      .required()
  })
};

export const update = {
  method: 'put',
  paths: '/projects/:project_code/intents',
  middlewares: sessionMiddleware,
  query: joi.object().keys({
    channel: joi
      .string()
      .valid(...channels)
      .required()
  }),
  body: joi.object().keys({
    _id: joi.string(),
    __v: joi.number(),
    project_code: joi.string().required(),
    channel: joi
      .string()
      .valid(...channels)
      .required(),
    name: joi.string().required(),
    phrases: joi.array().items(joi.string()).required(),
    answers: joi
      .array()
      .items(
        joi.object().keys({
          _id: joi.string(),
          possible_messages: joi.array().items(
            joi.object().keys({
              _id: joi.string(),
              from: joi.string(),
              type: joi.string().valid(...message_types),
              text: joi.string(),
              image_url: joi.string()
            })
          )
        })
      )
      .required()
  })
};

export const _delete = {
  method: 'delete',
  paths: '/intents/:intent_id',
  middlewares: sessionMiddleware
};
