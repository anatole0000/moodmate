import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import Home from './Home';
import Navbar from './Navbar';
import API from './api';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import Journal from './Journal';
import MoodDashboard from './MoodDashboard';
import GoalTracker from './GoalTracker';
import HabitTracker from './HabitTracker';
import Footer from './Footer';

function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // 🌙 dark mode toggle

  useEffect(() => {
    API.get('/profile')
      .then(res => setUser({ username: res.data.split(', ')[1] || res.data }))
      .catch(() => setUser(null));
  }, []);

  return (
    <Router>
      <div className={`d-flex flex-column min-vh-100 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
        <Navbar user={user} setUser={setUser} darkMode={darkMode} setDarkMode={setDarkMode} />

        <div className="flex-grow-1 container py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={
              <PublicRoute user={user}>
                <Register />
              </PublicRoute>
            } />
            <Route path="/login" element={
              <PublicRoute user={user}>
                <Login setUser={setUser} />
              </PublicRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute user={user}>
                <Profile user={user} />
              </ProtectedRoute>
            } />
            <Route path="/journal" element={
              <ProtectedRoute user={user}>
                <Journal />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute user={user}>
                <MoodDashboard />
              </ProtectedRoute>
            } />
            <Route path="/goals" element={
              <ProtectedRoute user={user}>
                <GoalTracker />
              </ProtectedRoute>
            } />
            <Route path="/habits" element={
              <ProtectedRoute user={user}>
                <HabitTracker />
              </ProtectedRoute>
            } />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
