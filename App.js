import * as React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import StartPageScreen from "./screens/Auth/StartPage"
import LoginScreen from "./screens/Auth/Login"
import RegisterScreen from "./screens/Auth/Register"
import HomeScreen from "./screens/Home/Home";
import DetailsScreen from "./screens/Home/Details";
import SettingsScreen from "./screens/Home/Settings";
import ProfileScreen from "./screens/Home/Profile";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 프로젝트 시작
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Start"
          component={StartPageScreen}
          options={{headerShown: false}}
        />
        {/*______로그인 페이지________*/}
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />

        {/*____본격적으로 앱 내용________*/}
        <Stack.Screen name="InApp" options={{headerShown: false}}>
          {() => (
            <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="First">
              {Home}
            </Tab.Screen>
            <Tab.Screen name="Second">
              {Temp}
            </Tab.Screen>
          </Tab.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Auth = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const Home = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={SettingsScreen}/>
      <Stack.Screen name="Profile" component={ProfileScreen}/>
    </Stack.Navigator>
  )

}

const Temp = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});