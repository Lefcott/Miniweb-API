import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';

import Form from './Form';

const ProjectBase = mongoose.model(
  'Project',
  mongoose.Schema(
    {
      code: { type: String, required: true },
      token: String,
      name: { type: String, required: true },
      base_url: { type: String, required: true },
      disabled: { type: Boolean, default: false },
      language_code: { type: String, required: true }, // es | en
      cloudinary_settings: {
        cloud_name: String,
        preset_name: String
      },
      sentry_settings: {
        dsn: String
      },
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
      },
      chatbot: {
        enabled_channels: [String],
        enabled_origins: [String],
        configuration: {}
      },
      widgets: {},
      ecommerce: {
        stripe: {
          publishable_key: String,
          secret_key: String
        }
      }
    },
    { collection: 'projects', minimize: false }
  )
);

export default class Project extends ProjectBase {
  validate_channel(channel) {
    if (!this.chatbot.enabled_channels.includes(channel))
      throw new AuthorizationError(`${channel} is not enabled for project ${this.code}`);
  }

  update_configuration(body) {
    this.configuration = body;

    return this.save();
  }

  update_widgets(body) {
    this.widgets = body;

    return this.save();
  }

  update_chatbot_configuration(body) {
    this.chatbot.configuration = body;

    return this.save();
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
  }

  static async find_by_code(code) {
    const project = await Project.findOne({ code });

    if (!project) throw new NotFoundError(`project with code ${code} not found`);

    return project;
  }
}
