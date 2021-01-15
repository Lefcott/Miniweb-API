import User from '../../models/User';
import Project from '../../models/Project';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ session, params }, res) => {
  const user = await User.find_from_session(session, params);
  const project = await Project.find_by_code(params.project_code);

  user.validate_project_ownership(project);
  const client_models = await project.find_client_models();

  res.status(200).json(client_models);
};
