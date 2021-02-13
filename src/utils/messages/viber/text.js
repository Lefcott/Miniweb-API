import axios from 'axios';

import { URL } from './constants';

export const send_text_message = (headers, sender, conversation, message) => {
  const body = {
    receiver: conversation.id,
    sender,
    type: 'text',
    text: message.text
  };

  return axios.post(URL, body, { headers });
};
