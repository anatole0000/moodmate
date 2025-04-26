// models/JournalEntry.js
const mongoose = require('mongoose');

const JournalEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  mood: { type: String },
  date: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('JournalEntry', JournalEntrySchema);
