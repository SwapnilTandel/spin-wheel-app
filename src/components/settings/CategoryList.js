import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeCategory, moveCategory } from '../../store/slices/categoriesSlice';
import { getColorName } from '../../utils/helpers';
import { settingsStyles } from '../../styles/theme';

/**
 * Category list component for settings
 */
const CategoryList = ({ activeTab, onEditCategory }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.wheel);

  const handleRemoveCategory = (categoryId) => {
    if (categories[activeTab].length <= 2) {
      alert('Error: You need at least 2 categories to spin the wheel!');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this category?');
    if (confirmDelete) {
      dispatch(removeCategory({ wheelValue: activeTab, categoryId }));
    }
  };

  const handleMoveCategory = (categoryId, direction) => {
    dispatch(moveCategory({
      wheelValue: activeTab,
      categoryId: categoryId,
      direction: direction
    }));
  };

  return (
    <>
      {categories[activeTab].map((category, index) => (
        <View key={category.id} style={settingsStyles.categoryItem}>
          <View style={[settingsStyles.colorIndicator, { backgroundColor: category.color }]} />
          <View style={settingsStyles.categoryInfo}>
            <Text style={settingsStyles.categoryName}>{category.name}</Text>
            <Text style={settingsStyles.categoryColorName}>{getColorName(category.color)}</Text>
            <Text style={settingsStyles.categoryRarityNumber}>Rarity: {category.number}</Text>
          </View>
          <View style={settingsStyles.categoryActions}>
            {/* Move Up Button */}
            <TouchableOpacity 
              style={[
                settingsStyles.moveButton,
                index === 0 && settingsStyles.moveButtonDisabled
              ]}
              onPress={() => handleMoveCategory(category.id, 'up')}
              activeOpacity={0.7}
              disabled={index === 0}
            >
              <Text style={[
                settingsStyles.moveButtonText,
                index === 0 && settingsStyles.moveButtonTextDisabled
              ]}>⬆️</Text>
            </TouchableOpacity>
            
            {/* Move Down Button */}
            <TouchableOpacity 
              style={[
                settingsStyles.moveButton,
                index === categories[activeTab].length - 1 && settingsStyles.moveButtonDisabled
              ]}
              onPress={() => handleMoveCategory(category.id, 'down')}
              activeOpacity={0.7}
              disabled={index === categories[activeTab].length - 1}
            >
              <Text style={[
                settingsStyles.moveButtonText,
                index === categories[activeTab].length - 1 && settingsStyles.moveButtonTextDisabled
              ]}>⬇️</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={settingsStyles.editButton}
              onPress={() => onEditCategory(category)}
              activeOpacity={0.7}
            >
              <Text style={settingsStyles.editButtonText}>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={settingsStyles.deleteButton}
              onPress={() => handleRemoveCategory(category.id)}
              activeOpacity={0.7}
            >
              <Text style={settingsStyles.deleteButtonText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </>
  );
};

export default CategoryList;
