const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Message = require('../models/Message');

const router = express.Router();

router.use(authMiddleware);

router.post('/', async (req, res) => {
  try {
    const { receiver, item, message } = req.body;

    if (!receiver || !message) {
      return res.status(400).json({ message: 'Receiver and message are required' });
    }

    const created = await Message.create({
      sender: req.user._id,
      receiver,
      item,
      message
    });

    return res.status(201).json(created);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Message send failed' });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.params.userId, receiver: req.user._id },
        { sender: req.user._id, receiver: req.params.userId }
      ]
    }).sort({ createdAt: 1 });

    return res.json(messages);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Message fetch failed' });
  }
});

module.exports = router;
