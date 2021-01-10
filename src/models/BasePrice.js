import mongoose from 'mongoose';

const BasePriceBase = mongoose.model(
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

export default class BasePrice extends BasePriceBase {}
