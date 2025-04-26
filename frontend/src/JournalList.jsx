import React, { useState, useEffect } from 'react';
import API from './api';
import JournalEntry from './JournalEntry';

const JournalList = () => {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', mood: '', date: '' });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [moodFilter, setMoodFilter] = useState('');

  const fetchEntries = async () => {
    try {
      const res = await API.get('/api/entries');
      setEntries(res.data);
    } catch (error) {
      console.error('Error fetching entries:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await API.put(`/api/entries/${editingId}`, form);
    } else {
      await API.post('/api/entries', form);
    }
    setForm({ title: '', content: '', mood: '', date: '' });
    setEditingId(null);
    fetchEntries();
  };

  const handleEdit = (entry) => {
    setForm(entry);
    setEditingId(entry._id);
  };

  const handleDelete = async (id) => {
    await API.delete(`/api/entries/${id}`);
    fetchEntries();
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(search.toLowerCase()) ||
                          entry.content.toLowerCase().includes(search.toLowerCase());
    const matchesMood = moodFilter === '' || entry.mood.toLowerCase() === moodFilter.toLowerCase();
    return matchesSearch && matchesMood;
  });

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          className="form-control mb-2"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Content"
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
        ></textarea>
        <input
          className="form-control mb-2"
          placeholder="Mood"
          value={form.mood}
          onChange={e => setForm({ ...form, mood: e.target.value })}
        />
        <input
          type="date"
          className="form-control mb-2"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
        />
        <button className="btn btn-success" type="submit">
          {editingId ? 'Update Entry' : 'Add Entry'}
        </button>
      </form>

      {/* 🔍 Search and Mood Filter */}
      <div className="d-flex gap-2 mb-3">
        <input
          className="form-control"
          placeholder="Search entries"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="form-select"
          value={moodFilter}
          onChange={e => setMoodFilter(e.target.value)}
        >
          <option value="">All Moods</option>
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="anxious">Anxious</option>
          <option value="grateful">Grateful</option>
          {/* Add more moods as needed */}
        </select>
      </div>

      {/* 📝 Filtered Entries */}
      {filteredEntries.map(entry => (
        <JournalEntry
          key={entry._id}
          entry={entry}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default JournalList;
