import User from '../../models/User';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ body, session }, res) => {
  if (User.is_logged_in(session)) {
    const user = await User.find_from_session(session);
    await user.set_language(body);
  }

  session.language_code = body.code;

  res.json({ message: 'language updated' });
};
