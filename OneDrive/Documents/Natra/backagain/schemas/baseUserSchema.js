  // user.js
  const mongoose = require('mongoose');
  const { Schema } = mongoose;

  // Options for the schema, including the discriminatorKey to allow inheritance,
  // and timestamps to automatically add createdAt and updatedAt fields.
  const options = {
    discriminatorKey: 'role', // This field distinguishes between user types (e.g., Parent, Babysitter, Admin)
    timestamps: true          // Adds createdAt and updatedAt automatically
  };

  // Define the base User schema with common fields.
  const userSchema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: String
    }
  }, options);

  // Create and export the User model.
  const User = mongoose.model('User', userSchema);
  module.exports = User;
