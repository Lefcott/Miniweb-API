const get_text = body => {
  const [data] = body.entry[0].messaging;

  return (
    (data.message && data.message.quick_reply && data.message.quick_reply.payload) ||
    (data.message && data.message.text) ||
    (data.postback && data.postback.payload)
  );
};

export const validate_message = body => !!get_text(body);

export const map_user_message = body => {
  const [data] = body.entry[0].messaging;
  const conversation_id = data.sender.id;
  const text = get_text(body);

  return { conversation_id, type: 'text', text };
};
