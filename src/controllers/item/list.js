import Item from '../../models/Item';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ query, params }, res) => {
  const { count } = query;
  query.project_code = params.project_code;
  const items = await Item.search(query);

  if (count) return res.json({ count: (items[0] && items[0].count) || 0 });

  res.json(Item.sanitize_items(true, items));
};
