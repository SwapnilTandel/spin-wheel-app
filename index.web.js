import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';

// Register the app
AppRegistry.registerComponent('SpinWheelApp', () => App);

// Run the app
AppRegistry.runApplication('SpinWheelApp', {
  rootTag: document.getElementById('root'),
});
