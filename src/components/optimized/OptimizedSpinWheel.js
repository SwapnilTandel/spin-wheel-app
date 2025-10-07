import React, { memo, useMemo, useCallback } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import Svg, { Circle } from 'react-native-svg';
import { WHEEL_SIZE, wheelStyles } from '../../styles/theme';
import WheelPointer from '../wheel/WheelPointer';
import WheelCenter from '../wheel/WheelCenter';
import WheelSegments from '../wheel/WheelSegments';
import WheelDecorations from '../wheel/WheelDecorations';
import { calculateWinner } from '../../utils/helpers';
import { APP_CONFIG } from '../../utils/constants';

/**
 * Optimized SpinWheel component with performance improvements
 */
const OptimizedSpinWheel = memo(({ 
  categories, 
  isSpinning, 
  winner, 
  selectedCategory, 
  isColorToggling, 
  isKeyboardSpinning, 
  canStopSpin, 
  userRequestedStop, 
  onReset, 
  onSpinComplete, 
  resetRef 
}) => {
  
  // Memoize expensive calculations
  const wheelConfig = useMemo(() => ({
    size: WHEEL_SIZE,
    centerX: WHEEL_SIZE / 2,
    centerY: WHEEL_SIZE / 2,
    radius: (WHEEL_SIZE - 6) / 2,
  }), []);

  // Memoize wheel segments to prevent unnecessary re-renders
  const wheelSegments = useMemo(() => (
    <WheelSegments 
      categories={categories}
      winningIndex={winner ? categories.findIndex(cat => cat.id === winner.id) : null}
      selectedCategory={selectedCategory}
      isColorToggling={isColorToggling}
      colorToggle={false} // This will be handled by the component internally
    />
  ), [categories, winner, selectedCategory, isColorToggling]);

  // Memoize decorations
  const decorations = useMemo(() => <WheelDecorations />, []);

  // Memoize center logo
  const centerLogo = useMemo(() => <WheelCenter />, []);

  // Memoize pointer
  const pointer = useMemo(() => <WheelPointer />, []);

  // Memoize outer circle
  const outerCircle = useMemo(() => (
    <Circle
      cx={wheelConfig.centerX}
      cy={wheelConfig.centerY}
      r={wheelConfig.radius}
      fill="transparent"
      stroke="url(#fireGradient)"
      strokeWidth={Math.max(WHEEL_SIZE * 0.012, 5)}
    />
  ), [wheelConfig]);

  // Memoize inner circle
  const innerCircle = useMemo(() => (
    <Circle
      cx={wheelConfig.centerX}
      cy={wheelConfig.centerY}
      r={wheelConfig.radius * 0.25}
      fill="url(#rangoliGradient)"
      stroke="#FFD700"
      strokeWidth={Math.max(wheelConfig.radius * 0.25 * 0.03, 4)}
    />
  ), [wheelConfig]);

  return (
    <View style={wheelStyles.container}>
      <View style={wheelStyles.wheelWrapper}>
        <View style={wheelStyles.wheelContainer}>
          <Svg
            width={WHEEL_SIZE}
            height={WHEEL_SIZE}
            viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}
          >
            {decorations}
            {outerCircle}
            {wheelSegments}
            {innerCircle}
          </Svg>
        </View>
        
        {centerLogo}
        {pointer}
      </View>
    </View>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function for better performance
  return (
    prevProps.isSpinning === nextProps.isSpinning &&
    prevProps.winner?.id === nextProps.winner?.id &&
    prevProps.selectedCategory?.id === nextProps.selectedCategory?.id &&
    prevProps.isColorToggling === nextProps.isColorToggling &&
    prevProps.isKeyboardSpinning === nextProps.isKeyboardSpinning &&
    prevProps.canStopSpin === nextProps.canStopSpin &&
    prevProps.userRequestedStop === nextProps.userRequestedStop &&
    JSON.stringify(prevProps.categories) === JSON.stringify(nextProps.categories)
  );
});

OptimizedSpinWheel.displayName = 'OptimizedSpinWheel';

export default OptimizedSpinWheel;
