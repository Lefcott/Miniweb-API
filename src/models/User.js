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
      notified_email_confirmed: { type: Boolean, default: false },
      phone_confirmation_code: { type: String, default: () => randomCode(5) },
      phone_confirmed: { type: Boolean, default: false },
      pages: [
        {
          name: { type: String, required: true },
          request_summary: String,
          domain: String,
          status: { type: String, required: true }, // first_payment_pending | first_payment_pending | active | disabled
          checklist_items: [
            {
              code: { type: String, required: true },
              status: { type: String, required: true } // pending | done
            }
          ]
        }
      ]
    },
    { collection: 'users' }
  )
);

export default class extends User {
  confirmEmail() {
    this.email_confirmation_token = null;
    this.email_confirmed = true;
    return this.save();
  }

  confirmPhone() {
    this.phone_confirmation_code = null;
    this.phone_confirmed = true;
    return this.save();
  }

  validatePageCreation(page) {
    const alreadyUsedPage = this.pages.find(({ name }) => name === page.name);
    if (alreadyUsedPage)
      throw new ValidationError(`a page with name ${page.name} already exists for user ${this._id}`);
  }

  createPage(page) {
    this.pages.push({
      name: page.name,
      request_summary: page.request_summary,
      domain: page.domain,
      status: 'first_payment_pending',
      checklist_items: page.checklist_items.map(item => ({ code: item, status: 'pending' }))
    });
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

  static async clearEmailConfirmationNotification(session) {
    const user = await User.findOne({ _id: session.user_id });
    if (!user) return;
    user.notified_email_confirmed = true;
    return user.save();
  }

  static async validateSession(session, params) {
    if (!session.user_id !== params.user_id && false)
      throw new AuthenticationError(
        `user with id ${params.user_id} does not match with id ${session.user_id} wich is stored on the session`
      );
    const user = await this.findOne({ _id: params.user_id });
    if (!user) throw new SessionError(`user with id ${params.user_id} was not found`);
    return user;
  }
}
