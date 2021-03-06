import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';

import { getSearchAggregations } from '../utils/search';

import Message from './shared/Message';

const ConversationBase = mongoose.model(
  'Conversation',
  mongoose.Schema(
    {
      project_code: { type: String, required: true },
      id: { type: String, required: true },
      channel: { type: String, required: true },
      active: { type: Boolean, default: true },
      officers: [{ name: String }],
      message_count: Number,
      messages: [Message]
    },
    { collection: 'conversations', timestamps: true }
  )
);

export default class Conversation extends ConversationBase {
  sanitize() {
    this.message_count = this.messages.length;
    this.messages = undefined;
  }

  static sanitize_conversations(conversations) {
    return conversations.map(conversation => ({
      ...conversation,
      messages: undefined,
      message_count: this.messages.length
    }));
  }

  static async find_or_create(project_code, id, channel) {
    let conversation = await Conversation.findOne({ project_code, id, channel });

    if (!conversation) {
      conversation = new Conversation({
        project_code,
        id: id || uuid(),
        channel,
        messages: []
      }).save();
    }
    return conversation;
  }

  static async add_messages_to_conversation(conversation, messages = []) {
    return Conversation.updateOne({ _id: conversation._id }, { $push: { messages } });
  }

  static async add_officer(conversation, officer) {
    if (conversation.officers.filter(_officer => _officer._id === officer._id).length) return;

    return Conversation.updateOne({ _id: conversation._id }, { $push: { officers: officer } });
  }

  static search(query) {
    const sort_by = JSON.parse(query.sort_by);
    delete query.sort_by;
    const { page_size, page_number, regex_fields, regex_flags } = query;
    const aggregations = getSearchAggregations(query);

    return Conversation.aggregate(aggregations)
      .skip(page_size * (page_number - 1))
      .limit(page_size)
      .sort({ updatedAt: -1, ...sort_by });
  }
}
