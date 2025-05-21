import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { login as apiLogin, register as apiRegister } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setUser({
            id: decoded.id,
            username: decoded.username,
            role: decoded.role
          });
          setError(null);
        } catch (err) {
          console.error('Error decoding token:', err);
          setError('Sesión inválida');
          logout();
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  const login = async (username, password) => {
    try {
      const { token: newToken } = await apiLogin(username, password);
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setError(null);
      return true;
    } catch (err) {
      console.error('Login error:', err);
      setError('Credenciales incorrectas');
      return false;
    }
  };

  const register = async (username, password, email) => {
    try {
      await apiRegister(username, password, email);
      setError(null);
      return true;
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Error en registro');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      error,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);