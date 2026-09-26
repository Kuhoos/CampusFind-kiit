const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['LOST', 'FOUND'], required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    brand: { type: String, default: '' },
    color: { type: String, default: '' },
    image: { type: String, default: '' },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['OPEN', 'MATCHED', 'RESOLVED'],
      default: 'OPEN'
    },
    createdAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

itemSchema.index({ type: 1, category: 1, location: 1, date: 1 });

module.exports = mongoose.model('Item', itemSchema, 'items');
