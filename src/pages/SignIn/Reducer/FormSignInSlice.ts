import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormSignInState {
  currentUser: {
    login: string;
    password: string;
  };
}

const initialState: FormSignInState = {
  currentUser: {
    login: '',
    password: '',
  },
};

export const formSignInSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    onChangeLogin(state, action: PayloadAction<string>) {
      state.currentUser.login = action.payload;
    },
    onChangePassword(state, action: PayloadAction<string>) {
      state.currentUser.password = action.payload;
    },
    clearCurrentUser(state) {
      state.currentUser = {
        login: '',
        password: '',
      };
    },
  },
});

export default formSignInSlice.reducer;
export const { onChangeLogin, onChangePassword, clearCurrentUser } = formSignInSlice.actions;
