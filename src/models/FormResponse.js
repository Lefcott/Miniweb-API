import mongoose from 'mongoose';

import { get_email_from_template, send_email } from '../utils/emails';
import { getSearchQuery } from '../utils/search';

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
  sanitize() {
    return { _id: this._id, ...this.data };
  }

  notify_creation(additional_data = {}) {
    const data = {
      project_name: this.project.name,
      client_data: this.form.fields.map(field => ({ key: field.name, value: this.data[field.key] })),
      ...additional_data,
      ...(this.form.notifications.email_data || {})
    };
    const { subject, text, html } = get_email_from_template(
      this.form.notifications.email_code,
      this.project.language_code,
      data
    );
    const [from, to] = ['notifications', this.form.notifications.emails];

    send_email(from, to, subject, text, html, data);
  }

  static async create(data, params, cart) {
    const project = await Project.find_by_code(params.project_code);
    const form = await Form.findOne({ project_code: params.project_code, code: params.form_code });

    if (!form) throw new NotFoundError('form not found');

    const additional_data = cart ? { cart_link: `${project.base_url}/carts/${cart._id}` } : {};

    const form_response = new FormResponse({
      project_code: params.project_code,
      form_code: params.form_code,
      data: { ...data, ...additional_data }
    });

    form_response.project = project;
    form_response.form = form;

    if (form.notifications.enabled) form_response.notify_creation(additional_data);

    return form_response.save();
  }

  static search(query, params) {
    const { page_size, page_number, regex_fields, regex_flags } = query;
    const searchQuery = getSearchQuery(query);

    return FormResponse.find({ ...params, ...searchQuery })
      .skip(page_size * (page_number - 1))
      .limit(page_size)
      .sort({ _id: -1 });
  }
}
