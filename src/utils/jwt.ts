import jwtDecode from 'jwt-decode';
import { Token } from '../store/authSlice';

export const decodeToken = (token: string): Token => jwtDecode(token);
