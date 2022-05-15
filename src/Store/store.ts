import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import formSignUpReducer from '../pages/SignUp/Reducer/FormSignUpSlice';

const rootReducer = combineReducers({
  formSignUpReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
