import Project from '../../models/Project';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ params, query }, res) => {
  const { 'hub.challenge': challenge, 'hub.verify_token': token } = query;
  const project = await Project.find_by_code(params.project_code);

  if (project.chatbot.configuration.facebook.authentication.webhook_token !== token)
    throw new AuthorizationError('facebook token does not match');

  res.send(challenge);
};
