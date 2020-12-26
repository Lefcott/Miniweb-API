import mongoose from 'mongoose';

const Configuration = mongoose.model(
  'Configuration',
  mongoose.Schema(
    {
      development_request_id: { type: String, required: true },
      name: { type: String, required: true },
      field_values: []
    },
    { collection: 'configurations' }
  )
);

export default class extends Configuration {}
