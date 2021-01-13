import Cart from '../../models/Cart';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ params }, res) => {
  const cart = await Cart.findOne(params);

  if (!cart) throw new NotFoundError('cart not found');

  res.status(200).json(cart);
};
