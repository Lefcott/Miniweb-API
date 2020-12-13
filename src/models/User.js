import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';
import { compare } from 'bcryptjs';

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
    return previousUser && { error: 'A user with that email aleady exists', code: 'email_already_used' };
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

  static async authenticate({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) throw new AuthenticationError('Invalid email or password');
    const authenticated = await compare(password, user.password);
    if (!authenticated) throw new AuthenticationError('Invalid email or password');
    return user;
  }
}
