import Project from '../../models/Project';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ params, query }, res) => {
  const { 'hub.challenge': challenge, 'hub.verify_token': token } = query;
  const project = await Project.findOne({ code: params.project_code });

  if (!project) throw new NotFoundError('project not found');

  res.send(challenge);
};
