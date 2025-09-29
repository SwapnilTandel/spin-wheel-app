import React, { useState, useRef } from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView, Text, TouchableOpacity, Animated } from 'react-native';
import SpinWheelScreen from './components/SpinWheelScreen';
import SettingsScreen from './components/SettingsScreen';
import { Provider } from 'react-redux';
import { store } from './store/store';

const App = () => {
  const [activeTab, setActiveTab] = useState('spin50');
  const [isFabExpanded, setIsFabExpanded] = useState(false);
  const resetWheelRef = useRef(null);
  const fabAnimation = useRef(new Animated.Value(0)).current;

  const handleResetWheel = () => {
    if (resetWheelRef.current) {
      resetWheelRef.current();
    }
  };

  const toggleFab = () => {
    const toValue = isFabExpanded ? 0 : 1;
    setIsFabExpanded(!isFabExpanded);
    
    Animated.timing(fabAnimation, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsFabExpanded(false);
    Animated.timing(fabAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'spin50':
        return <SpinWheelScreen value={50} onReset={resetWheelRef} />;
      case 'spin100':
        return <SpinWheelScreen value={100} onReset={resetWheelRef} />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <SpinWheelScreen value={50} onReset={resetWheelRef} />;
    }
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#2E7D32" />
        
        {/* Catchphrase */}
        <View style={styles.catchphraseContainer}>
          <Text style={styles.catchphrase}>Spin to Win at Maharaja!</Text>
        </View>

        {/* Header - Hidden for spin wheels to maximize space */}
        {activeTab === 'settings' && (
          <View style={styles.header}>
            <Text style={styles.headerTitle}>⚙️ Settings</Text>
          </View>
        )}

        {/* Content */}
        <View style={styles.content}>
          {renderTabContent()}
        </View>

        {/* Floating Action Button Group */}
        <View style={styles.fabContainer}>
          {/* Expanded Menu Buttons */}
          <Animated.View 
            style={[
              styles.expandedMenu,
              {
                opacity: fabAnimation,
                transform: [{
                  scale: fabAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  })
                }]
              }
            ]}
          >
            {/* Reset Button */}
            <TouchableOpacity
              style={styles.fabSubButton}
              onPress={handleResetWheel}
              activeOpacity={0.7}
            >
              <Text style={styles.fabSubButtonText}>🔄</Text>
            </TouchableOpacity>

            {/* Settings Button */}
            <TouchableOpacity
              style={[styles.fabSubButton, activeTab === 'settings' && styles.activeFabButton]}
              onPress={() => handleTabChange('settings')}
              activeOpacity={0.7}
            >
              <Text style={styles.fabSubButtonText}>⚙️</Text>
            </TouchableOpacity>

            {/* $100 Button */}
            <TouchableOpacity
              style={[styles.fabSubButton, activeTab === 'spin100' && styles.activeFabButton]}
              onPress={() => handleTabChange('spin100')}
              activeOpacity={0.7}
            >
              <Text style={styles.fabSubButtonText}>⭐</Text>
            </TouchableOpacity>

            {/* $50 Button */}
            <TouchableOpacity
              style={[styles.fabSubButton, activeTab === 'spin50' && styles.activeFabButton]}
              onPress={() => handleTabChange('spin50')}
              activeOpacity={0.7}
            >
              <Text style={styles.fabSubButtonText}>🎰</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Main FAB Button */}
          <TouchableOpacity
            style={styles.mainFab}
            onPress={toggleFab}
            activeOpacity={0.7}
          >
            <Text style={[styles.mainFabText, isFabExpanded && styles.mainFabTextRotated]}>+</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  catchphraseContainer: {
    backgroundColor: '#8B0000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#FFD700',
  },
  catchphrase: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  header: {
    backgroundColor: '#2E7D32',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#FFD700',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 250,
    zIndex: 10,
  },
  expandedMenu: {
    position: 'absolute',
    bottom: 60,
    right: 0,
    alignItems: 'center',
    marginBottom: 10,
  },
  fabSubButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#8B0000',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    elevation: 6,
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.3)',
  },
  activeFabButton: {
    backgroundColor: '#FFD700',
  },
  fabSubButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  mainFab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
    zIndex: 1000,
  },
  mainFabText: {
    fontSize: 32,
    color: '#8B0000',
    fontWeight: 'bold',
  },
  mainFabTextRotated: {
    transform: [{ rotate: '45deg' }],
  },
});

export default App;