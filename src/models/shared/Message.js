import mongoose, { Schema } from 'mongoose';

const Message = new Schema();

Message.add({
  conversation_id: String,
  from: { type: String, default: 'bot' },
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
});

export default Message;
