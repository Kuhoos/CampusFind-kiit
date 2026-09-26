const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Item = require('../models/Item');

const router = express.Router();

router.use(authMiddleware);

router.post('/', async (req, res) => {
  try {
    const { type, title, description, category, location, date, brand, color, image } = req.body;

    if (!title || !description || !category || !location || !date) {
      return res.status(400).json({ message: 'Missing required item fields' });
    }

    const item = await Item.create({
      type,
      title,
      description,
      category,
      location,
      date,
      brand: brand || '',
      color: color || '',
      image: image || '',
      postedBy: req.user._id
    });

    return res.status(201).json(item);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Item creation failed' });
  }
});

router.get('/', async (req, res) => {
  try {
    const filter = {};

    if (req.query.type) filter.type = req.query.type;
    if (req.query.category) filter.category = req.query.category;
    if (req.query.location) filter.location = { $regex: req.query.location, $options: 'i' };

    const items = await Item.find(filter).populate('postedBy', 'name email').sort({ createdAt: -1 });
    return res.json(items);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Fetch failed' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('postedBy', 'name email');
    if (!item) return res.status(404).json({ message: 'Item not found' });
    return res.json(item);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Fetch failed' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    if (String(item.postedBy) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    Object.assign(item, req.body);
    await item.save();
    return res.json(item);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Update failed' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    if (String(item.postedBy) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await item.deleteOne();
    return res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Delete failed' });
  }
});

module.exports = router;
