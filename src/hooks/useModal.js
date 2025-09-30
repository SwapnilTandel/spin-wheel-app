import { useState, useRef, useCallback } from 'react';
import { Animated } from 'react-native';
import { createModalEnterAnimation, createModalExitAnimation } from '../utils/animations';

/**
 * Custom hook for managing modal state and animations
 */
export const useModal = (initialVisible = false) => {
  const [isVisible, setIsVisible] = useState(initialVisible);
  const scaleValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;

  const showModal = useCallback(() => {
    setIsVisible(true);
    createModalEnterAnimation(scaleValue, opacityValue).start();
  }, [scaleValue, opacityValue]);

  const hideModal = useCallback(() => {
    createModalExitAnimation(scaleValue, opacityValue).start(() => {
      setIsVisible(false);
    });
  }, [scaleValue, opacityValue]);

  const toggleModal = useCallback(() => {
    if (isVisible) {
      hideModal();
    } else {
      showModal();
    }
  }, [isVisible, showModal, hideModal]);

  return {
    isVisible,
    showModal,
    hideModal,
    toggleModal,
    scaleValue,
    opacityValue,
  };
};
