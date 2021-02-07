import Form from '../../models/Form';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ params }, res) => {
  const form = await Form.findOne({ project_code: params.project_code, code: params.form_code });

  if (!form) throw new NotFoundError('form not found');

  res.json(form);
};
