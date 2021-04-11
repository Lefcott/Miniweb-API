import User from '../../models/User';
import ClientDocument from '../../models/ClientDocument';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ session, params, body }, res) => {
  const user = await User.find_from_session(session);

  await ClientDocument.validate_creation(user, params.project_code, body);

  const client_document = new ClientDocument({ ...body, project_code: params.project_code });

  await client_document.save();

  res.json(client_document.sanitize(true));
};
