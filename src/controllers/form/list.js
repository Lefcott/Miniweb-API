import Form from '../../models/Form';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ params, query }, res) => {
  const forms = await Form.find({ project_code: params.project_code, ...query });

  res.json(forms);
};
