import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSpinning } from '../store/slices/wheelSlice';
import { addToHistory } from '../store/slices/historySlice';
import { playSound, calculateWinner } from '../utils/helpers';
import { APP_CONFIG } from '../utils/constants';

/**
 * Custom hook for managing wheel spinning logic
 */
export const useWheelSpin = (wheelValue, onSpinComplete) => {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.categories);
  const { isSpinning } = useSelector(state => state.wheel);
  
  const [winner, setWinner] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isColorToggling, setIsColorToggling] = useState(false);
  const [isKeyboardSpinning, setIsKeyboardSpinning] = useState(false);
  const [canStopSpin, setCanStopSpin] = useState(false);
  const [userRequestedStop, setUserRequestedStop] = useState(false);
  const [stopButtonPressed, setStopButtonPressed] = useState(false);
  const [spinStartTime, setSpinStartTime] = useState(0);
  
  const spinAnimationId = useRef(null);
  const isStopping = useRef(false);
  const targetRotation = useRef(0);


  const handleStartSpin = useCallback(() => {
    if (isSpinning) return;
    
    const wheelCategories = categories[wheelValue];
    if (wheelCategories.length < APP_CONFIG.VALIDATION.MIN_CATEGORIES) {
      alert('Error: Please add at least 2 categories to spin the wheel!');
      return;
    }
    
    dispatch(setSpinning(true));
    setIsKeyboardSpinning(true);
    setCanStopSpin(false); // Disable stop for 3 seconds
    setSpinStartTime(Date.now());
    setWinner(null);
    setUserRequestedStop(false);
    setStopButtonPressed(false);
    
    // Enable stop after 3 seconds
    setTimeout(() => {
      setCanStopSpin(true);
    }, 3000);
    
    // Play ticking sound
    playSound('tick');
  }, [isSpinning, categories, wheelValue, dispatch]);

  const handleStopSpin = useCallback(() => {
    if (!isSpinning || !canStopSpin) return;
    
    // Set user requested stop first, then stop spinning
    setUserRequestedStop(true);
    setStopButtonPressed(true);
    dispatch(setSpinning(false));
    setIsKeyboardSpinning(false);
    setCanStopSpin(false);
  }, [isSpinning, canStopSpin, dispatch]);

  const handleSpinComplete = useCallback((selectedCategory) => {
    console.log('handleSpinComplete called with:', selectedCategory);
    
    // Stop spinning first
    dispatch(setSpinning(false));
    setIsKeyboardSpinning(false);
    
    // Set selected category and start color toggling
    setSelectedCategory(selectedCategory);
    setIsColorToggling(true);
    
    // Play win sound
    playSound('win');
    
    // Add to history
    dispatch(addToHistory({
      wheelValue,
      category: selectedCategory,
    }));
    
    // Stop toggling after 3 seconds and set winner
    setTimeout(() => {
      setIsColorToggling(false);
      setSelectedCategory(null); // Revert background color
      setWinner(selectedCategory);
    }, APP_CONFIG.ANIMATION.COLOR_TOGGLE_DURATION);
  }, [dispatch, wheelValue]);

  const resetWheel = useCallback(() => {
    setWinner(null);
    setSelectedCategory(null);
    setIsColorToggling(false);
    setCanStopSpin(false);
    setUserRequestedStop(false);
    setStopButtonPressed(false);
    dispatch(setSpinning(false));
  }, [dispatch]);

  return {
    // State
    isSpinning,
    winner,
    selectedCategory,
    isColorToggling,
    isKeyboardSpinning,
    canStopSpin,
    userRequestedStop,
    stopButtonPressed,
    
    // Actions
    handleStartSpin,
    handleStopSpin,
    handleSpinComplete,
    resetWheel,
    
    // Animation refs
    spinAnimationId,
    isStopping,
    targetRotation,
  };
};
