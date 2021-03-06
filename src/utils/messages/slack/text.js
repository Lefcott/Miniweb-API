import axios from 'axios';

import { BASE_URL } from './constants';

export const send_text_message = (headers, conversation, message) => {
  const body = {
    channel: conversation.id,
    text: message.text
  };

  return axios.post(BASE_URL, body, { headers });
};
