import { uuid } from 'uuidv4';
import mongoose from 'mongoose';

const User = mongoose.model(
  'User',
  mongoose.Schema(
    {
      name: { type: String, required: true },
      surname: String,
      phone: String,
      email: { type: String, required: true },
      password: { type: String, required: true },
      email_confirmation_token: { type: String, default: () => `${uuid()}-${uuid()}-${uuid()}` },
      email_confirmed: { type: Boolean, default: false },
      notified_email_confirmed: { type: Boolean, default: false }
    },
    { collection: 'users' }
  )
);

export default class extends User {
  confirmEmail() {
    this.email_confirmation_token = undefined;
    this.email_confirmed = true;
    return this.save();
  }
}
