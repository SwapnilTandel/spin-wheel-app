import { useState, useRef, useEffect, useCallback } from 'react';
import { Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setSpinning, setLastResult, addToHistory } from '../store/slices/wheelSlice';

/**
 * Custom hook for managing wheel state logic
 * Extracted from SpinWheelScreen component to separate concerns
 */
export const useWheelState = ({ value, onReset }) => {
  const dispatch = useDispatch();
  const { categories, isSpinning } = useSelector(state => state.wheel);
  
  // Get the correct categories for the current wheel value
  const currentCategories = categories[value] || categories[50] || [];
  
  // State management
  const [winner, setWinner] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isColorToggling, setIsColorToggling] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isKeyboardSpinning, setIsKeyboardSpinning] = useState(false);
  const [canStopSpin, setCanStopSpin] = useState(false);
  const [userRequestedStop, setUserRequestedStop] = useState(false);
  const [stopButtonPressed, setStopButtonPressed] = useState(false);
  const [spinStartTime, setSpinStartTime] = useState(0);
  
  // Animation refs
  const modalScale = useRef(new Animated.Value(0)).current;
  const modalOpacity = useRef(new Animated.Value(0)).current;
  const wheelResetRef = useRef(null);

  // Handle reset functionality
  const handleReset = useCallback(() => {
    setWinner(null);
    setShowCelebrationModal(false);
    setShowAlert(false);
    setCanStopSpin(false);
    setUserRequestedStop(false);
    setStopButtonPressed(false);
    // Reset any spinning state
    dispatch(setSpinning(false));
    // Force component re-render to reset label orientation
    setResetKey(prev => prev + 1);
  }, [dispatch]);

  // Expose reset function to parent component
  useEffect(() => {
    if (onReset && onReset.current !== undefined) {
      onReset.current = handleReset;
    }
  }, [onReset, handleReset]);

  // Handle spin completion
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
    
    // Add to local history
    dispatch(addToHistory({
      wheelValue: value,
      category: selectedCategory,
    }));
    
    // Stop toggling after 3 seconds and set winner
    setTimeout(() => {
      setIsColorToggling(false);
      setSelectedCategory(null); // Revert background color
      setWinner(selectedCategory);
      console.log('Winner set, modal should appear');
    }, 3000);
  }, [dispatch, value]);

  // Play sound function
  const playSound = (type) => {
    console.log(`Playing ${type} sound`);
    // Web audio implementation would go here
  };

  // Handle start spin
  const handleStartSpin = useCallback(() => {
    if (isSpinning) return;

    console.log('Starting spin');
    dispatch(setSpinning(true));
    setIsKeyboardSpinning(true);
    setCanStopSpin(false); // Disable stop for 3 seconds
    setSpinStartTime(Date.now());
    setWinner(null);
    setShowCelebrationModal(false);
    setShowAlert(false);
    
    // Enable stop after 3 seconds
    setTimeout(() => {
      setCanStopSpin(true);
      console.log('User can now stop the wheel');
    }, 3000);
  }, [dispatch, isSpinning]);

  // Handle stop spin
  const handleStopSpin = useCallback(() => {
    if (!isSpinning || !canStopSpin) return;

    console.log('User requested to stop');
    setUserRequestedStop(true);
    dispatch(setSpinning(false));
  }, [dispatch, isSpinning, canStopSpin]);

  // Handle celebration modal animation
  useEffect(() => {
    if (winner) {
      console.log('Setting celebration modal to true');
      setShowCelebrationModal(true);
      
      // Animate modal entrance
      Animated.parallel([
        Animated.timing(modalScale, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(modalOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [winner, modalScale, modalOpacity]);

  // Close celebration modal
  const closeCelebrationModal = useCallback(() => {
    Animated.parallel([
      Animated.timing(modalScale, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(modalOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setShowCelebrationModal(false);
      // Reset the wheel to its original state when dialog closes
      if (wheelResetRef.current) {
        wheelResetRef.current();
      }
    });
  }, [modalScale, modalOpacity, wheelResetRef]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        if (showCelebrationModal) {
          // If modal is showing, close it
          closeCelebrationModal();
        } else if (isSpinning) {
          // If spinning, only allow stop if 3 seconds have passed
          if (canStopSpin) {
            handleStopSpin();
          }
        } else {
          // If not spinning, start spin
          handleStartSpin();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isSpinning, canStopSpin, showCelebrationModal, closeCelebrationModal, handleStartSpin, handleStopSpin]);

  return {
    // State
    winner,
    selectedCategory,
    isColorToggling,
    resetKey,
    showCelebrationModal,
    showAlert,
    isKeyboardSpinning,
    canStopSpin,
    userRequestedStop,
    stopButtonPressed,
    
    // Animation refs
    modalScale,
    modalOpacity,
    wheelResetRef,
    
    // Actions
    handleReset,
    handleSpinComplete,
    handleStartSpin,
    handleStopSpin,
    closeCelebrationModal,
    setWinner,
    setSelectedCategory,
    setIsColorToggling,
    setShowCelebrationModal,
    setShowAlert,
    setIsKeyboardSpinning,
    setCanStopSpin,
    setUserRequestedStop,
    setStopButtonPressed,
    setSpinStartTime
  };
};
