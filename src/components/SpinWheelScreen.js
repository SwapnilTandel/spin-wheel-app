import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import SpinWheel from './SpinWheel';
import { setSpinning, setLastResult, addToHistory } from '../store/slices/wheelSlice';

const SpinWheelScreen = ({ value, onReset }) => {
  const dispatch = useDispatch();
  const { categories, settings, isSpinning } = useSelector(state => state.wheel);
  const [winner, setWinner] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  
  // Simple confetti effect using CSS
  const [showConfetti, setShowConfetti] = useState(false);

  // Handle reset functionality
  const handleReset = () => {
    setWinner(null);
    setShowConfetti(false);
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
  
  // Sound setup - placeholder for web compatibility
  const playSound = (type) => {
    if (settings.soundEnabled) {
      console.log(`Playing ${type} sound`);
      // Web audio implementation would go here
    }
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
    setShowConfetti(false);
    dispatch(setSpinning(true));

    // Play ticking sound
    playSound('tick');

    // Simulate spin duration
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * wheelCategories.length);
      const selectedCategory = wheelCategories[randomIndex];
      
      dispatch(setSpinning(false));
      setWinner(selectedCategory);
      
      // Play win sound
      playSound('win');
      
      // Show confetti
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      
      // Add to history
      dispatch(addToHistory({
        wheelValue: value,
        category: selectedCategory,
      }));
      
      dispatch(setLastResult(selectedCategory));
      
      // Show result alert
      Alert.alert(
        '🎉 Congratulations!',
        `You won: ${selectedCategory.name}`,
        [{ text: 'Awesome!', style: 'default' }]
      );
      
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wheelContainer}>
        <SpinWheel 
          key={resetKey}
          categories={categories[value]} 
          isSpinning={isSpinning}
          winner={winner}
          onReset={onReset}
        />
        
        {/* Spin Button positioned at top right */}
        <TouchableOpacity 
          style={[
            styles.spinButton, 
            isSpinning && styles.spinButtonDisabled
          ]}
          onPress={handleSpin}
          disabled={isSpinning}
        >
          <Text style={styles.spinButtonText}>
            {isSpinning ? '🎰 Spinning...' : '🎰 SPIN THE WHEEL'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {winner && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            🎉 Winner: {winner.name}
          </Text>
        </View>
      )}
      
      {showConfetti && (
        <View style={styles.confettiContainer}>
          <Text style={styles.confettiText}>🎉🎊🎉🎊🎉</Text>
          <Text style={styles.confettiText}>🎊🎉🎊🎉🎊</Text>
          <Text style={styles.confettiText}>🎉🎊🎉🎊🎉</Text>
        </View>
      )}
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
  },
  wheelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  spinButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#FFD700',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 10,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)',
    zIndex: 100,
  },
  spinButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  spinButtonText: {
    color: '#B22222',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
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
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  confettiText: {
    fontSize: 24,
    color: '#FFD700',
    textAlign: 'center',
    marginVertical: 5,
  },
});

export default SpinWheelScreen;