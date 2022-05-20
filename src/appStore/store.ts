import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import apiReducer from '../services/apiReducer';
import formSignUpReducer from '../pages/SignUp/formSignUpReducer';
import formSignInReducer from '../pages/SignIn/formSignInReducer';

const rootReducer = combineReducers({
  apiReducer,
  formSignUpReducer,
  formSignInReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
