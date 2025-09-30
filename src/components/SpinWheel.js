import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import Svg, { Circle, Path, Text as SvgText, Defs, LinearGradient, Stop, G, Rect, Ellipse } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const WHEEL_SIZE = Math.min(width * 0.95, height * 0.70);
const CENTER_LOGO_SIZE = Math.min(WHEEL_SIZE * 0.25, 150);

const SpinWheel = ({ categories, isSpinning, winner, isKeyboardSpinning, canStopSpin, userRequestedStop, onReset, onSpinComplete, resetRef }) => {
  const wheelRef = useRef(null);
  const currentRotationRef = useRef(0);
  const { settings } = useSelector(state => state.wheel);
  const [winningIndex, setWinningIndex] = useState(null);
  const [showShimmer, setShowShimmer] = useState(false);
  
  // Handle shimmer animation when winner is determined
  useEffect(() => {
    if (winner) {
      const index = categories.findIndex(cat => cat.id === winner.id);
      setWinningIndex(index);
      setShowShimmer(true);
      
      // Hide shimmer after 2 seconds
      const timer = setTimeout(() => {
        setShowShimmer(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    } else {
      setWinningIndex(null);
      setShowShimmer(false);
    }
  }, [winner, categories]);
  
  // Calculate which segment the pointer lands on
  const calculateWinner = (finalRotation) => {
    const totalCategories = categories.length;
    const anglePerSlice = 360 / totalCategories;
    
    // Normalize rotation to 0-360 range
    const normalizedRotation = ((finalRotation % 360) + 360) % 360;
    console.log('normalizedRotation', normalizedRotation);
    
    // Find which segment the pointer is pointing to
    // The pointer is at 0 degrees (12 o'clock position), so we need to find
    // which segment contains the angle that's now at 0 degrees after rotation
    const segmentAtPointer = Math.floor((360 - normalizedRotation) % 360 / anglePerSlice);
    const winnerIndex = segmentAtPointer % totalCategories;
    
    console.log('segmentAtPointer', segmentAtPointer);
    console.log('winnerIndex', winnerIndex);
    console.log('winner category:', categories[winnerIndex]?.name);
    
    return categories[winnerIndex];
  };

  const [spinAnimationId, setSpinAnimationId] = useState(null);
  const [isStopping, setIsStopping] = useState(false);
  const [targetRotation, setTargetRotation] = useState(0);

  useEffect(() => {
    console.log('SpinWheel useEffect triggered - isSpinning:', isSpinning, 'isKeyboardSpinning:', isKeyboardSpinning, 'spinAnimationId:', spinAnimationId);
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
        // Calculate final position
        const randomFinalAngle = Math.random() * 360;
        const finalRotation = currentRotationRef.current + randomFinalAngle;
        currentRotationRef.current = finalRotation;
        
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
  }, [isSpinning, isKeyboardSpinning, onSpinComplete]);

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

  // Handle when user actually requests to stop
  useEffect(() => {
    if (!isSpinning && userRequestedStop && spinAnimationId) {
      console.log('User requested stop - starting deceleration');
      // Clear fast spin animation
      clearTimeout(spinAnimationId);
      setSpinAnimationId(null);
      
      if (wheelRef.current) {
        // Calculate final position
        const randomFinalAngle = Math.random() * 360;
        const finalRotation = currentRotationRef.current + randomFinalAngle;
        currentRotationRef.current = finalRotation;
        
        // Apply slow deceleration immediately
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
  }, [isSpinning, userRequestedStop, spinAnimationId, onSpinComplete]);

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
    
    // For red/dark backgrounds, use light colors
    if (bgColor.includes('b22') || bgColor.includes('red') || bgColor.includes('dark')) {
      return '#FFFFFF'; // White for red/dark backgrounds
    }
    
    // For other colors, use contrasting text
    if (bgColor.includes('blue') || bgColor.includes('green') || bgColor.includes('purple')) {
      return '#FFFFFF'; // White for colored backgrounds
    }
    
    // Default to dark color for light backgrounds
    return '#333333';
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
      const textColor = getTextColor(category.color);
      
      const isWinningSlice = winningIndex === index && showShimmer;
      
      return (
        <React.Fragment key={category.id}>
          {/* Pie slice with gold border and shimmer effect */}
          <Path
            d={pathData}
            fill={category.color}
            stroke={isWinningSlice ? "#FFD700" : "#FFD700"}
            strokeWidth={isWinningSlice ? "6" : "3"}
            opacity={isWinningSlice ? 0.9 : 1}
            style={{
              filter: isWinningSlice ? 'drop-shadow(0 0 20px rgba(255,215,0,0.8)) drop-shadow(0 0 10px rgba(255,215,0,0.6))' : 'none',
              animation: isWinningSlice ? 'shimmer 1s ease-in-out infinite alternate' : 'none'
            }}
          />
          
          {/* Shimmer overlay for winning slice */}
          {isWinningSlice && (
            <Path
              d={pathData}
              fill="url(#shimmerGradient)"
              opacity="0.3"
            />
          )}
          
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
                <LinearGradient id="shimmerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <Stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
                  <Stop offset="50%" stopColor="#FFA500" stopOpacity="0.6" />
                  <Stop offset="100%" stopColor="#FFD700" stopOpacity="0.8" />
                </LinearGradient>
                
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
  '@keyframes shimmer': {
    '0%': {
      filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.8)) drop-shadow(0 0 10px rgba(255,215,0,0.6))',
    },
    '100%': {
      filter: 'drop-shadow(0 0 30px rgba(255,215,0,1)) drop-shadow(0 0 15px rgba(255,215,0,0.8))',
    },
  },
  centerLogo: {
    position: 'absolute',
    width: CENTER_LOGO_SIZE,
    height: CENTER_LOGO_SIZE,
    borderRadius: CENTER_LOGO_SIZE / 2,
    backgroundColor: '#FFF8E6',
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
    fontSize: Math.max(CENTER_LOGO_SIZE * 0.06, 8),
    fontWeight: 'bold',
    color: '#B22222',
    textAlign: 'center',
    lineHeight: Math.max(CENTER_LOGO_SIZE * 0.07, 9),
  },
  brandText2: {
    fontSize: Math.max(CENTER_LOGO_SIZE * 0.08, 10),
    fontWeight: 'bold',
    color: '#B22222',
    textAlign: 'center',
    lineHeight: Math.max(CENTER_LOGO_SIZE * 0.09, 11),
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