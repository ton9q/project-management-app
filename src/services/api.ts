import axios from 'axios';
import { config } from '../config';
import { SignUpUser, SignInUser } from '../store/authSlice';

const { baseURL } = config.urls.api;

export class ApiService {
  static async signUp(user: SignUpUser) {
    const response = await axios({
      method: 'post',
      url: `${baseURL}/signup`,
      data: user,
    });
    return response.data;
  }

  static async signIn(user: SignInUser) {
    const response = await axios({
      method: 'post',
      url: `${baseURL}/signin`,
      data: user,
    });
    return response.data;
  }
}
