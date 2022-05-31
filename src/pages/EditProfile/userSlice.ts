import { AxiosError } from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState, AppThunk } from '../../store/store';
import { showNotification } from '../../store/notificationsSlice';

import { ApiService } from '../../services/api';
import { LocalStorage } from '../../utils/localStorage';
import { accessTokenStorageVariable, SignUpUser } from '../../store/authSlice';
import { decodeToken } from '../../utils/jwt';

export type User = { id: string; name: string; login: string };

interface State {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
  editProfileSucceed: boolean;
  deleteProfileSucceed: boolean;
}

const initialState: State = {
  currentUser: null,
  isLoading: false,
  error: null,
  editProfileSucceed: false,
  deleteProfileSucceed: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getProfileStart(state: State) {
      state.isLoading = true;
      state.editProfileSucceed = false;
      state.deleteProfileSucceed = false;
    },
    getProfileSuccess(state: State, action: PayloadAction<User>) {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    getProfileError(state: State, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },

    editProfileStart(state: State) {
      state.isLoading = true;
      state.editProfileSucceed = false;
    },
    editProfileSuccess(state: State, action: PayloadAction<User>) {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.editProfileSucceed = true;
    },
    editProfileError(state: State, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
      state.editProfileSucceed = false;
    },

    deleteProfileStart(state: State) {
      state.isLoading = true;
      state.deleteProfileSucceed = false;
    },
    deleteProfileSuccess(state: State) {
      state.isLoading = false;
      state.deleteProfileSucceed = true;
    },
    deleteProfileError(state: State, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
      state.deleteProfileSucceed = false;
    },
  },
});

export const {
  getProfileStart,
  getProfileSuccess,
  getProfileError,
  editProfileStart,
  editProfileSuccess,
  editProfileError,
  deleteProfileStart,
  deleteProfileSuccess,
  deleteProfileError,
} = userSlice.actions;
export const userSelector = (state: RootState) => state.user;

export const userReducer = userSlice.reducer;
export default userReducer;

export const getProfile = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getProfileStart());
    const token = LocalStorage.getItem(accessTokenStorageVariable);
    const tokenData = decodeToken(token);
    const user = await ApiService.getUser(tokenData.userId);
    dispatch(getProfileSuccess(user));
  } catch (err) {
    const error =
      err instanceof AxiosError ? err.response?.data.message || err.message : 'Unknown error';
    dispatch(getProfileError(error));
    dispatch(
      showNotification({
        type: 'error',
        message: error,
      })
    );
  }
};

export const editProfile =
  (userData: SignUpUser): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(editProfileStart());
      const userId = getState().user.currentUser?.id as User['id'];
      const newUserData = await ApiService.editUser(userId, userData);
      dispatch(editProfileSuccess(newUserData));
    } catch (err) {
      const error =
        err instanceof AxiosError ? err.response?.data.message || err.message : 'Unknown error';
      dispatch(editProfileError(error));
      dispatch(
        showNotification({
          type: 'error',
          message: error,
        })
      );
    }
  };

export const deleteProfile = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(deleteProfileStart());
    const userId = getState().user.currentUser?.id as User['id'];
    await ApiService.deleteUser(userId);
    dispatch(deleteProfileSuccess());
  } catch (err) {
    const error =
      err instanceof AxiosError ? err.response?.data.message || err.message : 'Unknown error';
    dispatch(deleteProfileError(error));
    dispatch(
      showNotification({
        type: 'error',
        message: error,
      })
    );
  }
};
