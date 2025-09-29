import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  interpolate,
  runOnJS 
} from 'react-native-reanimated';
import Svg, { Circle, Text as SvgText, G } from 'react-native-svg';

const { width } = Dimensions.get('window');
const WHEEL_SIZE = Math.min(width * 0.8, 300);

const SpinWheel = ({ categories, isSpinning, winner }) => {
  const rotation = useSharedValue(0);
  
  useEffect(() => {
    if (isSpinning) {
      const randomRotation = Math.random() * 360 + 1800; // 5 full rotations + random
      rotation.value = withTiming(randomRotation, { duration: 3000 });
    }
  }, [isSpinning]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const renderWheelSegments = () => {
    const segmentAngle = 360 / categories.length;
    const radius = WHEEL_SIZE / 2;
    
    return categories.map((category, index) => {
      const startAngle = index * segmentAngle;
      const endAngle = (index + 1) * segmentAngle;
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
      
      const x1 = radius + radius * Math.cos((startAngle * Math.PI) / 180);
      const y1 = radius + radius * Math.sin((startAngle * Math.PI) / 180);
      const x2 = radius + radius * Math.cos((endAngle * Math.PI) / 180);
      const y2 = radius + radius * Math.sin((endAngle * Math.PI) / 180);
      
      const textX = radius + (radius * 0.7) * Math.cos(((startAngle + endAngle) / 2 * Math.PI) / 180);
      const textY = radius + (radius * 0.7) * Math.sin(((startAngle + endAngle) / 2 * Math.PI) / 180);
      
      return (
        <G key={category.id}>
          <Circle
            cx={radius}
            cy={radius}
            r={radius - 10}
            fill={category.color}
            stroke="#FFFFFF"
            strokeWidth="3"
            transform={`rotate(${startAngle} ${radius} ${radius})`}
            strokeDasharray={`${segmentAngle * Math.PI * radius / 180} ${Math.PI * radius * 2}`}
            strokeDashoffset="0"
          />
          <SvgText
            x={textX}
            y={textY}
            fontSize="14"
            fontWeight="bold"
            textAnchor="middle"
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth="1"
          >
            {category.name}
          </SvgText>
        </G>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.wheelWrapper}>
        <Animated.View style={[styles.wheel, animatedStyle]}>
          <Svg width={WHEEL_SIZE} height={WHEEL_SIZE}>
            {renderWheelSegments()}
          </Svg>
        </Animated.View>
        
        {/* Center Logo */}
        <View style={styles.centerLogo}>
          <Text style={styles.logoText}>🎰</Text>
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
  },
  wheelWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheel: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    borderRadius: WHEEL_SIZE / 2,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
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
    zIndex: 10,
  },
});

export default SpinWheel;
