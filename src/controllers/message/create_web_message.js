import Intent from '../../models/Intent';
import send_messages from '../../sockets/chatbot/outgoing_events/send_messages';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ params, body, query }, res) => {
  send_messages([body]);

  if (!query.respond) return res.json({ message: 'response was skipped' });

  const intent = await Intent.detect_from_text(params.project_code, 'web', body.conversation_id, body.text);
  const answers = intent.get_random_answers('web', body);

  send_messages(answers);

  res.json(answers);
};
