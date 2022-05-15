import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormSignUpState {
  currentUser: {
    name: string;
    login: string;
    password: string;
  };
}

const initialState: FormSignUpState = {
  currentUser: {
    name: '',
    login: '',
    password: '',
  },
};

export const formSignUpSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    onChangeName(state, action: PayloadAction<string>) {
      state.currentUser.name = action.payload;
    },
    onChangeLogin(state, action: PayloadAction<string>) {
      state.currentUser.login = action.payload;
    },
    onChangePassword(state, action: PayloadAction<string>) {
      state.currentUser.password = action.payload;
    },
    clearCurrentUser(state) {
      state.currentUser = {
        name: '',
        login: '',
        password: '',
      };
    },
  },
});

export default formSignUpSlice.reducer;
export const { onChangeName, onChangeLogin, onChangePassword, clearCurrentUser } =
  formSignUpSlice.actions;
