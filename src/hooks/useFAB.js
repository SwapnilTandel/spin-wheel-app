import { useState, useRef, useCallback } from 'react';
import { Animated } from 'react-native';
import { createFABAnimation } from '../utils/animations';
import { APP_CONFIG } from '../utils/constants';

/**
 * Custom hook for managing Floating Action Button state and animations
 */
export const useFAB = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const fabAnimation = useRef(new Animated.Value(0)).current;

  const toggleFAB = useCallback(() => {
    const toValue = isExpanded ? 0 : 1;
    setIsExpanded(!isExpanded);
    
    createFABAnimation(fabAnimation, toValue).start();
  }, [isExpanded, fabAnimation]);

  const expandFAB = useCallback(() => {
    if (!isExpanded) {
      setIsExpanded(true);
      createFABAnimation(fabAnimation, 1).start();
    }
  }, [isExpanded, fabAnimation]);

  const collapseFAB = useCallback(() => {
    if (isExpanded) {
      setIsExpanded(false);
      createFABAnimation(fabAnimation, 0).start();
    }
  }, [isExpanded, fabAnimation]);

  return {
    isExpanded,
    fabAnimation,
    toggleFAB,
    expandFAB,
    collapseFAB,
  };
};
