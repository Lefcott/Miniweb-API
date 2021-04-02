import mongoose, { Schema } from 'mongoose';

const Field = new Schema();

Field.add({
  key: { type: String, required: true },
  name: { type: String, required: true },
  names: {
    en: String,
    es: String
  },
  step: Number,
  default_value: { type: mongoose.SchemaTypes.Mixed },
  important: { type: Boolean, default: false },
  input_type: { type: String, required: true }, // text | number | image | email | phone
  is_required: { type: Boolean, default: false },
  read_only: { type: Boolean, default: false },
  fillable_by_user: { type: Boolean, default: true },
  testing_value: String,
  options_reference: {
    form_code: String,
    field_key: String
  },
  options: [{ key: String, value: String, fields: [Field] }],
  select_button_options: [
    {
      value: { type: String, required: true },
      language: {
        en: { name: String },
        es: { name: String }
      }
    }
  ],
  language: {
    en: { name: String },
    es: { name: String }
  },
  subfields: [Field]
});

export default Field;
