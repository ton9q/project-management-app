import { combineReducers } from '@reduxjs/toolkit';
import auth from './authSlice';
import login from './loginSlice';
import notifications from './notificationsSlice';

export const rootReducer = combineReducers({
  auth,
  login,
  notifications,
});
