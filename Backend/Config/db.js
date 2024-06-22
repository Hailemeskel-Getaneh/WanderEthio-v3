const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://wander:<Haile1221.com>@wandercluster.dpfbq9j.mongodb.net/', {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/wanderEthioDatabase', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
