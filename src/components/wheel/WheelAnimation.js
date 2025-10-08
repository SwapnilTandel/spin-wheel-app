import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Path, Text as SvgText, Defs, LinearGradient, Stop, G, Rect, Ellipse } from 'react-native-svg';
import { WHEEL_SIZE, CENTER_LOGO_SIZE } from '../../styles/theme';
import { useWheelAnimation } from '../../hooks/useWheelAnimation';

/**
 * WheelAnimation component - Handles the spinning wheel animation
 * Extracted from SpinWheel component to separate animation concerns
 */
const WheelAnimation = ({ 
  categories, 
  isSpinning, 
  isKeyboardSpinning, 
  onSpinComplete, 
  winner, 
  selectedCategory, 
  isColorToggling,
  settings,
  resetRef 
}) => {
  const [winningIndex, setWinningIndex] = useState(null);
  const [colorToggle, setColorToggle] = useState(false);
  
  // Use the extracted animation hook
  const {
    wheelRef,
    currentRotationRef,
    spinAnimationId,
    isStopping,
    targetRotation,
    resetWheel,
    calculateWinner,
    calculateTargetRotation,
    findValidCategory
  } = useWheelAnimation({
    isSpinning,
    isKeyboardSpinning,
    categories,
    onSpinComplete
  });

  // Handle winning slice highlighting when winner is determined
  useEffect(() => {
    if (winner) {
      const index = categories.findIndex(cat => cat.id === winner.id);
      setWinningIndex(index);
    } else {
      setWinningIndex(null);
    }
  }, [winner, categories]);

  // Handle color toggling effect
  useEffect(() => {
    let interval;
    if (isColorToggling) {
      // Start toggling every 500ms
      interval = setInterval(() => {
        setColorToggle(prev => !prev);
      }, 500);
    } else {
      // Reset toggle state when toggling stops
      setColorToggle(false);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isColorToggling]);

  // Expose resetWheel function via resetRef
  useEffect(() => {
    if (resetRef && resetRef.current !== undefined) {
      resetRef.current = resetWheel;
    }
  }, [resetRef, resetWheel]);

  // Helper functions for wheel rendering
  const createPieSlice = (category, index, totalCategories) => {
    const centerX = WHEEL_SIZE / 2;
    const centerY = WHEEL_SIZE / 2;
    const radius = (WHEEL_SIZE - 6) / 2; // Account for border
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

  const getTextPosition = (category, index, totalCategories) => {
    const centerX = WHEEL_SIZE / 2;
    const centerY = WHEEL_SIZE / 2;
    const radius = (WHEEL_SIZE - 6) / 2;
    const anglePerSlice = 360 / totalCategories;
    const midAngle = (index * anglePerSlice) + (anglePerSlice / 2);
    const midAngleRad = (midAngle * Math.PI) / 180;
    
    // Position text at 65% of the radius for better balance
    const textRadius = radius * 0.65;
    const textX = centerX + textRadius * Math.cos(midAngleRad);
    const textY = centerY + textRadius * Math.sin(midAngleRad);
    
    return { x: textX, y: textY, angle: midAngle };
  };

  const getTextColor = (backgroundColor) => {
    // Use contrasting colors based on background for better readability
    const bgColor = backgroundColor.toLowerCase();
    
    // For light/cream/gold backgrounds, use dark colors
    if (bgColor.includes('fff') || bgColor.includes('ffd700') || bgColor.includes('ffe') || bgColor.includes('ffa') || bgColor.includes('fff8e6')) {
      return '#8B0000'; // Deep maroon for light/cream backgrounds
    }
    
    // For orange/red backgrounds, use white text
    if (bgColor.includes('ff6b35') || bgColor.includes('ff8c00') || bgColor.includes('ffa500') || 
        bgColor.includes('ff6347') || bgColor.includes('b22') || bgColor.includes('red') || 
        bgColor.includes('dark') || bgColor.includes('ff4500')) {
      return '#FFFFFF'; // White for orange/red backgrounds
    }
    
    // For pink/magenta backgrounds, use white text
    if (bgColor.includes('ff1493') || bgColor.includes('ff69b4') || bgColor.includes('ff00ff') || 
        bgColor.includes('ff33cc') || bgColor.includes('ff66dd')) {
      return '#FFFFFF'; // White for pink/magenta backgrounds
    }
    
    // For blue backgrounds, use white text
    if (bgColor.includes('00bfff') || bgColor.includes('1e90ff') || bgColor.includes('4169e1') || 
        bgColor.includes('0000cd') || bgColor.includes('000080') || bgColor.includes('blue')) {
      return '#FFFFFF'; // White for blue backgrounds
    }
    
    // For purple/violet backgrounds, use white text
    if (bgColor.includes('4b0082') || bgColor.includes('6a0dad') || bgColor.includes('8a2be2') || 
        bgColor.includes('9370db') || bgColor.includes('ba55d3') || bgColor.includes('purple')) {
      return '#FFFFFF'; // White for purple backgrounds
    }
    
    // For green backgrounds, use white text for dark greens, dark text for light greens
    if (bgColor.includes('228b22') || bgColor.includes('32cd32') || bgColor.includes('green')) {
      return '#FFFFFF'; // White for green backgrounds
    }
    
    // For other colors, use contrasting text
    if (bgColor.includes('blue') || bgColor.includes('green') || bgColor.includes('purple')) {
      return '#FFFFFF'; // White for colored backgrounds
    }
    
    // Default to dark color for light backgrounds
    return '#333333';
  };

  // Function to invert a hex color
  const invertColor = (hexColor) => {
    // Remove # if present
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

  const renderWheelSegments = () => {
    // Handle categories structure - it could be an array or an object with wheel values
    const categoriesArray = Array.isArray(categories) ? categories : Object.values(categories).flat();
    
    return categoriesArray.map((category, index) => {
      const pathData = createPieSlice(category, index, categoriesArray.length);
      const textPos = getTextPosition(category, index, categoriesArray.length);
      
      // Check if this is the selected category for background inversion
      const isSelectedCategory = selectedCategory && selectedCategory.id === category.id;
      // Toggle between original and inverted color every 500ms
      const sliceColor = isSelectedCategory && isColorToggling 
        ? (colorToggle ? invertColor(category.color) : category.color)
        : category.color;
      const textColor = getTextColor(sliceColor);
      
      const isWinningSlice = winningIndex === index;
      
      return (
        <React.Fragment key={category.id}>
          {/* Pie slice with gold border */}
          <Path
            d={pathData}
            fill={sliceColor}
            stroke={isWinningSlice ? "#FFD700" : "#FFD700"}
            strokeWidth={isWinningSlice ? "6" : "3"}
            opacity={isWinningSlice ? 0.9 : 1}
            style={{
              filter: isWinningSlice ? 'drop-shadow(0 0 20px rgba(255,215,0,0.8))' : 'none'
            }}
          />
          
          {/* Text label - vibrant and catchy typography */}
          <SvgText
            x={textPos.x}
            y={textPos.y}
            fontSize={`${settings.labelTextSize || 14}`}
            fontWeight="700"
            fontFamily={settings.labelFontFamily || 'system-ui'}
            fill={textColor}
            textAnchor="middle"
            dominantBaseline="middle"
            letterSpacing="0.5px"
            transform={`rotate(${textPos.angle}, ${textPos.x}, ${textPos.y})`}
          >
            {category.name}
          </SvgText>
        </React.Fragment>
      );
    });
  };

  return (
    <View 
      ref={wheelRef}
      style={{
        // Clean container without shadows
      }}
    >
      <Svg
        width={WHEEL_SIZE}
        height={WHEEL_SIZE}
        viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}
      >
        {/* Diwali-themed gradients and patterns */}
        <Defs>
          {/* Diwali fire gradient */}
          <LinearGradient id="fireGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <Stop offset="0%" stopColor="#FF6B35" />
            <Stop offset="30%" stopColor="#FFD700" />
            <Stop offset="60%" stopColor="#FFA500" />
            <Stop offset="100%" stopColor="#FFD700" />
          </LinearGradient>
          
          {/* Rangoli pattern gradient */}
          <LinearGradient id="rangoliGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FF69B4" />
            <Stop offset="25%" stopColor="#FFD700" />
            <Stop offset="50%" stopColor="#FF1493" />
            <Stop offset="75%" stopColor="#FFD700" />
            <Stop offset="100%" stopColor="#FF69B4" />
          </LinearGradient>
        </Defs>
        
        {/* Outer circle border - Gold rim with Diwali pattern */}
        <Circle
          cx={WHEEL_SIZE / 2}
          cy={WHEEL_SIZE / 2}
          r={(WHEEL_SIZE - Math.max(WHEEL_SIZE * 0.01, 6)) / 2}
          fill="transparent"
          stroke="url(#fireGradient)"
          strokeWidth={Math.max(WHEEL_SIZE * 0.012, 5)}
        />
      
        {/* Pie slices */}
        {renderWheelSegments()}
        
        {/* Inner circle (center area) - Diwali mandala design */}
        <Circle
          cx={WHEEL_SIZE / 2}
          cy={WHEEL_SIZE / 2}
          r={CENTER_LOGO_SIZE / 2}
          fill="url(#rangoliGradient)"
          stroke="#FFD700"
          strokeWidth={Math.max(CENTER_LOGO_SIZE * 0.03, 4)}
        />
      </Svg>
    </View>
  );
};

export default WheelAnimation;
