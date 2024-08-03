import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CabsListScreen from '../screens/CabsListScreen';
import CabDetailScreen from '../screens/CabDetailScreen';
import MyCabScreen from '../screens/MyCabScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="CabsList" component={CabsListScreen} options={{ title: '' }} />
    <Stack.Screen name="CabDetail" component={CabDetailScreen} options={{ title: '' }} />
  </Stack.Navigator>
);

const RootNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;

          if (route.name === 'Home') {
            iconName = 'car'; 
            return <FontAwesome name={iconName} size={size} color={color} />;
          } else if (route.name === 'MyCab') {
            iconName = 'person'; 
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ title: 'Cabs' }} />
      <Tab.Screen name="MyCab" component={MyCabScreen} options={{ title: 'Bookings' }} />
    </Tab.Navigator>
  );
};

export default RootNavigator;
