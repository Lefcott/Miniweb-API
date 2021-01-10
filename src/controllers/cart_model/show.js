import CartModel from '../../models/CartModel';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ params }, res) => {
  const cart_model = await CartModel.findOne(params);

  if (!cart_model) return res.status(404).json({ message: 'cart model not found' });

  res.status(200).json(cart_model);
};
