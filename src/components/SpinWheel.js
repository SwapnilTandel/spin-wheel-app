import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import Svg, { Circle, Path, Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const WHEEL_SIZE = Math.min(width * 0.95, height * 0.70);
const CENTER_LOGO_SIZE = Math.min(WHEEL_SIZE * 0.25, 150);

const SpinWheel = ({ categories, isSpinning, winner, onReset }) => {
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
  
  useEffect(() => {
    if (isSpinning && wheelRef.current) {
      // Reset transition first
      wheelRef.current.style.transition = 'none';
      wheelRef.current.style.transform = `rotate(${currentRotationRef.current}deg)`;

      // Force a reflow to ensure the reset is applied
      wheelRef.current.offsetHeight;

      // Calculate new rotation (always add to current rotation for consistency)
      const additionalRotation = Math.random() * 360 + 1800; // 5 full rotations + random
      currentRotationRef.current += additionalRotation;

      // Apply the transition and new rotation
      wheelRef.current.style.transition = 'transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      wheelRef.current.style.transform = `rotate(${currentRotationRef.current}deg)`;
    }
  }, [isSpinning]);

  const resetWheel = () => {
    if (wheelRef.current) {
      // Reset to initial position
      currentRotationRef.current = 0;
      wheelRef.current.style.transition = 'transform 0.5s ease-out';
      wheelRef.current.style.transform = 'rotate(0deg)';
    }
    // Reset wheel labels to initial orientation
    // This will be handled by the parent component via key prop
  };

  // Expose resetWheel function to parent component
  useEffect(() => {
    if (onReset && onReset.current !== undefined) {
      onReset.current = resetWheel;
    }
  }, [onReset]);

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
    // Always use dark text for high contrast
    return '#B22222'; // Dark red for all backgrounds
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
          
          {/* Text label - premium typography with gold shadow */}
          <SvgText
            x={textPos.x}
            y={textPos.y}
            fontSize={`${settings.labelTextSize || 14}`}
            fontWeight="800"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            fill={textColor}
            textAnchor="middle"
            dominantBaseline="middle"
            letterSpacing="0.8px"
            style={{
              textShadow: '3px 3px 8px rgba(255,215,0,0.8), 2px 2px 4px rgba(0,0,0,0.6), 1px 1px 2px rgba(255,255,255,0.4)',
              filter: 'drop-shadow(3px 3px 8px rgba(255,215,0,0.8)) drop-shadow(2px 2px 4px rgba(0,0,0,0.6)) drop-shadow(1px 1px 2px rgba(255,255,255,0.4))',
              stroke: 'rgba(255,215,0,0.3)',
              strokeWidth: '1px'
            }}
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
              {/* Shimmer gradient definition */}
              <Defs>
                <LinearGradient id="shimmerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <Stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
                  <Stop offset="50%" stopColor="#FFA500" stopOpacity="0.6" />
                  <Stop offset="100%" stopColor="#FFD700" stopOpacity="0.8" />
                </LinearGradient>
              </Defs>
              
              {/* Outer circle border - Gold rim */}
                <Circle
                  cx={WHEEL_SIZE / 2}
                  cy={WHEEL_SIZE / 2}
                  r={(WHEEL_SIZE - Math.max(WHEEL_SIZE * 0.01, 6)) / 2}
                  fill="transparent"
                  stroke="#FFD700"
                  strokeWidth={Math.max(WHEEL_SIZE * 0.012, 5)}
                />
            
            {/* Pie slices */}
            {renderWheelSegments()}
            
            {/* Inner circle (center area) - Ivory background with red border */}
            <Circle
              cx={WHEEL_SIZE / 2}
              cy={WHEEL_SIZE / 2}
              r={CENTER_LOGO_SIZE / 2}
              fill="#FFF8E6"
              stroke="#B22222"
              strokeWidth={Math.max(CENTER_LOGO_SIZE * 0.03, 4)}
            />
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
        
        {/* Pointer */}
        <View style={styles.pointer} />
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
    borderColor: '#B22222',
    elevation: 15,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)',
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
  pointer: {
    position: 'absolute',
    top: -10,
    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 30,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#B22222',
    zIndex: 150,
  },
});

export default SpinWheel;