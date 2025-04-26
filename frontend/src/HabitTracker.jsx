import React, { useState, useEffect } from 'react';
import API from './api';

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [habitForm, setHabitForm] = useState({ name: '', frequency: '', description: '' });
  
  useEffect(() => {
    fetchHabits();
  }, []);
  
  const fetchHabits = async () => {
    try {
      const res = await API.get('/api/habits');
      setHabits(res.data);
    } catch (error) {
      console.error('Error fetching habits:', error.response ? error.response.data : error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data before sending:', habitForm);
    // Change habitForm.habit to habitForm.name to match the form's state
    if (habitForm.name && habitForm.frequency && habitForm.description) {
      try {
        await API.post('/api/habits', habitForm);
        setHabitForm({ name: '', frequency: '', description: '' });
        fetchHabits();
      } catch (error) {
        console.error('Error adding habit:', error.response ? error.response.data : error.message);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/habits/${id}`);
      fetchHabits(); // Refresh habit list after deletion
    } catch (error) {
      console.error('Error deleting habit:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          className="form-control mb-2"
          placeholder="New Habit"
          value={habitForm.name}  // Use habitForm.name here
          onChange={(e) => setHabitForm({ ...habitForm, name: e.target.value })} // Update name
        />
        <input
          className="form-control mb-2"
          placeholder="Frequency (e.g., 5 times a week)"
          value={habitForm.frequency}
          onChange={(e) => setHabitForm({ ...habitForm, frequency: e.target.value })}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Description"
          value={habitForm.description}
          onChange={(e) => setHabitForm({ ...habitForm, description: e.target.value })}
        />
        <button className="btn btn-primary" type="submit">
          Add Habit
        </button>
      </form>
      
      <h3>Your Habits</h3>
      {habits.map((habit) => (
        <div key={habit._id} className="card mb-2">
          <div className="card-body">
            <h5 className="card-title">{habit.name}</h5>
            <p className="card-text">Frequency: {habit.frequency}</p>
            <p className="card-text">Description: {habit.description}</p> {/* Display description */}
            <button className="btn btn-danger mt-2" onClick={() => handleDelete(habit._id)}>
              Delete Habit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HabitTracker;
