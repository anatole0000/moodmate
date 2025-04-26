// src/MoodDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import API from './api';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const MoodDashboard = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const res = await API.get('/api/entries');
      setEntries(res.data);
    };
    fetchEntries();
  }, []);

  // Aggregate mood frequency
  const moodCounts = entries.reduce((acc, entry) => {
    const mood = entry.mood || 'Unknown';
    acc[mood] = (acc[mood] || 0) + 1;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(moodCounts),
    datasets: [
      {
        label: 'Mood Frequency',
        data: Object.values(moodCounts),
        backgroundColor: ['#f94144', '#f3722c', '#f9c74f', '#90be6d', '#43aa8b', '#577590'],
      },
    ],
  };

  // Mood over time (optional basic numeric conversion for line chart)
  const moodToNumber = (mood) => {
    const map = {
      'Happy': 5,
      'Good': 4,
      'Neutral': 3,
      'Sad': 2,
      'Angry': 1,
    };
    return map[mood] || 0;
  };

  const sortedEntries = [...entries].sort((a, b) => new Date(a.date) - new Date(b.date));
  const lineData = {
    labels: sortedEntries.map((e) => new Date(e.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Mood Over Time',
        data: sortedEntries.map((e) => moodToNumber(e.mood)),
        borderColor: '#36a2eb',
        fill: false,
      },
    ],
  };

  return (
    <div className="container my-4">
      <h2>Mood Analytics</h2>
      <div className="row">
        <div className="col-md-6 mb-4">
          <Pie data={pieData} />
        </div>
        <div className="col-md-6">
          <Line data={lineData} />
        </div>
      </div>
    </div>
  );
};

export default MoodDashboard;
