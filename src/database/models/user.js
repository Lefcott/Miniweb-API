import mongoose from 'mongoose';

export default mongoose.model(
  'User',
  mongoose.Schema(
    {
      name: { type: String, required: true },
      surname: String,
      phone: String,
      email: { type: String, required: true },
      password: { type: String, required: true }
    },
    { collection: 'users' }
  )
);
