import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3002/api',
});

instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;  // Додаємо токен
  }
  return config;
});

export default instance;
