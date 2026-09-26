const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');
const Item = require('../models/Item');
const Claim = require('../models/Claim');

const router = express.Router();

router.use(authMiddleware);

router.use((req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
});

router.get('/stats', async (_req, res) => {
  try {
    const [users, items, claims] = await Promise.all([
      User.countDocuments(),
      Item.countDocuments(),
      Claim.countDocuments()
    ]);

    const lostItems = await Item.countDocuments({ type: 'LOST' });
    const foundItems = await Item.countDocuments({ type: 'FOUND' });
    const pendingClaims = await Claim.countDocuments({ status: 'CLAIM_PENDING' });
    const returnedItems = await Claim.countDocuments({ status: 'RETURNED' });

    return res.json({
      users,
      lostItems,
      foundItems,
      pendingClaims,
      returnedItems,
      totalItems: items,
      totalClaims: claims
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Admin stats failed' });
  }
});

router.get('/items', async (_req, res) => {
  try {
    const items = await Item.find().populate('postedBy', 'name email').sort({ createdAt: -1 });
    return res.json(items);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Admin item fetch failed' });
  }
});

router.get('/users', async (_req, res) => {
  try {
    const users = await User.find({}, 'name email role createdAt');
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Admin user fetch failed' });
  }
});

router.get('/claims', async (_req, res) => {
  try {
    const claims = await Claim.find().populate('item').populate('claimant', 'name email');
    return res.json(claims);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Admin claim fetch failed' });
  }
});

module.exports = router;
