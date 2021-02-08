/* eslint-disable no-await-in-loop */
import axios from 'axios';

import Intent from '../../../models/Intent';
import Conversation from '../../../models/Conversation';
import Project from '../../../models/Project';
import broadcast_messages from '../../../sockets/chatbot/outgoing_events/broadcast_messages';
import { send_messages } from '../../../utils/messages';

import { map_user_message, get_request_body } from './utils';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ params, body }, res) => {
  const user_message = map_user_message(body);
  const [project, conversation] = await Promise.all([
    Project.findOne({ code: params.project_code }),
    Conversation.find_or_create(params.project_code, user_message.conversation_id, 'facebook')
  ]);

  if (!project) throw new NotFoundError('project not found');
  if (!project.chatbot.enabled_channels.includes('facebook'))
    throw new AuthorizationError(`facebook is not enabled for project ${params.project_code}`);
  res.send('OK');

  log('user_message', user_message);
  broadcast_messages(conversation, [user_message]);

  const { message_token } = project.chatbot.configuration.facebook.authentication;
  const url = `https://graph.facebook.com/v6.0/me/messages?access_token=${message_token}`;
  const intent = await Intent.detect_from_text(params.project_code, 'facebook', user_message.text);
  const messages = await intent.get_random_messages('facebook', conversation, user_message);

  send_messages(project, conversation, messages);
};
