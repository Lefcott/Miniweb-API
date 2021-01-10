import Cart from '../../models/Cart';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ body }, res) => {
  const project = await Cart.get_project(body);

  const cart = await Cart.create(body);

  res.status(200).json(cart);
};
