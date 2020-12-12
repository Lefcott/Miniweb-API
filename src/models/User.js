import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';

import { randomCode, hash } from '../utils/passwords';

const User = mongoose.model(
  'User',
  mongoose.Schema(
    {
      name: { type: String, required: true },
      surname: { type: String, required: true },
      phone: String,
      language_code: { type: String, default: 'es' },
      email: { type: String, required: true },
      password: { type: String, required: true },
      email_confirmation_token: { type: String, default: () => `${uuid()}-${uuid()}-${uuid()}` },
      email_confirmed: { type: Boolean, default: false },
      notified_email_confirmed: { type: Boolean, default: false },
      phone_confirmation_code: { type: String, default: () => randomCode(5) },
      phone_confirmed: { type: Boolean, default: false }
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

  confirmPhone() {
    this.phone_confirmation_code = undefined;
    this.phone_confirmed = true;
    return this.save();
  }

  static async getValidationError({ email }) {
    const previousUser = await User.findOne({ email });
    return previousUser && 'A user with that email aleady exists';
  }

  static async register(data) {
    return new User({
      name: data.name,
      surname: data.surname,
      phone: data.phone,
      email: data.email,
      password: await hash(data.password)
    }).save();
  }
}
