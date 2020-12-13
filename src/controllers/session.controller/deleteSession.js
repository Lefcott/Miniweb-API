/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ body, session }, res) => {
  delete session.user_id;

  res.status(200).json({ message: 'session deleted' });
};
