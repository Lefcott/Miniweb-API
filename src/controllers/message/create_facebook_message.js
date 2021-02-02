import Intent from '../../models/Intent';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ params, body }, res) => {
  const intent = await Intent.detect_from_text(params.project_code, 'web', body.text);
  const answers = intent.get_random_answers();

  res.json(answers);
};
