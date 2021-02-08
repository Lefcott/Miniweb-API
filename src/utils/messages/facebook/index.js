import axios from 'axios';

import rollbar from '../../rollbar';

import { send_text_message } from './text';
import { send_image_message } from './image';
import { send_button_list_message } from './button_list';

export const send_facebook_messages = async (project, conversation, messages) => {
  const { message_token } = project.chatbot.configuration.facebook.authentication;
  const url = `https://graph.facebook.com/v6.0/me/messages?access_token=${message_token}`;

  for (const message of messages) {
    switch (message.type) {
      case 'text':
        await send_text_message(url, conversation, message);
        break;
      case 'image':
        await send_image_message(url, conversation, message);
        break;
      case 'button_list':
        await send_button_list_message(url, conversation, message);
        break;
      default:
        rollbar.warn(`invalid facebook message type\n${JSON.stringify(message, null, 2)}`);
    }
  }
};
