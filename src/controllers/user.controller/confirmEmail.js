import User from '../../models/User';
import env from '../../env.json';

/** @param {import('express').Request} req @param {import('express').Response} res */
export const confirmEmail = async ({ query, session }, res) => {
  const user = await User.findOne({ email_confirmation_token: query.token });

  if (user) {
    await user.confirmEmail();
    session.user_id = user._id;
  }

  res.redirect(env.DASHBOARD_URL);
};
