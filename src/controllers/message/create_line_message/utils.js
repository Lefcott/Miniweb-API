const get_message_events = events =>
  events.filter(
    ({ type, source, message }) => type === 'message' && source.type === 'user' && message.type === 'text'
  );

export const validate_message = body => !!get_message_events(body.events).length;

export const map_user_messages = body => {
  const events = get_message_events(body.events);

  return events.map(event => {
    const { text } = event.message;
    const { userId: conversation_id } = event.source;

    return { conversation_id, type: 'text', text };
  });
};
