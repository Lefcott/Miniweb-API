export const validate_message = body => !!(body.event === 'message');

export const map_user_message = body => {
  const { text } = body.message;
  const { id: conversation_id } = body.message.from;

  return { conversation_id, type: 'text', text };
};
