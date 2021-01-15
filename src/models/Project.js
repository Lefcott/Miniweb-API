import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';

import Field from './shared/Field';
import Form from './Form';
import ClientModel from './ClientModel';

const ProjectBase = mongoose.model(
  'Project',
  mongoose.Schema(
    {
      code: { type: String, required: true },
      name: { type: String, required: true },
      base_url: { type: String, required: true },
      language_code: { type: String, required: true }, // es | en
      table_names: [{ type: String, required: true }],
      cloudinary_settings: {
        cloud_name: { type: String, required: true },
        preset_name: { type: String, required: true }
      },
      fields: [Field],
      configuration_sections: [
        {
          form_code: { type: String, required: true },
          form: {}
        }
      ],
      configuration: {
        /*
          [configuration_sections[].key]: {
            [configuration_sections[].fields[].key]: value
          }
        */
      }
    },
    { collection: 'projects' }
  )
);

export default class Project extends ProjectBase {
  update_configuration(body) {
    this.configuration = body;

    return this.save();
  }

  find_client_models() {
    return ClientModel.find({ table_name: { $in: this.table_names } });
  }

  async set_configuration_sections() {
    const forms = await Form.find({
      project_code: this.code,
      code: {
        $in: this.configuration_sections.map(({ form_code }) => form_code)
      }
    });

    this.configuration_sections.forEach(configuration_section => {
      configuration_section.form = forms.find(form => form.code === configuration_section.form_code);
    });

    log(this.configuration_sections);
  }

  static async find_by_code(code) {
    const project = await Project.findOne({ code });

    if (!project) throw new NotFoundError(`project with code ${code} not found`);

    return project;
  }
}
