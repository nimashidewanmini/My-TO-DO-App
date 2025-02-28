import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import todoReducer from './todoSlice';
import settingsReducer from './settingsSlice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;