import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';

import Field from './shared/Field';

const CartModelBase = mongoose.model(
  'CartModel',
  mongoose.Schema(
    {
      project_code: { type: String, required: true },
      fields: [Field]
    },
    { collection: 'cart_models' }
  )
);

export default class CartModel extends CartModelBase {
  static find_by_project_code(project_code) {
    return CartModel.findOne({ project_code });
  }
}
