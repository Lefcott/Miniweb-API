import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';
import lodash from 'lodash';

import { normalize, toAccentInsensitive } from '../utils/string';

const ClientModel = mongoose.model(
  'ClientModel',
  mongoose.Schema(
    {
      table_name: { type: String, required: true },
      fields: [
        {
          input_type: { type: String, required: true }, // text | number | photo | email | phone
          is_required: { type: Boolean, default: false }
        }
      ]
    },
    { collection: 'client_models' }
  )
);

export default class extends ClientModel {}