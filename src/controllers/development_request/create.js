import User from '../../models/User';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ body, session, params }, res) => {
  const user = await User.find_from_session(session);

  await user.createDevelopmentRequest(body);

  res.json({ message: 'the development request was saved' });
};
