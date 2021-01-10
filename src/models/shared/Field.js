import mongoose from 'mongoose';

export default {
  key: { type: String, required: true },
  name: { type: String, required: true },
  default_value: { type: mongoose.SchemaTypes.Mixed },
  important: { type: Boolean, required: true },
  input_type: { type: String, required: true }, // text | number | image | email | phone
  is_required: { type: Boolean, default: false }
};
