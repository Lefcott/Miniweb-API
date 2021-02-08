import axios from 'axios';

export const send_text_message = (url, conversation, message) => {
  const body = {
    messaging_type: 'RESPONSE',
    recipient: { id: conversation.id },
    message: { text: message.text }
  };

  return axios.post(url, body);
};
