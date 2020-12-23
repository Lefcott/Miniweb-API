import mongoose from 'mongoose';

const BasePrice = mongoose.model(
  'BasePrice',
  mongoose.Schema(
    {
      type: { type: String, required: true }, // unique | monthly
      currency: { type: String, required: true }, // ARS | USD
      amount: { type: Number, required: true }
    },
    { collection: 'base_prices' }
  )
);

export default class extends BasePrice {}
