import { createSlice } from '@reduxjs/toolkit';

const initialState = {
      categories: {
        50: [
          { id: 1, name: 'Free Spin', color: '#B22222', image: null },
          { id: 2, name: 'Try Again', color: '#FFD700', image: null },
          { id: 3, name: 'Small Prize', color: '#FFF8E6', image: null },
          { id: 4, name: 'Bonus Points', color: '#B22222', image: null },
          { id: 5, name: 'Lucky Day', color: '#FFD700', image: null },
          { id: 6, name: 'Jackpot!', color: '#FFF8E6', image: null },
        ],
        100: [
          { id: 1, name: 'Premium Prize', color: '#B22222', image: null },
          { id: 2, name: 'Double Win', color: '#FFD700', image: null },
          { id: 3, name: 'Mega Bonus', color: '#FFF8E6', image: null },
          { id: 4, name: 'Super Spin', color: '#B22222', image: null },
          { id: 5, name: 'Golden Ticket', color: '#FFD700', image: null },
          { id: 6, name: 'Grand Prize!', color: '#FFF8E6', image: null },
        ]
      },
      settings: {
        soundEnabled: true,
        animationsEnabled: true,
        hapticFeedback: true,
        labelTextSize: 18, // Default text size for wheel labels
      },
  history: [],
  isSpinning: false,
  lastResult: null,
};

const wheelSlice = createSlice({
  name: 'wheel',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      const { wheelValue, category } = action.payload;
      const newCategory = {
        ...category,
        id: Date.now(),
        color: category.color || '#2E7D32',
      };
      state.categories[wheelValue].push(newCategory);
    },
    removeCategory: (state, action) => {
      const { wheelValue, categoryId } = action.payload;
      state.categories[wheelValue] = state.categories[wheelValue].filter(
        cat => cat.id !== categoryId
      );
    },
    updateCategory: (state, action) => {
      const { wheelValue, categoryId, updates } = action.payload;
      const categoryIndex = state.categories[wheelValue].findIndex(
        cat => cat.id === categoryId
      );
      if (categoryIndex !== -1) {
        state.categories[wheelValue][categoryIndex] = {
          ...state.categories[wheelValue][categoryIndex],
          ...updates,
        };
      }
    },
    updateSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    addToHistory: (state, action) => {
      state.history.unshift({
        ...action.payload,
        timestamp: new Date().toISOString(),
      });
      // Keep only last 50 results
      if (state.history.length > 50) {
        state.history = state.history.slice(0, 50);
      }
    },
    setSpinning: (state, action) => {
      state.isSpinning = action.payload;
    },
    setLastResult: (state, action) => {
      state.lastResult = action.payload;
    },
  },
});

export const {
  addCategory,
  removeCategory,
  updateCategory,
  updateSettings,
  addToHistory,
  setSpinning,
  setLastResult,
} = wheelSlice.actions;

export default wheelSlice.reducer;
