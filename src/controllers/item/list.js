import Item from '../../models/Item';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ query }, res) => {
  const { count } = query;
  const items = await Item.search(query);

  if (count) return res.json({ count: items.count });

  res.json(Item.sanitize_items(true, items));
};
