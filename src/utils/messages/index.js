import axios from 'axios';

import broadcast_messages from '../../sockets/chatbot/outgoing_events/broadcast_messages';

import { send_facebook_messages } from './facebook';

export const send_messages = async (project, conversation, messages) => {
  broadcast_messages(conversation, messages);

  // the broadcast is enough for web channel
  if (conversation.channel === 'web') return;

  switch (conversation.channel) {
    case 'facebook':
      await send_facebook_messages(project, conversation, messages);
      break;
    default:
      throw new InternalError(`invalid channel ${conversation.channel}`, { project, conversation, messages });
  }
};
