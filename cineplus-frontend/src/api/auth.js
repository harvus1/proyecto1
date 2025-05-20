// src/api/auth.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { username, password });
  return response.data;
};

export const register = async (username, password, email) => {
  const response = await axios.post(`${API_URL}/auth/register`, { username, password, email });
  return response.data;
};

export const getProfile = async (token) => {
  const response = await axios.get(`${API_URL}/users/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};