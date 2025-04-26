// src/Logout.jsx
import React from 'react';
import API from './api';

const Logout = () => {
  const handleLogout = async () => {
    try {
      await API.post('/logout'); // Sends POST request to logout route
      alert('Logged out successfully');
      // Optionally, redirect to login or homepage
    } catch (err) {
      alert('Failed to logout');
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
