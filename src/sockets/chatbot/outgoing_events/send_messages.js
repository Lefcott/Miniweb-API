import { socket_io } from '../../../utils/socket_io';
import { NAMESPACE } from '../constants';

export default messages => {
  if (!messages.length) return;
  const [{ conversation_id }] = messages;

  socket_io.of(NAMESPACE).to(conversation_id).emit('new_messages', messages);
};
