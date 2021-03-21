import User from '../../models/User';
import ClientModel from '../../models/ClientModel';
import Project from '../../models/Project';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ session, params }, res) => {
  const user = await User.find_from_session(session);
  const project = await Project.find_by_code(params.project_code);

  user.validate_project_ownership(project);
  const client_models = await ClientModel.find({ project_code: params.project_code });

  res.json(client_models);
};
