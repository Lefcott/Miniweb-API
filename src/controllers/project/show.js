import Project from '../../models/Project';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ params }, res) => {
  const project = await Project.findOne(params);

  if (!project) return res.status(404).json({ message: 'project not found' });

  res.status(200).json(project);
};
