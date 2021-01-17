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
      showable: { type: Boolean, default: true },
      editable: { type: Boolean, default: false },
      notifications: {
        enabled: { type: Boolean, required: true },
        email_code: String,
        emails: [String]
      },
      fields: [Field]
    },
    { collection: 'forms' }
  )
);

export default class Form extends FormBase {}
