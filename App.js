import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import StartPageScreen from "./screens/Auth/StartPage";
import LoginScreen from "./screens/Auth/Login";
import RegisterScreen from "./screens/Auth/Register";
import HomeScreen from "./screens/InApp/Home";
import MyPageScreen from "./screens/InApp/MyPage";
import FindScreen from "./screens/InApp/Find";
import InformationScreen from "./screens/Reservation/Information";
import ReservationScreen from "./screens/Reservation/Reservation";
import ReserveEndScreen from "./screens/Reservation/ReserveEnd";
import InPutDataScreen from "./screens/ForBusiness/InPutData";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const InApp = () => {
  return (
    <Tab.Navigator initialRouteName="홈">
      <Tab.Screen
        name="카페"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="cafe-outline"
              style={{ color: focused ? "#001D44" : "#ccc" }}
              size={25}
            />
          ),
          headerShown: false,
          tabBarLabel: () => {
            return null;
          },
        }}
      >
        {() => (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Cafe">{CafeNavigation}</Stack.Screen>
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="홈"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home-outline"
              style={{ color: focused ? "#001D44" : "#ccc" }}
              size={25}
            />
          ),
          headerShown: false,
          tabBarLabel: () => {
            return null;
          },
        }}
      >
        {() => (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="마이페이지"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-circle-outline"
              style={{ color: focused ? "#001D44" : "#ccc" }}
              size={25}
            />
          ),
          headerShown: false,
          tabBarLabel: () => {
            return null;
          },
        }}
      >
        {() => (
          <Stack.Navigator name="InApp" options={{ headerShown: true }}>
            <Stack.Screen name="MyPage" component={MyPageScreen} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

// 프로젝트 시작
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="로그인">
          {() => (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
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
              <Stack.Screen name="InApp" component={InApp} />
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
      <Stack.Screen
        name="InPutData"
        component={InPutDataScreen}
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
      <Stack.Screen name="Information" component={InformationScreen} />
      <Stack.Screen name="Reservation" component={ReservationScreen} />
      <Stack.Screen
        name="ReserveEnd"
        options={{ headerShown: false }}
        component={ReserveEndScreen}
      />
    </Stack.Navigator>
  );
};
