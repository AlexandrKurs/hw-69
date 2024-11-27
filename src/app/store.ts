import { configureStore } from '@reduxjs/toolkit';
import {videosReducer} from "../store/slices/videosSlice.ts";

export const store = configureStore({
  reducer: {
    films: videosReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;