import mongoose from 'mongoose';

const IntentBase = mongoose.model(
  'Intent',
  mongoose.Schema(
    {
      project_code: { type: String, required: true },
      name: { type: String, required: true },
      phrases: [String],
      answers: [
        {
          possible_messages: [
            {
              type: { type: String, required: true }, // text | image
              text: String,
              image_url: String
            }
          ]
        }
      ]
    },
    { collection: 'intents' }
  )
);

export default class Intent extends IntentBase {}