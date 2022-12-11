import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
  "Possible Unhandled Promise Rejection",
]);

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Notifications from "expo-notifications";

import StartPageScreen from "./screens/Auth/StartPage";
import LoginScreen from "./screens/Auth/Login";
import RegisterScreen from "./screens/Auth/Register";
import HomeScreen from "./screens/InApp/Home";
import MyPageScreen from "./screens/MyPage/MyPage";
import FindScreen from "./screens/InApp/Find";
import BookMarkScreen from "./screens/MyPage/BookMark";
import InformationScreen from "./screens/Reservation/Information";
import ReservationScreen from "./screens/Reservation/Reservation";
import ReserveEndScreen from "./screens/Reservation/ReserveEnd";
import CafeCreatFormScreen from "./screens/Business/CafeCreatForm";
import ConfirmScreen from "./screens/InApp/ConfirmReservation";
import CancelReservationScreen from "./screens/Reservation/CancelReservation";
import ReviewScreen from "./screens/Reservation/Review";
import EditProfileScreen from "./screens/MyPage/EditProfile";
import OptionScreen from "./screens/MyPage/Option";
import BusinessHomeScreen from "./screens/Business/BusinessHome";
import BusinessInformationScreen from "./screens/Business/BusinessInformation";
import ReserveManageScreen from "./screens/Business/ReserveManage";
import WriteNoticeScreen from "./screens/Business/WriteNotice";
import CafePicManageScreen from "./screens/Business/CafePicManager";
import ZoomImageScreen from "./screens/Business/ZoomImage";
import AddPicScreen from "./screens/Business/AddPicScreen";
import DeleteUserScreen from "./screens/MyPage/DeleteUser";
import LocationSelectionScreen from "./screens/Business/LocationSelect";
import MyReviewScreen from "./screens/MyPage/MyReview";
import BusinessLogInScreen from "./screens/Auth/BusinessLogin";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 프로젝트 시작
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Moa">
          {() => (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="Start"
                component={StartPageScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Auth"
                component={Auth}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="InApp" component={InApp} />
              <Stack.Screen name="Business" component={InBusiness} />
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
        options={{
          headerShown: false,
          opacity: 0,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false,
          opacity: 0,
        }}
      />
      <Stack.Screen
        name="BusinessLogIn"
        component={BusinessLogInScreen}
        options={{
          headerShown: false,
          opacity: 0,
        }}
      />
      <Stack.Screen
        name="CafeCreatForm"
        component={CafeCreatFormScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LocationSelection"
        component={LocationSelectionScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

function InApp() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="텝페이지"
        options={{ headerShown: false }}
        component={TabHome}
      />
      <Stack.Screen name="카페 정보" component={InformationScreen} />
      <Stack.Screen name="예약하기" component={ReservationScreen} />
      <Stack.Screen name="리뷰 작성" component={ReviewScreen} />
      <Stack.Screen
        name="사진 확대"
        component={ZoomImageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReserveEnd"
        options={{ headerShown: false }}
        component={ReserveEndScreen}
      />
    </Stack.Navigator>
  );
}

const TabHome = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
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
            <Stack.Screen
              name="Find"
              component={FindScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Home"
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
            <Stack.Screen name="홈" component={HomeScreen} />
            <Stack.Screen name="ConfirmReservation" component={ConfirmScreen} />
            <Stack.Screen
              name="CancelReservation"
              component={CancelReservationScreen}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="myPage"
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
            <Stack.Screen name="마이페이지" component={MyPageScreen} />
            <Stack.Screen name="개인정보수정" component={EditProfileScreen} />
            <Stack.Screen name="옵션" component={OptionScreen} />
            <Stack.Screen name="북마크" component={BookMarkScreen} />
            <Stack.Screen name="회원 탈퇴" component={DeleteUserScreen} />
            <Stack.Screen name="My Review" component={MyReviewScreen} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const InBusiness = ({ params }) => {
  return (
    <Stack.Navigator name="forBusiness" options={{ headerShown: false }}>
      <Stack.Screen
        name="사업자홈"
        component={BusinessHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="좌석 및 예약 관리" component={ReserveManageScreen} />
      <Stack.Screen
        name="카페정보-사업자용"
        component={BusinessInformationScreen}
      />
      <Stack.Screen name="공지 작성" component={WriteNoticeScreen} />
      <Stack.Screen name="카페 사진 관리" component={CafePicManageScreen} />
      <Stack.Screen
        name="사진 확대"
        component={ZoomImageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="카페 사진 추가" component={AddPicScreen} />
    </Stack.Navigator>
  );
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
