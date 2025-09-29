import { configureStore } from '@reduxjs/toolkit';
import wheelReducer from './slices/wheelSlice';

export const store = configureStore({
  reducer: {
    wheel: wheelReducer,
  },
});

export default store;
