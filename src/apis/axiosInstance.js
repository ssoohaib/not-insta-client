import axios from 'axios';
import { getTokens } from '../utils';

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  async config => {
    const {accessToken} = await getTokens('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    console.log('[OK] -- Interceptor Response');
    return response;
  },
  async error => {
    console.log('[FAIL] -- Interceptor Response - ', error.response?.status);
    return Promise.reject(error);
  },
);

export default axiosInstance;
