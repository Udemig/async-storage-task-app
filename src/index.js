import React from 'react';
import Routes from './navigation/Routes';
import {NavigationContainer} from '@react-navigation/native';
import TaskProvider from './context/AppContext';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
      <Toast />
    </TaskProvider>
  );
}
