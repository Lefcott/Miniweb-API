import User from '../../models/User';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ body, session }, res) => {
  const user = await User.authenticate(body);

  session.user_id = user._id;
  session.language_code = user.language_code;

  user.makeSecure();

  res.status(200).json([{ user }]);
};
