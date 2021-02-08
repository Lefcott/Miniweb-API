/* eslint-disable no-await-in-loop */
import axios from 'axios';

import Intent from '../../../models/Intent';
import Project from '../../../models/Project';

import { map_user_message, get_request_body } from './utils';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ params, body }, res) => {
  const project = await Project.findOne({ code: params.project_code });

  if (!project) throw new NotFoundError('project not found');
  if (!project.chatbot.enabled_channels.includes('facebook'))
    throw new AuthorizationError(`facebook is not enabled for project ${params.project_code}`);
  res.send('OK');

  const user_message = map_user_message(body);
  const { message_token } = project.chatbot.configuration.facebook.authentication;
  const url = `https://graph.facebook.com/v6.0/me/messages?access_token=${message_token}`;
  const intent = await Intent.detect_from_text(params.project_code, 'facebook', user_message.text);
  const answers = await intent.get_random_answers('facebook', user_message);

  for (const answer of answers) {
    const request_body = get_request_body(user_message.conversation_id, answer);

    if (!request_body) continue;

    await axios.post(url, request_body);
  }
};
