import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { COLOR_OPTIONS } from '../../utils/constants';
import { getColorName } from '../../utils/helpers';
import { theme } from '../../styles/theme';

/**
 * Color picker component with grid layout
 */
const ColorPicker = ({ 
  selectedColor, 
  onColorSelect, 
  recentColors = [], 
  showRecentColors = true,
  style,
  title = 'Choose Color',
  ...props 
}) => {
  const renderColorOption = (colorObj, isSelected) => (
    <View key={colorObj.color} style={styles.colorWithName}>
      <TouchableOpacity
        style={[
          styles.colorOption,
          { backgroundColor: colorObj.color },
          isSelected && styles.selectedColor
        ]}
        onPress={() => onColorSelect(colorObj.color)}
        activeOpacity={0.7}
      />
      <Text style={styles.colorName} numberOfLines={1}>
        {colorObj.name}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, style]} {...props}>
      <Text style={styles.title}>{title}</Text>
      
      {showRecentColors && recentColors.length > 0 && (
        <View style={styles.recentColorsSection}>
          <Text style={styles.recentColorsLabel}>Recently Used:</Text>
          <View style={styles.recentColorsGrid}>
            {recentColors.map((color, index) => {
              const colorInfo = COLOR_OPTIONS.find(c => c.color === color);
              return renderColorOption(
                colorInfo || { color, name: getColorName(color) },
                selectedColor === color
              );
            })}
          </View>
        </View>
      )}
      
      <Text style={styles.allColorsLabel}>All Colors:</Text>
      <ScrollView style={styles.colorScrollView} nestedScrollEnabled={true}>
        <View style={styles.colorGrid}>
          {COLOR_OPTIONS.map((colorObj) => 
            renderColorOption(colorObj, selectedColor === colorObj.color)
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.DARK_GRAY,
    marginBottom: theme.spacing.md,
  },
  recentColorsSection: {
    marginBottom: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.LIGHT_GRAY,
  },
  recentColorsLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.PRIMARY,
    marginBottom: theme.spacing.sm,
  },
  recentColorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  allColorsLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.DARK_GRAY,
    marginBottom: theme.spacing.sm,
  },
  colorScrollView: {
    maxHeight: 200,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  colorWithName: {
    alignItems: 'center',
    width: 60,
    marginBottom: theme.spacing.sm,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    marginBottom: 4,
  },
  selectedColor: {
    borderColor: theme.colors.PRIMARY,
    borderWidth: 3,
  },
  colorName: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.GRAY,
    textAlign: 'center',
    width: '100%',
  },
});

export default ColorPicker;
