// routes/journal.js
const express = require('express');
const JournalEntry = require('../models/JournalEntry');
const router = express.Router();

// Middleware: check if logged in
function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).send('Unauthorized');
  }
  next();
}

// Create Entry
router.post('/', requireLogin, async (req, res) => {
  const { title, content, mood, date } = req.body;
  const entry = await JournalEntry.create({
    userId: req.session.userId,
    title,
    content,
    mood,
    date
  });
  res.json(entry);
});

// Get All Entries
router.get('/', requireLogin, async (req, res) => {
  const entries = await JournalEntry.find({ userId: req.session.userId }).sort({ createdAt: -1 });
  res.json(entries);
});

// Update Entry
router.put('/:id', requireLogin, async (req, res) => {
  const { id } = req.params;
  const { title, content, mood, date } = req.body;

  const entry = await JournalEntry.findOneAndUpdate(
    { _id: id, userId: req.session.userId },
    { title, content, mood, date },
    { new: true }
  );

  if (!entry) {
    return res.status(404).send('Entry not found');
  }
  res.json(entry);
});

// Delete Entry
router.delete('/:id', requireLogin, async (req, res) => {
  const { id } = req.params;
  const entry = await JournalEntry.findOneAndDelete({ _id: id, userId: req.session.userId });

  if (!entry) {
    return res.status(404).send('Entry not found');
  }
  res.sendStatus(204);
});

module.exports = router;
