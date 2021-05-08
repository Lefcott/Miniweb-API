import User from '../../models/User';
import Item from '../../models/Item';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ session, params, body }, res) => {
  const user = await User.find_from_session(session);

  await Item.validate_creation(user, params.project_code, body);

  const item = new Item({ ...body, project_code: params.project_code });

  await item.save();

  res.json(item.sanitize(true));
};
