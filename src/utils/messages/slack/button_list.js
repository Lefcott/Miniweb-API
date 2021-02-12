import axios from 'axios';

export const send_button_list_message = (base_url, conversation, message) => {
  const buttons = message.buttons.filter(button => ['write'].includes(button.type));

  const body = {
    chat_id: conversation.id,
    text: message.text,
    parse_mode: 'Markdown',
    reply_markup: {
      keyboard: buttons.map(button => ({ text: button.text })),
      one_time_keyboard: true
    }
  };

  return axios.post(`${base_url}/sendMessage`, body);
};
