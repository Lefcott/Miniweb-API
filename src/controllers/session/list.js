import User from '../../models/User';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ session }, res) => {
  if (!session.user_id) return res.json([]);
  const user = await User.findOne({ _id: session.user_id });

  if (!user) throw new Error(`could not find user with id ${session.user_id}`);

  user.makeSecure();

  res.json([{ user }]);
};
