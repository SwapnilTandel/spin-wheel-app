import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { wheelStyles, CENTER_LOGO_SIZE } from '../../styles/theme';

/**
 * Wheel center logo component
 */
const WheelCenter = ({ logoUrl, style }) => {
  return (
    <View style={[wheelStyles.centerLogo, style]}>
      <Image 
        source={{ uri: logoUrl || 'https://maharajafarmersmarketusa.com/wp-content/uploads/2024/04/mfm_logo.webp' }}
        style={wheelStyles.logoImage}
        resizeMode="contain"
      />
    </View>
  );
};

export default WheelCenter;
