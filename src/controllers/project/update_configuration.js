import Project from '../../models/Project';
import User from '../../models/User';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ session, params, body }, res) => {
  const user = await User.find_from_session(session, params);
  const project = await Project.findOne({ _id: params.project_id });

  if (!project) throw new NotFoundError('project not found');

  user.validate_project_ownership(project);

  await project.update_configuration(body);

  res.status(200).json({ message: 'project confugration updated' });
};
