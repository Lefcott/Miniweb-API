import jwt from 'jsonwebtoken';

import User from '../../models/User';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ params, body, session }, res) => {
  const user = await User.authenticate(params, body);

  session.user_id = user._id;
  session.language_code = user.language_code;
  const token = jwt.sign({ user_id: user._id }, process.env.TOKEN_SECRET);

  user.makeSecure();

  res.json([{ user, token }]);
};
