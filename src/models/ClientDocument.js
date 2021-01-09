import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';
import lodash from 'lodash';

import { normalize, toAccentInsensitive } from '../utils/string';

const ClientDocument = mongoose.model(
  'ClientDocument',
  mongoose.Schema(
    {
      table_name: { type: String, required: true },
      value: { type: mongoose.SchemaTypes.Mixed, required: true }
    },
    { collection: 'client_documents' }
  )
);

export default class ExtendedClientDocument extends ClientDocument {
  serialize() {
    return { _id: this._id, ...this.value };
  }

  edit(body) {
    this.value = body;

    delete this.value._id;

    return this.save();
  }

  static search(query) {
    const { page_size, page_number, regex_fields, regex_flags } = query;
    const { regex_normalize_characters } = query;
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

    return ExtendedClientDocument.find({ ...query, ...regex_query })
      .skip(page_size * (page_number - 1))
      .limit(page_size)
      .sort({ _id: -1 });
  }

  static async get_distinct_object(query) {
    const keys = Object.keys(query);
    const queries = Promise.all(keys.map(key => ExtendedClientDocument.distinct(key)));

    const results = await queries;

    return Object.fromEntries(keys.map((key, i) => [key, results[i]]));
  }
}
