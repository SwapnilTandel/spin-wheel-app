import React, { memo, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeCategory, moveCategory } from '../../store/slices/categoriesSlice';
import { getColorName } from '../../utils/helpers';
import { settingsStyles } from '../../styles/theme';

/**
 * Optimized CategoryList component with performance improvements
 */
const OptimizedCategoryList = memo(({ activeTab, onEditCategory }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.categories);

  const handleRemoveCategory = useCallback((categoryId) => {
    if (categories[activeTab].length <= 2) {
      alert('Error: You need at least 2 categories to spin the wheel!');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this category?');
    if (confirmDelete) {
      dispatch(removeCategory({ wheelValue: activeTab, categoryId }));
    }
  }, [dispatch, categories, activeTab]);

  const handleMoveCategory = useCallback((categoryId, direction) => {
    dispatch(moveCategory({
      wheelValue: activeTab,
      categoryId: categoryId,
      direction: direction
    }));
  }, [dispatch, activeTab]);

  const handleEditCategory = useCallback((category) => {
    onEditCategory(category);
  }, [onEditCategory]);

  return (
    <>
      {categories[activeTab].map((category, index) => (
        <CategoryItem
          key={category.id}
          category={category}
          index={index}
          totalItems={categories[activeTab].length}
          onRemove={handleRemoveCategory}
          onMove={handleMoveCategory}
          onEdit={handleEditCategory}
        />
      ))}
    </>
  );
});

const CategoryItem = memo(({ 
  category, 
  index, 
  totalItems, 
  onRemove, 
  onMove, 
  onEdit 
}) => {
  const handleRemove = useCallback(() => {
    onRemove(category.id);
  }, [onRemove, category.id]);

  const handleMoveUp = useCallback(() => {
    onMove(category.id, 'up');
  }, [onMove, category.id]);

  const handleMoveDown = useCallback(() => {
    onMove(category.id, 'down');
  }, [onMove, category.id]);

  const handleEdit = useCallback(() => {
    onEdit(category);
  }, [onEdit, category]);

  const isFirst = index === 0;
  const isLast = index === totalItems - 1;

  return (
    <View style={settingsStyles.categoryItem}>
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
            isFirst && settingsStyles.moveButtonDisabled
          ]}
          onPress={handleMoveUp}
          activeOpacity={0.7}
          disabled={isFirst}
        >
          <Text style={[
            settingsStyles.moveButtonText,
            isFirst && settingsStyles.moveButtonTextDisabled
          ]}>⬆️</Text>
        </TouchableOpacity>
        
        {/* Move Down Button */}
        <TouchableOpacity 
          style={[
            settingsStyles.moveButton,
            isLast && settingsStyles.moveButtonDisabled
          ]}
          onPress={handleMoveDown}
          activeOpacity={0.7}
          disabled={isLast}
        >
          <Text style={[
            settingsStyles.moveButtonText,
            isLast && settingsStyles.moveButtonTextDisabled
          ]}>⬇️</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={settingsStyles.editButton}
          onPress={handleEdit}
          activeOpacity={0.7}
        >
          <Text style={settingsStyles.editButtonText}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={settingsStyles.deleteButton}
          onPress={handleRemove}
          activeOpacity={0.7}
        >
          <Text style={settingsStyles.deleteButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

OptimizedCategoryList.displayName = 'OptimizedCategoryList';
CategoryItem.displayName = 'CategoryItem';

export default OptimizedCategoryList;
