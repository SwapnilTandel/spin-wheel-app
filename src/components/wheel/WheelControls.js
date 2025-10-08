import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PolishedButton from '../common/PolishedButton';

/**
 * WheelControls component - Handles control buttons for the wheel
 * Extracted from SpinWheelScreen component to separate control concerns
 */
const WheelControls = ({
  isSpinning,
  canStopSpin,
  onStartSpin,
  onStopSpin,
  value
}) => {
  const getButtonText = () => {
    if (isSpinning) {
      return canStopSpin ? 'STOP SPIN' : 'SPINNING...';
    }
    return `SPIN $${value}`;
  };

  const getButtonVariant = () => {
    if (isSpinning && canStopSpin) {
      return 'danger';
    }
    if (isSpinning) {
      return 'secondary';
    }
    return 'primary';
  };

  const handleButtonPress = () => {
    if (isSpinning && canStopSpin) {
      onStopSpin();
    } else if (!isSpinning) {
      onStartSpin();
    }
  };

  return (
    <View style={styles.container}>
      {/* Keyboard Instructions */}
      <Text style={styles.instructionText}>
        {isSpinning 
          ? (canStopSpin ? 'Press ENTER to stop' : 'Wait 3 seconds...')
          : 'Press ENTER to spin'
        }
      </Text>
      
      {/* Spin/Stop Button */}
      <PolishedButton
        title={getButtonText()}
        onPress={handleButtonPress}
        disabled={isSpinning && !canStopSpin}
        variant={getButtonVariant()}
        size="large"
        style={styles.spinButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 'clamp(10px, 2vh, 20px)',
    paddingBottom: 'clamp(15px, 3vh, 30px)',
    zIndex: 5,
  },
  instructionText: {
    color: '#B22222',
    fontSize: 'clamp(16px, 2.5vw, 24px)',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 'clamp(10px, 2vh, 15px)',
    backgroundColor: '#FFD700',
    paddingHorizontal: 'clamp(20px, 4vw, 30px)',
    paddingVertical: 'clamp(8px, 1.5vh, 12px)',
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#B22222',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
  },
  spinButton: {
    minWidth: 'clamp(200px, 30vw, 250px)',
  },
});

export default WheelControls;
