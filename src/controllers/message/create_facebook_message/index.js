/* eslint-disable no-await-in-loop */
import axios from 'axios';

import Intent from '../../../models/Intent';
import Project from '../../../models/Project';

import { get_user_data, get_request_body } from './utils';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ params, body }, res) => {
  const project = await Project.findOne({ code: params.project_code });

  if (!project) throw new NotFoundError('project not found');
  if (!project.chatbot.enabled_channels.includes('facebook'))
    throw new AuthorizationError(`facebook is not enabled for project ${params.project_code}`);
  res.send('OK');

  const intent = await Intent.detect_from_text(params.project_code, 'facebook', body.text);
  const { message_token } = project.chatbot.configuration.facebook.authentication;
  const answers = intent.get_random_answers();
  const { sender_id, text } = get_user_data(body);
  const url = `https://graph.facebook.com/v6.0/me/messages?access_token=${message_token}`;

  for (const answer of answers) {
    const request_body = get_request_body(sender_id, answer);

    if (!request_body) continue;

    await axios.post(url, request_body);
  }
};
