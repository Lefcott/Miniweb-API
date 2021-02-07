import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';

import { getSearchQuery } from '../utils/search';

import Message from './shared/Message';

const ConversationBase = mongoose.model(
  'Conversation',
  mongoose.Schema(
    {
      id: { type: String, required: true },
      channel: { type: String, required: true },
      active: { type: Boolean, default: true },
      message_count: Number,
      messages: [Message],
      createdAt: { type: Date, default: Date.now }
    },
    { collection: 'conversations' }
  )
);

export default class Conversation extends ConversationBase {
  serialize() {
    this.message_count = this.messages.length;
    this.messages = undefined;
  }

  static async find_or_create(id, channel) {
    let conversation = await Conversation.findOne({ id });

    if (!conversation) {
      conversation = new Conversation({
        id: id || uuid(),
        channel,
        messages: []
      });
    }
    return conversation;
  }

  static async add_messages_to_conversation(channel, messages = []) {
    const [{ conversation_id }] = messages;
    const conversation = await this.find_or_create(conversation_id, channel);

    conversation.messages.push(...messages);

    return conversation.save();
  }

  static search(query) {
    const { page_size, page_number, regex_fields, regex_flags } = query;
    const searchQuery = getSearchQuery(query);

    return Conversation.find(searchQuery)
      .skip(page_size * (page_number - 1))
      .limit(page_size)
      .sort({ _id: -1 });
  }
}