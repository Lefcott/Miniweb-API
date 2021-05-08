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
        enabled: { type: Boolean, default: false },
        email_code: String,
        emails: [String],
        email_data: {}
      },
      steps: [{ key: String, name: { en: String, es: String } }],
      variants: [
        {
          key: String,
          names: { en: String, es: String }
        }
      ],
      fields: [Field]
    },
    { collection: 'forms' }
  )
);

export default class Form extends FormBase {
  update(body) {
    this.fields = body.fields;
    this.notifications = body.notifications;

    return this.save();
  }
}
