import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/HomeScreen';
import SecondScreen from './src/SecondScreen';

/**
 * Define the parameter types for each screen
 * Home does not accept any parameters
 * Second requires a 'size' parameter for the board 
 */ 
export type RootStackParamList = {
  Home: undefined;
  Second: { size: number };
};

// Create the native stack navigator using the defined types
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Main App component
 * returns: Navigation container with two screens (Home and Second)
 */
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Second" component={SecondScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}