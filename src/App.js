import React, { useState, useRef } from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, Alert } from 'react-native';
import SpinWheelScreen from './components/SpinWheelScreen';
import { Provider, useSelector } from 'react-redux';
import { store } from './store/store';

const AppContent = () => {
  const [activeTab, setActiveTab] = useState('spin50');
  const resetWheelRef = useRef(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'spin50':
        return <SpinWheelScreen value={50} onReset={resetWheelRef} />;
      case 'spin100':
        return <SpinWheelScreen value={100} onReset={resetWheelRef} />;
      default:
        return <SpinWheelScreen value={50} onReset={resetWheelRef} />;
    }
  };

  return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#2E7D32" />
        
        {/* Top Section - Catchphrase Area (5%) */}
        <View style={styles.topSection}>
          <Text style={styles.catchphrase}>Spin to Win at Maharaja!</Text>
        </View>


        {/* Wheel Section - Main Content Area (90%) */}
        <View style={styles.wheelSection}>
          {renderTabContent()}
        </View>

        {/* Bottom Button Group (5%) */}
        <View style={styles.bottomButtonContainer}>
          {/* $50 Wheel Button */}
          <TouchableOpacity
            style={[styles.bottomButton, activeTab === 'spin50' && styles.activeBottomButton]}
            onPress={() => handleTabChange('spin50')}
            activeOpacity={0.7}
          >
            <Text style={styles.bottomButtonText}>$50 Wheel</Text>
          </TouchableOpacity>

          {/* $100 Wheel Button */}
          <TouchableOpacity
            style={[styles.bottomButton, activeTab === 'spin100' && styles.activeBottomButton]}
            onPress={() => handleTabChange('spin100')}
            activeOpacity={0.7}
          >
            <Text style={styles.bottomButtonText}>$100 Wheel</Text>
          </TouchableOpacity>

        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  topSection: {
    height: '5vh',
    backgroundColor: '#B22222',
    borderBottomWidth: 4,
    borderBottomColor: '#FFD700',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    overflow: 'hidden',
  },
  catchphrase: {
    color: '#FFD700',
    fontSize: 'clamp(16px, 2.5vw, 32px)',
    fontWeight: '900',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  wheelSection: {
    height: '90vh',
    backgroundColor: '#FFFFFF',
    position: 'relative',
    overflow: 'hidden',
  },
  bottomButtonContainer: {
    height: '5vh',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 10,
    borderTopWidth: 2,
    borderTopColor: '#FFD700',
  },
  bottomButton: {
    flex: 1,
    backgroundColor: '#B22222',
    paddingVertical: 8,
    paddingHorizontal: 5,
    marginHorizontal: 3,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.3)',
    minHeight: 35,
  },
  activeBottomButton: {
    backgroundColor: '#FFD700',
  },
  bottomButtonText: {
    fontSize: 'clamp(10px, 1.2vw, 14px)',
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;