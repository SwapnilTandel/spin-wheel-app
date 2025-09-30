import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, Animated, Dimensions, Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import SpinWheel from './SpinWheel';
import { setSpinning, setLastResult, addToHistory } from '../store/slices/wheelSlice';

const { width, height } = Dimensions.get('window');

const SpinWheelScreen = ({ value, onReset }) => {
  const dispatch = useDispatch();
  const { categories, settings, isSpinning } = useSelector(state => state.wheel);
  const [winner, setWinner] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isColorToggling, setIsColorToggling] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isKeyboardSpinning, setIsKeyboardSpinning] = useState(false);
  const [canStopSpin, setCanStopSpin] = useState(false);
  const [userRequestedStop, setUserRequestedStop] = useState(false);
  const [stopButtonPressed, setStopButtonPressed] = useState(false);
  
  
  // Animation for celebration modal
  const modalScale = useRef(new Animated.Value(0)).current;
  const modalOpacity = useRef(new Animated.Value(0)).current;
  
  // Ref to access SpinWheel reset function
  const wheelResetRef = useRef(null);

  // Handle reset functionality
  const handleReset = () => {
    setWinner(null);
    setShowCelebrationModal(false);
    setShowAlert(false);
    setCanStopSpin(false);
    setUserRequestedStop(false);
    setStopButtonPressed(false);
    // Reset any spinning state
    dispatch(setSpinning(false));
    // Force component re-render to reset label orientation
    setResetKey(prev => prev + 1);
  };

  // Expose reset function to parent component
  useEffect(() => {
    if (onReset && onReset.current !== undefined) {
      onReset.current = handleReset;
    }
  }, [onReset]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        if (showCelebrationModal) {
          // If modal is showing, close it
          closeCelebrationModal();
        } else if (isSpinning) {
          // If spinning, only allow stop if 3 seconds have passed
          if (canStopSpin) {
            handleStopSpin();
          }
        } else {
          // If not spinning, start the wheel
          handleStartSpin();
        }
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyPress);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isSpinning, canStopSpin, showCelebrationModal]);

  // Handle celebration modal animation
  useEffect(() => {
    console.log('Winner useEffect triggered, winner:', winner);
    if (winner) {
      console.log('Setting celebration modal to true');
      setShowCelebrationModal(true);
      
      // Animate modal entrance
      Animated.parallel([
        Animated.timing(modalScale, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(modalOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [winner]);

  const closeCelebrationModal = () => {
    Animated.parallel([
      Animated.timing(modalScale, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(modalOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setShowCelebrationModal(false);
      // Reset the wheel to its original state when dialog closes
      if (wheelResetRef.current) {
        wheelResetRef.current();
      }
      // Also reset the winner state and enable start button
      setWinner(null);
      setStopButtonPressed(false);
    });
  };
  
  // Sound setup - placeholder for web compatibility
  const playSound = (type) => {
    if (settings.soundEnabled) {
      console.log(`Playing ${type} sound`);
      // Web audio implementation would go here
    }
  };

  const handleSpinComplete = (selectedCategory) => {
    console.log('handleSpinComplete called with:', selectedCategory);
    
    // Stop spinning first
    dispatch(setSpinning(false));
    setIsKeyboardSpinning(false);
    
    // Set selected category and start color toggling
    setSelectedCategory(selectedCategory);
    setIsColorToggling(true);
    
    // Play win sound
    playSound('win');
    
    // Add to history
    dispatch(addToHistory({
      wheelValue: value,
      category: selectedCategory,
    }));
    
    // Stop toggling after 3 seconds and set winner
    setTimeout(() => {
      setIsColorToggling(false);
      setSelectedCategory(null); // Revert background color
      setWinner(selectedCategory);
      console.log('Winner set, modal should appear');
    }, 3000);
  };

  const [spinStartTime, setSpinStartTime] = useState(0);

  const handleStartSpin = () => {
    if (isSpinning) return;
    
    const wheelCategories = categories[value];
    if (wheelCategories.length < 2) {
      Alert.alert('Error', 'Please add at least 2 categories to spin the wheel!');
      return;
    }
    
    dispatch(setSpinning(true));
    setIsKeyboardSpinning(true);
    setCanStopSpin(false); // Disable stop for 3 seconds
    setSpinStartTime(Date.now());
    setWinner(null);
    setShowCelebrationModal(false);
    setShowAlert(false);
    
    // Enable stop after 3 seconds
    setTimeout(() => {
      setCanStopSpin(true);
    }, 3000);
    
    // Play ticking sound
    playSound('tick');
  };

  const handleStopSpin = () => {
    if (!isSpinning || !canStopSpin) return;
    
    // Set user requested stop first, then stop spinning
    setUserRequestedStop(true);
    setStopButtonPressed(true);
    dispatch(setSpinning(false));
    setIsKeyboardSpinning(false);
    setCanStopSpin(false);
  };

  const handleSpin = () => {
    if (isSpinning) return;
    
    const wheelCategories = categories[value];
    if (wheelCategories.length < 2) {
      Alert.alert('Error', 'Please add at least 2 categories to spin the wheel!');
      return;
    }

    // Reset everything before spinning
    setWinner(null);
    dispatch(setSpinning(true));

    // Play ticking sound
    playSound('tick');
  };

  return (
    <View style={[
      styles.container,
      settings.backgroundTheme === 'custom' && styles.containerCustom
    ]}>
      {/* Custom Background Video */}
      {settings.backgroundTheme === 'custom' && settings.backgroundVideo && (
        <video 
          src={settings.backgroundVideo}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />
      )}

      {/* Custom Background Image */}
      {settings.backgroundTheme === 'custom' && settings.backgroundImage && !settings.backgroundVideo && (
        <img 
          src={settings.backgroundImage} 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
          alt="Custom Background"
        />
      )}

      <View style={styles.wheelContainer}>
        <SpinWheel 
          key={resetKey}
          categories={categories[value]} 
          isSpinning={isSpinning}
          isKeyboardSpinning={isKeyboardSpinning}
          canStopSpin={canStopSpin}
          userRequestedStop={userRequestedStop}
          winner={winner}
          selectedCategory={selectedCategory}
          isColorToggling={isColorToggling}
          onReset={onReset}
          onSpinComplete={handleSpinComplete}
          resetRef={wheelResetRef}
        />
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
      
      {/* Spin Button positioned at bottom, outside wheel container */}
      <View style={styles.keyboardContainer}>
        <Text style={[
          styles.keyboardInstruction,
          (isSpinning && !canStopSpin) || stopButtonPressed ? styles.keyboardInstructionDisabled : null
        ]}>
          {isSpinning 
            ? 'Press ENTER to stop spinning'
            : 'Press ENTER to start spinning'
          }
        </Text>
      </View>
      

      {/* Celebration Modal */}
      {console.log('Modal render - showCelebrationModal:', showCelebrationModal, 'winner:', winner)}
      <Modal
        visible={showCelebrationModal}
        transparent={true}
        animationType="none"
        onRequestClose={closeCelebrationModal}
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
            
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 0,
    position: 'relative',
    overflow: 'hidden',
  },
  containerCustom: {
    backgroundColor: '#FFFFFF',
  },
  wheelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    zIndex: 10,
    maxHeight: '75%',
  },
  keyboardContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingBottom: 30,
    zIndex: 5,
  },
  keyboardInstruction: {
    color: '#B22222',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    backgroundColor: '#FFD700',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#B22222',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  keyboardHint: {
    color: '#666666',
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  keyboardInstructionDisabled: {
    backgroundColor: '#CCCCCC',
    color: '#888888',
    borderColor: '#999999',
  },
  resultContainer: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
    minHeight: 70,
    padding: 15,
    backgroundColor: '#FFD700',
    borderRadius: 15,
    elevation: 10,
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.5)',
    zIndex: 300,
    borderWidth: 3,
    borderColor: '#B22222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    color: '#B22222',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  sparkleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  sparkle: {
    position: 'absolute',
    fontSize: 20,
    color: '#FFD700',
    opacity: 0.7,
  },
  sparkle2: {
    top: '10%',
    left: '15%',
    fontSize: 16,
  },
  sparkle3: {
    top: '20%',
    right: '20%',
    fontSize: 18,
  },
  sparkle4: {
    top: '30%',
    left: '10%',
    fontSize: 14,
  },
  sparkle5: {
    bottom: '25%',
    right: '15%',
    fontSize: 20,
  },
  sparkle6: {
    bottom: '15%',
    left: '20%',
    fontSize: 16,
  },
  sparkle7: {
    top: '60%',
    left: '5%',
    fontSize: 18,
  },
  sparkle8: {
    top: '40%',
    right: '10%',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
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
    fontWeight: '900',
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
  closeButton: {
    backgroundColor: '#B22222',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 10,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingVertical: 25,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#B22222',
    elevation: 10,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    minWidth: 250,
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B22222',
    textAlign: 'center',
    marginBottom: 10,
  },
  alertMessage: {
    fontSize: 18,
    color: '#333333',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default SpinWheelScreen;