import User from '../../models/User';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async (req, res) => {
  await User.clearEmailConfirmationNotification(req.session);
  res.json({ message: 'notification cleared' });
};
