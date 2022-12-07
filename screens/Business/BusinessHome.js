import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import getHomeStyle from "../../styles/screens/HomeStyle";
import getBusinessHomeStyle from "../../styles/screens/BusinessHomeStyle";
import { Picker } from "@react-native-picker/picker";
import { getCafeData } from "../../lib/CafeService";
import { dbService } from "../../FireServer";
import { ReservationService } from "../../lib/ReservationService";
import { UserDataService } from "../../lib/UserDataService";

function BusinessHomeScreen({ navigation, route }) {
  const [cafeData, setCafeData] = useState();
  const [reserveService, setReserveService] = useState();
  const [userData, setUserData] = useState();
  const [seatImage, setSeatImage] = useState();
  const [nowTime, setNowTime] = useState(12);
  const [pageLoad, setPageLoad] = useState(false);
  const [seatList, setSeatList] = useState();
  const [offlineList, setOfflineList] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState("");

  function GoToLogoutScreen() {
    //signOut();
    navigation.replace("Auth");
  }

  // picker item에 추가하는 loop
  const makePickerItem = () => {
    let seatLoop = [];
    console.log(cafeData.getSeatCount());
    for (let i = 1; i <= cafeData.getSeatCount(); i++) {
      seatLoop.push(<Picker.Item key={i} label={String(i)} value={i} />);
    }
    setOfflineList(seatLoop);
  };

  useEffect(() => {
    start();
  }, []);

  async function start() {
    //const user = new BuisnessUserDataService();
    //await user.getBuisnessUserProfile();
    //setCafeData(user.getCafeId());
    const cafeId = "KW8l6oYhXj6g2xcUbstU";
    setCafeData(await getCafeData(cafeId));
  }

  useEffect(() => {
    if (cafeData != null) {
      dbService
        .collection("CafeData")
        .doc(cafeData.getId())
        .onSnapshot((doc) => {
          cafeData.loadData(doc.data());
        });
      setSeatImage(cafeData.getSeatImage());
      loadSeat();
    }
  }, [cafeData]);

  useEffect(() => {}, [route?.seatData]);

  async function loadSeat() {
    const reves = new ReservationService(cafeData.getSeatId());
    dbService
      .collection("Seat")
      .doc(cafeData.getSeatId())
      .onSnapshot(async () => {
        await reves.loadSeatDataBase();
        setReserveService(reves);
        setPageLoad((prev) => prev + 1);
      });
  }

  useEffect(() => {
    if (reserveService != null) {
      loadSeatInfo();
    }
  }, [reserveService, pageLoad]);

  function loadSeatInfo() {
    const seats = reserveService.getSeatDataOnTimeReserve(nowTime, true);
    const list = [];
    seats.map((item) => {
      list.push(<SeatBtn key={item.seat} number={item.seat} uid={item.uid} />);
    });
    setSeatList(list);
    makePickerItem();
  }

  function SeatBtn({ number, uid }) {
    const onSeat = () => {
      Alert.alert("", `${number}번 좌석을 사용완료합니다.`, [
        {
          text: "취소",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "완료",
          onPress: async () => {
            const user = new UserDataService(uid);
            const fd = await reserveService.doSeatCancel(nowTime, number);
            await user.deleteReservationToUser();
            setPageLoad(fd);
          },
        },
      ]);
    };
    return (
      <TouchableOpacity
        style={getBusinessHomeStyle.reserveTimeBox}
        onPress={onSeat}
      >
        <Text style={{ color: "white", fontWeight: "500", fontSize: 15 }}>
          {number}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <KeyboardAvoidingView style={getHomeStyle.container}>
      <View style={getHomeStyle.TopView}>
        <View style={getHomeStyle.TopViewTop}></View>
        <View style={getHomeStyle.TopTitle}>
          <Text style={{ color: "#001D44", fontWeight: "900", fontSize: 60 }}>
            M O A
          </Text>
          <Text
            style={{
              color: "#001D44",
              alignSelf: "flex-end",
              paddingRight: "28%",
              top: -10,
            }}
          >
            for Business
          </Text>
        </View>
      </View>
      <View style={getBusinessHomeStyle.contentContainer}>
        <View style={getBusinessHomeStyle.btnContainer}>
          <TouchableOpacity
            style={getBusinessHomeStyle.button}
            onPress={() => {
              if (cafeData == null) return;
              navigation.navigate("카페정보-사업자용", {
                cafeData: cafeData,
                userData: userData,
              });
            }}
          >
            <Text style={{ color: "black", fontWeight: "500", fontSize: 20 }}>
              카페 정보
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getBusinessHomeStyle.button}
            onPress={() => {
              if (cafeData == null) return;
              navigation.navigate("좌석 및 예약 관리", {
                cafeData: cafeData,
                userData: userData,
                seatData: reserveService,
              });
            }}
          >
            <Text style={{ color: "black", fontWeight: "500", fontSize: 20 }}>
              좌석 및 예약 관리
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={getBusinessHomeStyle.manageReservationWindow}>
          <View style={getBusinessHomeStyle.manageHeader}>
            <Text style={{ color: "black", fontWeight: "500", fontSize: 30 }}>
              현재 좌석 현황
            </Text>
          </View>
          <View style={getBusinessHomeStyle.pickerContainer}>
            <View style={getBusinessHomeStyle.pickerHeader}>
              <Text>수동으로 좌석 추가... {">>"}</Text>
            </View>
            <View style={getBusinessHomeStyle.pickerBox}>
              <Picker
                style={ getBusinessHomeStyle.pickerContent }
                selectedValue={selectedSeat}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedSeat(itemValue);
                }}
              >
                {offlineList}
              </Picker>
            </View>
            <View style={getBusinessHomeStyle.addButtonContainer}>
              <TouchableOpacity style={getBusinessHomeStyle.addButton}>
                <Text style={{ color: "white" }}>추가하기</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={getBusinessHomeStyle.seatPicArea}>
            <Image
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
              source={{ uri: seatImage }}
            />
          </View>
          <View style={getBusinessHomeStyle.reservationListContainer}>
            <View style={getBusinessHomeStyle.reservationList}>{seatList}</View>
          </View>
        </ScrollView>
        <View style={getBusinessHomeStyle.logoutContainer}>
          <TouchableOpacity
            style={getBusinessHomeStyle.logoutBtn}
            onPress={GoToLogoutScreen}
          >
            <Text style={{ color: "black", fontSize: 21 }}>로그아웃</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: "5%" }}></View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default BusinessHomeScreen;
