import lodash from 'lodash';

import { normalize, toAccentInsensitive } from '../string';

export const getSearchAggregations = (query, count = false) => {
  const { page_size, page_number, regex_fields, regex_flags } = query;
  const { regex_normalize_characters } = query;
  const add_fields = JSON.parse(query.add_fields);
  delete query.count;
  delete query.page_size;
  delete query.page_number;
  delete query.regex_fields;
  delete query.regex_flags;
  delete query.regex_normalize_characters;
  delete query.add_fields;
  const aggregations = [];

  Object.keys(query).forEach(key => {
    if (query[key] === 'true') query[key] = true;
    if (query[key] === 'false') query[key] = false;
  });

  Object.keys(query)
    .filter(key => key.includes('+'))
    .forEach(key => {
      const value = query[key];
      delete query[key];
      const fields = key.replace(/\++/g, '+ +').split('+');
      const regex = new RegExp(value, regex_flags);
      aggregations.push(
        {
          $addFields: {
            [`calculated_fields.${key}`]: {
              $concat: fields.map(field => (field === ' ' ? field : `$${field}`))
            }
          }
        },
        { $match: { [`calculated_fields.${key}`]: regex } }
      );
    });

  if (Object.keys(add_fields).length) aggregations.push({ $addFields: add_fields });

  if (count) aggregations.push({ $count: 'count' });

  const regex_query = {
    $or: regex_fields
      .map(regex_field => {
        const value = query[regex_field];
        delete query[regex_field];
        return [regex_field, value];
      })
      .filter(([, value]) => value)
      .map(([regex_field, value]) => {
        if (regex_normalize_characters) value = normalize(value);
        value = lodash.escapeRegExp(value);
        value = toAccentInsensitive(value);
        const regex = new RegExp(value, regex_flags);

        return { [regex_field]: regex };
      })
  };

  if (!regex_query.$or.length) delete regex_query.$or;

  return [{ $match: { ...query, ...regex_query } }, ...aggregations];
};
