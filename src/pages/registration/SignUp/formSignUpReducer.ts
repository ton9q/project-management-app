import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormSignUpState {
  name: string;
  login: string;
  password: string;
}

const initialState: FormSignUpState = {
  name: '',
  login: '',
  password: '',
};

export const formSignUpSlice = createSlice({
  name: 'formSignUp',
  initialState,
  reducers: {
    onChangeName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    onChangeLogin(state, action: PayloadAction<string>) {
      state.login = action.payload;
    },
    onChangePassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    clearCurrentUser(state) {
      state.name = '';
      state.login = '';
      state.password = '';
    },
  },
});

export default formSignUpSlice.reducer;
export const { onChangeName, onChangeLogin, onChangePassword, clearCurrentUser } =
  formSignUpSlice.actions;
