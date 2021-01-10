import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';

import Field from './shared/Field';

const Project = mongoose.model(
  'Project',
  mongoose.Schema(
    {
      code: { type: String, required: true },
      table_names: [{ type: String, required: true }],
      fields: [Field],
      configuration: {}
    },
    { collection: 'projects' }
  )
);

export default class extends Project {}
