import mongoose from 'mongoose';

import Message from '../shared/Message';
import Conversation from '../Conversation';

import { set_scores, get_max_score_intent } from './utils';

const IntentBase = mongoose.model(
  'Intent',
  mongoose.Schema(
    {
      project_code: { type: String, required: true },
      name: { type: String, required: true },
      channel: String,
      phrases: [String],
      answers: [
        {
          possible_messages: [Message]
        }
      ]
    },
    { collection: 'intents' }
  )
);

export default class Intent extends IntentBase {
  update(body) {
    Object.keys(body).forEach(key => {
      this[key] = body[key];
    });

    return this.save();
  }

  async get_random_answers(channel, user_message) {
    const { conversation_id } = user_message;
    const bot_messages = this.answers.map(answer => {
      const random_index = Math.floor(Math.random() * answer.possible_messages.length);
      const random_ansswer = answer.possible_messages[random_index];

      random_ansswer.conversation_id = user_message.conversation_id;

      return random_ansswer;
    });
    const conversation = await Conversation.find_or_create(conversation_id, channel);

    if (conversation.officers.length) {
      Conversation.add_messages_to_conversation(channel, [user_message]);
      return [];
    }

    Conversation.add_messages_to_conversation(channel, [user_message, ...bot_messages]);

    return bot_messages;
  }

  static async detect_from_text(project_code, channel, conversation_id, text) {
    const intents = await Intent.find({ project_code, channel });

    set_scores(intents, text);

    const choosen_intent = get_max_score_intent(intents);

    if (!choosen_intent)
      throw new Error(`intent not found, text: ${text}, channel: ${channel}, project code: ${project_code}`);

    return choosen_intent;
  }
}
