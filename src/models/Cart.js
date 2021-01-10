import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';

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
  static async validate_project(body) {
    log(body);
    const projects = await Project.find({ code: body.project_code });

    if (!projects.length) throw new ValidationError(`project with code ${body.project_code} not found`);
  }

  static create(body) {
    return new ExtendedCart({
      project_code: body.project_code,
      items: body.items,
      data: body.data
    }).save();
  }
}
