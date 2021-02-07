/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ body, session }, res) => {
  delete session.user_id;

  res.json({ message: 'session deleted' });
};
