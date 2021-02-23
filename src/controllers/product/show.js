import Product from '../../models/Product';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ params }, res) => {
  const product = await Product.find_by_id(params.product_id);

  res.json(product);
};
