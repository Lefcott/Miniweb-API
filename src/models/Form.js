import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';

import Field from './shared/Field';

const FormBase = mongoose.model(
  'Form',
  mongoose.Schema(
    {
      code: { type: String, required: true },
      project_code: { type: String, required: true },
      name: { type: String, required: true },
      enum_name: String,
      fields: [Field]
    },
    { collection: 'forms' }
  )
);

export default class Form extends FormBase {}
