// src/GoalTracker.jsx
import React, { useState, useEffect } from 'react';
import API from './api';

const GoalTracker = () => {
  const [goals, setGoals] = useState([]);
  const [goalForm, setGoalForm] = useState({
    title: '',          // For Goal Title
    targetDate: '',     // For Goal Target Date
    description: '',    // For Goal Description
  });

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await API.get('/api/goals');
      setGoals(res.data);
    } catch (error) {
      console.error('Error fetching goals:', error.response ? error.response.data : error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ensure title, targetDate, and description are provided
    if (goalForm.title && goalForm.targetDate && goalForm.description) {
      try {
        await API.post('/api/goals', goalForm);
        setGoalForm({ title: '', targetDate: '', description: '' }); // Reset form
        fetchGoals();
      } catch (error) {
        console.error('Error adding goal:', error.response ? error.response.data : error.message);
      }
    } else {
      console.error('Please fill out all fields');
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/goals/${id}`);
      fetchGoals();
    } catch (error) {
      console.error('Error deleting goal:', error.response ? error.response.data : error.message);
    }
  };

  const handleUpdateCompleted = async (id, completed) => {
    try {
      await API.put(`/api/goals/${id}`, { completed });
      fetchGoals();
    } catch (error) {
      console.error('Error updating goal status:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          className="form-control mb-2"
          placeholder="Goal Title"
          value={goalForm.title}
          onChange={(e) => setGoalForm({ ...goalForm, title: e.target.value })}
        />
        <input
          className="form-control mb-2"
          type="date"
          placeholder="Target Date"
          value={goalForm.targetDate}
          onChange={(e) => setGoalForm({ ...goalForm, targetDate: e.target.value })}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Goal Description"
          value={goalForm.description}
          onChange={(e) => setGoalForm({ ...goalForm, description: e.target.value })}
        />
        <button className="btn btn-primary" type="submit">
          Add Goal
        </button>
      </form>

      <h3>Your Goals</h3>
      {goals.map((goal) => (
        <div key={goal._id} className="card mb-2">
          <div className="card-body">
            <h5 className="card-title">{goal.title}</h5>
            <p className="card-text">Target Date: {new Date(goal.targetDate).toLocaleDateString()}</p>
            <p className="card-text">Description: {goal.description}</p>
            <p className="card-text">Status: {goal.completed ? 'Completed' : 'In Progress'}</p>

            <button
              className="btn btn-success mt-2 me-2"
              onClick={() => handleUpdateCompleted(goal._id, !goal.completed)}
            >
              {goal.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
            </button>

            <button
              className="btn btn-danger mt-2"
              onClick={() => handleDelete(goal._id)}
            >
              Delete Goal
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GoalTracker;
