import mongoose from 'mongoose';

import env from './env.json';

const { connect } = mongoose;

mongoose.set('useCreateIndex', true);
connect(env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, async error => {
  if (error) return console.error(error);
  console.log('Connected to MongoDB!');
});
