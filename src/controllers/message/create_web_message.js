import Project from '../../models/Project';
import Conversation from '../../models/Conversation';
import Intent from '../../models/Intent';
import broadcast_messages from '../../sockets/chatbot/outgoing_events/broadcast_messages';
import { send_messages } from '../../utils/messages';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ params, body, query }, res) => {
  const [project, conversation] = await Promise.all([
    Project.find_by_code(params.project_code),
    Conversation.find_or_create(params.project_code, body.conversation_id, body.channel)
  ]);

  project.validate_channel('web');
  send_messages(project, conversation, [body]);

  if (!query.respond) return res.json({ message: 'response was skipped' });

  const intent = await Intent.detect_from_text(params.project_code, 'web', body.text);
  const messages = await intent.get_random_messages('web', conversation, body);

  send_messages(project, conversation, messages);

  res.json({ message: 'message processed successfully' });
};
