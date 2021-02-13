import axios from 'axios';

import { URL } from './constants';

export const send_image_message = (headers, sender, conversation, message) => {
  const body = {
    receiver: conversation.id,
    sender,
    type: 'picture',
    text: message.text,
    media: message.image_url
  };

  return axios.post(URL, body, { headers });
};
