import Item from '../../models/Item';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ query }, res) => {
  const distinct_object = await Item.get_distinct_object(query);

  res.send(distinct_object);
};
