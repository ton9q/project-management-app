import { AxiosError } from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
import { ApiService } from '../services/api';
import { showNotification } from './notificationsSlice';
import { LocalStorage } from '../utils/localStorage';

export type SignInUser = { login: string; password: string };

interface State {
  token: string;
  isLogin: boolean;
  isLoading: boolean;
  error: string | null;
  signInSucceed: boolean;
}

const initialState: State = {
  token: '',
  isLogin: false,
  isLoading: false,
  error: null,
  signInSucceed: false,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    signInStart(state: State) {
      state.isLoading = true;
      state.isLogin = false;
      state.signInSucceed = false;
    },
    signInSuccess(state: State, action: PayloadAction<string>) {
      state.token = action.payload;
      state.isLoading = false;
      state.signInSucceed = true;
    },
    signInError(state: State, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
      state.isLogin = false;
      state.signInSucceed = false;
    },
  },
});

export const { signInStart, signInSuccess, signInError } = loginSlice.actions;
export const logInSelector = (state: RootState) => state.login;

export default loginSlice.reducer;

export const signIn =
  (user: SignInUser): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(signInStart());
      const tokenData = await ApiService.signInUser(user);
      dispatch(signInSuccess(tokenData));
      LocalStorage.setItem('token', tokenData);
    } catch (err) {
      const error =
        err instanceof AxiosError ? err.response?.data.message || err.message : 'Unknown error';
      dispatch(signInError(error));
      dispatch(
        showNotification({
          type: 'error',
          message: error,
        })
      );
    }
  };
