import Conversation from '../../models/Conversation';
import { socket_io } from '../../utils/socket_io';

import { NAMESPACE } from './constants';

socket_io.of(NAMESPACE).on(
  'connection',
  /** @param {import('socket.io').Socket} socket */
  async socket => {
    const { conversation_id } = socket.handshake.query;
    const officer = socket.handshake.query.officer ? JSON.parse(socket.handshake.query.officer) : null;

    socket.join(conversation_id);

    if (officer) Conversation.add_officer(conversation_id, officer);

    socket.on('disconnect', async () => {
      const conversation = await Conversation.find_or_create(conversation_id, 'web');

      if (officer) {
        conversation.officers = conversation.officers.filter(_officer => `${_officer._id}` !== officer._id);
      } else conversation.active = false;

      conversation.save();
    });
  }
);
