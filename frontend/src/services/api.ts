import axios from 'axios';

// Tự động lấy IP của máy chủ Ubuntu thay vì cố định localhost
const getApiBaseUrl = () => {
  const hostname = window.location.hostname;
  return `http://${hostname}:5000/api`;
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
