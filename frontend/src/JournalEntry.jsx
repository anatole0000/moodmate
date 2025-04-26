// src/JournalEntry.jsx
import React from 'react';

const JournalEntry = ({ entry, onEdit, onDelete }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{entry.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{entry.date}</h6>
        <p className="card-text">{entry.content}</p>
        <p className="card-text"><small>Mood: {entry.mood}</small></p>
        <button className="btn btn-sm btn-primary me-2" onClick={() => onEdit(entry)}>Edit</button>
        <button className="btn btn-sm btn-danger" onClick={() => onDelete(entry._id)}>Delete</button>
      </div>
    </div>
  );
};

export default JournalEntry;
