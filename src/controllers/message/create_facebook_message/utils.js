export const get_user_data = body => {
  const [data] = body.entry[0].messaging;
  const sender_id = data.sender.id;
  const text = data.message?.quick_reply?.payload || data.message?.text || data.postback?.payload || '';

  return { sender_id, text };
};

export const get_request_body = (sender_id, answer) => {
  let message;

  switch (answer.type) {
    case 'text':
      message = { text: answer.text };
      break;
    case 'button_list':
      message = {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'button',
            text: answer.text,
            buttons: answer.buttons.map(button => ({
              type: button.type === 'write' ? 'postback' : 'web_url',
              url: button.type === 'write' ? undefined : button.url,
              payload: button.type === 'write' ? button.text : undefined,
              title: button.text
            }))
          }
        }
      };
      break;
    case 'image':
      message = {
        attachment: {
          type: 'image',
          payload: {
            url: answer.image_url,
            is_reusable: true
          }
        }
      };
      break;
    default:
      return null;
  }

  return { messaging_type: 'RESPONSE', recipient: { id: sender_id }, message };
};
