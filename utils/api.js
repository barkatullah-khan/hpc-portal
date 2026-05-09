// utils/api.js
import axios from 'axios';

const api = axios.create({
  // Force it to be exactly this for testing
  baseURL: 'http://localhost:5000/api', 
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;