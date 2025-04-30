import api from './api';

export const login = async (email, password) => {
  const response = await api.post('/login', { email, password });
  const token = response.data.token;
  localStorage.setItem('token', token);
  return token;
};

export const register = async (userData) => {
  const response = await api.post('/register', userData);
  const token = response.data.token;
  localStorage.setItem('token', token);
  return token;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const response = await api.get('/me', {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
