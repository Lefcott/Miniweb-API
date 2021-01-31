import User from '../../models/User';
import Intent from '../../models/Intent';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ session, params }, res) => {
  const user = await User.find_from_session(session);

  const intent = await Intent.findById(params.intent_id);

  await user.validate_project_ownership({}, intent.project_code);

  const result = await intent.delete();

  res.status(200).json(result);
};
