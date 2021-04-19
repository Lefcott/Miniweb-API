import Project from '../../models/Project';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ params, query }, res) => {
  const search = {
    ...(!query.search_by_project_token ? { code: params.project_code_or_token } : {}),
    ...(query.search_by_project_token ? { token: params.project_code_or_token } : {})
  };
  const project = await Project.findOne(search);

  if (!project) throw new NotFoundError('project not found');

  if (query.fill_forms) await project.set_configuration_sections();

  res.json(project);
};
