import { APP_CONFIG, COLOR_OPTIONS } from './constants';

/**
 * Utility functions for the application
 */

// Color utilities
export const getTextColor = (backgroundColor) => {
  const bgColor = backgroundColor.toLowerCase();
  
  // For light/cream/gold backgrounds, use dark colors
  if (bgColor.includes('fff') || bgColor.includes('ffd700') || 
      bgColor.includes('ffe') || bgColor.includes('ffa') || 
      bgColor.includes('fff8e6')) {
    return '#8B0000'; // Deep maroon for light/cream backgrounds
  }
  
  // For red/dark backgrounds, use light colors
  if (bgColor.includes('b22') || bgColor.includes('red') || bgColor.includes('dark')) {
    return '#FFFFFF'; // White for red/dark backgrounds
  }
  
  // For other colors, use contrasting text
  if (bgColor.includes('blue') || bgColor.includes('green') || bgColor.includes('purple')) {
    return '#FFFFFF'; // White for colored backgrounds
  }
  
  // Default to dark color for light backgrounds
  return '#333333';
};

export const invertColor = (hexColor) => {
  const color = hexColor.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  
  // Invert RGB values
  const invertedR = 255 - r;
  const invertedG = 255 - g;
  const invertedB = 255 - b;
  
  // Convert back to hex
  const toHex = (n) => {
    const hex = n.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(invertedR)}${toHex(invertedG)}${toHex(invertedB)}`;
};

export const getColorName = (colorHex) => {
  const colorInfo = COLOR_OPTIONS.find(c => c.color.toUpperCase() === colorHex.toUpperCase());
  return colorInfo ? colorInfo.name : colorHex;
};

// Validation utilities
export const validateCategory = (category) => {
  const errors = [];
  
  if (!category.name || !category.name.trim()) {
    errors.push('Category name is required');
  }
  
  if (!category.number || category.number < APP_CONFIG.VALIDATION.MIN_RARITY_NUMBER || 
      category.number > APP_CONFIG.VALIDATION.MAX_RARITY_NUMBER) {
    errors.push(`Rarity number must be between ${APP_CONFIG.VALIDATION.MIN_RARITY_NUMBER} and ${APP_CONFIG.VALIDATION.MAX_RARITY_NUMBER}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateFileUpload = (file, type = 'image') => {
  const maxSize = type === 'video' ? APP_CONFIG.VALIDATION.MAX_VIDEO_SIZE : APP_CONFIG.VALIDATION.MAX_IMAGE_SIZE;
  
  if (file.size > maxSize) {
    const maxSizeMB = maxSize / (1024 * 1024);
    return {
      isValid: false,
      error: `File size should be less than ${maxSizeMB}MB`
    };
  }
  
  return { isValid: true };
};

// Animation utilities
export const createAnimation = (value, toValue, duration, useNativeDriver = false) => {
  return {
    toValue,
    duration,
    useNativeDriver,
  };
};

// Sound utilities
export const playSound = (type, settings) => {
  if (settings?.soundEnabled) {
    console.log(`Playing ${type} sound`);
    // Web audio implementation would go here
    // This is a placeholder for future audio implementation
  }
};

// History utilities
export const addToHistory = (history, newItem, maxItems = APP_CONFIG.HISTORY.MAX_ITEMS) => {
  const updatedHistory = [newItem, ...history];
  return updatedHistory.slice(0, maxItems);
};

// Recent colors utilities
export const addToRecentColors = (recentColors, newColor, maxColors = 12) => {
  const filtered = recentColors.filter(c => c !== newColor);
  return [newColor, ...filtered].slice(0, maxColors);
};

// Wheel calculation utilities
export const calculateWinner = (finalRotation, categories) => {
  const totalCategories = categories.length;
  const anglePerSlice = 360 / totalCategories;
  
  // Normalize rotation to 0-360 range
  const normalizedRotation = ((finalRotation % 360) + 360) % 360;
  
  // Find which segment the pointer is pointing to
  const segmentAtPointer = Math.floor((360 - normalizedRotation) % 360 / anglePerSlice);
  const winnerIndex = segmentAtPointer % totalCategories;
  
  return categories[winnerIndex];
};

// Geometry utilities for wheel
export const createPieSlice = (index, totalCategories, wheelSize) => {
  const centerX = wheelSize / 2;
  const centerY = wheelSize / 2;
  const radius = (wheelSize - 6) / 2; // Account for border
  const anglePerSlice = 360 / totalCategories;
  const startAngle = index * anglePerSlice;
  const endAngle = (index + 1) * anglePerSlice;
  
  // Convert angles to radians
  const startAngleRad = (startAngle * Math.PI) / 180;
  const endAngleRad = (endAngle * Math.PI) / 180;
  
  // Calculate start and end points
  const x1 = centerX + radius * Math.cos(startAngleRad);
  const y1 = centerY + radius * Math.sin(startAngleRad);
  const x2 = centerX + radius * Math.cos(endAngleRad);
  const y2 = centerY + radius * Math.sin(endAngleRad);
  
  // Large arc flag (1 if angle > 180 degrees, 0 otherwise)
  const largeArcFlag = anglePerSlice > 180 ? 1 : 0;
  
  // Create the path for the pie slice
  const pathData = [
    `M ${centerX} ${centerY}`,
    `L ${x1} ${y1}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
    'Z'
  ].join(' ');
  
  return pathData;
};

export const getTextPosition = (index, totalCategories, wheelSize) => {
  const centerX = wheelSize / 2;
  const centerY = wheelSize / 2;
  const radius = (wheelSize - 6) / 2;
  const anglePerSlice = 360 / totalCategories;
  const midAngle = (index * anglePerSlice) + (anglePerSlice / 2);
  const midAngleRad = (midAngle * Math.PI) / 180;
  
  // Position text at 65% of the radius for better balance
  const textRadius = radius * 0.65;
  const textX = centerX + textRadius * Math.cos(midAngleRad);
  const textY = centerY + textRadius * Math.sin(midAngleRad);
  
  return { x: textX, y: textY, angle: midAngle };
};

// Debounce utility
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle utility
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Format utilities
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString();
};

// Error handling utilities
export const handleError = (error, context = '') => {
  console.error(`Error in ${context}:`, error);
  // Could be extended to send to error tracking service
};

// Local storage utilities
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    handleError(error, 'saveToLocalStorage');
  }
};

export const loadFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    handleError(error, 'loadFromLocalStorage');
    return defaultValue;
  }
};
