import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_CATEGORIES } from '../../utils/constants';

const initialState = {
  categories: DEFAULT_CATEGORIES,
};

const categoriesSlice = createSlice({
  name: 'categories',
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
    resetCategories: (state) => {
      state.categories = DEFAULT_CATEGORIES;
    },
  },
});

export const {
  addCategory,
  removeCategory,
  updateCategory,
  moveCategory,
  resetCategories,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
