import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { commonStyles, theme } from '../../styles/theme';

/**
 * Reusable Button component
 */
const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  style, 
  textStyle,
  ...props 
}) => {
  const buttonStyle = [
    commonStyles.button,
    styles[variant],
    styles[size],
    disabled && commonStyles.buttonDisabled,
    style,
  ];

  const buttonTextStyle = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      {...props}
    >
      <Text style={buttonTextStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Variants
  primary: {
    backgroundColor: theme.colors.PRIMARY,
  },
  secondary: {
    backgroundColor: theme.colors.SECONDARY,
  },
  white: {
    backgroundColor: theme.colors.WHITE,
    borderWidth: 1,
    borderColor: theme.colors.PRIMARY,
  },
  danger: {
    backgroundColor: theme.colors.ERROR,
  },
  success: {
    backgroundColor: theme.colors.SUCCESS,
  },
  
  // Sizes
  sm: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  md: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  lg: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
  },
  
  // Text styles
  text: {
    fontWeight: theme.fontWeight.bold,
    textAlign: 'center',
  },
  primaryText: {
    color: theme.colors.WHITE,
  },
  secondaryText: {
    color: theme.colors.PRIMARY,
  },
  whiteText: {
    color: theme.colors.PRIMARY,
  },
  dangerText: {
    color: theme.colors.WHITE,
  },
  successText: {
    color: theme.colors.WHITE,
  },
  disabledText: {
    color: theme.colors.GRAY,
  },
  
  // Text sizes
  smText: {
    fontSize: theme.fontSize.sm,
  },
  mdText: {
    fontSize: theme.fontSize.md,
  },
  lgText: {
    fontSize: theme.fontSize.lg,
  },
});

export default Button;
