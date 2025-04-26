const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const cors = require('cors');
const journalRoutes = require('./routes/journal');
const habitRoutes = require('./routes/habits');  // Import habit routes
const goalRoutes = require('./routes/goals');    // Import goal routes

const app = express();
app.use(express.json()); // for parsing JSON requests


const corsOptions = {
    origin: 'http://localhost:3000', // Frontend origin
    credentials: true, // Allow cookies or credentials to be sent with requests
  };

app.use(cors(corsOptions));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/authApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Cookie-session setup
app.use(cookieSession({
  name: 'session',
  keys: ['secretkey'], // Use a strong key in production
  maxAge: 24 * 60 * 60 * 1000 // 1 day
}));

// Register route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  
  await newUser.save();
  res.send('User registered successfully');
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.status(400).send('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send('Invalid credentials');

  // Create session
  req.session.userId = user._id;
  res.send('Logged in successfully');
});

// Logout route
app.post('/logout', (req, res) => {
  req.session = null; // Clear session
  res.send('Logged out successfully');
});

// Protected route
app.get('/profile', (req, res) => {
  console.log(req.session);  // Log the session to debug

  if (!req.session.userId) return res.status(401).send('Not authenticated');

  res.send(`Hello, ${req.session.userId}`);  // Or send back user data
});

app.use('/api/entries', journalRoutes);
app.use('/api/habits', habitRoutes);  // Mount habits routes
app.use('/api/goals', goalRoutes);    // Mount goals routes



// Start server
app.listen(5000, () => console.log('Server running on port 5000'));
