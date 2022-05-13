import axios from 'axios';
import { config } from '../config';

const { baseURL } = config.urls.api;

export async function createUser(user: { name: string; login: string; password: string }) {
  const response = axios({
    method: 'post',
    url: `${baseURL}signup`,
    data: user,
  });
  return await response;
}

export async function loginUser(user: { name: string; login: string; password: string }) {
  const response = axios({
    method: 'post',
    url: `${baseURL}signin`,
    data: user,
  });
  return await response;
}
