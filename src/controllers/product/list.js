import Product from '../../models/Product';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ params, query }, res) => {
  const products = await Product.find({ project_code: params.project_code, category: query.category });

  res.json(products);
};
