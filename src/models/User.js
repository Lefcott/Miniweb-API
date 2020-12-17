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
      development_requests: [
        {
          name: { type: String, required: true },
          summary: String,
          domain: String,
          status: {
            // first_payment_pending | development_pending | second_payment_pending | active | disabled
            type: String,
            required: true
          },
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

  validateDevelopmentRequestCreation(development_request) {
    const alreadySavedRequest = this.development_requests.find(
      ({ name }) => name === development_request.name
    );
    if (alreadySavedRequest)
      throw new ValidationError(
        `a development request with name ${development_request.name} already exists for user ${this._id}`
      );
  }

  createDevelopmentRequest(development_request) {
    this.development_requests.push({
      name: development_request.name,
      summary: development_request.summary,
      domain: development_request.domain,
      status: 'first_payment_pending',
      checklist_items: development_request.checklist_items.map(item => ({ code: item, status: 'pending' }))
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
    if (!session.user_id !== params.user_id)
      throw new AuthenticationError(
        `user with id ${params.user_id} does not match with id ${session.user_id} wich is stored on the session`
      );
    const user = await this.findOne({ _id: params.user_id });
    if (!user) throw new SessionError(`user with id ${params.user_id} was not found`);
    return user;
  }
}
