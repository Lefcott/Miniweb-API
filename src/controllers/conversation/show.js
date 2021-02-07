import Conversation from '../../models/Conversation';
import User from '../../models/User';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ session, params }, res) => {
  const user = await User.find_from_session(session);

  user.validate_project_ownership({}, params.project_code);

  const conversation = await Conversation.findById(params.conversation_id);

  if (!conversation) throw new NotFoundError('conversation not found');

  res.json(conversation);
};
