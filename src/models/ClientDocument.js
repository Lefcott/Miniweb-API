import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';
import lodash from 'lodash';

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

export default class extends ClientDocument {
  static search(query) {
    const { page_size, page_number, regex_fields, regex_flags } = query;
    delete query.page_size;
    delete query.page_number;
    delete query.regex_fields;
    delete query.regex_flags;

    const regex_query = {
      $or: regex_fields
        .map(regex_field => {
          const value = query[regex_field];
          delete query[regex_field];
          return [regex_field, value];
        })
        .filter(([, value]) => value)
        .map(([regex_field, value]) => {
          const regex = new RegExp(lodash.escapeRegExp(value), regex_flags);
          return { [regex_field]: regex };
        })
    };

    if (!regex_query.$or.length) delete regex_query.$or;

    return ClientDocument.find({ ...query, ...regex_query })
      .skip(page_size * (page_number - 1))
      .limit(page_size);
  }

  static async get_distinct_object(query) {
    const keys = Object.keys(query);
    const queries = Promise.all(keys.map(key => ClientDocument.distinct(key)));

    const results = await queries;

    return Object.fromEntries(keys.map((key, i) => [key, results[i]]));
  }
}
