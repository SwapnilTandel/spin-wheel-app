import React from 'react';
import { Modal as RNModal, View, StyleSheet } from 'react-native';
import { commonStyles } from '../../styles/theme';

/**
 * Reusable Modal component
 */
const Modal = ({ 
  visible, 
  onRequestClose, 
  children, 
  animationType = 'slide',
  transparent = true,
  style,
  overlayStyle,
  ...props 
}) => {
  return (
    <RNModal
      visible={visible}
      transparent={transparent}
      animationType={animationType}
      onRequestClose={onRequestClose}
      {...props}
    >
      <View style={[commonStyles.modalOverlay, overlayStyle]}>
        <View style={[commonStyles.modalContent, style]}>
          {children}
        </View>
      </View>
    </RNModal>
  );
};

export default Modal;
