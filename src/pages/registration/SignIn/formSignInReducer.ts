import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormSignInState {
  login: string;
  password: string;
}

const initialState: FormSignInState = {
  login: '',
  password: '',
};

export const formSignInSlice = createSlice({
  name: 'formSignIn',
  initialState,
  reducers: {
    onChangeLogin(state, action: PayloadAction<string>) {
      state.login = action.payload;
    },
    onChangePassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    clearCurrentUser(state) {
      state.login = '';
      state.password = '';
    },
  },
});

export default formSignInSlice.reducer;
export const { onChangeLogin, onChangePassword, clearCurrentUser } = formSignInSlice.actions;
