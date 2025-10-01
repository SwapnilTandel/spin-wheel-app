// Application constants
export const APP_CONFIG = {
  WHEEL_SIZES: {
    SMALL: 50,
    LARGE: 100,
  },
  CENTER_LOGO_SIZE: 80,
  ANIMATION: {
    SPIN_DURATION: 2000,
    FAB_ANIMATION_DURATION: 200,
    MODAL_ANIMATION_DURATION: 500,
    COLOR_TOGGLE_INTERVAL: 500,
    COLOR_TOGGLE_DURATION: 3000,
  },
  VALIDATION: {
    MIN_CATEGORIES: 2,
    MAX_CATEGORIES: 50,
    MIN_RARITY_NUMBER: 1,
    MAX_RARITY_NUMBER: 100,
    MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
    MAX_VIDEO_SIZE: 50 * 1024 * 1024, // 50MB
  },
  HISTORY: {
    MAX_ITEMS: 50,
  },
  COLORS: {
    PRIMARY: '#B22222',
    SECONDARY: '#FFD700',
    ACCENT: '#FFF8E6',
    WHITE: '#FFFFFF',
    BLACK: '#000000',
    GRAY: '#666666',
    LIGHT_GRAY: '#CCCCCC',
  },
};

export const THEME_COLORS = {
  PRIMARY: '#B22222',
  SECONDARY: '#FFD700',
  ACCENT: '#FFF8E6',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GRAY: '#666666',
  LIGHT_GRAY: '#CCCCCC',
  DARK_GRAY: '#333333',
  SUCCESS: '#4CAF50',
  ERROR: '#f44336',
  WARNING: '#FF9800',
  INFO: '#2196F3',
};

export const FONT_FAMILIES = [
  { value: 'system-ui', label: 'System UI' },
  { value: 'Arial', label: 'Arial' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Verdana', label: 'Verdana' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Trebuchet MS', label: 'Trebuchet MS' },
  { value: 'Impact', label: 'Impact' },
  { value: 'Comic Sans MS', label: 'Comic Sans MS' },
  { value: 'serif', label: 'Serif' },
  { value: 'sans-serif', label: 'Sans Serif' },
  { value: 'monospace', label: 'Monospace' },
  { value: 'cursive', label: 'Cursive' },
  { value: 'fantasy', label: 'Fantasy' },
];

export const COLOR_OPTIONS = [
  // Primary Maharaja theme colors
  { color: '#B22222', name: 'Fire Brick' },
  { color: '#FFD700', name: 'Gold' },
  { color: '#FFF8E6', name: 'Cream' },
  { color: '#FFFFFF', name: 'White' },
  // Vibrant colors
  { color: '#FF6B6B', name: 'Coral Red' },
  { color: '#4ECDC4', name: 'Turquoise' },
  { color: '#45B7D1', name: 'Sky Blue' },
  { color: '#96CEB4', name: 'Mint' },
  { color: '#FF9F43', name: 'Orange' },
  { color: '#10AC84', name: 'Emerald' },
  { color: '#5F27CD', name: 'Purple' },
  { color: '#00D2D3', name: 'Cyan' },
  // Blue tones
  { color: '#0066CC', name: 'Royal Blue' },
  { color: '#3366FF', name: 'Blue' },
  { color: '#0099FF', name: 'Azure' },
  { color: '#00CCFF', name: 'Light Blue' },
  { color: '#0066FF', name: 'Bright Blue' },
  { color: '#3399FF', name: 'Dodger Blue' },
  { color: '#66CCFF', name: 'Sky' },
  { color: '#99DDFF', name: 'Pale Blue' },
  // Green tones
  { color: '#00CC66', name: 'Sea Green' },
  { color: '#33FF99', name: 'Spring Green' },
  { color: '#66FFCC', name: 'Aquamarine' },
  { color: '#99FFDD', name: 'Pale Green' },
  { color: '#009966', name: 'Jade' },
  { color: '#00FF99', name: 'Mint Green' },
  { color: '#33CC99', name: 'Teal' },
  { color: '#66FF99', name: 'Light Green' },
  // Red tones
  { color: '#FF3366', name: 'Rose' },
  { color: '#FF6699', name: 'Pink Red' },
  { color: '#FF99CC', name: 'Light Pink' },
  { color: '#FFCCDD', name: 'Blush' },
  { color: '#CC0033', name: 'Crimson' },
  { color: '#FF0033', name: 'Red' },
  { color: '#FF69B4', name: 'Hot Pink' },
  // Purple tones
  { color: '#9966FF', name: 'Violet' },
  { color: '#CC99FF', name: 'Lavender' },
  { color: '#DDCCFF', name: 'Lilac' },
  { color: '#EEEEFF', name: 'Pale Purple' },
  { color: '#6633CC', name: 'Indigo' },
  { color: '#9933FF', name: 'Purple' },
  { color: '#CC66FF', name: 'Orchid' },
  { color: '#DD99FF', name: 'Mauve' },
  // Orange tones
  { color: '#FF6633', name: 'Coral' },
  { color: '#FF9966', name: 'Peach' },
  { color: '#FFCC99', name: 'Apricot' },
  { color: '#FFDDCC', name: 'Pale Orange' },
  { color: '#FF3300', name: 'Orange Red' },
  { color: '#FF6600', name: 'Bright Orange' },
  { color: '#FF9900', name: 'Amber' },
  { color: '#FFCC00', name: 'Yellow Orange' },
  // Pink tones
  { color: '#FF33CC', name: 'Magenta' },
  { color: '#FF66DD', name: 'Pink' },
  { color: '#FF99EE', name: 'Light Magenta' },
  { color: '#FFCCFF', name: 'Pale Pink' },
  { color: '#CC0099', name: 'Deep Pink' },
  { color: '#FF00CC', name: 'Fuchsia' },
  { color: '#FF33DD', name: 'Hot Magenta' },
  { color: '#FF66EE', name: 'Bright Pink' },
  // Yellow tones
  { color: '#FFFF00', name: 'Yellow' },
  { color: '#FFFF33', name: 'Bright Yellow' },
  { color: '#FFFF66', name: 'Light Yellow' },
  { color: '#FFFF99', name: 'Pale Yellow' },
  { color: '#FFC107', name: 'Golden Yellow' },
  { color: '#FFDD33', name: 'Canary' },
  { color: '#FFEE66', name: 'Lemon' },
  { color: '#FFFFCC', name: 'Cream Yellow' },
  // Dark colors
  { color: '#333333', name: 'Dark Gray' },
  { color: '#666666', name: 'Gray' },
  { color: '#999999', name: 'Silver' },
  { color: '#CCCCCC', name: 'Light Gray' },
  { color: '#000000', name: 'Black' },
  { color: '#1A1A1A', name: 'Almost Black' },
  { color: '#333366', name: 'Dark Blue' },
  { color: '#663333', name: 'Dark Brown' },
  // Light colors
  { color: '#F0F0F0', name: 'Off White' },
  { color: '#F5F5F5', name: 'White Smoke' },
  { color: '#FAFAFA', name: 'Snow' },
  { color: '#E6F3FF', name: 'Alice Blue' },
  { color: '#F0F8FF', name: 'Azure White' },
  { color: '#FFF8DC', name: 'Cornsilk' },
  { color: '#F5FFFA', name: 'Mint Cream' }
];

