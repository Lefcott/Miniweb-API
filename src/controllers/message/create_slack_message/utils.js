export const validate_message = body => {
  if (body.type !== 'event_callback' || body.subtype) return false;
  if (body.event.type !== 'message' || !body.event.text) return false;
  return true;
};

export const map_user_message = body => {
  const { text, user, team } = body.event;
  const conversation_id = `${team}/${user}`;

  return { conversation_id, type: 'text', text };
};
