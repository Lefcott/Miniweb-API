import Cart from '../../models/Cart';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ params }, res) => {
  const cart = await Cart.findOne(params);

  if (!cart) return res.status(404).json({ message: 'cart not found' });

  res.status(200).json(cart);
};
