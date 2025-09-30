import { Animated } from 'react-native';
import { APP_CONFIG } from './constants';

/**
 * Animation utilities and presets
 */

export const createFadeInAnimation = (value, duration = APP_CONFIG.ANIMATION.MODAL_ANIMATION_DURATION) => {
  return Animated.timing(value, {
    toValue: 1,
    duration,
    useNativeDriver: false,
  });
};

export const createFadeOutAnimation = (value, duration = APP_CONFIG.ANIMATION.MODAL_ANIMATION_DURATION) => {
  return Animated.timing(value, {
    toValue: 0,
    duration,
    useNativeDriver: false,
  });
};

export const createScaleAnimation = (value, toValue = 1, duration = APP_CONFIG.ANIMATION.MODAL_ANIMATION_DURATION) => {
  return Animated.timing(value, {
    toValue,
    duration,
    useNativeDriver: false,
  });
};

export const createFABAnimation = (value, toValue, duration = APP_CONFIG.ANIMATION.FAB_ANIMATION_DURATION) => {
  return Animated.timing(value, {
    toValue,
    duration,
    useNativeDriver: false,
  });
};

export const createParallelAnimation = (animations) => {
  return Animated.parallel(animations);
};

export const createSequenceAnimation = (animations) => {
  return Animated.sequence(animations);
};

export const createStaggeredAnimation = (animations, stagger = 100) => {
  return Animated.stagger(stagger, animations);
};

// Modal animations
export const createModalEnterAnimation = (scaleValue, opacityValue) => {
  return createParallelAnimation([
    createScaleAnimation(scaleValue, 1),
    createFadeInAnimation(opacityValue),
  ]);
};

export const createModalExitAnimation = (scaleValue, opacityValue) => {
  return createParallelAnimation([
    createScaleAnimation(scaleValue, 0),
    createFadeOutAnimation(opacityValue),
  ]);
};

// Wheel animations
export const createWheelSpinAnimation = (rotation, duration = APP_CONFIG.ANIMATION.SPIN_DURATION) => {
  return Animated.timing(rotation, {
    toValue: rotation._value + 360 * 5, // 5 full rotations
    duration,
    useNativeDriver: false,
  });
};

export const createWheelDecelerationAnimation = (rotation, finalAngle) => {
  return Animated.timing(rotation, {
    toValue: finalAngle,
    duration: APP_CONFIG.ANIMATION.SPIN_DURATION,
    useNativeDriver: false,
  });
};

// Color toggle animation
export const createColorToggleAnimation = (callback, interval = APP_CONFIG.ANIMATION.COLOR_TOGGLE_INTERVAL) => {
  return setInterval(callback, interval);
};

// Celebration animations
export const createCelebrationAnimation = (scaleValue, opacityValue) => {
  const bounceAnimation = Animated.sequence([
    Animated.timing(scaleValue, {
      toValue: 1.2,
      duration: 200,
      useNativeDriver: false,
    }),
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }),
  ]);

  return createParallelAnimation([
    bounceAnimation,
    createFadeInAnimation(opacityValue),
  ]);
};

// Utility to reset animation values
export const resetAnimationValues = (...values) => {
  values.forEach(value => {
    if (value && typeof value.setValue === 'function') {
      value.setValue(0);
    }
  });
};

// Utility to create interpolated animations
export const createInterpolatedAnimation = (value, inputRange, outputRange) => {
  return value.interpolate({
    inputRange,
    outputRange,
    extrapolate: 'clamp',
  });
};

// Predefined animation presets
export const ANIMATION_PRESETS = {
  FADE_IN: {
    opacity: 1,
    duration: APP_CONFIG.ANIMATION.MODAL_ANIMATION_DURATION,
  },
  FADE_OUT: {
    opacity: 0,
    duration: APP_CONFIG.ANIMATION.MODAL_ANIMATION_DURATION,
  },
  SCALE_IN: {
    scale: 1,
    duration: APP_CONFIG.ANIMATION.MODAL_ANIMATION_DURATION,
  },
  SCALE_OUT: {
    scale: 0,
    duration: APP_CONFIG.ANIMATION.MODAL_ANIMATION_DURATION,
  },
  BOUNCE: {
    scale: 1.2,
    duration: 200,
  },
  FAB_EXPAND: {
    scale: 1,
    duration: APP_CONFIG.ANIMATION.FAB_ANIMATION_DURATION,
  },
  FAB_COLLAPSE: {
    scale: 0,
    duration: APP_CONFIG.ANIMATION.FAB_ANIMATION_DURATION,
  },
};
