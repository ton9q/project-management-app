import { combineReducers } from '@reduxjs/toolkit';
import auth from './authSlice';
import notifications from './notificationsSlice';

export const rootReducer = combineReducers({
  auth,
  notifications,
});
