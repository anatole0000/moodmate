import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center d-flex flex-column justify-content-center align-items-center"
         style={{ minHeight: '80vh', background: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', color: '#fff' }}>
      <h1 className="display-3 mb-3 fw-bold">Welcome to MoodMate</h1>
      <p className="lead mb-4">Track your moods, build habits, set goals, and grow with intention.</p>
      <div>
        <Link to="/register" className="btn btn-light btn-lg mx-2">Get Started</Link>
        <Link to="/login" className="btn btn-outline-light btn-lg mx-2">Log In</Link>
      </div>
    </div>
  );
};

export default Home;
