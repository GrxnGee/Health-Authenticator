import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/Login/LoginScreen';
import SignupScreen from './screens/Login/SignupScreen';
import ForgotScreen from './screens/Login/ForgotScreen';
import InfoScreen from './screens/Login/InfoScreen';
import MainScreen from './screens/App/MainScreen';
import MainAdminScreen from './screens/Admin/MainAdmin';
import Food from './screens/App/Food';
import FoodInfo from './screens/App/FoodInfo';
import MealsPlan from './screens/App/MealsPlan';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Forgot" component={ForgotScreen} />
        <Stack.Screen name="Info" component={InfoScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="MainAdmin" component={MainAdminScreen} />
        <Stack.Screen name="Food" component={Food} />
        <Stack.Screen name="FoodInfo" component={FoodInfo} />
        <Stack.Screen name="MealsPlan" component={MealsPlan} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;