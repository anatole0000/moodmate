const express = require('express');
const Habit = require('../models/Habit');
const router = express.Router();

// Middleware: check if logged in
function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).send('Unauthorized');
  }
  next();
}

// Create Habit
router.post('/', requireLogin, async (req, res) => {
  const { name, frequency, description } = req.body;

console.log('Received data:', req.body);
try {
  const habit = await Habit.create({
    userId: req.session.userId,
    name,
    frequency,
    description,
    completed: false, // default to not completed
  });
  res.json(habit);
} catch (error) {
  console.error('Error creating habit:', error); // Log error if any
  res.status(500).json({ message: 'Failed to create habit', error });
}
});

// Get All Habits
router.get('/', requireLogin, async (req, res) => {
  const habits = await Habit.find({ userId: req.session.userId });
  res.json(habits);
});

// Update Habit
router.put('/:id', requireLogin, async (req, res) => {
  const { id } = req.params;
  const { name, frequency, description, completed } = req.body;

  const habit = await Habit.findOneAndUpdate(
    { _id: id, userId: req.session.userId },
    { name, frequency, description, completed },
    { new: true }
  );

  if (!habit) {
    return res.status(404).send('Habit not found');
  }
  res.json(habit);
});

// Delete Habit
router.delete('/:id', requireLogin, async (req, res) => {
  const { id } = req.params;
  const habit = await Habit.findOneAndDelete({ _id: id, userId: req.session.userId });

  if (!habit) {
    return res.status(404).send('Habit not found');
  }
  res.sendStatus(204);
});

module.exports = router;
