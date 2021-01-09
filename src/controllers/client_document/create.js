import User from '../../models/User';
import ClientDocument from '../../models/ClientDocument';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ session, params, body }, res) => {
  const user = await User.findFromSession(session, params);

  const client_document = new ClientDocument(body);

  user.validateClientDocumentOwnership(client_document);

  await client_document.save();

  res.status(200).json(client_document.serialize());
};
