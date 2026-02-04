const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  otp: {
    code: String,
    expiresAt: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
