// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // Adjust the backend URL if necessary
  withCredentials: true, // Important: Ensures cookies (sessions) are sent with requests
});

export default API;
