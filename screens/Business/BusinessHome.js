import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  FlatList,
  Alert,
} from "react-native";
import getHomeStyle from "../../styles/screens/HomeStyle";
import getBusinessHomeStyle from "../../styles/screens/BusinessHomeStyle";
import { Picker } from "@react-native-picker/picker";
import { getCafeData } from "../../lib/CafeService";
import { dbService } from "../../FireServer";
import { ReservationService } from "../../lib/ReservationService";
import {
  BuisnessUserDataService,
  UserDataService,
} from "../../lib/UserDataService";
import { getCurrentUserId, signOut } from "../../lib/AuthService";
import { List } from "../../lib/DataStructure/List";
import { getImage } from "../../lib/ImageService";

function BusinessHomeScreen({ navigation, route }) {
  const [cafeData, setCafeData] = useState();
  const [reserveService, setReserveService] = useState();
  const [userData, setUserData] = useState();
  const [seatImage, setSeatImage] = useState();
  const [nowTime, setNowTime] = useState(12);
  const [pageLoad, setPageLoad] = useState(false);

  const [seatList, setSeatList] = useState();
  const [seatDatas, setSeatDatas] = useState();

  const [offlineList, setOfflineList] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState("");

  useEffect(() => {
    start();
  }, []);

  async function start() {
    const userId = await getCurrentUserId();
    const userData = (
      await dbService.collection("BuisnessUser").doc(userId).get()
    ).data();
    const cafeData = await getCafeData(userData.cafeId);
    console.log(userId, userData.cafeId);
    setCafeData(cafeData);
  }

  /** 카페 데이터를 성공적으로 가져왔다면 */
  useEffect(() => {
    if (cafeData != null) {
      dbService
        .collection("CafeData")
        .doc(cafeData.getId())
        .onSnapshot(async (doc) => {
          cafeData.loadData(doc.data());
          console.log(cafeData.getId());
          setSeatImage(await getImage("Cafe", cafeData.getId(), "seatImage"));
        });

      loadSeat();
    }
  }, [, cafeData]);

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

  /** 좌석 화면 불러오기 */
  function loadSeatInfo() {
    const seats = reserveService.getSeatDataOnTimeReserve(nowTime, true);
    const list = [];
    let data = [];

    seats.map((item) => {
      list.push(<SeatBtn key={item.seat} number={item.seat} uid={item.uid} />);
      data.push({ key: item.seat, number: item.seat, uid: item.uid });
    });

    setSeatDatas(data);
    setSeatList(list);
    makePickerItem(seats);
  }

  const makeSeatList = ({ item }) => {
    return <SeatBtn key={item.key} number={item.number} uid={item.uid} />;
  };

  function GoToLogoutScreen() {
    signOut();
    navigation.replace("Auth");
  }

  // picker에 아이템 추가
  const makePickerItem = (list) => {
    let seatLoop = [];
    let isIn = false;
    for (let i = 1; i <= cafeData.getSeatCount(); i++) {
      list.forEach((element) => {
        if (element.seat == i) isIn = true;
      });
      if (!isIn) {
        seatLoop.push(<Picker.Item key={i} label={String(i)} value={i} />);
      }
      isIn = false;
    }
    setOfflineList(seatLoop);
  };

  async function appSeatSelf() {
    if (selectedSeat != 0) {
      await reserveService.doSeatReservation(nowTime, selectedSeat, null, true);
      setPageLoad((fd) => fd + 1);
      setSelectedSeat(0);
    }
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
            await reserveService.doSeatCancel(nowTime, number);
            setPageLoad((fd) => fd + 1);
            if (uid != null) {
              const user = new UserDataService(uid);
              await user.deleteReservationToUser();
            }
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
                change: false,
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
        <View style={getBusinessHomeStyle.manageReservationWindow}>
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
                style={getBusinessHomeStyle.pickerContent}
                selectedValue={selectedSeat}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedSeat(itemValue);
                }}
              >
                {offlineList}
              </Picker>
            </View>
            <View style={getBusinessHomeStyle.addButtonContainer}>
              <TouchableOpacity
                style={getBusinessHomeStyle.addButton}
                onPress={appSeatSelf}
              >
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
            {/* {seatList} */}
            <FlatList
              keyExtractor={(item) => String(item.id)}
              data={seatDatas}
              style={getBusinessHomeStyle.reservationList}
              renderItem={makeSeatList}
              numColumns={4}
            />
          </View>
        </View>
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
