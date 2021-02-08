import { socket_io } from '../../../utils/socket_io';
import Conversation from '../../../models/Conversation';
import { NAMESPACE } from '../constants';

export default (conversation, messages) => {
  if (!messages.length) return;
  const [{ conversation_id }] = messages;

  socket_io.of(NAMESPACE).to(conversation_id).emit('new_messages', messages);
  Conversation.add_messages_to_conversation(conversation, messages);
};
