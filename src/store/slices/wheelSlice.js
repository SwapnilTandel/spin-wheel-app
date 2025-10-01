import { createSlice } from '@reduxjs/toolkit';

const initialState = {
      categories: {
        50: [
          { id: 1, name: '$200', color: '#FF6B35', image: null, number: 1 }, // Diwali Orange
          { id: 2, name: '$20', color: '#FFD700', image: null, number: 10 }, // Gold
          { id: 3, name: '$10', color: '#4B0082', image: null, number: 20 }, // Indigo
          { id: 4, name: '$5', color: '#FF1493', image: null, number: 30 }, // Deep Pink
          { id: 5, name: 'Sugar 4LB', color: '#32CD32', image: null, number: 40 }, // Lime Green
          { id: 6, name: 'Maggie Masala - 700 gm', color: '#FF8C00', image: null, number: 50 }, // Deep Orange
          { id: 7, name: 'Parle - G 10pcs', color: '#00BFFF', image: null, number: 60 }, // Deep Sky Blue
          { id: 8, name: 'Yogurt 2LB', color: '#FFA500', image: null, number: 70 }, // Saffron
          { id: 9, name: 'Bakery Product - $5', color: '#8A2BE2', image: null, number: 80 }, // Blue Violet
          { id: 10, name: 'Deep Naan (1pk-5 pcs)', color: '#FF6347', image: null, number: 90 }, // Tomato
          { id: 11, name: 'Better Luck Next Time', color: '#228B22', image: null, number: 100 }, // Forest Green
        ],
        100: [
          { id: 1, name: '$300', color: '#FF6B35', image: null, number: 1 }, // Diwali Orange
          { id: 2, name: '$50', color: '#FFD700', image: null, number: 10 }, // Gold
          { id: 3, name: '$25', color: '#4B0082', image: null, number: 20 }, // Indigo
          { id: 4, name: '$10', color: '#FF1493', image: null, number: 30 }, // Deep Pink
          { id: 5, name: 'Olivelila Oil', color: '#32CD32', image: null, number: 40 }, // Lime Green
          { id: 6, name: 'Any Basmati Rice - 10 LB', color: '#FF8C00', image: null, number: 50 }, // Deep Orange
          { id: 7, name: 'Rajbhog Dahi - 4 LB', color: '#00BFFF', image: null, number: 60 }, // Deep Sky Blue
          { id: 8, name: 'Maharaja Brand Almond - 3 LB', color: '#FFA500', image: null, number: 70 }, // Saffron
          { id: 9, name: 'Any Bakery Product - $10', color: '#8A2BE2', image: null, number: 80 }, // Blue Violet
          { id: 10, name: 'Deep Tandoori Naan - Family PK', color: '#FF6347', image: null, number: 90 }, // Tomato
          { id: 11, name: 'Better Luck Next Time', color: '#228B22', image: null, number: 100 }, // Forest Green
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
        settingsPassword: '', // Password to access settings (empty = no protection)
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
        number: category.number || 50,
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
    moveCategory: (state, action) => {
      const { wheelValue, categoryId, direction } = action.payload;
      const categories = state.categories[wheelValue];
      const currentIndex = categories.findIndex(cat => cat.id === categoryId);
      
      if (currentIndex === -1) return;
      
      let newIndex;
      if (direction === 'up') {
        newIndex = currentIndex - 1;
        if (newIndex < 0) return; // Already at top
      } else if (direction === 'down') {
        newIndex = currentIndex + 1;
        if (newIndex >= categories.length) return; // Already at bottom
      }
      
      // Swap the categories
      const newCategories = [...categories];
      [newCategories[currentIndex], newCategories[newIndex]] = [newCategories[newIndex], newCategories[currentIndex]];
      state.categories[wheelValue] = newCategories;
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
  moveCategory,
  updateSettings,
  addToHistory,
  setSpinning,
  setLastResult,
} = wheelSlice.actions;

export default wheelSlice.reducer;
