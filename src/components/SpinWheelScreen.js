import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence,
  runOnJS 
} from 'react-native-reanimated';
import SpinWheel from './SpinWheel';
import ConfettiCannon from 'react-native-confetti-cannon';
import Sound from 'react-native-sound';
import { setSpinning, setLastResult, addToHistory } from '../store/slices/wheelSlice';

const SpinWheelScreen = ({ route }) => {
  const { value } = route.params;
  const dispatch = useDispatch();
  const { categories, settings, isSpinning } = useSelector(state => state.wheel);
  const [showConfetti, setShowConfetti] = useState(false);
  const [winner, setWinner] = useState(null);
  const confettiRef = useRef(null);
  
  // Sound setup
  const tickingSound = useRef(null);
  const winSound = useRef(null);
  
  React.useEffect(() => {
    if (settings.soundEnabled) {
      tickingSound.current = new Sound('tick.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('Failed to load ticking sound', error);
        }
      });
      
      winSound.current = new Sound('win.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('Failed to load win sound', error);
        }
      });
    }
    
    return () => {
      tickingSound.current?.release();
      winSound.current?.release();
    };
  }, [settings.soundEnabled]);

  const handleSpin = () => {
    if (isSpinning) return;
    
    const wheelCategories = categories[value];
    if (wheelCategories.length < 2) {
      Alert.alert('Error', 'Please add at least 2 categories to spin the wheel!');
      return;
    }

    dispatch(setSpinning(true));
    setWinner(null);
    setShowConfetti(false);

    // Play ticking sound
    if (settings.soundEnabled && tickingSound.current) {
      tickingSound.current.setNumberOfLoops(-1);
      tickingSound.current.play();
    }

    // Simulate spin duration
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * wheelCategories.length);
      const selectedCategory = wheelCategories[randomIndex];
      
      dispatch(setSpinning(false));
      setWinner(selectedCategory);
      
      // Stop ticking sound
      if (tickingSound.current) {
        tickingSound.current.stop();
      }
      
      // Play win sound
      if (settings.soundEnabled && winSound.current) {
        winSound.current.play();
      }
      
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
          categories={categories[value]} 
          isSpinning={isSpinning}
          winner={winner}
        />
      </View>
      
      <View style={styles.controlsContainer}>
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
        
        {winner && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              🎉 Winner: {winner.name}
            </Text>
          </View>
        )}
      </View>
      
      {showConfetti && (
        <ConfettiCannon
          ref={confettiRef}
          count={200}
          origin={{ x: -10, y: 0 }}
          colors={['#FFD700', '#2E7D32', '#8B0000', '#FFFFFF']}
          fadeOut={true}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  wheelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  spinButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  spinButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  spinButtonText: {
    color: '#8B0000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: 20,
    backgroundColor: '#8B0000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  resultText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SpinWheelScreen;
