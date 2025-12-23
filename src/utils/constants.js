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
  
  // Diwali Festival Colors - Traditional and Vibrant
  { color: '#FF6B35', name: 'Diwali Orange' },
  { color: '#FF8C00', name: 'Deep Orange' },
  { color: '#FFA500', name: 'Saffron' },
  { color: '#FFD700', name: 'Gold' },
  { color: '#FFE135', name: 'Bright Gold' },
  { color: '#FF1493', name: 'Deep Pink' },
  { color: '#FF69B4', name: 'Hot Pink' },
  { color: '#FFB6C1', name: 'Light Pink' },
  { color: '#DC143C', name: 'Crimson' },
  { color: '#B22222', name: 'Fire Brick' },
  { color: '#8B0000', name: 'Dark Red' },
  { color: '#FF4500', name: 'Orange Red' },
  
  // Desi Community Colors - Rich and Cultural
  { color: '#4B0082', name: 'Indigo' },
  { color: '#6A0DAD', name: 'Purple' },
  { color: '#8A2BE2', name: 'Blue Violet' },
  { color: '#9370DB', name: 'Medium Purple' },
  { color: '#BA55D3', name: 'Medium Orchid' },
  { color: '#DDA0DD', name: 'Plum' },
  { color: '#EE82EE', name: 'Violet' },
  { color: '#FF00FF', name: 'Magenta' },
  
  // Traditional Indian Colors
  { color: '#228B22', name: 'Forest Green' },
  { color: '#32CD32', name: 'Lime Green' },
  { color: '#00FF7F', name: 'Spring Green' },
  { color: '#00CED1', name: 'Dark Turquoise' },
  { color: '#20B2AA', name: 'Light Sea Green' },
  { color: '#00BFFF', name: 'Deep Sky Blue' },
  { color: '#1E90FF', name: 'Dodger Blue' },
  { color: '#4169E1', name: 'Royal Blue' },
  { color: '#0000CD', name: 'Medium Blue' },
  { color: '#000080', name: 'Navy' },
  
  // Rangoli Colors - Bright and Festive
  { color: '#FF6347', name: 'Tomato' },
  { color: '#FF7F50', name: 'Coral' },
  { color: '#FFA07A', name: 'Light Salmon' },
  { color: '#FFDAB9', name: 'Peach Puff' },
  { color: '#F0E68C', name: 'Khaki' },
  { color: '#FFFFE0', name: 'Light Yellow' },
  { color: '#98FB98', name: 'Pale Green' },
  { color: '#90EE90', name: 'Light Green' },
  { color: '#87CEEB', name: 'Sky Blue' },
  { color: '#B0C4DE', name: 'Light Steel Blue' },
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


export const DEFAULT_CATEGORIES = {
  50: [
    { id: 1, name: 'Shezan Mango Juice 250ml*6', color: '#FF6B35', image: null, number: 80 }, // Diwali Orange
    { id: 2, name: '$5', color: '#FFD700', image: null, number: 10 }, // Gold
    { id: 3, name: 'Vital 125 Tea Bag', color: '#4B0082', image: null, number: 70 }, // Indigo
    { id: 4, name: '$10', color: '#FF1493', image: null, number: 30 }, // Deep Pink
    { id: 5, name: 'Maharaja Brown Sugar 4LB', color: '#32CD32', image: null, number: 60 }, // Lime Green
    { id: 6, name: '$20', color: '#FF8C00', image: null, number: 80 }, // Deep Orange
    { id: 7, name: 'Nescafé Coffee 200GM', color: '#00BFFF', image: null, number: 60 }, // Deep Sky Blue
    { id: 8, name: 'Shudh Basmati Rice 10LB', color: '#FFA500', image: null, number: 70 }, // Saffron
    { id: 9, name: '$200', color: '#8A2BE2', image: null, number: 1 }, // Blue Violet
    { id: 10, name: 'Maharaja Cashew 1.80LB', color: '#FF6347', image: null, number: 90 }, // Tomato
    { id: 11, name: 'Parle G 10Pcs', color: '#228B22', image: null, number: 100 }, // Forest Green
  ],
  100: [
    { id: 1, name: 'Sun Delight Cup Dates 24oz', color: '#FF6B35', image: null, number: 80 }, // Diwali Orange
    { id: 2, name: 'Shezan Mango Juice', color: '#FFD700', image: null, number: 80 }, // Gold
    { id: 3, name: 'Bournvita 1kg', color: '#4B0082', image: null, number: 80 }, // Indigo
    { id: 4, name: 'Shudh Hot&Sweet Sauce 1kg', color: '#FF1493', image: null, number: 80 }, // Deep Pink
    { id: 5, name: 'Fresh Baked Plum Cake 500gm', color: '#32CD32', image: null, number: 80 }, // Lime Green
    { id: 6, name: 'Antepli Baklava 1Lb', color: '#FF8C00', image: null, number: 80 }, // Deep Orange
    { id: 7, name: 'Maharaja Cashew Whole 1.80Lb', color: '#00BFFF', image: null, number: 80 }, // Deep Sky Blue
    { id: 8, name: 'Maharaja Almonds 2lb', color: '#FFA500', image: null, number: 80 }, // Saffron
    { id: 9, name: 'Maggie Noodles 560gm', color: '#8A2BE2', image: null, number: 80 }, // Blue Violet
    { id: 10, name: 'Shudh Mixed Fruit Jam 450gm', color: '#FF6347', image: null, number: 80 }, // Tomato
    { id: 11, name: 'Gummy Rush 6.17oz', color: '#228B22', image: null, number: 80 }, // Forest Green
  ]
};

export const DEFAULT_SETTINGS = {
  soundEnabled: true,
  animationsEnabled: true,
  hapticFeedback: true,
  labelTextSize: 18, // Default text size for wheel labels
  labelFontFamily: 'system-ui', // Default font family for wheel labels
  backgroundTheme: 'white', // Options: 'white', 'custom'
  backgroundImage: null, // URL or base64 image for custom background
  backgroundVideo: null, // URL or base64 video for custom background
  recentColors: [], // Recently used colors
};

export const KEYBOARD_SHORTCUTS = {
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  SPACE: ' ',
};
