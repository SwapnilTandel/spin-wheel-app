import { createSlice } from '@reduxjs/toolkit';
import { APP_CONFIG } from '../../utils/constants';

const initialState = {
  history: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addToHistory: (state, action) => {
      const newEntry = {
        ...action.payload,
        timestamp: new Date().toISOString(),
      };
      state.history.unshift(newEntry);
      // Keep only last N results
      if (state.history.length > APP_CONFIG.HISTORY.MAX_ITEMS) {
        state.history = state.history.slice(0, APP_CONFIG.HISTORY.MAX_ITEMS);
      }
    },
    clearHistory: (state) => {
      state.history = [];
    },
    removeHistoryEntry: (state, action) => {
      const { index } = action.payload;
      state.history.splice(index, 1);
    },
  },
});

export const {
  addToHistory,
  clearHistory,
  removeHistoryEntry,
} = historySlice.actions;

export default historySlice.reducer;
