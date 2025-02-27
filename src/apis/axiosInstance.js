import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.0.107:5000',
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  async config => {
    // const token = await retrieveTokenSecurely('accessToken');
    const token = 'moew';
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
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
