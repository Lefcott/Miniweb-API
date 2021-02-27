import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';
import { compare } from 'bcryptjs';

import { randomCode, hash } from '../utils/passwords';

import Project from './Project';

const Field = {
  name: { type: String, required: true },
  code: { type: String, required: true },
  input_type: { type: String, required: true }, // text | number | url | email | phone | file | table
  table_fields: [
    {
      name: { type: String, required: true },
      code: { type: String, required: true },
      input_type: { type: String, required: true } // text | number | url | email | phone | file
    }
  ]
};

const UserBase = mongoose.model(
  'User',
  mongoose.Schema(
    {
      project_code: { type: String, required: true },
      name: String,
      surname: String,
      admin: { type: Boolean, default: false },
      email_confirmation_redirect: String,
      phone: String,
      language_code: { type: String, default: 'es' },
      email: { type: String, required: true },
      username: String,
      password: { type: String, required: true },
      email_confirmation_token: { type: String, default: () => `${uuid()}-${uuid()}-${uuid()}` },
      email_confirmed: { type: Boolean, default: false },
      notified_email_confirmed: { type: Boolean, default: false },
      phone_confirmation_code: { type: String, default: () => randomCode(5) },
      phone_confirmed: { type: Boolean, default: false },
      project_codes: [String],
      table_names: [String],
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
          ],
          fields: [Field]
        }
      ],
      data: {}
    },
    { collection: 'users' }
  )
);

export default class User extends UserBase {
  confirm_email() {
    this.email_confirmed = true;
    this.email_confirmation_token = null;
    this.email_confirmation_redirect = null;
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
        `a development request with name ${development_request.name} already exists for user ${this._id}`,
        { development_request }
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

  makeSecure() {
    this.email_confirmation_token = undefined;
    this.password = undefined;
    this.phone_confirmation_code = undefined;
  }

  validate_project_ownership(project = {}, project_code) {
    if (!this.admin) throw new AuthorizationError(`user ${this._id} is not admin`);
    if (!this.project_codes.includes(project.code) && !this.project_codes.includes(project_code))
      throw new AuthorizationError(`User ${this._id} does not own project with code ${project.code}`, '', {
        project
      });
  }

  find_projects() {
    return Project.find({ code: this.project_codes });
  }

  set_language(body) {
    this.language_code = body.language_code;

    return this.save();
  }

  static is_logged_in(session) {
    return !!session.user_id;
  }

  static async validate_creation(params, { email }) {
    const search = {
      project_code: { $in: [params.project_code, 'all'] },
      email
    };
    const previous_user = await User.findOne(search);

    if (previous_user)
      throw new ValidationError('user with given email aleady exists', 'user_already_exists', {
        previous_user
      });
  }

  static async create(project_code, body) {
    return new User({
      project_code,
      login_type: body.login_type,
      email_confirmation_redirect: body.email_confirmation_redirect,
      email: body.email,
      password: body.password && (await hash(body.password)),
      data: body.data
    }).save();
  }

  static async authenticate(params, body) {
    const user = await User.findOne({
      project_code: { $in: [params.project_code, 'all'] },
      $or: [{ email: body.email.toLowerCase() }, { username: body.email.toLowerCase() }]
    });

    if (!user) throw new AuthenticationError('Invalid email or password');

    const authenticated = await compare(body.password, user.password);

    if (!authenticated) throw new AuthenticationError('Invalid email or password');

    return user;
  }

  static async clearEmailConfirmationNotification(session) {
    const user = await User.findOne({ _id: session.user_id });
    if (!user) return;
    user.notified_email_confirmed = true;
    return user.save();
  }

  static async find_from_session(session) {
    const user = await User.findOne({ _id: session.user_id });

    if (!user) throw new SessionError(`user with id ${session.user_id} was not found`);

    return user;
  }
}
