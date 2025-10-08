import React from 'react';
import { View, Text, StyleSheet, Modal, Animated, Image } from 'react-native';
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { WHEEL_SIZE, CENTER_LOGO_SIZE } from '../../styles/theme';

/**
 * WheelDisplay component - Handles display elements like center logo, pointer, and modals
 * Extracted from SpinWheelScreen component to separate display concerns
 */
const WheelDisplay = ({
  winner,
  showCelebrationModal,
  showAlert,
  modalScale,
  modalOpacity,
  onCloseCelebrationModal
}) => {
  return (
    <>
      {/* Center Logo */}
      <View style={styles.centerLogo}>
        <Image 
          source={{ uri: 'https://maharajafarmersmarketusa.com/wp-content/uploads/2024/04/mfm_logo.webp' }}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      {/* Polished SVG Pointer */}
      <View style={styles.pointerContainer}>
        <Svg width="60" height="40" viewBox="0 0 60 40" style={styles.pointerSvg}>
          <Defs>
            <LinearGradient id="pointerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#B22222" />
              <Stop offset="50%" stopColor="#DC143C" />
              <Stop offset="100%" stopColor="#8B0000" />
            </LinearGradient>
            <LinearGradient id="pointerShadow" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="rgba(0,0,0,0.3)" />
              <Stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
            </LinearGradient>
          </Defs>
          
          {/* Shadow/Glow effect */}
          <Path
            d="M 5 20 L 50 5 L 50 15 L 55 20 L 50 25 L 50 35 L 5 20 Z"
            fill="url(#pointerShadow)"
            opacity="0.4"
          />
          
          {/* Main pointer shape */}
          <Path
            d="M 5 20 L 50 5 L 50 15 L 55 20 L 50 25 L 50 35 L 5 20 Z"
            fill="url(#pointerGradient)"
            stroke="#8B0000"
            strokeWidth="1"
          />
          
          {/* Highlight line */}
          <Path
            d="M 5 20 L 50 5 L 50 15 L 55 20"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
          />
          
          {/* Center dot */}
          <Circle
            cx="52"
            cy="20"
            r="3"
            fill="#FFFFFF"
            stroke="#8B0000"
            strokeWidth="1"
          />
        </Svg>
      </View>

      {/* Custom Alert Modal - Shows for 5 seconds */}
      {showAlert && winner && (
        <View style={styles.alertOverlay}>
          <View style={styles.alertContainer}>
            <Text style={styles.alertTitle}>🎉 Congratulations!</Text>
            <Text style={styles.alertMessage}>You won: {winner.name}</Text>
          </View>
        </View>
      )}

      {/* Celebration Modal */}
      <Modal
        visible={showCelebrationModal}
        transparent={true}
        animationType="none"
        onRequestClose={onCloseCelebrationModal}
      >
        <View style={styles.modalOverlay}>
          <Animated.View 
            style={[
              styles.celebrationModal,
              {
                transform: [{ scale: modalScale }],
                opacity: modalOpacity,
              }
            ]}
          >
            {/* Prize Display */}
            <Text style={styles.celebrationTitle}>🎉 CONGRATULATIONS! 🎉</Text>
            <Text style={styles.celebrationPrize}>{winner?.name}</Text>
            <Text style={styles.celebrationSubtext}>You've won an amazing prize!</Text>
            
            {/* Close Button */}
            <View style={styles.closeButtonContainer}>
              <Text style={styles.closeButtonText}>Press ENTER to continue</Text>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centerLogo: {
    position: 'absolute',
    width: CENTER_LOGO_SIZE,
    height: CENTER_LOGO_SIZE,
    borderRadius: CENTER_LOGO_SIZE / 2,
    backgroundColor: '#FFF8E6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FFD700',
    elevation: 15,
    boxShadow: '0 4px 6px rgba(255, 215, 0, 0.6), 0 8px 12px rgba(0, 0, 0, 0.4)',
    zIndex: 200,
    padding: 4,
  },
  logoImage: {
    width: CENTER_LOGO_SIZE * 0.7,
    height: CENTER_LOGO_SIZE * 0.7,
  },
  pointerContainer: {
    position: 'absolute',
    right: -30,
    top: '50%',
    zIndex: 150,
    transform: [{ translateY: -20 }],
  },
  pointerSvg: {
    filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
  },
  alertOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  alertContainer: {
    backgroundColor: '#FFF8E6',
    padding: 30,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#FFD700',
    elevation: 20,
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)',
    position: 'relative',
  },
  alertTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B22222',
    textAlign: 'center',
    marginBottom: 10,
    textShadow: '2px 2px 4px rgba(255,215,0,0.8)',
    zIndex: 10,
  },
  alertMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 10,
    textShadow: '3px 3px 6px rgba(178,34,34,0.8)',
    zIndex: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  celebrationModal: {
    backgroundColor: '#FFF8E6',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    maxWidth: 400,
    borderWidth: 4,
    borderColor: '#FFD700',
    elevation: 20,
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)',
    position: 'relative',
  },
  celebrationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B22222',
    textAlign: 'center',
    marginBottom: 10,
    textShadow: '2px 2px 4px rgba(255,215,0,0.8)',
    zIndex: 10,
  },
  celebrationPrize: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 10,
    textShadow: '3px 3px 6px rgba(178,34,34,0.8)',
    zIndex: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  celebrationSubtext: {
    fontSize: 16,
    color: '#B22222',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
    zIndex: 10,
  },
  closeButtonContainer: {
    backgroundColor: '#B22222',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 5,
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.3)',
    zIndex: 10,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WheelDisplay;
