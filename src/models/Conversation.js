import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';

import Message from './shared/Message';

const ConversationBase = mongoose.model(
  'Conversation',
  mongoose.Schema(
    {
      id: { type: String, required: true },
      channel: { type: String, required: true },
      messages: [Message],
      createdAt: { type: Date, default: Date.now }
    },
    { collection: 'conversations' }
  )
);

export default class Conversation extends ConversationBase {
  static async add_messages_to_conversation(channel, messages = []) {
    const [{ conversation_id }] = messages;
    let conversation = await Conversation.findOne({ id: conversation_id });

    if (!conversation) {
      conversation = new Conversation({
        id: conversation_id || uuid(),
        channel,
        messages: []
      });
    }

    conversation.messages.push(...messages);

    return conversation.save();
  }
}
