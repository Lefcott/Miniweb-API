import User from '../../models/User';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ query, session }, res) => {
  const user = await User.findOne({ email_confirmation_token: query.token });

  if (user) {
    await user.confirm_email();
    session.user_id = user._id;
  }

  res.redirect(user.email_confirmation_redirect);
};
