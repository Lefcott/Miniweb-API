import User from '../../models/User';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ body, session }, res) => {
  const user = await User.authenticate(body);

  session.user_id = user._id;

  user.makeSecure();

  session.save(() => {
    res.status(200).json([{ user }]);
  });
};
