import User from '../../models/User';
import Intents from '../../models/Intent';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ session, params, query }, res) => {
  const user = await User.find_from_session(session);

  user.validate_project_ownership({}, params.project_code);

  const intents = await Intents.find({ project_code: params.project_code, channel: query.channel }).sort({
    _id: -1
  });

  res.json(intents);
};
