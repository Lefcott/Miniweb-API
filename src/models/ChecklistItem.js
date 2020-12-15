import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';

const ChecklistItem = mongoose.model(
  'ChecklistItem',
  mongoose.Schema(
    {
      code: { type: String, required: true },
      price: Number,
      type: String // monthly | unique
    },
    { collection: 'checklist_items' }
  )
);

export default class extends ChecklistItem {}
