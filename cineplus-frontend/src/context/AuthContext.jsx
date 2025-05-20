// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, getProfile } from '../api/auth';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const decoded = jwt_decode(token);
          const userData = await getProfile(token);
          setUser({ ...decoded, ...userData.user });
        } catch (error) {
          console.error('Error al cargar usuario:', error);
          logout();
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  const login = async (username, password) => {
    const { token } = await apiLogin(username, password);
    localStorage.setItem('token', token);
    setToken(token);
  };

  const register = async (username, password, email) => {
    await apiRegister(username, password, email);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};