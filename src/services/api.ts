import { RequestService } from './request';
import { config } from '../config';
import { Board } from '../pages/Board/types';
import { SignUpUser, SignInUser } from '../store/authSlice';
import { User } from '../pages/EditProfile/userSlice';

const urls = config.urls.api;
const { baseURL } = urls;

export class ApiService {
  static async signUp(user: SignUpUser): Promise<User> {
    const response = await RequestService.post(`${baseURL}${urls.auth.signUp}`, user);
    return response.data;
  }

  static async signIn(user: SignInUser): Promise<{ token: string }> {
    const response = await RequestService.post(`${baseURL}${urls.auth.signIn}`, user);
    return response.data;
  }

  static async getUser(id: string): Promise<User> {
    const response = await RequestService.get(`${baseURL}${urls.users.byId(id)}`);
    return response.data;
  }

  static async editUser(id: string, user: SignUpUser): Promise<User> {
    const response = await RequestService.put(`${baseURL}${urls.users.byId(id)}`, user);
    return response.data;
  }

  static async deleteUser(id: string): Promise<null> {
    const response = await RequestService.delete(`${baseURL}${urls.users.byId(id)}`);
    return response.data;
  }

  static async getBoardDetails(boardId: string): Promise<Board> {
    const response = await RequestService.get(`${baseURL}${urls.boards.byId(boardId)}`);
    return response.data;
  }
}
