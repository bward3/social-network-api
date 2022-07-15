const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB';
// Wrap Mongoose around local connection to MongoDB
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Export connection 
module.exports = mongoose.connection;
