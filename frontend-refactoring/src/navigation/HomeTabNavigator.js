import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '@screens/HomeScreen';
import ExploreScreen from '@screens/ExploreScreen';
import ProfileScreen from '@screens/ProfileScreen';
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const HomeTabNavigator = ({ route }) => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen 
        name="Explore" 
        component={ExploreScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons name="cafe-outline" style={{ color: focused ? "#001D44" : "#ccc" }} size={25}/>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen 
        name="Home" 
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons name="home-outline" style={{ color: focused ? "#001D44" : "#ccc" }} size={25}/>
          ),
          tabBarLabel: () => null,
        }}
      >
        {props => <HomeScreen {...props} sessionData={route.params?.sessionData} />}
      </Tab.Screen>
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons name="person-circle-outline" style={{ color: focused ? "#001D44" : "#ccc" }} size={25}/>
          ),
          tabBarLabel: () => null,
        }}
      />
    </Tab.Navigator>
  );
};


export default HomeTabNavigator;
