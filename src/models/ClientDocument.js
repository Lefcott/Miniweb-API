import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';

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
  static find(query) {
    const { page_size, page_number } = query;
    delete query.page_size;
    delete query.page_number;

    return ClientDocument.find(query)
      .skip(page_size * (page_number - 1))
      .limit(page_size);
  }
}
