import Cart from '../../models/Cart';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ body }, res) => {
  await Cart.validate_project(body);

  const cart = await Cart.create(body);

  res.status(200).json(cart);
};
