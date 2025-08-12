/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Search, User } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

// Example screens
function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text>Home Screen</Text>
    </View>
  );
}

function SearchScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text>Search Screen</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text>Profile Screen</Text>
    </View>
  );
}

const BottomNavigatorScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconColor = focused ? '#007AFF' : '#8E8E93';

          if (route.name === 'Home') {
            return <Home size={size} color={iconColor} />;
          } else if (route.name === 'Search') {
            return <Search size={size} color={iconColor} />;
          } else if (route.name === 'Profile') {
            return <User size={size} color={iconColor} />;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigatorScreen;
