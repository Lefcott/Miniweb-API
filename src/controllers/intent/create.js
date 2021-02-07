import User from '../../models/User';
import Intent from '../../models/Intent';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ session, params, query, body }, res) => {
  const user = await User.find_from_session(session);

  await user.validate_project_ownership({}, params.project_code);

  const intent = new Intent({ project_code: params.project_code, channel: query.channel, ...body });

  await intent.save();

  res.json(intent);
};
