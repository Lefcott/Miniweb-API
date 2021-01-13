import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';

import { getEmailFromTemplate, sendEmail } from '../utils/emails';

import Project from './Project';
import CartModel from './CartModel';

const CartBase = mongoose.model(
  'Cart',
  mongoose.Schema(
    {
      project_code: { type: String, required: true },
      data: {},
      items: [
        {
          product: {},
          count: { type: Number, required: true }
        }
      ]
    },
    { collection: 'carts' }
  )
);

export default class Cart extends CartBase {
  notify_creation() {
    const data = {
      project_name: this.project.name,
      client_data: this.cart_model.fields.map(field => ({ key: field.name, value: this.data[field.key] })),
      cart_link: `${this.project.base_url}/carts/${this._id}`
    };
    const { subject, text, html } = getEmailFromTemplate('new_cart', this.project.language_code, data);
    const [from, to] = ['notifications', this.project.configuration.contact_email];

    sendEmail(from, to, subject, text, html, data);
  }

  static async create(body) {
    const project = await Project.find_by_code(body.project_code);
    const cart_model = await CartModel.find_by_project_code(body.project_code);

    if (!project) throw new ValidationError(`project with code ${body.project_code} not found`);

    if (!cart_model) throw new ValidationError(`card model with project code ${body.project_code} not found`);

    const cart = new Cart({
      project_code: body.project_code,
      items: body.items,
      data: body.data
    });

    cart.project = project;
    cart.cart_model = cart_model;

    cart.notify_creation();

    return cart.save();
  }
}
