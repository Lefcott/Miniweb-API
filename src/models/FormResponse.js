import mongoose from 'mongoose';

import { getEmailFromTemplate, sendEmail } from '../utils/emails';

import Project from './Project';
import Form from './Form';

const FormResponseBase = mongoose.model(
  'FormResponse',
  mongoose.Schema(
    {
      project_code: { type: String, required: true },
      form_code: { type: String, required: true },
      data: {}
    },
    { collection: 'form_responses' }
  )
);

export default class FormResponse extends FormResponseBase {
  notify_creation(cart) {
    const data = {
      project_name: this.project.name,
      client_data: this.form.fields.map(field => ({ key: field.name, value: this.data[field.key] })),
      ...(cart ? { cart_link: `${this.project.base_url}/carts/${cart._id}` } : {})
    };
    const { subject, text, html } = getEmailFromTemplate('new_cart', this.project.language_code, data);
    const [from, to] = ['notifications', this.form.notifications.emails];
    log('to', to);

    sendEmail(from, to, subject, text, html, data);
  }

  static async create(data, params, cart) {
    const project = await Project.find_by_code(params.project_code);
    const form = await Form.findOne({ project_code: params.project_code, code: params.form_code });

    if (!project) throw new NotFoundError('project not found');
    if (!form) throw new NotFoundError('form not found');

    const form_response = new FormResponse({
      project_code: params.project_code,
      form_code: params.form_code,
      data
    });

    form_response.project = project;
    form_response.form = form;

    if (form.notifications.enabled) form_response.notify_creation(cart);
  }
}
