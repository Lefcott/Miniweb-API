import axios from 'axios';

export const send_image_message = (url, conversation, message) => {
  const body = {
    recipient: { id: conversation.id },
    message: {
      attachment: {
        type: 'image',
        payload: { url: message.image_url, is_reusable: true }
      }
    }
  };

  return axios.post(url, body);
};
