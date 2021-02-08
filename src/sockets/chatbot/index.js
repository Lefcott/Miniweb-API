import Conversation from '../../models/Conversation';
import { socket_io } from '../../utils/socket_io';

import { NAMESPACE } from './constants';

socket_io.of(NAMESPACE).on(
  'connection',
  /** @param {import('socket.io').Socket} socket */
  async socket => {
    const { project_code, conversation_id } = socket.handshake.query;
    const officer = socket.handshake.query.officer ? JSON.parse(socket.handshake.query.officer) : null;
    let channel = 'web';

    socket.join(conversation_id);

    if (officer) {
      const conversation = await Conversation.findOne({ project_code, id: conversation_id });

      ({ channel } = conversation);
      Conversation.add_officer(conversation, officer);
    }

    socket.on('disconnect', async () => {
      const conversation = await Conversation.findOne({ project_code, id: conversation_id, channel });

      if (!conversation) return;

      if (officer) {
        conversation.officers = conversation.officers.filter(_officer => `${_officer._id}` !== officer._id);
      } else conversation.active = false;

      conversation.save();
    });
  }
);
