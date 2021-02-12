import axios from 'axios';

import { BASE_URL } from './constants';

export const send_text_message = (headers, conversation, message) => {
  const body = {
    channel: conversation.id.split(':')[1],
    text: message.text,
    parse_mode: 'Markdown'
  };

  return axios.post(BASE_URL, body, { headers });
};
