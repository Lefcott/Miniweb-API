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
  if (!validate_message(body)) return res.send('OK');
  const user_messages = map_user_message(body);
  const [project, conversation] = await Promise.all([
    Project.findOne({ code: params.project_code }),
    Conversation.find_or_create(params.project_code, user_messages[0].conversation_id, 'line')
  ]);

  if (!project) throw new NotFoundError('project not found');
  if (!project.chatbot.enabled_channels.includes('line'))
    throw new AuthorizationError(`line is not enabled for project ${params.project_code}`);
  res.send('OK');

  user_messages.forEach(async user_message => {
    broadcast_messages(conversation, [user_message]);

    const intent = await Intent.detect_from_text(params.project_code, 'line', user_message.text);
    const messages = await intent.get_random_messages('line', conversation, user_message);

    send_messages(project, conversation, messages);
  });
};
