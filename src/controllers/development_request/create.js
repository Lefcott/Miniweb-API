import User from '../../models/User';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ body, session, params }, res) => {
  const user = await User.find_from_session(session, params);

  await user.createDevelopmentRequest(body);

  res.status(200).json({ message: 'the development request was saved' });
};
