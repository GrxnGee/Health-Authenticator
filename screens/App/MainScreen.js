import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18'; // Adjust the path as needed
import HomeScreen from '../App/HomeScreen';
import BMIScreen from '../App/BMIScreen';
import Profile from './Setting/Profile';
import Exercise from './Exercise/Exercise';
import ExerciseCat from './Exercise/ExerciseCat';
import ExerciseInfo from './Exercise/ExerciseInfo';
import TodayEx from './Exercise/TodayEx';
import FoodInfo from './Food/FoodInfo';
import MealsPlan from './Food/MealsPlan';
import Food from './Food/Food';
import Chats from './../Chat/Chat';
import Scanner from './../Barcode/Scanner';
import InfoScanner from './../Barcode/InfoScanner';
import ProfileSetting from './Setting/ProfileSetting';
import Setting from './Setting/Setting';
import ResetPassword from './Setting/ResetPassword';
import Privacy from './Setting/Privacy';
import Help from './Setting/Help';

const Tab = createBottomTabNavigator();

function getTabBarVisibility(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Default';
  const hideOnScreens = ['Home', 'Exercise'];
  return !hideOnScreens.includes(routeName);
}

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;


        if (['Help','ProfileSetting','Privacy', 'Chats', 'InfoScanner', 'Home', 'Exercise', 'BMI', 'TodayEx', 'FoodInfo', 'Food', 'ExerciseCat', 'MealsPlan', 'ExerciseInfo','Setting', 'ResetPassword'].includes(route.name)) {
          return null; 
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconName = route.name === 'Scanner' ? 'qr-code-outline' : 'person-outline';

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabButton}
          >
            <Ionicons name={iconName} size={24} color={isFocused ? '#FDD835' : 'white'} />
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

function MyTabs() {
  return (
    <I18nextProvider i18n={i18n}>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarVisible: getTabBarVisibility(route),
      })}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarButton: () => null }} />
      <Tab.Screen
        name="Scanner"
        component={Scanner}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="qr-code-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" color={color} size={size} />,
        }}
      />

      <Tab.Screen name="Exercise" component={Exercise} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="FoodInfo" component={FoodInfo} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Food" component={Food} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="MealsPlan" component={MealsPlan} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="ExerciseCat" component={ExerciseCat} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="ExerciseInfo" component={ExerciseInfo} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="TodayEx" component={TodayEx} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="BMI" component={BMIScreen} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Chats" component={Chats} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="InfoScanner" component={InfoScanner} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="ProfileSetting" component={ProfileSetting} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Setting" component={Setting} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="ResetPassword" component={ResetPassword} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Privacy" component={Privacy} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Help" component={Help} options={{ tabBarButton: () => null }} />
    </Tab.Navigator>
    </I18nextProvider>
  );
}

export default function MainScreen({ navigation }) { 
  return (
    <View style={styles.container}>
      <MyTabs />
      <TouchableOpacity 
        style={styles.chatIcon} 
        onPress={() => navigation.navigate("Chats")} 
      >
        <Ionicons name="chatbubble-ellipses-outline" size={30} color="#FFFFFF" />
      </TouchableOpacity>
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
  chatIcon: {
    position: 'absolute',
    bottom: 70, 
    right: 25, 
    backgroundColor: 'rgba(56, 118, 71, 1)',
    borderRadius: 25,
    padding: 10,
    elevation: 5,
    opacity: 0.4, 
  },
});
