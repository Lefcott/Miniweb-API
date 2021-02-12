import axios from 'axios';

export const send_text_message = (base_url, conversation, message) => {
  const body = {
    chat_id: conversation.id,
    text: message.text,
    parse_mode: 'Markdown'
  };

  return axios.post(`${base_url}/sendMessage`, body);
};
