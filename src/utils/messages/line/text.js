import axios from 'axios';

import { URL } from './constants';

export const send_text_message = (headers, conversation, message) => {
  const body = {
    to: conversation.id,
    type: 'text',
    text: message.text
  };

  return axios.post(URL, body, { headers });
};
