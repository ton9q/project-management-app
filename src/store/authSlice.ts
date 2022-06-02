import { AxiosError } from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState, AppThunk } from './store';
import { showNotification } from './notificationsSlice';

import { ApiService } from '../services/api';
import { LocalStorage } from '../utils/localStorage';

export type SignUpUser = { name: string; login: string; password: string };
export type SignInUser = Omit<SignUpUser, 'name'>;

export const accessTokenStorageVariable = 'accessToken';
export type Token = { userId: string; login: string; iat: number };

interface State {
  token: string | null;
  isLoading: boolean;
  error: string | null;
  signUpSucceed: boolean;
  signInSucceed: boolean;
}

const initialState: State = {
  token: null,
  isLoading: false,
  error: null,
  signUpSucceed: false,
  signInSucceed: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signUpStart(state: State) {
      state.token = null;
      state.error = null;
      state.isLoading = true;
      state.signUpSucceed = false;
    },
    signUpSuccess(state: State) {
      state.isLoading = false;
      state.signUpSucceed = true;
    },
    signUpError(state: State, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
      state.signUpSucceed = false;
    },

    signInStart(state: State) {
      state.token = null;
      state.error = null;
      state.isLoading = true;
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
      state.signInSucceed = false;
    },

    signOutSuccess() {
      return initialState;
    },
  },
});

export const {
  signUpStart,
  signUpSuccess,
  signUpError,
  signInStart,
  signInSuccess,
  signInError,
  signOutSuccess,
} = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;

export const authReducer = authSlice.reducer;
export default authReducer;

export const signUp =
  (user: SignUpUser): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(signUpStart());
      await ApiService.signUp(user);
      dispatch(signUpSuccess());
    } catch (err) {
      const error =
        err instanceof AxiosError ? err.response?.data.message || err.message : 'Unknown error';
      dispatch(signUpError(error));
      dispatch(
        showNotification({
          type: 'error',
          message: error,
        })
      );
    }
  };

export const signIn =
  (user: SignInUser): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(signInStart());
      const response = await ApiService.signIn(user);
      LocalStorage.setItem(accessTokenStorageVariable, response.token);
      dispatch(signInSuccess(response.token));
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

export const signOut = (): AppThunk => (dispatch) => {
  LocalStorage.removeItem(accessTokenStorageVariable);
  dispatch(signOutSuccess());
};
