import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';

import Project from './Project';
import FormResponse from './FormResponse';

const CartBase = mongoose.model(
  'Cart',
  mongoose.Schema(
    {
      project_code: { type: String, required: true },
      form_code: { type: String, required: true },
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
  static async create(body, params) {
    const cart = new Cart({
      project_code: params.project_code,
      form_code: params.form_code,
      items: body.items
    });

    await FormResponse.create(body.data, params, cart);

    return cart.save();
  }
}
