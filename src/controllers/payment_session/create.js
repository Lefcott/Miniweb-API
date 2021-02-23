import Stripe from 'stripe';

import FormResponse from '../../models/FormResponse';
import Product from '../../models/Product';
import Project from '../../models/Project';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ body, params }, res) => {
  const product = await Product.find_by_id(params.product_id);
  const project = await Project.find_by_code(product.project_code);

  const stripe = new Stripe(project.ecommerce.stripe.secret_key);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: { name: body.product_name, images: product.images },
          unit_amount: product.price
        },
        quantity: 1
      }
    ],
    mode: 'payment',
    success_url: body.success_url,
    cancel_url: body.cancel_url
  });
  res.json({ id: session.id });
};
