import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = { id: string; name: string; login: string };

interface ApiCreatingUserState {
  currentUser: User | null;
  isCreating: boolean;
  isLogin: boolean;
  errorCreating: string | null;
  errorLogin: string | null;
}

const initialState: ApiCreatingUserState = {
  currentUser: null,
  isCreating: false,
  isLogin: false,
  errorCreating: null,
  errorLogin: null,
};

export const apiCreatingUserSlice = createSlice({
  name: 'apiCreatingUser',
  initialState,
  reducers: {
    startCreating(state) {
      state.isCreating = true;
    },
    startLogin(state) {
      state.isLogin = true;
    },
    creatingError(state, action: PayloadAction<string>) {
      state.errorCreating = action.payload;
      state.isCreating = false;
    },
    loginError(state, action: PayloadAction<string>) {
      state.errorLogin = action.payload;
      state.isLogin = false;
    },
    creatingSuccess(state, action: PayloadAction<User | null>) {
      state.currentUser = action.payload;
      state.isCreating = false;
    },
    loginSuccess(state) {
      state.isLogin = false;
    },
  },
});

export default apiCreatingUserSlice.reducer;
export const {
  startCreating,
  creatingError,
  creatingSuccess,
  startLogin,
  loginError,
  loginSuccess,
} = apiCreatingUserSlice.actions;
