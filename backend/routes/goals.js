const express = require('express');
const Goal = require('../models/Goal');
const router = express.Router();

// Middleware: check if logged in
function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).send('Unauthorized');
  }
  next();
}

// Create Goal
router.post('/', requireLogin, async (req, res) => {
  const { title, targetDate, description } = req.body;
  if (!title || !targetDate || !description) {
    return res.status(400).send('All fields (title, targetDate, description) are required');
  }

  try {
    const goal = await Goal.create({
      userId: req.session.userId,
      title,
      targetDate,
      description,
      completed: false, // default to not completed
    });
    res.json(goal);
  } catch (error) {
    console.error('Error creating goal:', error);
    res.status(500).send('Error creating goal');
  }
});

// Get All Goals
router.get('/', requireLogin, async (req, res) => {
  const goals = await Goal.find({ userId: req.session.userId });
  res.json(goals);
});

// Update Goal
router.put('/:id', requireLogin, async (req, res) => {
  const { id } = req.params;
  const { title, targetDate, description, completed } = req.body;

  const goal = await Goal.findOneAndUpdate(
    { _id: id, userId: req.session.userId },
    { title, targetDate, description, completed },
    { new: true }
  );

  if (!goal) {
    return res.status(404).send('Goal not found');
  }
  res.json(goal);
});

// Delete Goal
router.delete('/:id', requireLogin, async (req, res) => {
  const { id } = req.params;
  const goal = await Goal.findOneAndDelete({ _id: id, userId: req.session.userId });

  if (!goal) {
    return res.status(404).send('Goal not found');
  }
  res.sendStatus(204);
});

module.exports = router;
