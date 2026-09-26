const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema(
  {
    lostItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    foundItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    categoryScore: { type: Number, default: 0 },
    keywordScore: { type: Number, default: 0 },
    locationScore: { type: Number, default: 0 },
    dateScore: { type: Number, default: 0 },
    totalScore: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

matchSchema.index({ lostItem: 1, foundItem: 1 }, { unique: true });

module.exports = mongoose.model('Match', matchSchema, 'matches');
