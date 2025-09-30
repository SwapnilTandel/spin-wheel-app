import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateSettings } from '../../store/slices/settingsSlice';
import Switch from '../common/Switch';
import Input from '../common/Input';
import Button from '../common/Button';
import { useFileUpload } from '../../hooks';
import { FONT_FAMILIES } from '../../utils/constants';
import { settingsStyles } from '../../styles/theme';

/**
 * Settings form component
 */
const SettingsForm = () => {
  const dispatch = useDispatch();
  const { settings } = useSelector(state => state.settings);
  
  const { handleFileUpload: uploadImage, isUploading: isImageUploading } = useFileUpload('image');
  const { handleFileUpload: uploadVideo, isUploading: isVideoUploading } = useFileUpload('video');

  const handleSettingChange = (key, value) => {
    dispatch(updateSettings({ [key]: value }));
  };

  const onImageSuccess = (dataUrl) => {
    handleSettingChange('backgroundImage', dataUrl);
    handleSettingChange('backgroundVideo', null);
    alert('Success: Background image uploaded!');
  };

  const onVideoSuccess = (dataUrl) => {
    handleSettingChange('backgroundVideo', dataUrl);
    handleSettingChange('backgroundImage', null);
    alert('Success: Background video uploaded!');
  };

  const onImageError = (error) => {
    alert(`Error: ${error}`);
  };

  const onVideoError = (error) => {
    alert(`Error: ${error}`);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadImage(file, onImageSuccess, onImageError);
    }
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadVideo(file, onVideoSuccess, onVideoError);
    }
  };

  return (
    <View style={settingsStyles.section}>
      <Text style={settingsStyles.sectionTitle}>Settings</Text>
      
      <Switch
        label="Sound Effects"
        value={settings.soundEnabled}
        onValueChange={(value) => handleSettingChange('soundEnabled', value)}
      />

      <Switch
        label="Animations"
        value={settings.animationsEnabled}
        onValueChange={(value) => handleSettingChange('animationsEnabled', value)}
      />

      <Switch
        label="Haptic Feedback"
        value={settings.hapticFeedback}
        onValueChange={(value) => handleSettingChange('hapticFeedback', value)}
      />

      <View style={settingsStyles.settingItem}>
        <Text style={settingsStyles.settingLabel}>Label Text Size</Text>
        <View style={settingsStyles.textSizeContainer}>
          <Button
            title="-"
            size="sm"
            onPress={() => handleSettingChange('labelTextSize', Math.max(10, (settings.labelTextSize || 18) - 1))}
            style={settingsStyles.textSizeButton}
          />
          <Text style={settingsStyles.textSizeValue}>{settings.labelTextSize || 18}</Text>
          <Button
            title="+"
            size="sm"
            onPress={() => handleSettingChange('labelTextSize', Math.min(32, (settings.labelTextSize || 18) + 1))}
            style={settingsStyles.textSizeButton}
          />
        </View>
      </View>

      <View style={settingsStyles.settingItem}>
        <Text style={settingsStyles.settingLabel}>Label Font</Text>
        <View style={settingsStyles.fontContainer}>
          <select
            value={settings.labelFontFamily || 'system-ui'}
            onChange={(e) => handleSettingChange('labelFontFamily', e.target.value)}
            style={settingsStyles.fontSelect}
          >
            {FONT_FAMILIES.map(font => (
              <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                {font.label}
              </option>
            ))}
          </select>
        </View>
      </View>

      <View style={settingsStyles.settingItem}>
        <Text style={settingsStyles.settingLabel}>Background Theme</Text>
        <View style={settingsStyles.themeButtons}>
          <TouchableOpacity
            style={[
              settingsStyles.themeButton,
              settings.backgroundTheme === 'white' && settingsStyles.themeButtonActive
            ]}
            onPress={() => handleSettingChange('backgroundTheme', 'white')}
          >
            <Text style={[
              settingsStyles.themeButtonText,
              settings.backgroundTheme === 'white' && settingsStyles.themeButtonTextActive
            ]}>
              White
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              settingsStyles.themeButton,
              settings.backgroundTheme === 'custom' && settingsStyles.themeButtonActive
            ]}
            onPress={() => handleSettingChange('backgroundTheme', 'custom')}
          >
            <Text style={[
              settingsStyles.themeButtonText,
              settings.backgroundTheme === 'custom' && settingsStyles.themeButtonTextActive
            ]}>
              🖼️ Custom
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {settings.backgroundTheme === 'custom' && (
        <>
          <View style={settingsStyles.settingItem}>
            <Text style={settingsStyles.settingLabel}>Background Image</Text>
            <View style={settingsStyles.imageUploadContainer}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                id="background-image-upload"
              />
              <Button
                title={settings.backgroundImage ? '✓ Change Image' : '📁 Upload Image'}
                onPress={() => document.getElementById('background-image-upload').click()}
                variant="success"
                size="sm"
                disabled={isImageUploading}
              />
              {settings.backgroundImage && (
                <Button
                  title="✕ Clear"
                  onPress={() => handleSettingChange('backgroundImage', null)}
                  variant="danger"
                  size="sm"
                />
              )}
            </View>
          </View>

          <View style={settingsStyles.settingItem}>
            <Text style={settingsStyles.settingLabel}>Background Video</Text>
            <View style={settingsStyles.imageUploadContainer}>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                style={{ display: 'none' }}
                id="background-video-upload"
              />
              <Button
                title={settings.backgroundVideo ? '✓ Change Video' : '🎥 Upload Video'}
                onPress={() => document.getElementById('background-video-upload').click()}
                variant="success"
                size="sm"
                disabled={isVideoUploading}
              />
              {settings.backgroundVideo && (
                <Button
                  title="✕ Clear"
                  onPress={() => handleSettingChange('backgroundVideo', null)}
                  variant="danger"
                  size="sm"
                />
              )}
            </View>
          </View>
        </>
      )}

      <Input
        label="Settings Password"
        value={settings.settingsPassword}
        onChangeText={(value) => handleSettingChange('settingsPassword', value)}
        placeholder="Enter password (empty = no protection)"
        secureTextEntry={false}
      />
      <Text style={settingsStyles.passwordHint}>
        Set a password to protect settings. Leave empty for no protection.
      </Text>
    </View>
  );
};

export default SettingsForm;
