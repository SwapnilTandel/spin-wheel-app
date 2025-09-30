import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_SETTINGS } from '../../utils/constants';

const initialState = {
  settings: DEFAULT_SETTINGS,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    resetSettings: (state) => {
      state.settings = DEFAULT_SETTINGS;
    },
    updateRecentColors: (state, action) => {
      const { color } = action.payload;
      const recentColors = state.settings.recentColors || [];
      const filtered = recentColors.filter(c => c !== color);
      const updated = [color, ...filtered].slice(0, 12);
      state.settings.recentColors = updated;
    },
  },
});

export const {
  updateSettings,
  resetSettings,
  updateRecentColors,
} = settingsSlice.actions;

export default settingsSlice.reducer;
