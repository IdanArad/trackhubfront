import axios from 'axios';
import { getToken } from './auth';

const http = axios.create({
  baseURL: 'https://trackhubback.vercel.app/',
});

http.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (config.url !== '/auth/login' && config.url !== '/users/register') {
    window.location.href = '/login';
  }
  return config;
});

export default http;
