import User from '../../models/User';
import Form from '../../models/Form';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ session, params, body }, res) => {
  const user = await User.find_from_session(session);
  const form = await Form.findOne({ code: params.form_code });

  user.validate_project_ownership({}, params.project_code);

  if (!form) throw new NotFoundError('form not found');

  const result = await form.update(body);

  res.json(result);
};
