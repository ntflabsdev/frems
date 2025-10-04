import axios from 'axios';

const api = axios.create({
  baseURL: 'https://development.ntfinfotech.com/frems/api',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    const headers = (config.headers ?? {}) as Record<string, string>;
    headers['Authorization'] = `Bearer ${token}`;
    config.headers = headers as any;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      if (typeof window !== 'undefined') {
        if (window.location.pathname !== '/auth/login') {
          window.location.href = '/auth/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;


