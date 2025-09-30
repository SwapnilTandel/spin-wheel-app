import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { wheelStyles } from '../../styles/theme';

/**
 * Wheel pointer component
 */
const WheelPointer = ({ style }) => {
  return (
    <View style={[wheelStyles.pointerContainer, style]}>
      <Svg width="60" height="40" viewBox="0 0 60 40" style={wheelStyles.pointerSvg}>
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
  );
};

export default WheelPointer;
