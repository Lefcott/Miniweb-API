import mongoose from 'mongoose';

const ConfigurationBase = mongoose.model(
  'Configuration',
  mongoose.Schema(
    {
      development_request_id: { type: String, required: true },
      name: { type: String, required: true },
      field_values: [
        {
          field_code: { type: String, required: true },
          value: {}
        }
      ]
    },
    { collection: 'configurations' }
  )
);

export default class Configuration extends ConfigurationBase {}
