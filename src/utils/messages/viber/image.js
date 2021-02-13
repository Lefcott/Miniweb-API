import axios from 'axios';

export const send_image_message = (base_url, conversation, message) => {
  const body = {
    chat_id: conversation.id,
    caption: message.text,
    photo: message.image_url,
    parse_mode: 'Markdown'
  };

  return axios.post(`${base_url}/sendPhoto`, body);
};
