import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';
import lodash from 'lodash';

import { normalize, toAccentInsensitive } from '../utils/string';

const ClientModel = mongoose.model(
  'ClientModel',
  mongoose.Schema(
    {
      name: { type: String, required: true },
      table_name: { type: String, required: true },
      table_descriptive_name: { type: String, required: true },
      fields: [
        {
          key: { type: String, required: true },
          name: { type: String, required: true },
          important: { type: Boolean, required: true },
          input_type: { type: String, required: true }, // text | number | photo | email | phone
          is_required: { type: Boolean, default: false }
        }
      ]
    },
    { collection: 'client_models' }
  )
);

export default class extends ClientModel {}
