const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Claim = require('../models/Claim');
const Item = require('../models/Item');

const router = express.Router();

router.use(authMiddleware);

router.post('/', async (req, res) => {
  try {
    const { itemId, proof } = req.body;

    if (!itemId || !proof) {
      return res.status(400).json({ message: 'Item and proof are required' });
    }

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (String(item.postedBy) === String(req.user._id)) {
      return res.status(400).json({ message: 'You cannot claim your own item' });
    }

    const claim = await Claim.create({
      item: item._id,
      claimant: req.user._id,
      proof,
      status: 'CLAIM_PENDING'
    });

    return res.status(201).json(claim);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Claim failed' });
  }
});

router.get('/', async (_req, res) => {
  try {
    const claims = await Claim.find().populate('item').populate('claimant', 'name email');
    return res.json(claims);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Failed to load claims' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id).populate('item');
    if (!claim) return res.status(404).json({ message: 'Claim not found' });

    if (String(claim.item.postedBy) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    claim.status = req.body.status || claim.status;
    await claim.save();

    if (claim.status === 'RETURNED' || claim.status === 'CLAIMED') {
      const item = await Item.findById(claim.item._id);
      if (item) {
        item.status = 'RESOLVED';
        await item.save();
      }
    }

    return res.json(claim);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Claim update failed' });
  }
});

module.exports = router;
