import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import Svg, { Circle, Path, Text as SvgText, Defs, LinearGradient, Stop, G, Rect, Ellipse } from 'react-native-svg';
import { WHEEL_SIZE, CENTER_LOGO_SIZE } from '../styles/theme';

const SpinWheel = ({ categories, isSpinning, winner, selectedCategory, isColorToggling, isKeyboardSpinning, canStopSpin, userRequestedStop, onReset, onSpinComplete, resetRef }) => {
  const wheelRef = useRef(null);
  const currentRotationRef = useRef(0);
  const { settings } = useSelector(state => state.wheel);
  const [winningIndex, setWinningIndex] = useState(null);
  const [colorToggle, setColorToggle] = useState(false);
  
  // Helper function to find a category with rarity > 1
  const findValidCategory = () => {
    const validCategories = categories.filter(cat => cat.number > 1);
    if (validCategories.length === 0) {
      // Fallback to any category if none have rarity > 1
      return categories[Math.floor(Math.random() * categories.length)];
    }
    // Randomly select from valid categories to maintain appearance of randomness
    return validCategories[Math.floor(Math.random() * validCategories.length)];
  };
  
  // Helper function to calculate target rotation for a specific category
  const calculateTargetRotation = (targetCategory) => {
    const totalCategories = categories.length;
    const anglePerSlice = 360 / totalCategories;
    const targetIndex = categories.findIndex(cat => cat.id === targetCategory.id);
    
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
  };
  
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
  
  // Calculate which segment the pointer lands on
  const calculateWinner = (finalRotation) => {
    const totalCategories = categories.length;
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
    console.log('winner category:', categories[winnerIndex]?.name);
    
    return categories[winnerIndex];
  };

  const [spinAnimationId, setSpinAnimationId] = useState(null);
  const [isStopping, setIsStopping] = useState(false);
  const [targetRotation, setTargetRotation] = useState(0);

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
          if (onSpinComplete) {
            console.log('SpinWheel: Calling onSpinComplete with winner');
            onSpinComplete(winner);
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

  // Handle user requesting to stop (when canStopSpin becomes true and user presses Enter)
  useEffect(() => {
    if (canStopSpin && isSpinning && isKeyboardSpinning && !userRequestedStop) {
      // User can now stop, but hasn't requested yet
      console.log('User can now stop the wheel');
    }
  }, [canStopSpin, isSpinning, isKeyboardSpinning, userRequestedStop]);


  const resetWheel = () => {
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
  };

  // Expose resetWheel function to parent component
  useEffect(() => {
    if (onReset && onReset.current !== undefined) {
      onReset.current = resetWheel;
    }
  }, [onReset]);

  // Expose resetWheel function via resetRef
  useEffect(() => {
    if (resetRef && resetRef.current !== undefined) {
      resetRef.current = resetWheel;
    }
  }, [resetRef]);

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

  const renderDiwaliDecorations = () => {
    const centerX = WHEEL_SIZE / 2;
    const centerY = WHEEL_SIZE / 2;
    const outerRadius = (WHEEL_SIZE - 6) / 2 + 20;
    
    // Create diyas (oil lamps) around the wheel
    const diyaPositions = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i * 45) * Math.PI / 180;
      const x = centerX + outerRadius * Math.cos(angle);
      const y = centerY + outerRadius * Math.sin(angle);
      diyaPositions.push({ x, y, angle });
    }
    
    return (
      <G>
        {/* Diyas around the wheel */}
        {diyaPositions.map((pos, index) => (
          <G key={index}>
            {/* Diya base */}
            <Ellipse
              cx={pos.x}
              cy={pos.y + 5}
              rx="8"
              ry="4"
              fill="#8B4513"
            />
            {/* Diya flame */}
            <Path
              d={`M ${pos.x-3} ${pos.y-8} Q ${pos.x} ${pos.y-15} ${pos.x+3} ${pos.y-8} Q ${pos.x} ${pos.y-5} ${pos.x-3} ${pos.y-8}`}
              fill="url(#fireGradient)"
            />
            {/* Diya glow */}
            <Circle
              cx={pos.x}
              cy={pos.y-5}
              r="12"
              fill="rgba(255,215,0,0.2)"
            />
          </G>
        ))}
        
        {/* Fireworks around the wheel */}
        {[0, 60, 120, 180, 240, 300].map((angle, index) => {
          const x = centerX + (outerRadius + 30) * Math.cos(angle * Math.PI / 180);
          const y = centerY + (outerRadius + 30) * Math.sin(angle * Math.PI / 180);
          return (
            <G key={`firework-${index}`}>
              {/* Firework burst */}
              <Circle cx={x} cy={y} r="3" fill="#FFD700" />
              <Circle cx={x-8} cy={y-8} r="2" fill="#FF6B35" />
              <Circle cx={x+8} cy={y-8} r="2" fill="#FF6B35" />
              <Circle cx={x-8} cy={y+8} r="2" fill="#FF6B35" />
              <Circle cx={x+8} cy={y+8} r="2" fill="#FF6B35" />
            </G>
          );
        })}
      </G>
    );
  };

  const renderDiwaliMandala = () => {
    const centerX = WHEEL_SIZE / 2;
    const centerY = WHEEL_SIZE / 2;
    const radius = CENTER_LOGO_SIZE / 2 - 10;
    
    return (
      <G>
        {/* Outer mandala ring */}
        <Circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke="#FFD700"
          strokeWidth="2"
        />
        
        {/* Inner mandala pattern */}
        <Circle
          cx={centerX}
          cy={centerY}
          r={radius * 0.7}
          fill="none"
          stroke="#FF6B35"
          strokeWidth="1"
        />
        
        {/* Mandala center dot */}
        <Circle
          cx={centerX}
          cy={centerY}
          r="8"
          fill="#FFD700"
        />
        
        {/* Decorative petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => {
          const x = centerX + (radius * 0.5) * Math.cos(angle * Math.PI / 180);
          const y = centerY + (radius * 0.5) * Math.sin(angle * Math.PI / 180);
          return (
            <Ellipse
              key={index}
              cx={x}
              cy={y}
              rx="6"
              ry="3"
              fill="#FFD700"
              transform={`rotate(${angle} ${x} ${y})`}
            />
          );
        })}
      </G>
    );
  };

  const renderWheelSegments = () => {
    return categories.map((category, index) => {
      const pathData = createPieSlice(category, index, categories.length);
      const textPos = getTextPosition(category, index, categories.length);
      
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
          {/* Outer glow/shadow layer */}
          {/* Rotated text aligned with wedge - like the reference image */}
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
    <View style={styles.container}>
      <View style={styles.wheelWrapper}>
        <View 
          ref={wheelRef}
          style={styles.wheelContainer}
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
              
              {/* Diwali decorations around the wheel */}
              {renderDiwaliDecorations()}
              
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
            
            {/* Diwali mandala pattern in center */}
            {renderDiwaliMandala()}
          </Svg>
        </View>
        
            {/* Center Logo */}
            <View style={styles.centerLogo}>
              <Image 
                source={{ uri: 'https://maharajafarmersmarketusa.com/wp-content/uploads/2024/04/mfm_logo.webp' }}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
        
        {/* Polished SVG Pointer */}
        <View style={styles.pointerContainer}>
          <Svg width="60" height="40" viewBox="0 0 60 40" style={styles.pointerSvg}>
            <Defs>
              <LinearGradient id="pointerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop offset="0%" stopColor="#B22222" />
                <Stop offset="50%" stopColor="#DC143C" />
                <Stop offset="100%" stopColor="#8B0000" />
              </LinearGradient>
              <LinearGradient id="pointerShadow" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="rgba(0,0,0,0.3)" />
                <Stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
              </LinearGradient>
            </Defs>
            
            {/* Shadow/Glow effect */}
            <Path
              d="M 5 20 L 50 5 L 50 15 L 55 20 L 50 25 L 50 35 L 5 20 Z"
              fill="url(#pointerShadow)"
              opacity="0.4"
            />
            
            {/* Main pointer shape */}
            <Path
              d="M 5 20 L 50 5 L 50 15 L 55 20 L 50 25 L 50 35 L 5 20 Z"
              fill="url(#pointerGradient)"
              stroke="#8B0000"
              strokeWidth="1"
            />
            
            {/* Highlight line */}
            <Path
              d="M 5 20 L 50 5 L 50 15 L 55 20"
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
            />
            
            {/* Center dot */}
            <Circle
              cx="52"
              cy="20"
              r="3"
              fill="#FFFFFF"
              stroke="#8B0000"
              strokeWidth="1"
            />
          </Svg>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  wheelWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheelContainer: {
    // Clean container without shadows
  },
  centerLogo: {
    position: 'absolute',
    width: CENTER_LOGO_SIZE,
    height: CENTER_LOGO_SIZE,
    borderRadius: CENTER_LOGO_SIZE / 2,
    backgroundColor: '#FF88E6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FFD700',
    elevation: 15,
    boxShadow: '0 4px 6px rgba(255, 215, 0, 0.6), 0 8px 12px rgba(0, 0, 0, 0.4)',
    zIndex: 200,
    padding: 4,
  },
  logoImage: {
    width: CENTER_LOGO_SIZE * 0.7,
    height: CENTER_LOGO_SIZE * 0.7,
  },
  brandText1: {
    fontSize: `clamp(8px, ${CENTER_LOGO_SIZE * 0.06}px, 16px)`,
    fontWeight: 'bold',
    color: '#B22222',
    textAlign: 'center',
    lineHeight: `clamp(9px, ${CENTER_LOGO_SIZE * 0.07}px, 18px)`,
  },
  brandText2: {
    fontSize: `clamp(10px, ${CENTER_LOGO_SIZE * 0.08}px, 18px)`,
    fontWeight: 'bold',
    color: '#B22222',
    textAlign: 'center',
    lineHeight: `clamp(11px, ${CENTER_LOGO_SIZE * 0.09}px, 20px)`,
    marginTop: 1,
  },
  pointerContainer: {
    position: 'absolute',
    right: -30,
    top: '50%',
    zIndex: 150,
    transform: [{ translateY: -20 }],
  },
  pointerSvg: {
    filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
  },
});

export default SpinWheel;