import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = { id: string; name: string; login: string };

interface ApiCreatingUserState {
  currentUser: User | null;
  isCreating: boolean;
  errorCreating: string | null;
}

const initialState: ApiCreatingUserState = {
  currentUser: null,
  isCreating: false,
  errorCreating: null,
};

export const apiCreatingUserSlice = createSlice({
  name: 'apiCreatingUser',
  initialState,
  reducers: {
    startCreating(state) {
      state.isCreating = true;
    },
    creatingError(state, action: PayloadAction<string>) {
      state.errorCreating = action.payload;
      state.isCreating = false;
    },
    creatingSuccess(state, action: PayloadAction<User | null>) {
      state.currentUser = action.payload;
      state.isCreating = false;
    },
  },
});

export default apiCreatingUserSlice.reducer;
export const { startCreating, creatingError, creatingSuccess } = apiCreatingUserSlice.actions;
