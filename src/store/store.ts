import { configureStore, Action, ThunkAction, Middleware } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { createLogger } from 'redux-logger';
import { rootReducer } from './rootReducer';

const isDev = process.env.NODE_ENV === 'development';

const middleware: Middleware[] = [];

if (isDev && false) {
  middleware.push(createLogger());
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
