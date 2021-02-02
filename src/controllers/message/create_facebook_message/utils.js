export const get_user_data = body => {
  const [data] = body.entry[0].messaging;
  const sender_id = data.sender.id;
  const text =
    (data.message && data.message.quick_reply && data.message.quick_reply.payload) ||
    (data.message && data.message.text) ||
    (data.postback && data.postback.payload) ||
    '';

  return { sender_id, text };
};

export const get_request_body = (sender_id, answer) => {
  let message;

  switch (answer.type) {
    case 'text':
      message = { text: answer.Text };
      break;
    case 'button_list':
      message = {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'button',
            text: removeMd(block.Title),
            buttons: block.Buttons.map(Button => ({
              type: Button.Type === 'Write' ? 'postback' : 'web_url',
              url: Button.Type === 'Write' ? undefined : Button.Redirect,
              payload: Button.Type === 'Write' ? Button.Write : undefined,
              title: removeMd(Button.Text)
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
