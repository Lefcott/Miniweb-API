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
