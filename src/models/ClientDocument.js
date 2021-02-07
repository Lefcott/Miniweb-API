import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';

import { getSearchQuery } from '../utils/search';

const ClientDocumentBase = mongoose.model(
  'ClientDocument',
  mongoose.Schema(
    {
      table_name: { type: String, required: true },
      value: { type: mongoose.SchemaTypes.Mixed, required: true }
    },
    { collection: 'client_documents' }
  )
);

export default class ClientDocument extends ClientDocumentBase {
  sanitize() {
    return { _id: this._id, ...this.value };
  }

  edit(body) {
    this.value = body;

    delete this.value._id;

    return this.save();
  }

  static search(query) {
    const { page_size, page_number, regex_fields, regex_flags } = query;
    const searchQuery = getSearchQuery(query);

    return ClientDocument.find(searchQuery)
      .skip(page_size * (page_number - 1))
      .limit(page_size)
      .sort({ _id: -1 });
  }

  static async get_distinct_object(query) {
    const keys = Object.keys(query);
    const queries = Promise.all(keys.map(key => ClientDocument.distinct(key)));

    const results = await queries;

    return Object.fromEntries(keys.map((key, i) => [key, results[i]]));
  }
}
