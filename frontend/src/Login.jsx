import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from './api';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await API.post('/login', { username, password });
      const res = await API.get('/profile');
      setUser({ username: res.data.split(', ')[1] || res.data });
      alert('Logged in successfully');
      navigate('/profile');
    } catch (err) {
      alert('Failed to login');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input type="text" className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
