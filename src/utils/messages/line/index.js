import axios from 'axios';

import rollbar from '../../rollbar';

import { send_text_message } from './text';
import { send_image_message } from './image';
import { send_button_list_message } from './button_list';

export const send_line_messages = async (project, conversation, messages) => {
  const { message_token } = project.chatbot.configuration.viber.authentication;
  const headers = { Authorization: `Bearer ${message_token}` };

  for (const message of messages) {
    switch (message.type) {
      case 'text':
        await send_text_message(headers, conversation, message);
        break;
      case 'image':
        await send_image_message(headers, conversation, message);
        break;
      case 'button_list':
        await send_button_list_message(headers, conversation, message);
        break;
      default:
        rollbar.warn(`invalid viber message type\n${JSON.stringify(message, null, 2)}`);
    }
  }
};
