import User from '../../models/User';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ session, params }, res) => {
  const user = await User.findFromSession(session, params);
  const projects = await user.find_projects();

  res.status(200).json(projects);
};
