import FormResponse from '../../models/FormResponse';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ body, params }, res) => {
  const result = await FormResponse.create(body, params);

  res.status(200).json(result);
};
