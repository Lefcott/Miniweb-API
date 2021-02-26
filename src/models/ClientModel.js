import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';

import Field from './shared/Field';

const ClientModelBase = mongoose.model(
  'ClientModel',
  mongoose.Schema(
    {
      project_code: { type: String, required: true },
      name: { type: String, required: true },
      entity: { type: String, required: true },
      public_creation: { type: Boolean, default: false },
      table_descriptive_name: { type: String, required: true },
      fields: [Field]
    },
    { collection: 'client_models' }
  )
);

export default class ClientModel extends ClientModelBase {}
