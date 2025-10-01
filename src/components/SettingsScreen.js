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
import { addCategory, removeCategory, updateCategory, moveCategory, updateSettings } from '../store/slices/wheelSlice';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const { categories, settings, history } = useSelector(state => state.wheel);
  console.log('SettingsScreen - Current settings:', settings);
  const [activeTab, setActiveTab] = useState(50);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', color: '#B22222', number: 50 });
  const [editingCategory, setEditingCategory] = useState(null);

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) {
      alert('Error: Please enter a category name!');
      return;
    }

    if (!newCategory.number || newCategory.number < 1 || newCategory.number > 100) {
      alert('Error: Please enter a valid number between 1 and 100!');
      return;
    }

    dispatch(addCategory({
      wheelValue: activeTab,
      category: newCategory
    }));
    
    // Add color to recent colors
    addToRecentColors(newCategory.color);

      setNewCategory({ name: '', color: '#B22222', number: 50 });
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

  const handleEditCategory = (category) => {
    setEditingCategory({ ...category });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!editingCategory.name.trim()) {
      alert('Error: Please enter a category name!');
      return;
    }

    if (!editingCategory.number || editingCategory.number < 1 || editingCategory.number > 100) {
      alert('Error: Please enter a valid number between 1 and 100!');
      return;
    }

    dispatch(updateCategory({
      wheelValue: activeTab,
      categoryId: editingCategory.id,
      updates: {
        name: editingCategory.name,
        color: editingCategory.color,
        number: editingCategory.number
      }
    }));
    
    // Add color to recent colors
    addToRecentColors(editingCategory.color);

    setShowEditModal(false);
    setEditingCategory(null);
    alert('Success: Category updated successfully!');
  };

  const handleMoveCategory = (categoryId, direction) => {
    dispatch(moveCategory({
      wheelValue: activeTab,
      categoryId: categoryId,
      direction: direction
    }));
  };

  const handleSettingChange = (key, value) => {
    console.log('handleSettingChange called:', key, value);
    console.log('Current settings before:', settings);
    dispatch(updateSettings({ [key]: value }));
    console.log('Dispatch called for:', key, value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Error: Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target.result;
        handleSettingChange('backgroundImage', imageDataUrl);
        // Clear video if image is uploaded
        handleSettingChange('backgroundVideo', null);
        alert('Success: Background image uploaded!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (max 50MB for video)
      if (file.size > 50 * 1024 * 1024) {
        alert('Error: Video size should be less than 50MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const videoDataUrl = e.target.result;
        handleSettingChange('backgroundVideo', videoDataUrl);
        // Clear image if video is uploaded
        handleSettingChange('backgroundImage', null);
        alert('Success: Background video uploaded!');
      };
      reader.readAsDataURL(file);
    }
  };

  const colorOptions = [
    // Primary Maharaja theme colors
    { color: '#B22222', name: 'Fire Brick' },
    { color: '#FFD700', name: 'Gold' },
    { color: '#FFF8E6', name: 'Cream' },
    { color: '#FFFFFF', name: 'White' },
    // Vibrant colors
    { color: '#FF6B6B', name: 'Coral Red' },
    { color: '#4ECDC4', name: 'Turquoise' },
    { color: '#45B7D1', name: 'Sky Blue' },
    { color: '#96CEB4', name: 'Mint' },
    { color: '#FF9F43', name: 'Orange' },
    { color: '#10AC84', name: 'Emerald' },
    { color: '#5F27CD', name: 'Purple' },
    { color: '#00D2D3', name: 'Cyan' },
    // Blue tones
    { color: '#0066CC', name: 'Royal Blue' },
    { color: '#3366FF', name: 'Blue' },
    { color: '#0099FF', name: 'Azure' },
    { color: '#00CCFF', name: 'Light Blue' },
    { color: '#0066FF', name: 'Bright Blue' },
    { color: '#3399FF', name: 'Dodger Blue' },
    { color: '#66CCFF', name: 'Sky' },
    { color: '#99DDFF', name: 'Pale Blue' },
    // Green tones
    { color: '#00CC66', name: 'Sea Green' },
    { color: '#33FF99', name: 'Spring Green' },
    { color: '#66FFCC', name: 'Aquamarine' },
    { color: '#99FFDD', name: 'Pale Green' },
    { color: '#009966', name: 'Jade' },
    { color: '#00FF99', name: 'Mint Green' },
    { color: '#33CC99', name: 'Teal' },
    { color: '#66FF99', name: 'Light Green' },
    // Red tones
    { color: '#FF3366', name: 'Rose' },
    { color: '#FF6699', name: 'Pink Red' },
    { color: '#FF99CC', name: 'Light Pink' },
    { color: '#FFCCDD', name: 'Blush' },
    { color: '#CC0033', name: 'Crimson' },
    { color: '#FF0033', name: 'Red' },
    { color: '#FF69B4', name: 'Hot Pink' },
    // Purple tones
    { color: '#9966FF', name: 'Violet' },
    { color: '#CC99FF', name: 'Lavender' },
    { color: '#DDCCFF', name: 'Lilac' },
    { color: '#EEEEFF', name: 'Pale Purple' },
    { color: '#6633CC', name: 'Indigo' },
    { color: '#9933FF', name: 'Purple' },
    { color: '#CC66FF', name: 'Orchid' },
    { color: '#DD99FF', name: 'Mauve' },
    // Orange tones
    { color: '#FF6633', name: 'Coral' },
    { color: '#FF9966', name: 'Peach' },
    { color: '#FFCC99', name: 'Apricot' },
    { color: '#FFDDCC', name: 'Pale Orange' },
    { color: '#FF3300', name: 'Orange Red' },
    { color: '#FF6600', name: 'Bright Orange' },
    { color: '#FF9900', name: 'Amber' },
    { color: '#FFCC00', name: 'Yellow Orange' },
    // Pink tones
    { color: '#FF33CC', name: 'Magenta' },
    { color: '#FF66DD', name: 'Pink' },
    { color: '#FF99EE', name: 'Light Magenta' },
    { color: '#FFCCFF', name: 'Pale Pink' },
    { color: '#CC0099', name: 'Deep Pink' },
    { color: '#FF00CC', name: 'Fuchsia' },
    { color: '#FF33DD', name: 'Hot Magenta' },
    { color: '#FF66EE', name: 'Bright Pink' },
    // Yellow tones
    { color: '#FFFF00', name: 'Yellow' },
    { color: '#FFFF33', name: 'Bright Yellow' },
    { color: '#FFFF66', name: 'Light Yellow' },
    { color: '#FFFF99', name: 'Pale Yellow' },
    { color: '#FFC107', name: 'Golden Yellow' },
    { color: '#FFDD33', name: 'Canary' },
    { color: '#FFEE66', name: 'Lemon' },
    { color: '#FFFFCC', name: 'Cream Yellow' },
    // Dark colors
    { color: '#333333', name: 'Dark Gray' },
    { color: '#666666', name: 'Gray' },
    { color: '#999999', name: 'Silver' },
    { color: '#CCCCCC', name: 'Light Gray' },
    { color: '#000000', name: 'Black' },
    { color: '#1A1A1A', name: 'Almost Black' },
    { color: '#333366', name: 'Dark Blue' },
    { color: '#663333', name: 'Dark Brown' },
    // Light colors
    { color: '#F0F0F0', name: 'Off White' },
    { color: '#F5F5F5', name: 'White Smoke' },
    { color: '#FAFAFA', name: 'Snow' },
    { color: '#E6F3FF', name: 'Alice Blue' },
    { color: '#F0F8FF', name: 'Azure White' },
    { color: '#FFF8DC', name: 'Cornsilk' },
    { color: '#F5FFFA', name: 'Mint Cream' }
  ];
  
  const addToRecentColors = (color) => {
    const recentColors = settings.recentColors || [];
    // Remove color if it already exists
    const filtered = recentColors.filter(c => c !== color);
    // Add to beginning and keep max 12 recent colors
    const updated = [color, ...filtered].slice(0, 12);
    handleSettingChange('recentColors', updated);
  };

  const getColorName = (colorHex) => {
    const colorInfo = colorOptions.find(c => c.color.toUpperCase() === colorHex.toUpperCase());
    return colorInfo ? colorInfo.name : colorHex;
  };

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

        {categories[activeTab].map((category, index) => (
          <View key={category.id} style={styles.categoryItem}>
            <View style={[styles.colorIndicator, { backgroundColor: category.color }]} />
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryColorName}>{getColorName(category.color)}</Text>
              <Text style={styles.categoryRarityNumber}>Rarity: {category.number}</Text>
            </View>
            <View style={styles.categoryActions}>
              {/* Move Up Button */}
              <TouchableOpacity 
                style={[
                  styles.moveButton,
                  index === 0 && styles.moveButtonDisabled
                ]}
                onPress={() => handleMoveCategory(category.id, 'up')}
                activeOpacity={0.7}
                disabled={index === 0}
              >
                <Text style={[
                  styles.moveButtonText,
                  index === 0 && styles.moveButtonTextDisabled
                ]}>⬆️</Text>
              </TouchableOpacity>
              
              {/* Move Down Button */}
              <TouchableOpacity 
                style={[
                  styles.moveButton,
                  index === categories[activeTab].length - 1 && styles.moveButtonDisabled
                ]}
                onPress={() => handleMoveCategory(category.id, 'down')}
                activeOpacity={0.7}
                disabled={index === categories[activeTab].length - 1}
              >
                <Text style={[
                  styles.moveButtonText,
                  index === categories[activeTab].length - 1 && styles.moveButtonTextDisabled
                ]}>⬇️</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => handleEditCategory(category)}
                activeOpacity={0.7}
              >
                <Text style={styles.editButtonText}>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => handleRemoveCategory(category.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.deleteButtonText}>🗑️</Text>
              </TouchableOpacity>
            </View>
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
              style={styles.textSizeButton}
              onPress={() => handleSettingChange('labelTextSize', Math.max(10, (settings.labelTextSize || 18) - 1))}
            >
              <Text style={styles.textSizeButtonText}>-</Text>
            </Pressable>
            <Text style={styles.textSizeValue}>{settings.labelTextSize || 18}</Text>
            <Pressable 
              style={styles.textSizeButton}
              onPress={() => handleSettingChange('labelTextSize', Math.min(32, (settings.labelTextSize || 18) + 1))}
            >
              <Text style={styles.textSizeButtonText}>+</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Label Font</Text>
          <View style={styles.fontContainer}>
            <select
              value={settings.labelFontFamily || 'system-ui'}
              onChange={(e) => handleSettingChange('labelFontFamily', e.target.value)}
              style={styles.fontSelect}
            >
              <option value="system-ui" style={{ fontFamily: 'system-ui' }}>System UI</option>
              <option value="Arial" style={{ fontFamily: 'Arial' }}>Arial</option>
              <option value="Helvetica" style={{ fontFamily: 'Helvetica' }}>Helvetica</option>
              <option value="Times New Roman" style={{ fontFamily: 'Times New Roman' }}>Times New Roman</option>
              <option value="Georgia" style={{ fontFamily: 'Georgia' }}>Georgia</option>
              <option value="Verdana" style={{ fontFamily: 'Verdana' }}>Verdana</option>
              <option value="Courier New" style={{ fontFamily: 'Courier New' }}>Courier New</option>
              <option value="Trebuchet MS" style={{ fontFamily: 'Trebuchet MS' }}>Trebuchet MS</option>
              <option value="Impact" style={{ fontFamily: 'Impact' }}>Impact</option>
              <option value="Comic Sans MS" style={{ fontFamily: 'Comic Sans MS' }}>Comic Sans MS</option>
              <option value="serif" style={{ fontFamily: 'serif' }}>Serif</option>
              <option value="sans-serif" style={{ fontFamily: 'sans-serif' }}>Sans Serif</option>
              <option value="monospace" style={{ fontFamily: 'monospace' }}>Monospace</option>
              <option value="cursive" style={{ fontFamily: 'cursive' }}>Cursive</option>
              <option value="fantasy" style={{ fontFamily: 'fantasy' }}>Fantasy</option>
            </select>
          </View>
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Background Theme</Text>
          <View style={styles.themeButtons}>
            <TouchableOpacity
              style={[
                styles.themeButton,
                settings.backgroundTheme === 'white' && styles.themeButtonActive
              ]}
              onPress={() => handleSettingChange('backgroundTheme', 'white')}
            >
              <Text style={[
                styles.themeButtonText,
                settings.backgroundTheme === 'white' && styles.themeButtonTextActive
              ]}>
                White
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.themeButton,
                settings.backgroundTheme === 'custom' && styles.themeButtonActive
              ]}
              onPress={() => handleSettingChange('backgroundTheme', 'custom')}
            >
              <Text style={[
                styles.themeButtonText,
                settings.backgroundTheme === 'custom' && styles.themeButtonTextActive
              ]}>
                🖼️ Custom
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {settings.backgroundTheme === 'custom' && (
          <>
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Background Image</Text>
              <View style={styles.imageUploadContainer}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                  id="background-image-upload"
                />
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={() => document.getElementById('background-image-upload').click()}
                >
                  <Text style={styles.uploadButtonText}>
                    {settings.backgroundImage ? '✓ Change Image' : '📁 Upload Image'}
                  </Text>
                </TouchableOpacity>
                {settings.backgroundImage && (
                  <TouchableOpacity
                    style={styles.clearButton}
                    onPress={() => handleSettingChange('backgroundImage', null)}
                  >
                    <Text style={styles.clearButtonText}>✕ Clear</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Background Video</Text>
              <View style={styles.imageUploadContainer}>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  style={{ display: 'none' }}
                  id="background-video-upload"
                />
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={() => document.getElementById('background-video-upload').click()}
                >
                  <Text style={styles.uploadButtonText}>
                    {settings.backgroundVideo ? '✓ Change Video' : '🎥 Upload Video'}
                  </Text>
                </TouchableOpacity>
                {settings.backgroundVideo && (
                  <TouchableOpacity
                    style={styles.clearButton}
                    onPress={() => handleSettingChange('backgroundVideo', null)}
                  >
                    <Text style={styles.clearButtonText}>✕ Clear</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </>
        )}

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Settings Password</Text>
          <TextInput
            style={styles.passwordInput}
            value={settings.settingsPassword}
            onChangeText={(value) => handleSettingChange('settingsPassword', value)}
            placeholder="Enter password (empty = no protection)"
            placeholderTextColor="#999"
            secureTextEntry={false}
          />
        </View>
        <Text style={styles.passwordHint}>
          Set a password to protect settings. Leave empty for no protection.
        </Text>

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

            <Text style={styles.colorLabel}>Rarity Number (1-100):</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter number (1 = rarest, 100 = most common)"
              value={newCategory.number.toString()}
              onChangeText={(text) => {
                const num = parseInt(text) || 0;
                setNewCategory({ ...newCategory, number: num });
              }}
              keyboardType="numeric"
            />

            <Text style={styles.colorLabel}>Choose Color:</Text>
            
            {/* Recently Used Colors */}
            {settings.recentColors && settings.recentColors.length > 0 && (
              <View style={styles.recentColorsSection}>
                <Text style={styles.recentColorsLabel}>Recently Used:</Text>
                <View style={styles.recentColorsGrid}>
                  {settings.recentColors.map((color, index) => {
                    const colorInfo = colorOptions.find(c => c.color === color);
                    return (
                      <View key={`recent-${index}`} style={styles.colorWithName}>
                        <TouchableOpacity
                          style={[
                            styles.colorOption,
                            { backgroundColor: color },
                            newCategory.color === color && styles.selectedColor
                          ]}
                          onPress={() => setNewCategory({ ...newCategory, color })}
                        />
                        <Text style={styles.colorName} numberOfLines={1}>
                          {colorInfo ? colorInfo.name : color}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
            
            {/* All Colors */}
            <Text style={styles.allColorsLabel}>All Colors:</Text>
            <ScrollView style={styles.colorScrollView} nestedScrollEnabled={true}>
              <View style={styles.colorGrid}>
                {colorOptions.map((colorObj) => (
                  <View key={colorObj.color} style={styles.colorWithName}>
                    <TouchableOpacity
                      style={[
                        styles.colorOption,
                        { backgroundColor: colorObj.color },
                        newCategory.color === colorObj.color && styles.selectedColor
                      ]}
                      onPress={() => setNewCategory({ ...newCategory, color: colorObj.color })}
                    />
                    <Text style={styles.colorName} numberOfLines={1}>
                      {colorObj.name}
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>

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

      {/* Edit Category Modal */}
      <Modal
        visible={showEditModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Category</Text>
            
            {editingCategory && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Category name"
                  value={editingCategory.name}
                  onChangeText={(text) => setEditingCategory({ ...editingCategory, name: text })}
                />

                <Text style={styles.colorLabel}>Rarity Number (1-100):</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter number (1 = rarest, 100 = most common)"
                  value={editingCategory.number ? editingCategory.number.toString() : '50'}
                  onChangeText={(text) => {
                    const num = parseInt(text) || 0;
                    setEditingCategory({ ...editingCategory, number: num });
                  }}
                  keyboardType="numeric"
                />

                <Text style={styles.colorLabel}>Choose Color:</Text>
                
                {/* Recently Used Colors */}
                {settings.recentColors && settings.recentColors.length > 0 && (
                  <View style={styles.recentColorsSection}>
                    <Text style={styles.recentColorsLabel}>Recently Used:</Text>
                    <View style={styles.recentColorsGrid}>
                      {settings.recentColors.map((color, index) => {
                        const colorInfo = colorOptions.find(c => c.color === color);
                        return (
                          <View key={`recent-${index}`} style={styles.colorWithName}>
                            <TouchableOpacity
                              style={[
                                styles.colorOption,
                                { backgroundColor: color },
                                editingCategory.color === color && styles.selectedColor
                              ]}
                              onPress={() => setEditingCategory({ ...editingCategory, color })}
                            />
                            <Text style={styles.colorName} numberOfLines={1}>
                              {colorInfo ? colorInfo.name : color}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                )}
                
                {/* All Colors */}
                <Text style={styles.allColorsLabel}>All Colors:</Text>
                <ScrollView style={styles.colorScrollView} nestedScrollEnabled={true}>
                  <View style={styles.colorGrid}>
                    {colorOptions.map((colorObj) => (
                      <View key={colorObj.color} style={styles.colorWithName}>
                        <TouchableOpacity
                          style={[
                            styles.colorOption,
                            { backgroundColor: colorObj.color },
                            editingCategory.color === colorObj.color && styles.selectedColor
                          ]}
                          onPress={() => setEditingCategory({ ...editingCategory, color: colorObj.color })}
                        />
                        <Text style={styles.colorName} numberOfLines={1}>
                          {colorObj.name}
                        </Text>
                      </View>
                    ))}
                  </View>
                </ScrollView>

                <View style={styles.modalButtons}>
                  <TouchableOpacity 
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => {
                      setShowEditModal(false);
                      setEditingCategory(null);
                    }}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.modalButton, styles.modalAddButton]}
                    onPress={handleSaveEdit}
                  >
                    <Text style={styles.modalAddButtonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  colorIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  categoryInfo: {
    flex: 1,
    flexDirection: 'column',
  },
  categoryName: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '600',
    marginBottom: 2,
  },
  categoryColorName: {
    fontSize: 12,
    color: '#666666',
    fontStyle: 'italic',
  },
  categoryRarityNumber: {
    fontSize: 12,
    color: '#B22222',
    fontWeight: '600',
    marginTop: 2,
  },
  categoryActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    padding: 8,
    backgroundColor: '#E6F3FF',
    borderRadius: 6,
    minWidth: 36,
    minHeight: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    fontSize: 18,
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
  moveButton: {
    padding: 8,
    backgroundColor: '#F0F8FF',
    borderRadius: 6,
    minWidth: 36,
    minHeight: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#B0C4DE',
  },
  moveButtonDisabled: {
    backgroundColor: '#F5F5F5',
    borderColor: '#CCCCCC',
    opacity: 0.5,
  },
  moveButtonText: {
    fontSize: 16,
    color: '#4682B4',
  },
  moveButtonTextDisabled: {
    color: '#999999',
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
  themeButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  themeButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  themeButtonActive: {
    backgroundColor: '#FFD700',
    borderColor: '#B22222',
  },
  themeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  themeButtonTextActive: {
    color: '#B22222',
    fontWeight: 'bold',
  },
  textSizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  textSizeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#B22222',
  },
  textSizeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#B22222',
  },
  textSizeValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    minWidth: 40,
    textAlign: 'center',
  },
  imageUploadContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  uploadButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#45a049',
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  clearButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#f44336',
    borderWidth: 2,
    borderColor: '#da190b',
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
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
  recentColorsSection: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  recentColorsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#B22222',
    marginBottom: 8,
  },
  recentColorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  allColorsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  colorScrollView: {
    maxHeight: 200,
    marginBottom: 20,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  colorWithName: {
    alignItems: 'center',
    width: 60,
    marginBottom: 8,
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
    borderColor: '#B22222',
    borderWidth: 3,
  },
  colorName: {
    fontSize: 10,
    color: '#666666',
    textAlign: 'center',
    width: '100%',
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
  passwordInput: {
    flex: 1,
    marginLeft: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
  },
  passwordHint: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: -10,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  fontContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  fontSelect: {
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#FFFFFF',
    fontSize: 14,
    minWidth: 150,
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
  },
});

export default SettingsScreen;
