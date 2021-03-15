import lodash from 'lodash';

import { normalize, toAccentInsensitive } from '../string';

export const getSearchQuery = query => {
  const { page_size, page_number, regex_fields, regex_flags } = query;
  const { regex_normalize_characters } = query;
  delete query.count;
  delete query.page_size;
  delete query.page_number;
  delete query.regex_fields;
  delete query.regex_flags;
  delete query.regex_normalize_characters;

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

  return { ...query, ...regex_query };
};
