import Project from '../../models/Project';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ params }, res) => {
  const project = await Project.findOne({ code: params.project_code });

  if (!project) throw new NotFoundError('project not found');

  res.status(200).json(project);
};
