import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';

import Field from './shared/Field';

const CartModel = mongoose.model(
  'CartModel',
  mongoose.Schema(
    {
      project_code: { type: String, required: true },
      fields: [Field]
    },
    { collection: 'cart_models' }
  )
);

export default class extends CartModel {}
