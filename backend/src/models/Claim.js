const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema(
  {
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    claimant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    proof: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['OPEN', 'CLAIM_PENDING', 'RETURNED', 'CLAIMED'],
      default: 'OPEN'
    },
    createdAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

module.exports = mongoose.model('Claim', claimSchema, 'claims');
