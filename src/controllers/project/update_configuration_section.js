import Project from '../../models/Project';
import User from '../../models/User';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ session, params, body }, res) => {
  const user = await User.find_from_session(session);
  const project = await Project.findOne({ _id: params.project_id });

  if (!project) throw new NotFoundError('project not found');

  user.validate_project_ownership(project);

  await project.update_configuration({ ...project.configuration, [params.form_code]: body });

  res.json(project.configuration[params.form_code]);
};
