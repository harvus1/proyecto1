// src/api/salas.js
import axios from 'axios';
import { getToken } from './auth';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getSalas = async () => {
  const response = await axios.get(`${API_URL}/salas`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return response.data;
};

export const getSala = async (id) => {
  const response = await axios.get(`${API_URL}/salas/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return response.data;
};

export const createSala = async (salaData) => {
  const response = await axios.post(`${API_URL}/salas`, salaData, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return response.data;
};

export const updateSala = async (id, salaData) => {
  const response = await axios.put(`${API_URL}/salas/${id}`, salaData, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return response.data;
};

export const deleteSala = async (id) => {
  const response = await axios.delete(`${API_URL}/salas/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return response.data;
};

export const getAsientos = async (salaId, fecha) => {
  const response = await axios.get(`${API_URL}/salas/${salaId}/asientos?fecha=${fecha}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return response.data;
};