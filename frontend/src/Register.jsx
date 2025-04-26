import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from './api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/register', { username, password });
      alert('Registered successfully');
      navigate('/login');
    } catch (err) {
      alert('Failed to register');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="mt-3">
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
        <button type="submit" className="btn btn-success">Register</button>
      </form>
    </div>
  );
};

export default Register;
