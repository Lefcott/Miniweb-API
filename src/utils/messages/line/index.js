import axios from 'axios';

import rollbar from '../../rollbar';

import { URL } from './constants';
import { get_text_message } from './text';
import { send_image_message } from './image';
import { send_button_list_message } from './button_list';

export const send_line_messages = async (project, conversation, messages) => {
  const { message_token } = project.chatbot.configuration.line.authentication;
  const headers = { Authorization: `Bearer ${message_token}` };
  const messages_to_send = [];

  for (const message of messages) {
    switch (message.type) {
      case 'text': {
        const text_message = get_text_message(message);
        messages_to_send.push(text_message);
        break;
      }
      case 'image':
        await send_image_message(headers, conversation, message);
        break;
      case 'button_list':
        await send_button_list_message(headers, conversation, message);
        break;
      default:
        rollbar.warn(`invalid line message type\n${JSON.stringify(message, null, 2)}`);
    }
  }

  return axios.post(URL, { to: conversation.id, messages: messages_to_send }, { headers });
};
