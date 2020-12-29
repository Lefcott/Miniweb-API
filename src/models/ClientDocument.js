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

export default class extends ClientDocument {}
