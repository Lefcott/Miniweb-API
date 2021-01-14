import mongoose from 'mongoose';

const { connect } = mongoose;

mongoose.set('useCreateIndex', true);
connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, async error => {
  if (error) return console.error(error);
  console.log('Connected to MongoDB!');
});
