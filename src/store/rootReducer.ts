import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import notificationsReducer from './notificationsSlice';
// import boardReducer from '../pages/Board/boardSlice';
import userReducer from '../pages/EditProfile/userSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  notifications: notificationsReducer,
  //   board: boardReducer,
  user: userReducer,
});
