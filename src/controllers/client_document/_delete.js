import User from '../../models/User';
import Item from '../../models/Item';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ session, params }, res) => {
  const user = await User.find_from_session(session);

  const client_document = await Item.findOne({ _id: params.client_document_id });

  if (!client_document) return res.json({ message: 'Client document already deleted' });

  await client_document.validate_deletion(user);

  await client_document.delete();

  res.json({ message: `Client document ${client_document._id} deleted` });
};
