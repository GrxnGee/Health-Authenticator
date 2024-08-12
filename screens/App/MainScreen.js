import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../App/HomeScreen';
import BMIScreen from '../App/BMIScreen';
import Exercise from '../App/Exercise'; // Import Exercise component

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >

<Tab.Screen name="Home" component={HomeScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
      
      <Tab.Screen
        name="BMI"
        component={BMIScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="Exercise"
        component={Exercise} 
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        if (route.name === 'Home') {
          return null; 
        }

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        let iconName;
        if (route.name === 'BMI') {
          iconName = 'calendar-outline';
        } else if (route.name === 'Exercise') {
          iconName = 'person-outline';
        }

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.tabButton}
          >
            <Ionicons name={iconName} size={24} color={isFocused ? 'orange' : 'white'} />
          </TouchableOpacity>
        );
      })}
      <View style={styles.plusButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.plusButton}
        >
          <View style={styles.plusButtonInner}>
            <Ionicons name="home" size={36} color="rgba(56, 118, 71, 1)" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <MyTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#070420',
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'rgba(56, 118, 71, 1)',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -35 }],
  },
  plusButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(56, 118, 71, 1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: 'white',
  },
});