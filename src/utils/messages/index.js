import axios from 'axios';

import broadcast_messages from '../../sockets/chatbot/outgoing_events/broadcast_messages';

import { send_facebook_messages } from './facebook';
import { send_telegram_messages } from './telegram';
import { send_slack_messages } from './slack';
import { send_viber_messages } from './viber';
import { send_line_messages } from './line';

export const send_messages = async (project, conversation, messages) => {
  broadcast_messages(conversation, messages);

  // the broadcast is enough for web channel
  if (conversation.channel === 'web') return;

  switch (conversation.channel) {
    case 'facebook':
      await send_facebook_messages(project, conversation, messages);
      break;
    case 'telegram':
      await send_telegram_messages(project, conversation, messages);
      break;
    case 'slack':
      await send_slack_messages(project, conversation, messages);
      break;
    case 'viber':
      await send_viber_messages(project, conversation, messages);
      break;
    case 'line':
      await send_line_messages(project, conversation, messages);
      break;
    default:
      throw new InternalError(`invalid channel ${conversation.channel}`, '', {
        project,
        conversation,
        messages
      });
  }
};
