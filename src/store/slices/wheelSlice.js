import { createSlice } from '@reduxjs/toolkit';

const initialState = {
      categories: {
        50: [
          { id: 1, name: '$200', color: '#B22222', image: null },
          { id: 2, name: '$20', color: '#FFD700', image: null },
          { id: 3, name: '$10', color: '#FFF8E6', image: null },
          { id: 4, name: '$5', color: '#B22222', image: null },
          { id: 5, name: 'Sugar 4LB', color: '#FFD700', image: null },
          { id: 6, name: 'Maggie Masala - 700 gm', color: '#FFF8E6', image: null },
          { id: 7, name: 'Parle - G 10pcs', color: '#B22222', image: null },
          { id: 8, name: 'Yogurt 2LB', color: '#FFD700', image: null },
          { id: 9, name: 'Bakery Product - $5', color: '#FFF8E6', image: null },
          { id: 10, name: 'Deep Naan (1pk-5 pcs)', color: '#B22222', image: null },
          { id: 11, name: 'Better Luck Next Time', color: '#FFD700', image: null },
        ],
        100: [
          { id: 1, name: '$300', color: '#B22222', image: null },
          { id: 2, name: '$50', color: '#FFD700', image: null },
          { id: 3, name: '$25', color: '#FFF8E6', image: null },
          { id: 4, name: '$10', color: '#B22222', image: null },
          { id: 5, name: 'Olivelila Oil', color: '#FFD700', image: null },
          { id: 6, name: 'Any Basmati Rice - 10 LB', color: '#FFF8E6', image: null },
          { id: 7, name: 'Rajbhog Dahi - 4 LB', color: '#B22222', image: null },
          { id: 8, name: 'Maharaja Brand Almond - 3 LB', color: '#FFD700', image: null },
          { id: 9, name: 'Any Bakery Product - $10', color: '#FFF8E6', image: null },
          { id: 10, name: 'Deep Tandoori Naan - Family PK', color: '#B22222', image: null },
          { id: 11, name: 'Better Luck Next Time', color: '#FFD700', image: null },
        ]
      },
      settings: {
        soundEnabled: true,
        animationsEnabled: true,
        hapticFeedback: true,
        labelTextSize: 18, // Default text size for wheel labels
        labelFontFamily: 'system-ui', // Default font family for wheel labels
        backgroundTheme: 'white', // Options: 'white', 'custom'
        backgroundImage: null, // URL or base64 image for custom background
        backgroundVideo: null, // URL or base64 video for custom background
        settingsPassword: '1222', // Password to access settings (default: 1222)
        recentColors: [], // Recently used colors
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
