import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const PolishedButton = ({ 
  title, 
  onPress, 
  disabled = false, 
  variant = 'primary', // 'primary', 'secondary', 'danger'
  size = 'large', // 'small', 'medium', 'large'
  style = {},
  textStyle = {},
  showIcon = false,
  icon = null
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const shadowAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: false, // Changed to false for web compatibility
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: false, // Changed to false for web compatibility
      }),
      Animated.timing(shadowAnim, {
        toValue: 2,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false, // Changed to false for web compatibility
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false, // Changed to false for web compatibility
      }),
      Animated.timing(shadowAnim, {
        toValue: 6,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const getButtonStyles = () => {
    const baseStyles = {
      transform: [{ scale: scaleAnim }],
      opacity: opacityAnim,
    };

    const sizeStyles = {
      small: {
        paddingHorizontal: 'clamp(12px, 2vw, 16px)',
        paddingVertical: 'clamp(6px, 1vh, 8px)',
        borderRadius: 'clamp(12px, 2vw, 16px)',
        minWidth: 'clamp(80px, 15vw, 100px)',
      },
      medium: {
        paddingHorizontal: 'clamp(18px, 3vw, 24px)',
        paddingVertical: 'clamp(8px, 1.5vh, 12px)',
        borderRadius: 'clamp(16px, 2.5vw, 20px)',
        minWidth: 'clamp(120px, 20vw, 140px)',
      },
      large: {
        paddingHorizontal: 'clamp(24px, 4vw, 32px)',
        paddingVertical: 'clamp(12px, 2vh, 16px)',
        borderRadius: 'clamp(20px, 3vw, 25px)',
        minWidth: 'clamp(150px, 25vw, 180px)',
      },
    };

    const variantStyles = {
      primary: {
        backgroundColor: disabled ? '#CCCCCC' : '#B22222',
        borderColor: disabled ? '#999999' : '#FFD700',
        boxShadow: disabled ? 'none' : '0 4px 8px rgba(178, 34, 34, 0.4)',
      },
      secondary: {
        backgroundColor: disabled ? '#CCCCCC' : '#B22222',
        borderColor: disabled ? '#999999' : '#FFD700',
        boxShadow: disabled ? 'none' : '0 4px 8px rgba(178, 34, 34, 0.4)',
      },
      danger: {
        backgroundColor: disabled ? '#CCCCCC' : '#B22222',
        borderColor: disabled ? '#999999' : '#FFD700',
        boxShadow: disabled ? 'none' : '0 4px 8px rgba(178, 34, 34, 0.4)',
      },
    };

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  const getTextStyles = () => {
    const baseTextStyles = {
      color: disabled ? '#888888' : '#FFD700',
      fontWeight: '900',
      textAlign: 'center',
      letterSpacing: 3,
      textTransform: 'uppercase',
      textShadow: disabled ? 'none' : '2px 2px 4px rgba(0, 0, 0, 0.5)',
    };

    const sizeTextStyles = {
      small: { fontSize: 'clamp(12px, 2vw, 14px)' },
      medium: { fontSize: 'clamp(16px, 2.5vw, 20px)' },
      large: { fontSize: 'clamp(16px, 2.5vw, 32px)' },
    };

    return {
      ...baseTextStyles,
      ...sizeTextStyles[size],
    };
  };

  const getShadowStyles = () => {
    return {
      elevation: shadowAnim,
      boxShadow: `0 ${shadowAnim}px 8px rgba(0, 0, 0, 0.3)`,
    };
  };

  return (
    <Animated.View style={[getShadowStyles()]}>
      <TouchableOpacity
        style={[
          styles.button,
          getButtonStyles(),
          style,
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <View style={styles.buttonContent}>
          {showIcon && icon && (
            <View style={styles.iconContainer}>
              {icon}
            </View>
          )}
          <Text style={[getTextStyles(), textStyle]}>
            {title}
          </Text>
        </View>
        
        {/* Shine effect */}
        <View style={[
          styles.shine,
          isPressed && styles.shineActive
        ]} />
        
        {/* Glow effect for active state */}
        {!disabled && (
          <View style={[
            styles.glow,
            isPressed && styles.glowActive
          ]} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  iconContainer: {
    marginRight: 8,
  },
  shine: {
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    transform: [{ skewX: '-25deg' }],
    opacity: 0,
    transition: 'left 0.6s ease-in-out, opacity 0.6s ease-in-out',
  },
  shineActive: {
    left: '100%',
    opacity: 1,
  },
  glow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 27,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    opacity: 0,
  },
  glowActive: {
    opacity: 0.8,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
});

export default PolishedButton;
