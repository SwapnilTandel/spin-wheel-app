import React from 'react';
import { View, Text, Switch as RNSwitch, StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

/**
 * Reusable Switch component with label
 */
const Switch = ({ 
  label,
  value, 
  onValueChange, 
  style,
  labelStyle,
  switchStyle,
  ...props 
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <RNSwitch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={value ? '#f5dd4b' : '#f4f3f4'}
        style={[styles.switch, switchStyle]}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.LIGHT_GRAY,
  },
  label: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.DARK_GRAY,
    flex: 1,
  },
  switch: {
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
  },
});

export default Switch;
