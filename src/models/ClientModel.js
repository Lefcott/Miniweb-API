import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';

import Field from './shared/Field';

const ClientModel = mongoose.model(
  'ClientModel',
  mongoose.Schema(
    {
      name: { type: String, required: true },
      table_name: { type: String, required: true },
      table_descriptive_name: { type: String, required: true },
      fields: [Field]
    },
    { collection: 'client_models' }
  )
);

export default class extends ClientModel {}
