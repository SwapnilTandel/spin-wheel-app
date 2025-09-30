import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addCategory, updateCategory } from '../../store/slices/categoriesSlice';
import { addToRecentColors } from '../../utils/helpers';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import ColorPicker from '../common/ColorPicker';
import { validateCategory } from '../../utils/validation';
import { settingsStyles } from '../../styles/theme';

/**
 * Category modal for adding/editing categories
 */
const CategoryModal = ({ 
  visible, 
  onClose, 
  activeTab, 
  editingCategory, 
  isEdit = false 
}) => {
  const dispatch = useDispatch();
  const { settings } = useSelector(state => state.wheel);
  
  const [formData, setFormData] = useState({
    name: editingCategory?.name || '',
    color: editingCategory?.color || '#B22222',
    number: editingCategory?.number || 50,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = () => {
    const validation = validateCategory(formData);
    
    if (!validation.isValid) {
      const errorObj = {};
      validation.errors.forEach((error, index) => {
        if (error.includes('name')) errorObj.name = error;
        else if (error.includes('number')) errorObj.number = error;
        else if (error.includes('color')) errorObj.color = error;
      });
      setErrors(errorObj);
      return;
    }

    if (isEdit && editingCategory) {
      dispatch(updateCategory({
        wheelValue: activeTab,
        categoryId: editingCategory.id,
        updates: formData
      }));
      addToRecentColors(settings.recentColors, formData.color);
      alert('Success: Category updated successfully!');
    } else {
      dispatch(addCategory({
        wheelValue: activeTab,
        category: formData
      }));
      addToRecentColors(settings.recentColors, formData.color);
      alert('Success: Category added successfully!');
    }
    
    onClose();
  };

  const handleClose = () => {
    setFormData({ name: '', color: '#B22222', number: 50 });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={handleClose}
    >
      <Text style={settingsStyles.modalTitle}>
        {isEdit ? 'Edit Category' : 'Add New Category'}
      </Text>
      
      <Input
        label="Category Name"
        value={formData.name}
        onChangeText={(text) => handleInputChange('name', text)}
        placeholder="Category name"
        error={errors.name}
      />

      <Input
        label="Rarity Number (1-100)"
        value={formData.number.toString()}
        onChangeText={(text) => {
          const num = parseInt(text) || 0;
          handleInputChange('number', num);
        }}
        placeholder="Enter number (1 = rarest, 100 = most common)"
        keyboardType="numeric"
        error={errors.number}
      />

      <ColorPicker
        selectedColor={formData.color}
        onColorSelect={(color) => handleInputChange('color', color)}
        recentColors={settings.recentColors}
        showRecentColors={true}
        title="Choose Color"
      />

      <View style={settingsStyles.modalButtons}>
        <Button
          title="Cancel"
          variant="white"
          onPress={handleClose}
          style={[settingsStyles.modalButton, settingsStyles.cancelButton]}
        />
        <Button
          title={isEdit ? 'Save' : 'Add'}
          variant="primary"
          onPress={handleSubmit}
          style={[settingsStyles.modalButton, settingsStyles.modalAddButton]}
        />
      </View>
    </Modal>
  );
};

export default CategoryModal;
