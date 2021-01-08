import User from '../../models/User';
import ClientDocument from '../../models/ClientDocument';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ session, params }, res) => {
  const user = await User.validateSession(session, params);

  const client_document = await ClientDocument.findOne({ _id: params.client_document_id });

  await user.validateClientDocumentOwnership(client_document);

  await client_document.delete();

  res.status(200).json({ message: `Client document ${client_document._id} deleted` });
};
