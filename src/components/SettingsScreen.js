import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  Switch,
  ScrollView,
  Modal,
  Pressable 
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// Removed react-native-vector-icons import due to web compatibility issues
import { addCategory, removeCategory, updateCategory, updateSettings } from '../store/slices/wheelSlice';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const { categories, settings, history } = useSelector(state => state.wheel);
  console.log('SettingsScreen - Current settings:', settings);
  const [activeTab, setActiveTab] = useState(50);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', color: '#B22222' });

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) {
      alert('Error: Please enter a category name!');
      return;
    }

    dispatch(addCategory({
      wheelValue: activeTab,
      category: newCategory
    }));

      setNewCategory({ name: '', color: '#B22222' });
    setShowAddModal(false);
    alert('Success: Category added successfully!');
  };

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

  const handleSettingChange = (key, value) => {
    console.log('handleSettingChange called:', key, value);
    console.log('Current settings before:', settings);
    dispatch(updateSettings({ [key]: value }));
    console.log('Dispatch called for:', key, value);
  };

  const colorOptions = [
    // Primary Maharaja theme colors
    '#B22222', '#FFD700', '#FFF8E6', '#FFFFFF',
    // Vibrant colors
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
    '#FF9F43', '#10AC84', '#5F27CD', '#00D2D3',
    // Blue tones
    '#0066CC', '#3366FF', '#0099FF', '#00CCFF',
    '#0066FF', '#3399FF', '#66CCFF', '#99DDFF',
    // Green tones
    '#00CC66', '#33FF99', '#66FFCC', '#99FFDD',
    '#009966', '#00FF99', '#33CC99', '#66FF99',
    // Red tones
    '#FF3366', '#FF6699', '#FF99CC', '#FFCCDD',
    '#CC0033', '#FF0033', '#FF3366', '#FF6699',
    // Purple tones
    '#9966FF', '#CC99FF', '#DDCCFF', '#EEEEFF',
    '#6633CC', '#9933FF', '#CC66FF', '#DD99FF',
    // Orange tones
    '#FF6633', '#FF9966', '#FFCC99', '#FFDDCC',
    '#FF3300', '#FF6600', '#FF9900', '#FFCC00',
    // Pink tones
    '#FF33CC', '#FF66DD', '#FF99EE', '#FFCCFF',
    '#CC0099', '#FF00CC', '#FF33DD', '#FF66EE',
    // Yellow tones
    '#FFFF00', '#FFFF33', '#FFFF66', '#FFFF99',
    '#FFCC00', '#FFDD33', '#FFEE66', '#FFFFCC',
    // Dark colors
    '#333333', '#666666', '#999999', '#CCCCCC',
    '#000000', '#1A1A1A', '#333366', '#663333',
    // Light colors
    '#F0F0F0', '#F5F5F5', '#FAFAFA', '#FFFFFF',
    '#E6F3FF', '#F0F8FF', '#FFF8DC', '#F5FFFA'
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 50 && styles.activeTab]}
          onPress={() => setActiveTab(50)}
        >
          <Text style={[styles.tabText, activeTab === 50 && styles.activeTabText]}>
            $50 Wheel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 100 && styles.activeTab]}
          onPress={() => setActiveTab(100)}
        >
          <Text style={[styles.tabText, activeTab === 100 && styles.activeTabText]}>
            $100 Wheel
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories ({categories[activeTab].length})</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setShowAddModal(true)}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {categories[activeTab].map((category) => (
          <View key={category.id} style={styles.categoryItem}>
            <View style={[styles.colorIndicator, { backgroundColor: category.color }]} />
            <Text style={styles.categoryName}>{category.name}</Text>
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={() => handleRemoveCategory(category.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.deleteButtonText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Sound Effects</Text>
          <Switch
            value={settings.soundEnabled}
            onValueChange={(value) => handleSettingChange('soundEnabled', value)}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={settings.soundEnabled ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Animations</Text>
          <Switch
            value={settings.animationsEnabled}
            onValueChange={(value) => handleSettingChange('animationsEnabled', value)}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={settings.animationsEnabled ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Haptic Feedback</Text>
          <Switch
            value={settings.hapticFeedback}
            onValueChange={(value) => handleSettingChange('hapticFeedback', value)}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={settings.hapticFeedback ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Label Text Size</Text>
          <View style={styles.textSizeContainer}>
            <Pressable 
              style={({ pressed }) => [
                styles.textSizeButton, 
                { backgroundColor: pressed ? '#FFA500' : '#FFD700' }
              ]}
              onPress={() => {
                console.log('Increase button pressed - current size:', settings.labelTextSize);
                alert('Increase button clicked!');
                const currentSize = settings.labelTextSize || 14;
                const newSize = Math.min(20, currentSize + 1);
                console.log('Setting new size to:', newSize);
                dispatch(updateSettings({ labelTextSize: newSize }));
              }}
            >
              <Text style={[styles.textSizeButtonText, { color: '#B22222' }]}>+</Text>
            </Pressable>
            <Text style={styles.textSizeValue}>{settings.labelTextSize || 14}px</Text>
            <TouchableOpacity 
              style={styles.textSizeButton}
              onPress={() => {
                console.log('Decrease button pressed - current size:', settings.labelTextSize);
                alert('Decrease button clicked!');
                const currentSize = settings.labelTextSize || 14;
                const newSize = Math.max(10, currentSize - 1);
                console.log('Setting new size to:', newSize);
                dispatch(updateSettings({ labelTextSize: newSize }));
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.textSizeButtonText}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent History ({history.length})</Text>
        {history.slice(0, 5).map((item, index) => (
          <View key={index} style={styles.historyItem}>
            <Text style={styles.historyText}>
              ${item.wheelValue} - {item.category.name}
            </Text>
            <Text style={styles.historyDate}>
              {new Date(item.timestamp).toLocaleDateString()}
            </Text>
          </View>
        ))}
        {history.length === 0 && (
          <Text style={styles.emptyText}>No spins yet. Start spinning to see your history!</Text>
        )}
      </View>

      {/* Add Category Modal */}
      <Modal
        visible={showAddModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Category</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Category name"
              value={newCategory.name}
              onChangeText={(text) => setNewCategory({ ...newCategory, name: text })}
            />

            <Text style={styles.colorLabel}>Choose Color:</Text>
            <View style={styles.colorGrid}>
              {colorOptions.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    newCategory.color === color && styles.selectedColor
                  ]}
                  onPress={() => setNewCategory({ ...newCategory, color })}
                />
              ))}
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalAddButton]}
                onPress={handleAddCategory}
              >
                <Text style={styles.modalAddButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#B22222',
    borderRadius: 10,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#FFD700',
  },
  tabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#B22222',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B22222',
  },
  addButton: {
    backgroundColor: '#B22222',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  colorIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  categoryName: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  deleteButton: {
    padding: 8,
    backgroundColor: '#FFE6E6',
    borderRadius: 6,
    minWidth: 36,
    minHeight: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    fontSize: 18,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333333',
  },
  historyItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  historyText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  historyDate: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666666',
    fontStyle: 'italic',
    paddingVertical: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#B22222',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  colorLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 10,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  colorOption: {
    width: 32,
    height: 32,
    borderRadius: 16,
    margin: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: '#B22222',
    borderWidth: 3,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#CCCCCC',
  },
  modalAddButton: {
    backgroundColor: '#B22222',
  },
  cancelButtonText: {
    color: '#666666',
    fontWeight: 'bold',
  },
  modalAddButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  textSizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 160,
  },
  textSizeButton: {
    backgroundColor: '#B22222',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    zIndex: 100,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  textSizeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textSizeValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B22222',
    minWidth: 40,
    textAlign: 'center',
  },
});

export default SettingsScreen;
