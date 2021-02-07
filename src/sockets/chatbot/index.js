import Conversation from '../../models/Conversation';
import { socket_io } from '../../utils/socket_io';

socket_io.of('/chatbot').on(
  'connection',
  /** @param {import('socket.io').Socket} socket */
  async socket => {
    const { conversation_id } = socket.handshake.query;

    socket.join(conversation_id);

    socket.on('disconnect', async () => {
      const conversation = await Conversation.find_or_create(conversation_id, 'web');

      conversation.active = false;
      conversation.save();
    });
  }
);
