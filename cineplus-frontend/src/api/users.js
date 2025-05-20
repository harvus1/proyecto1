import axios from 'axios';
import { getToken } from './auth';

const API_URL = process.env.REACT_APP_API_URL;

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return response.data;
};

export const updateUserStatus = async (userId, activo) => {
  const response = await axios.put(
    `${API_URL}/users/${userId}/status`,
    { activo },
    { headers: { Authorization: `Bearer ${getToken()}` } }
  );
  return response.data;
};