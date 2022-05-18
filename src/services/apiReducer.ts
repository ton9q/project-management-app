import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface apiState {
  loading: boolean;
  error: string | null;
}

const initialState: apiState = {
  loading: false,
  error: null,
};

export const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    togglerLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    errorApi(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export default apiSlice.reducer;
export const { togglerLoading, errorApi } = apiSlice.actions;
