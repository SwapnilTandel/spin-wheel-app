import React, { useState, useRef } from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, Alert, Modal } from 'react-native';
import SpinWheelScreen from './components/SpinWheelScreen';
import { Provider, useSelector } from 'react-redux';
import { store } from './store/store';
import packageJson from '../package.json';

const AppContent = () => {
  const [activeTab, setActiveTab] = useState('spin50');
  const [showMenu, setShowMenu] = useState(false);
  const resetWheelRef = useRef(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowMenu(false); // Close menu after selection
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
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
          <TouchableOpacity 
            style={styles.burgerMenu}
            onPress={toggleMenu}
            activeOpacity={0.7}
          >
            <View style={styles.burgerLine} />
            <View style={styles.burgerLine} />
            <View style={styles.burgerLine} />
          </TouchableOpacity>
          <Text style={styles.catchphrase}>Spin to Win at Maharaja!</Text>
        </View>


        {/* Wheel Section - Main Content Area (90%) */}
        <View style={styles.wheelSection}>
          {renderTabContent()}
        </View>

        {/* Status Label - Bottom (5%) */}

        <View style={styles.bottomSection}>
          <View style={styles.statusContent}>
            <Text style={styles.bottomSelectedWheel}>
              Currently Using: {activeTab === 'spin50' ? '$50 Wheel' : '$100 Wheel'}
            </Text>
          </View>
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>v{packageJson.version}</Text>
          </View>
        </View>

        {/* <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>
            Currently Using: {activeTab === 'spin50' ? '$50 Wheel' : '$100 Wheel'}
          </Text>
        </View> */}

        {/* Burger Menu Modal */}
        <Modal
          visible={showMenu}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowMenu(false)}
        >
          <TouchableOpacity 
            style={styles.menuOverlay}
            activeOpacity={1}
            onPress={() => setShowMenu(false)}
          >
            <View style={styles.menuContainer}>
              <TouchableOpacity
                style={[styles.menuButton, activeTab === 'spin50' && styles.activeMenuButton]}
                onPress={() => handleTabChange('spin50')}
                activeOpacity={0.7}
              >
                <Text style={styles.menuButtonText}>$50 Wheel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.menuButton, activeTab === 'spin100' && styles.activeMenuButton]}
                onPress={() => handleTabChange('spin100')}
                activeOpacity={0.7}
              >
                <Text style={styles.menuButtonText}>$100 Wheel</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
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
  bottomSection: {
    height: '5vh',
    backgroundColor: '#B22222',
    borderTopWidth: 4,
    borderTopColor: '#FFD700',
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
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  },
  bottomSelectedWheel: {
    color: '#FFD700',
    fontSize: 'clamp(16px, 2.5vw, 32px)',
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 3,
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  },
  statusContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  versionContainer: {
    position: 'absolute',
    bottom: 8,
    right: 15,
    backgroundColor: 'rgba(178, 34, 34, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  versionText: {
    color: '#FFD700',
    fontSize: 'clamp(10px, 1.2vw, 14px)',
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
  },
  wheelSection: {
    height: '90vh',
    backgroundColor: '#FFFFFF',
    position: 'relative',
    overflow: 'hidden',
  },
  statusContainer: {
    height: '6vh',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    zIndex: 10,
  },
  statusLabel: {
    color: '#FFD700',
    fontSize: 'clamp(16px, 2.5vw, 32px)',
    fontWeight: '900',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 3,
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  },
  burgerMenu: {
    position: 'absolute',
    left: 15,
    top: '50%',
    transform: [{ translateY: -12 }],
    width: 24,
    height: 24,
    justifyContent: 'space-between',
    zIndex: 20,
  },
  burgerLine: {
    width: '100%',
    height: 3,
    backgroundColor: '#FFD700',
    borderRadius: 2,
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 60,
    paddingLeft: 15,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    elevation: 10,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    borderWidth: 2,
    borderColor: '#FFD700',
    minWidth: 150,
  },
  menuButton: {
    backgroundColor: '#B22222',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 130,
  },
  activeMenuButton: {
    backgroundColor: '#FFD700',
  },
  menuButtonText: {
    fontSize: 14,
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