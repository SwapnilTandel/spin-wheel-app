import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { commonStyles, theme } from '../../styles/theme';

/**
 * Reusable Input component
 */
const Input = ({ 
  label,
  value, 
  onChangeText, 
  placeholder, 
  error,
  style,
  inputStyle,
  labelStyle,
  errorStyle,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputContainerStyle = [
    commonStyles.input,
    isFocused && commonStyles.inputFocused,
    error && commonStyles.inputError,
    inputStyle,
  ];

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
      <TextInput
        style={inputContainerStyle}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {error && (
        <Text style={[styles.error, errorStyle]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.DARK_GRAY,
    marginBottom: theme.spacing.sm,
  },
  error: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.ERROR,
    marginTop: theme.spacing.xs,
  },
});

export default Input;
