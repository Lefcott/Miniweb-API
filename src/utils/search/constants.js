import joi from '@hapi/joi';

export const SEARCH_PARAMETERS = {
  page_size: joi.number().min(1).max(100).required(),
  page_number: joi.number().min(1).required(),
  regex_fields: joi.array().default([]),
  regex_flags: joi.string().default(''),
  regex_normalize_characters: joi.boolean().default(true)
};