import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SpinWheelScreen from './components/SpinWheelScreen';
import SettingsScreen from './components/SettingsScreen';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#2E7D32" />
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'SpinWheel50') {
                  iconName = 'casino';
                } else if (route.name === 'SpinWheel100') {
                  iconName = 'stars';
                } else if (route.name === 'Settings') {
                  iconName = 'settings';
                }
                return <Icon name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#FFD700',
              tabBarInactiveTintColor: '#FFFFFF',
              tabBarStyle: {
                backgroundColor: '#8B0000',
                borderTopColor: '#FFD700',
                borderTopWidth: 2,
                height: 60,
                paddingBottom: 8,
                paddingTop: 8,
              },
              headerStyle: {
                backgroundColor: '#2E7D32',
                borderBottomColor: '#FFD700',
                borderBottomWidth: 2,
              },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 20,
              },
            })}
          >
            <Tab.Screen 
              name="SpinWheel50" 
              component={SpinWheelScreen}
              initialParams={{ value: 50 }}
              options={{ 
                title: '🎰 Spin Wheel $50',
                headerTitle: '🎰 Spin Wheel $50'
              }}
            />
            <Tab.Screen 
              name="SpinWheel100" 
              component={SpinWheelScreen}
              initialParams={{ value: 100 }}
              options={{ 
                title: '⭐ Spin Wheel $100',
                headerTitle: '⭐ Spin Wheel $100'
              }}
            />
            <Tab.Screen 
              name="Settings" 
              component={SettingsScreen}
              options={{ 
                title: '⚙️ Settings',
                headerTitle: '⚙️ Settings'
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E7D32',
  },
});

export default App;
