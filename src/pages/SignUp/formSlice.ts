import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface State {
  name: string;
  login: string;
  password: string;
}

const initialState: State = {
  name: '',
  login: '',
  password: '',
};

export const formSignUpSlice = createSlice({
  name: 'formSignUp',
  initialState,
  reducers: {
    onChangeName(state: State, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    onChangeLogin(state: State, action: PayloadAction<string>) {
      state.login = action.payload;
    },
    onChangePassword(state: State, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    clearForm(state: State) {
      state.name = '';
      state.login = '';
      state.password = '';
    },
  },
});

export const { onChangeName, onChangeLogin, onChangePassword, clearForm } = formSignUpSlice.actions;
export const formSelector = (state: RootState) => state.formSignUp;
export default formSignUpSlice.reducer;
