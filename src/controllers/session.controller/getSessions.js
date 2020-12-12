import User from '../../models/User';

/** @param {import('express').Request} req @param {import('express').Response} res */
export const getSessions = async ({ session }, res) => {
  if (!session.user_id) return res.status(200).json([]);
  const user = await User.findOne({ _id: session.user_id });

  if (!user) throw new Error(`could not find user with id ${session.user_id}`);

  res.status(200).json([{ user }]);
};
