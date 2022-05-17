import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import formSignUpReducer from '../pages/SignUp/formSignUpReducer';
import formSignInReducer from '../pages/SignIn/formSignInReducer';

const rootReducer = combineReducers({
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
