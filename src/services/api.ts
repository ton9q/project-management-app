import axios from 'axios';
import { config } from '../config';
import { SignUpUser } from '../store/authSlice';
import { SignInUser } from '../store/loginSlice';

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

  static async signInUser(user: SignInUser) {
    const response = await axios({
      method: 'post',
      url: `${baseURL}/signin`,
      data: user,
    });
    return response.data;
  }
}
