import User from '../../models/User';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ session, params }, res) => {
  const user = await User.find_from_session(session, params);
  const projects = await user.find_projects();

  await Promise.all(projects.map(project => project.set_configuration_sections()));

  res.status(200).json(projects);
};
