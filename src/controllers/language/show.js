import User from '../../models/User';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ session }, res) => {
  const code = session.language_code || 'es';

  res.json({ code });
};
