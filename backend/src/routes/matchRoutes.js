const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Item = require('../models/Item');
const Match = require('../models/Match');
const { computeMatchScore } = require('../services/matchingService');

const router = express.Router();

router.use(authMiddleware);

router.get('/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    const sourceItem = await Item.findById(itemId);

    if (!sourceItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const targetItems = await Item.find({
      _id: { $ne: sourceItem._id },
      type: sourceItem.type === 'LOST' ? 'FOUND' : 'LOST'
    });

    const matches = [];

    for (const target of targetItems) {
      const score = computeMatchScore(sourceItem.toObject(), target.toObject());
      if (score.totalScore >= 40) {
        const savedMatch = await Match.findOneAndUpdate(
          { lostItem: sourceItem.type === 'LOST' ? sourceItem._id : target._id, foundItem: sourceItem.type === 'LOST' ? target._id : sourceItem._id },
          {
            lostItem: sourceItem.type === 'LOST' ? sourceItem._id : target._id,
            foundItem: sourceItem.type === 'LOST' ? target._id : sourceItem._id,
            ...score
          },
          { upsert: true, new: true }
        );
        matches.push({ item: target._id, score: savedMatch.totalScore, details: savedMatch });
      }
    }

    return res.json(matches.sort((a, b) => b.score - a.score));
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Match lookup failed' });
  }
});

module.exports = router;
