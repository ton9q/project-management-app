import axios from 'axios';
import { config } from '../config';
import { SignUpUser } from '../store/authSlice';

const { baseURL } = config.urls.api;

export class ApiService {
  static async signUpUser(user: SignUpUser) {
    const response = await axios({
      method: 'post',
      url: `${baseURL}/signup`,
      data: user,
    });
    return response.data;
  }
}
