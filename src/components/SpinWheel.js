import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import Svg, { Circle, Path, Text as SvgText } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const WHEEL_SIZE = Math.min(width * 0.95, height * 0.70);
const CENTER_LOGO_SIZE = Math.min(WHEEL_SIZE * 0.25, 150);

const SpinWheel = ({ categories, isSpinning, winner, onReset }) => {
  const wheelRef = useRef(null);
  const currentRotationRef = useRef(0);
  
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
    
    // Position text at 70% of the radius
    const textRadius = radius * 0.7;
    const textX = centerX + textRadius * Math.cos(midAngleRad);
    const textY = centerY + textRadius * Math.sin(midAngleRad);
    
    return { x: textX, y: textY, angle: midAngle };
  };

  const renderWheelSegments = () => {
    return categories.map((category, index) => {
      const pathData = createPieSlice(category, index, categories.length);
      const textPos = getTextPosition(category, index, categories.length);
      
      return (
        <React.Fragment key={category.id}>
          {/* Pie slice */}
          <Path
            d={pathData}
            fill={category.color}
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          
          {/* Text label - always vertical orientation */}
          <SvgText
            x={textPos.x}
            y={textPos.y}
            fontSize="12"
            fontWeight="bold"
            fill="#FFFFFF"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.8))'
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
            {/* Outer circle border */}
                <Circle
                  cx={WHEEL_SIZE / 2}
                  cy={WHEEL_SIZE / 2}
                  r={(WHEEL_SIZE - Math.max(WHEEL_SIZE * 0.01, 6)) / 2}
                  fill="transparent"
                  stroke="#FFFFFF"
                  strokeWidth={Math.max(WHEEL_SIZE * 0.008, 3)}
                />
            
            {/* Pie slices */}
            {renderWheelSegments()}
            
            {/* Inner circle (center area) */}
            <Circle
              cx={WHEEL_SIZE / 2}
              cy={WHEEL_SIZE / 2}
              r={CENTER_LOGO_SIZE / 2}
              fill="#FFD700"
              stroke="#8B0000"
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
  centerLogo: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#8B0000',
    elevation: 15,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)',
    zIndex: 200,
  },
      logoText: {
        fontSize: 32,
        fontWeight: 'bold',
      },
      logoImage: {
        width: CENTER_LOGO_SIZE * 0.8,
        height: CENTER_LOGO_SIZE * 0.8,
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
    borderBottomColor: '#8B0000',
    zIndex: 150,
  },
});

export default SpinWheel;