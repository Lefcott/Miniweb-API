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
  if (body.type === 'url_verification') return res.send(body.challenge);
  if (!validate_message(body)) return res.send('skipping messages');
  const user_message = map_user_message(body);
  const [project, conversation] = await Promise.all([
    Project.findOne({ code: params.project_code }),
    Conversation.find_or_create(params.project_code, user_message.conversation_id, 'slack')
  ]);

  if (!project) throw new NotFoundError('project not found');
  if (!project.chatbot.enabled_channels.includes('slack'))
    throw new AuthorizationError(`slack is not enabled for project ${params.project_code}`);
  res.send('OK');

  broadcast_messages(conversation, [user_message]);

  const intent = await Intent.detect_from_text(params.project_code, 'slack', user_message.text);
  const messages = await intent.get_random_messages('slack', conversation, user_message);

  send_messages(project, conversation, messages);
};
