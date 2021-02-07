import Cart from '../../models/Cart';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ body, params }, res) => {
  const cart = await Cart.create(body, params);

  res.json(cart);
};
