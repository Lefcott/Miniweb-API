import User from '../../models/User';
import Item from '../../models/Item';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ session, params, body }, res) => {
  const user = await User.find_from_session(session);
  const client_document = await Item.findOne({ _id: params.client_document_id });

  client_document.validate_update(user);

  await client_document.edit(body);

  res.json({ message: `Client document ${client_document._id} updated` });
};
