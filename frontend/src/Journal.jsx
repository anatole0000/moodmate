// src/Journal.jsx
import React from 'react';
import JournalList from './JournalList';

const Journal = () => {
  return (
    <div className="container mt-4">
      <h2 className="mb-4"><i className="bi bi-journal-text me-2"></i>Your Journal</h2>
      <JournalList />
    </div>
  );
};

export default Journal;
