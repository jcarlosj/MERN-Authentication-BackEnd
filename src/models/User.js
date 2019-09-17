const mongoose = require( 'mongoose' ),
      Schema = mongoose .Schema,
      UserSchema;

// Create User Schema
UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Export Schema
module .exports = User = mongoose .model( 'users', UserSchema );