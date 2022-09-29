import * as React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import StartPageScreen from "./screens/Auth/StartPage"
import LoginScreen from "./screens/Auth/Login"
import RegisterScreen from "./screens/Auth/Register"
import HomeScreen from "./screens/InApp/Home";
import MyPageScreen from "./screens/InApp/MyPage";
import CafeListScreen from  "./screens/InApp/CafeList";
import CafeImfomationScreen from  "./screens/InApp/CafeImfomation";
import CafeReservaionScreen from  "./screens/InApp/CafeReservaion";


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
            <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="MyPage" component={MyPageScreen} />
            <Stack.Screen name="Cafe">
              {CafeListNavigation}
            </Stack.Screen>
          </Stack.Navigator>
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

const CafeListNavigation = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="CafeList" component={CafeListScreen}/>
      <Stack.Screen name="CafeImfomation" component={CafeImfomationScreen}/>
      <Stack.Screen name="CafeReservaion" component={CafeReservaionScreen}/>
    </Stack.Navigator>
  )
}