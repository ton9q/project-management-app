import axios from 'axios';
import { config } from '../config';
import { accessTokenStorageVariable } from '../store/authSlice';
import { LocalStorage } from '../utils/localStorage';

const axiosInstance = axios.create({
  method: 'get',
  responseType: 'json',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = LocalStorage.getItem(accessTokenStorageVariable);
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.replace(config.urls.public.signIn);
    }
    return Promise.reject(error);
  }
);

export const RequestService = axiosInstance;
