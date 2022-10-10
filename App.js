import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import StartPageScreen from "./screens/Auth/StartPage";
import LoginScreen from "./screens/Auth/Login";
import RegisterScreen from "./screens/Auth/Register";
import HomeScreen from "./screens/InApp/Home";
import MyPageScreen from "./screens/InApp/MyPage";
import FindScreen from "./screens/InApp/Find";
import ImfomationScreen from "./screens/Reservation/Imfomation";
import ReservationScreen from "./screens/Reservation/Reservation";
import ReserveEndScreen from "./screens/Reservation/ReserveEnd";

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
          options={{ headerShown: false }}
        />
        {/*______로그인 페이지________*/}
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />
        {/*____본격적으로 앱 내용________*/}
        <Stack.Screen name="InApp" options={{ headerShown: false }}>
          {() => (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="MyPage" component={MyPageScreen} />
              <Stack.Screen name="Cafe">{CafeNavigation}</Stack.Screen>
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
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const CafeNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Find"
        component={FindScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Imfomation" component={ImfomationScreen} />
      <Stack.Screen name="Reservaion" component={ReservationScreen} />
      <Stack.Screen
        name="ReserveEnd"
        options={{ headerShown: false }}
        component={ReserveEndScreen}
      />
      <Stack.Screen name="Imfomation" component={ImfomationScreen} />
      <Stack.Screen name="Reservation" component={ReservationScreen} />
    </Stack.Navigator>
  );
};
