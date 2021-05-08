import Item from '../../models/Item';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ params }, res) => {
  const item = await Item.findById(params.item_id);

  if (!item) throw new NotFoundError('item not found');

  res.json(item.sanitize(false));
};
