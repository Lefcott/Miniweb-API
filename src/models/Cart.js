import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';

import Project from './Project';
import FormResponse from './FormResponse';

const CartBase = mongoose.model(
  'Cart',
  mongoose.Schema(
    {
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
      items: body.items
    });

    await FormResponse.create(body.data, params, cart);

    return cart.save();
  }
}
