/* eslint-disable no-await-in-loop */
import axios from 'axios';

import Intent from '../../../models/Intent';
import Conversation from '../../../models/Conversation';
import Project from '../../../models/Project';
import broadcast_messages from '../../../sockets/chatbot/outgoing_events/broadcast_messages';
import { send_messages } from '../../../utils/messages';

import { validate_message, map_user_message } from './utils';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ params, body }, res) => {
  if (!validate_message(body)) return res.send('skipping messages');
  const user_message = map_user_message(body);
  const [project, conversation] = await Promise.all([
    Project.find_by_code(params.project_code),
    Conversation.find_or_create(params.project_code, user_message.conversation_id, 'telegram')
  ]);

  project.validate_channel('twitter');
  res.send('OK');
  broadcast_messages(conversation, [user_message]);

  const intent = await Intent.detect_from_text(params.project_code, 'telegram', user_message.text);
  const messages = await intent.get_random_messages('telegram', conversation, user_message);

  send_messages(project, conversation, messages);
};
