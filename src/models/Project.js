import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';

import Field from './shared/Field';

const ProjectBase = mongoose.model(
  'Project',
  mongoose.Schema(
    {
      code: { type: String, required: true },
      name: { type: String, required: true },
      base_url: { type: String, required: true },
      language_code: { type: String, required: true }, // es | en
      table_names: [{ type: String, required: true }],
      fields: [Field],
      configuration: {}
    },
    { collection: 'projects' }
  )
);

export default class Project extends ProjectBase {
  update_configuration(body) {
    this.configuration = body;

    return this.save();
  }

  static find_by_code(code) {
    return Project.findOne({ code });
  }
}
