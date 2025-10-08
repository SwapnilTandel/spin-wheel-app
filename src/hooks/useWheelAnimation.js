import { useRef, useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing wheel animation logic
 * Extracted from SpinWheel component to separate concerns
 */
export const useWheelAnimation = ({
  isSpinning,
  isKeyboardSpinning,
  categories,
  onSpinComplete
}) => {
  const wheelRef = useRef(null);
  const currentRotationRef = useRef(0);
  const [spinAnimationId, setSpinAnimationId] = useState(null);
  const [isStopping, setIsStopping] = useState(false);
  const [targetRotation, setTargetRotation] = useState(0);
  
  // Use refs to store the latest values to avoid dependency issues
  const categoriesRef = useRef(categories);
  const onSpinCompleteRef = useRef(onSpinComplete);
  
  // Update refs when values change
  useEffect(() => {
    categoriesRef.current = categories;
    onSpinCompleteRef.current = onSpinComplete;
  }, [categories, onSpinComplete]);

  // Helper function to find a category with rarity > 1
  const findValidCategory = useCallback(() => {
    // Handle categories structure - it could be an array or an object with wheel values
    const categoriesArray = Array.isArray(categoriesRef.current) ? categoriesRef.current : Object.values(categoriesRef.current).flat();
    
    const validCategories = categoriesArray.filter(cat => cat.number > 1);
    if (validCategories.length === 0) {
      // Fallback to any category if none have rarity > 1
      return categoriesArray[Math.floor(Math.random() * categoriesArray.length)];
    }
    // Randomly select from valid categories to maintain appearance of randomness
    return validCategories[Math.floor(Math.random() * validCategories.length)];
  }, []);

  // Helper function to calculate target rotation for a specific category
  const calculateTargetRotation = useCallback((targetCategory) => {
    // Handle categories structure - it could be an array or an object with wheel values
    const categoriesArray = Array.isArray(categoriesRef.current) ? categoriesRef.current : Object.values(categoriesRef.current).flat();
    
    const totalCategories = categoriesArray.length;
    const anglePerSlice = 360 / totalCategories;
    const targetIndex = categoriesArray.findIndex(cat => cat.id === targetCategory.id);
    
    // Calculate a random position within the target category's slice
    // This ensures the pointer lands within the category, not on edges
    const sliceStartAngle = targetIndex * anglePerSlice;
    const randomOffsetWithinSlice = Math.random() * anglePerSlice * 0.8; // Random position within 80% of slice
    const targetAngle = sliceStartAngle + randomOffsetWithinSlice;
    
    // Add multiple full rotations to make it appear random
    const baseRotation = currentRotationRef.current;
    const fullRotations = Math.floor(baseRotation / 360) * 360;
    const additionalRotations = Math.floor(Math.random() * 5 + 3) * 360; // 3-7 full rotations
    
    return baseRotation + additionalRotations + (360 - targetAngle);
  }, []);

  // Calculate which segment the pointer lands on
  const calculateWinner = useCallback((finalRotation) => {
    // Handle categories structure - it could be an array or an object with wheel values
    const categoriesArray = Array.isArray(categoriesRef.current) ? categoriesRef.current : Object.values(categoriesRef.current).flat();
    
    const totalCategories = categoriesArray.length;
    const anglePerSlice = 360 / totalCategories;
    
    // Normalize rotation to 0-360 range
    const normalizedRotation = ((finalRotation % 360) + 360) % 360;
    console.log('normalizedRotation', normalizedRotation);
    
    // Calculate the angle that's now at the pointer position (0 degrees)
    const pointerAngle = (360 - normalizedRotation) % 360;
    
    // Find which segment contains this angle
    const segmentAtPointer = Math.floor(pointerAngle / anglePerSlice);
    const winnerIndex = segmentAtPointer % totalCategories;
    
    console.log('pointerAngle', pointerAngle);
    console.log('segmentAtPointer', segmentAtPointer);
    console.log('winnerIndex', winnerIndex);
    console.log('winner category:', categoriesArray[winnerIndex]?.name);
    
    return categoriesArray[winnerIndex];
  }, []);

  // Handle fast spinning animation
  useEffect(() => {
    if (isSpinning && wheelRef.current && isKeyboardSpinning) {
      console.log('Starting fast spin');
      // Start fast spinning
      setIsStopping(false);
      setTargetRotation(0);
      
      // Reset transition first
      wheelRef.current.style.transition = 'none';
      wheelRef.current.style.transform = `rotate(${currentRotationRef.current}deg)`;

      // Force a reflow to ensure the reset is applied
      wheelRef.current.offsetHeight;

      // Start fast spinning animation
      const startFastSpin = () => {
        if (wheelRef.current && isSpinning && !isStopping) {
          currentRotationRef.current += 360; // Add one full rotation
          wheelRef.current.style.transition = 'transform 0.1s linear';
          wheelRef.current.style.transform = `rotate(${currentRotationRef.current}deg)`;
          
          const animationId = setTimeout(startFastSpin, 100);
          setSpinAnimationId(animationId);
        }
      };
      
      startFastSpin();
    } else if (!isSpinning && spinAnimationId) {
      console.log('Stopping spin animation');
      // Stop spinning - clear fast spin animation
      clearTimeout(spinAnimationId);
      setSpinAnimationId(null);
      
      if (wheelRef.current) {
        // Calculate final position - ensure wheel stops at category with rarity > 1
        const targetCategory = findValidCategory();
        const finalRotation = calculateTargetRotation(targetCategory);
        currentRotationRef.current = finalRotation;
        
        // Debug logging (not visible to users)
        console.log('🎯 TARGET CATEGORY:', targetCategory.name, '| Rarity:', targetCategory.number);
        
        // PREVIEW: Log the winner immediately
        const previewWinner = calculateWinner(finalRotation);
        console.log('🎯 PREVIEW WINNER:', previewWinner?.name, '| Rarity:', previewWinner?.number);
        
        // Apply slow deceleration
        wheelRef.current.style.transition = 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        wheelRef.current.style.transform = `rotate(${finalRotation}deg)`;
        
        // Calculate winner after deceleration
        setTimeout(() => {
          const winner = calculateWinner(finalRotation);
          console.log('SpinWheel: Winner calculated:', winner);
          if (onSpinCompleteRef.current) {
            console.log('SpinWheel: Calling onSpinComplete with winner');
            onSpinCompleteRef.current(winner);
          } else {
            console.log('SpinWheel: onSpinComplete is not available');
          }
        }, 2000);
      }
    }
  }, [isSpinning, isKeyboardSpinning]);

  // Handle stopping the wheel
  useEffect(() => {
    if (!isSpinning && isKeyboardSpinning) {
      setIsStopping(true);
    }
  }, [isSpinning, isKeyboardSpinning]);

  // Reset wheel function
  const resetWheel = useCallback(() => {
    if (wheelRef.current) {
      // Clear any ongoing animations
      if (spinAnimationId) {
        clearTimeout(spinAnimationId);
        setSpinAnimationId(null);
      }
      
      // Reset to initial position
      currentRotationRef.current = 0;
      wheelRef.current.style.transition = 'transform 0.5s ease-out';
      wheelRef.current.style.transform = 'rotate(0deg)';
    }
    // Reset wheel labels to initial orientation
    // This will be handled by the parent component via key prop
    setIsStopping(false);
    setTargetRotation(0);
  }, [spinAnimationId]);

  return {
    wheelRef,
    currentRotationRef,
    spinAnimationId,
    isStopping,
    targetRotation,
    resetWheel,
    calculateWinner,
    calculateTargetRotation,
    findValidCategory
  };
};
