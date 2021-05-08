import User from '../../models/User';
import Item from '../../models/Item';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ session, params }, res) => {
  const user = await User.find_from_session(session);

  const item = await Item.findOne({ _id: params.item_id });

  if (!item) return res.json({ message: 'Item already deleted' });

  await item.validate_deletion(user);

  await item.delete();

  res.json({ message: `Item ${item._id} deleted` });
};
