import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';

const ChecklistItemBase = mongoose.model(
  'ChecklistItem',
  mongoose.Schema(
    {
      code: { type: String, required: true },
      enabled: { type: Boolean, required: true },
      price: Number,
      currency: String, // USD | ARS
      type: String // monthly | unique
    },
    { collection: 'checklist_items' }
  )
);

export default class ChecklistItem extends ChecklistItemBase {}
