import BasePrice from '../../models/BasePrice';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ query }, res) => {
  const base_prices = await BasePrice.find(query);

  res.status(200).json(base_prices);
};
