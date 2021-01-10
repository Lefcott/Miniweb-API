import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';

import { getEmailFromTemplate, sendEmail } from '../utils/emails';

import Project from './Project';

const Cart = mongoose.model(
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

export default class ExtendedCart extends Cart {
  notify_creation() {
    const { subject, text, html } = getEmailFromTemplate('new_cart', this.project.language_code);
    const [from, to] = ['notifications@dancotll.com <DancotLL>', this.project.configuration.contact_email];

    sendEmail(from, to, subject, text, html);
  }

  static async create(body) {
    const project = await Project.find_by_code(body.project_code);

    if (!project) throw new ValidationError(`project with code ${body.project_code} not found`);

    const cart = new ExtendedCart({
      project_code: body.project_code,
      items: body.items,
      data: body.data
    });

    cart.project = project;

    cart.notify_creation();

    return cart.save();
  }
}
