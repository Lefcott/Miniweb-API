export const validate_message = body => body.event === 'message' && body.message.type === 'text';

export const map_user_message = body => {
  const { text } = body.message;
  const { id: conversation_id } = body.sender;

  return { conversation_id, type: 'text', text };
};
