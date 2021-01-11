import CartModel from '../../models/CartModel';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ params }, res) => {
  const cart_model = await CartModel.findOne(params);

  if (!cart_model) throw new NotFoundError('cart model not found');

  res.status(200).json(cart_model);
};
