import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormSignUpState {
  currentUser: {
    name: string;
    email: string;
    password: string;
  };
}

const initialState: FormSignUpState = {
  currentUser: {
    name: '',
    email: '',
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
    onChangeEmail(state, action: PayloadAction<string>) {
      state.currentUser.email = action.payload;
    },
    onChangePassword(state, action: PayloadAction<string>) {
      state.currentUser.password = action.payload;
    },
    clearCurrentUser(state) {
      state.currentUser = {
        name: '',
        email: '',
        password: '',
      };
    },
  },
});

export default formSignUpSlice.reducer;
export const { onChangeName, onChangeEmail, onChangePassword, clearCurrentUser } =
  formSignUpSlice.actions;
