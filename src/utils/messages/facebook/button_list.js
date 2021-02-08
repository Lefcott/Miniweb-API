import axios from 'axios';

export const send_button_list_message = (url, conversation, message) => {
  const body = {
    messaging_type: 'RESPONSE',
    recipient: { id: conversation.id },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: message.text,
          buttons: message.buttons.map(button => ({
            type: button.type === 'write' ? 'postback' : 'web_url',
            url: button.type === 'write' ? undefined : button.url,
            payload: button.type === 'write' ? button.text : undefined,
            title: button.text
          }))
        }
      }
    }
  };

  return axios.post(url, body);
};
