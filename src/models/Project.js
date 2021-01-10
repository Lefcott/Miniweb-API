import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';

import Field from './shared/Field';

const Project = mongoose.model(
  'Project',
  mongoose.Schema(
    {
      code: { type: String, required: true },
      language_code: { type: String, required: true }, // es | en
      table_names: [{ type: String, required: true }],
      fields: [Field],
      configuration: {}
    },
    { collection: 'projects' }
  )
);

export default class ExtendedProject extends Project {
  static find_by_code(code) {
    return ExtendedProject.findOne(code);
  }
}