export const DEFAULT_SETTINGS = {
  soundEnabled: true,
  animationsEnabled: true,
  hapticFeedback: true,
  labelTextSize: 18,
  labelFontFamily: 'system-ui',
  backgroundTheme: 'white',
  backgroundImage: null,
  backgroundVideo: null,
  settingsPassword: '',
  recentColors: [],
};

export const DEFAULT_CATEGORIES = {
  50: [
    { id: 1, name: '$200', color: '#B22222', image: null, number: 1 },
    { id: 2, name: '$20', color: '#FFD700', image: null, number: 10 },
    { id: 3, name: '$10', color: '#FFF8E6', image: null, number: 20 },
    { id: 4, name: '$5', color: '#B22222', image: null, number: 30 },
    { id: 5, name: 'Sugar 4LB', color: '#FFD700', image: null, number: 40 },
    { id: 6, name: 'Maggie Masala - 700 gm', color: '#FFF8E6', image: null, number: 50 },
    { id: 7, name: 'Parle - G 10pcs', color: '#B22222', image: null, number: 60 },
    { id: 8, name: 'Yogurt 2LB', color: '#FFD700', image: null, number: 70 },
    { id: 9, name: 'Bakery Product - $5', color: '#FFF8E6', image: null, number: 80 },
    { id: 10, name: 'Deep Naan (1pk-5 pcs)', color: '#B22222', image: null, number: 90 },
    { id: 11, name: 'Better Luck Next Time', color: '#FFD700', image: null, number: 100 },
  ],
  100: [
    { id: 1, name: '$300', color: '#B22222', image: null, number: 1 },
    { id: 2, name: '$50', color: '#FFD700', image: null, number: 10 },
    { id: 3, name: '$25', color: '#FFF8E6', image: null, number: 20 },
    { id: 4, name: '$10', color: '#B22222', image: null, number: 30 },
    { id: 5, name: 'Olivelila Oil', color: '#FFD700', image: null, number: 40 },
    { id: 6, name: 'Any Basmati Rice - 10 LB', color: '#FFF8E6', image: null, number: 50 },
    { id: 7, name: 'Rajbhog Dahi - 4 LB', color: '#B22222', image: null, number: 60 },
    { id: 8, name: 'Maharaja Brand Almond - 3 LB', color: '#FFD700', image: null, number: 70 },
    { id: 9, name: 'Any Bakery Product - $10', color: '#FFF8E6', image: null, number: 80 },
    { id: 10, name: 'Deep Tandoori Naan - Family PK', color: '#B22222', image: null, number: 90 },
    { id: 11, name: 'Better Luck Next Time', color: '#FFD700', image: null, number: 100 },
  ]
};

export const KEYBOARD_SHORTCUTS = {
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  SPACE: ' ',
};
