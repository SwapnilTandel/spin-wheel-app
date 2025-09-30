import { APP_CONFIG } from './constants';

/**
 * Validation utilities for forms and data
 */

export const validateCategoryName = (name) => {
  if (!name || !name.trim()) {
    return { isValid: false, error: 'Category name is required' };
  }
  
  if (name.trim().length < 2) {
    return { isValid: false, error: 'Category name must be at least 2 characters' };
  }
  
  if (name.trim().length > 50) {
    return { isValid: false, error: 'Category name must be less than 50 characters' };
  }
  
  return { isValid: true };
};

export const validateRarityNumber = (number) => {
  const num = parseInt(number);
  
  if (isNaN(num)) {
    return { isValid: false, error: 'Rarity number must be a valid number' };
  }
  
  if (num < APP_CONFIG.VALIDATION.MIN_RARITY_NUMBER || num > APP_CONFIG.VALIDATION.MAX_RARITY_NUMBER) {
    return { 
      isValid: false, 
      error: `Rarity number must be between ${APP_CONFIG.VALIDATION.MIN_RARITY_NUMBER} and ${APP_CONFIG.VALIDATION.MAX_RARITY_NUMBER}` 
    };
  }
  
  return { isValid: true };
};

export const validateColor = (color) => {
  if (!color) {
    return { isValid: false, error: 'Color is required' };
  }
  
  // Basic hex color validation
  const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (!hexColorRegex.test(color)) {
    return { isValid: false, error: 'Color must be a valid hex color' };
  }
  
  return { isValid: true };
};

export const validateCategory = (category) => {
  const errors = [];
  
  const nameValidation = validateCategoryName(category.name);
  if (!nameValidation.isValid) {
    errors.push(nameValidation.error);
  }
  
  const numberValidation = validateRarityNumber(category.number);
  if (!numberValidation.isValid) {
    errors.push(numberValidation.error);
  }
  
  const colorValidation = validateColor(category.color);
  if (!colorValidation.isValid) {
    errors.push(colorValidation.error);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateFileUpload = (file, type = 'image') => {
  if (!file) {
    return { isValid: false, error: 'No file selected' };
  }
  
  const maxSize = type === 'video' ? APP_CONFIG.VALIDATION.MAX_VIDEO_SIZE : APP_CONFIG.VALIDATION.MAX_IMAGE_SIZE;
  
  if (file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / (1024 * 1024));
    return {
      isValid: false,
      error: `File size must be less than ${maxSizeMB}MB`
    };
  }
  
  // Validate file type
  if (type === 'image') {
    if (!file.type.startsWith('image/')) {
      return { isValid: false, error: 'File must be an image' };
    }
  } else if (type === 'video') {
    if (!file.type.startsWith('video/')) {
      return { isValid: false, error: 'File must be a video' };
    }
  }
  
  return { isValid: true };
};

export const validatePassword = (password) => {
  if (!password) {
    return { isValid: true }; // Password is optional
  }
  
  if (password.length < 4) {
    return { isValid: false, error: 'Password must be at least 4 characters' };
  }
  
  if (password.length > 20) {
    return { isValid: false, error: 'Password must be less than 20 characters' };
  }
  
  return { isValid: true };
};

export const validateSettings = (settings) => {
  const errors = [];
  
  // Validate text size
  if (settings.labelTextSize && (settings.labelTextSize < 10 || settings.labelTextSize > 50)) {
    errors.push('Text size must be between 10 and 50');
  }
  
  // Validate font family
  const validFonts = ['system-ui', 'Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana', 'Courier New', 'Trebuchet MS', 'Impact', 'Comic Sans MS', 'serif', 'sans-serif', 'monospace', 'cursive', 'fantasy'];
  if (settings.labelFontFamily && !validFonts.includes(settings.labelFontFamily)) {
    errors.push('Invalid font family');
  }
  
  // Validate background theme
  const validThemes = ['white', 'custom'];
  if (settings.backgroundTheme && !validThemes.includes(settings.backgroundTheme)) {
    errors.push('Invalid background theme');
  }
  
  // Validate password
  const passwordValidation = validatePassword(settings.settingsPassword);
  if (!passwordValidation.isValid) {
    errors.push(passwordValidation.error);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateWheelCategories = (categories) => {
  if (!categories || !Array.isArray(categories)) {
    return { isValid: false, error: 'Categories must be an array' };
  }
  
  if (categories.length < APP_CONFIG.VALIDATION.MIN_CATEGORIES) {
    return { 
      isValid: false, 
      error: `You need at least ${APP_CONFIG.VALIDATION.MIN_CATEGORIES} categories to spin the wheel` 
    };
  }
  
  if (categories.length > APP_CONFIG.VALIDATION.MAX_CATEGORIES) {
    return { 
      isValid: false, 
      error: `You can have at most ${APP_CONFIG.VALIDATION.MAX_CATEGORIES} categories` 
    };
  }
  
  // Validate each category
  for (let i = 0; i < categories.length; i++) {
    const categoryValidation = validateCategory(categories[i]);
    if (!categoryValidation.isValid) {
      return { 
        isValid: false, 
        error: `Category ${i + 1}: ${categoryValidation.errors.join(', ')}` 
      };
    }
  }
  
  return { isValid: true };
};

// Form validation helpers
export const createFormValidator = (rules) => {
  return (data) => {
    const errors = {};
    
    Object.keys(rules).forEach(field => {
      const rule = rules[field];
      const value = data[field];
      
      if (rule.required && (!value || (typeof value === 'string' && !value.trim()))) {
        errors[field] = rule.message || `${field} is required`;
        return;
      }
      
      if (value && rule.validator) {
        const validation = rule.validator(value);
        if (!validation.isValid) {
          errors[field] = validation.error;
        }
      }
    });
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };
};

// Common validation rules
export const VALIDATION_RULES = {
  categoryName: {
    required: true,
    validator: validateCategoryName,
    message: 'Category name is required'
  },
  rarityNumber: {
    required: true,
    validator: validateRarityNumber,
    message: 'Rarity number is required'
  },
  color: {
    required: true,
    validator: validateColor,
    message: 'Color is required'
  },
  password: {
    required: false,
    validator: validatePassword
  }
};
