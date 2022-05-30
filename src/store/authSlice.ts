import { AxiosError } from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState, AppThunk } from './store';
import { showNotification } from './notificationsSlice';

import { ApiService } from '../services/api';
import { LocalStorage } from '../utils/localStorage';

export type User = { id: string; name: string; login: string };
export type SignUpUser = { name: string; login: string; password: string };
export type SignInUser = Omit<SignUpUser, 'name'>;

export const accessTokenStorageVariable = 'accessToken';

interface State {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
  signUpSucceed: boolean;
  signInSucceed: boolean;
  editProfileSucceed: boolean;
  deleteAccountSucceed: boolean;
}

const initialState: State = {
  currentUser: null,
  isLoading: false,
  error: null,
  signUpSucceed: false,
  signInSucceed: false,
  editProfileSucceed: false,
  deleteAccountSucceed: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signUpStart(state: State) {
      state.isLoading = true;
      state.signUpSucceed = false;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    signUpSuccess(state: State, action: PayloadAction<User | null>) {
      //   state.currentUser = action.payload;
      state.isLoading = false;
      state.signUpSucceed = true;
    },
    signUpError(state: State, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
      state.signUpSucceed = false;
    },

    signInStart(state: State) {
      state.isLoading = true;
      state.signInSucceed = false;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    signInSuccess(state: State, action: PayloadAction<string>) {
      //   state.token = action.payload;
      state.isLoading = false;
      state.signInSucceed = true;
    },
    signInError(state: State, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
      state.signInSucceed = false;
    },

    editProfileStart(state: State) {
      state.isLoading = true;
      state.editProfileSucceed = false;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    editProfileSuccess(state: State, action: PayloadAction<User | null>) {
      //   state.currentUser = action.payload;
      state.isLoading = false;
      state.editProfileSucceed = true;
    },
    editProfileError(state: State, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
      state.editProfileSucceed = false;
    },

    deleteAccountStart(state: State) {
      state.isLoading = true;
      state.deleteAccountSucceed = false;
    },
    deleteAccountSuccess(state: State) {
      state.isLoading = false;
      state.deleteAccountSucceed = true;
    },
    deleteAccountError(state: State, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
      state.deleteAccountSucceed = false;
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
  editProfileStart,
  editProfileSuccess,
  editProfileError,
  deleteAccountStart,
  deleteAccountSuccess,
  deleteAccountError,
} = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;

export const signUp =
  (user: SignUpUser): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(signUpStart());
      const userData = await ApiService.signUp(user);
      dispatch(signUpSuccess(userData));
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
      const tokenData = await ApiService.signIn(user);
      dispatch(signInSuccess(tokenData));
      LocalStorage.setItem(accessTokenStorageVariable, tokenData);
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

export const editProfile =
  (id: string, user: SignUpUser, token: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(editProfileStart());
      const newUserData = await ApiService.editProfile(id, user, token);
      dispatch(editProfileSuccess(newUserData));
    } catch (err) {
      const error =
        err instanceof AxiosError ? err.response?.data.message || err.message : 'Unknown error';
      dispatch(editProfileError(error));
      dispatch(
        showNotification({
          type: 'error',
          message: error,
        })
      );
    }
  };

export const deleteAccount =
  (id: string, token: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(deleteAccountStart());
      await ApiService.deleteAccount(id, token);
      dispatch(deleteAccountSuccess());
    } catch (err) {
      const error =
        err instanceof AxiosError ? err.response?.data.message || err.message : 'Unknown error';
      dispatch(deleteAccountError(error));
      dispatch(
        showNotification({
          type: 'error',
          message: error,
        })
      );
    }
  };
