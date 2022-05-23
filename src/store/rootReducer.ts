import { combineReducers } from '@reduxjs/toolkit';
import auth from './authSlice';
import formSignUp from '../pages/SignUp/formSlice';

export const rootReducer = combineReducers({
  auth,
  formSignUp,
});
