import { AxiosError } from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
import { ApiService } from '../services/api';

export type User = { id: string; name: string; login: string };
export type SignUpUser = { name: string; login: string; password: string };

interface State {
  currentUser: User | null;
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;
  signUpSucceed: boolean;
}

const initialState: State = {
  currentUser: null,
  isAuth: false,
  isLoading: false,
  error: null,
  signUpSucceed: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signUpStart(state: State) {
      state.isLoading = true;
      state.isAuth = false;
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
      state.isAuth = false;
      state.signUpSucceed = false;
    },
  },
});

export const { signUpStart, signUpSuccess, signUpError } = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;

export const signUp =
  (user: SignUpUser): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(signUpStart());
      const userData = await ApiService.signUpUser(user);
      dispatch(signUpSuccess(userData));
    } catch (err) {
      const error =
        err instanceof AxiosError ? err.response?.data.message || err.message : 'Unknown error';
      dispatch(signUpError(error));
    }
  };
