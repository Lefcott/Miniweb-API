import Conversation from '../../models/Conversation';
import User from '../../models/User';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ session, params, query }, res) => {
  const user = await User.find_from_session(session);

  user.validate_project_ownership({}, params.project_code);

  const conversations = await Conversation.search(query);

  conversations.map(conversation => conversation.serialize());

  res.json(conversations);
};
