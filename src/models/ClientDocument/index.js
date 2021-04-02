import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';

import { getSearchQuery } from '../../utils/search';
import ClientModel from '../ClientModel';

import * as utils from './utils';

const ClientDocumentBase = mongoose.model(
  'ClientDocument',
  mongoose.Schema(
    {
      project_code: { type: String, required: true },
      enabled: { type: Boolean, default: true },
      entity: { type: String, required: true },
      value: { type: mongoose.SchemaTypes.Mixed, required: true },
      payments: [
        {
          date: { type: Date, required: true },
          payment_reminder_email_sent: { type: Boolean, required: true },
          service_expired_email_sent: { type: Boolean, required: true },
          service_disabled_email_sent: { type: Boolean, required: true }
        }
      ]
    },
    { collection: 'client_documents', timestamps: true }
  )
);

export default class ClientDocument extends ClientDocumentBase {
  sanitize() {
    utils.apply_effects(this);
    return { _id: this._id, ...this.value };
  }

  edit(body) {
    this.value = body;

    delete this.value._id;

    return this.save();
  }

  validate_deletion(user) {
    if (!user.admin) throw new AuthorizationError(`user not allowed to delete document${this._id}`);
  }

  validate_update(user) {
    if (!user.admin) throw new AuthorizationError(`user not allowed to update document${this._id}`);
  }

  static async validate_creation(user, project_code, body) {
    const client_model = await ClientModel.findOne({ project_code, entity: body.entity });

    if (!client_model) throw new NotFoundError('client model not found');
    if (!user.admin && !client_model.public_creation)
      throw new AuthorizationError('user not allowed to create client document');
  }

  static search(query) {
    const { page_size, page_number, regex_fields, regex_flags, count } = query;
    const searchQuery = getSearchQuery(query);

    if (count) return ClientDocument.countDocuments(searchQuery);

    return ClientDocument.find(searchQuery)
      .skip(page_size * (page_number - 1))
      .limit(page_size)
      .sort({ _id: -1 });
  }

  static async get_distinct_object(query) {
    const keys = Object.keys(query);
    const queries = Promise.all(keys.map(key => ClientDocument.distinct(key)));

    const results = await queries;

    return Object.fromEntries(keys.map((key, i) => [key, results[i]]));
  }
}