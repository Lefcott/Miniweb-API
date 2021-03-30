import mongoose from 'mongoose';

import Field from './shared/Field';

const FormBase = mongoose.model(
  'Form',
  mongoose.Schema(
    {
      code: { type: String, required: true },
      project_code: { type: String, required: true },
      name: { type: String, required: true },
      variants: [
        {
          field_variants: [
            {
              field_key: { type: String, required: true },
              enabled: { type: Boolean, required: true }
            }
          ],
          language: {
            es: { name: { type: String, required: true } },
            en: { name: { type: String, required: true } }
          }
        }
      ],
      enum_name: String,
      showable: { type: Boolean, default: true },
      editable: { type: Boolean, default: false },
      notifications: {
        enabled: { type: Boolean, required: true },
        email_code: String,
        emails: [String]
      },
      steps: [{ name: { en: String, es: String }, fields: [Field] }],
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
