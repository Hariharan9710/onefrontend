import axios from 'axios';
import { API_CONFIG } from '../../../config/api';

const adminApi = axios.create({
  baseURL: API_CONFIG.ADMIN
});

console.log('🛡️ Admin API Created with baseURL:', adminApi.defaults.baseURL);

adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default adminApi;
