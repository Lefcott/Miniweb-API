import mongoose from 'mongoose';

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
          possible_messages: [
            {
              type: { type: String, required: true }, // text | image | button_list
              text: String,
              image_url: String,
              buttons: [
                {
                  type: String, // write | url
                  text: String,
                  url: String
                }
              ]
            }
          ]
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

  get_random_answers() {
    return this.answers.map(answer => {
      const random_index = Math.floor(Math.random() * answer.possible_messages.length);

      return answer.possible_messages[random_index];
    });
  }

  static async detect_from_text(project_code, channel, text) {
    const intents = await Intent.find({ project_code, channel });

    set_scores(intents, text);

    const choosen_intent = get_max_score_intent(intents);

    if (!choosen_intent)
      throw new Error(`intent not found, text: ${text}, channel: ${channel}, project code: ${project_code}`);

    return choosen_intent;
  }
}
