import Form from '../../models/Form';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ params }, res) => {
  const form = await Form.findOne({ code: params.form_code });

  if (!form) throw new NotFoundError('form not found');

  res.status(200).json(form);
};
