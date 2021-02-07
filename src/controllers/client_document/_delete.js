import User from '../../models/User';
import ClientDocument from '../../models/ClientDocument';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ session, params }, res) => {
  const user = await User.find_from_session(session);

  const client_document = await ClientDocument.findOne({ _id: params.client_document_id });

  if (!client_document) res.json({ message: 'Client document already deleted' });

  await user.validate_client_document_ownership(client_document);

  await client_document.delete();

  res.json({ message: `Client document ${client_document._id} deleted` });
};
