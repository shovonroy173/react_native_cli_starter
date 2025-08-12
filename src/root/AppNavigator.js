import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import BottomNavigatorScreen from '../screens/bottomNavigator/BottomNavigatorScreen';
const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  return (
 <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="BottomNavigator" component={BottomNavigatorScreen} />

    </Stack.Navigator>
  )
}

export default AppNavigator