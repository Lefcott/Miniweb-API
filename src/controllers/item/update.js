import User from '../../models/User';
import Item from '../../models/Item';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ session, params, body }, res) => {
  const user = await User.find_from_session(session);
  const item = await Item.findOne({ _id: params.item_id });

  item.validate_update(user);

  await item.edit(body);

  res.json({ message: `Item ${item._id} updated` });
};
