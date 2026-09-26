const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@kiit\.ac\.in$/i, 'Only KIIT email addresses are allowed']
    },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ['student', 'admin'],
      default: 'student'
    },
    createdAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

module.exports = mongoose.model('User', userSchema, 'users');
