import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";

import getConfirmReservationStyle from "../../styles/screens/ConfirmReservationStyle";
import getCafeTableStyle from "../../styles/components/CafeTableStyle";
import getFindStyle from "../../styles/components/FindStyle";

const imgArr = [
  {
    idx: "12",
    src: require("../../img/anySeatPic_text.png"),
  },
];

function ConfirmReservationScreen({ navigation }) {
  const [direction, setDirection] = useState("사진");

  return (
    <>
      <View style={getConfirmReservationStyle.container}>
        <View style={getFindStyle.container}>
          <View style={getFindStyle.contentContainer}>
            <CafeTable
              name={"Coffee Bay"}
              location={"용인시 처인구"}
              imgae={""}
              information={"Open : AM 09:00 || Close : PM 22:00"}
            />
          </View>
        </View>

        <View style={{ flex: 4.5 }}>
          <PreviewLayout
            selectedValue={direction}
            values={["예약 내역", "좌석 위치 안내"]}
            setSelectedValue={setDirection}
            style={getConfirmReservationStyle.contentLayout}
          >
            <FlatList
              keyExtractor={(item) => item.idx}
              data={imgArr}
              style={getConfirmReservationStyle.picArea}
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      margin: 10,
                    }}
                  >
                    
                    <Text style={{ color: "#ccc", fontSize: 20, margin: 15 }}>카페 주소 :</Text>
                    <Text style={{ color: "#ccc", fontSize: 20, margin: 15 }}>이용 가능 시간 :</Text>
                    <Text style={{ color: "#ccc", fontSize: 20, margin: 15 }}>예약금 수수료 여부 :</Text>
                    <Text style={{ color: "#ccc", fontSize: 15, margin: 15 }}>*매장 입장시 예약화면을 보여주시면 됩니다.
                    좌석 이동은 카페 직원께 문의 부탁드립니다.
                    이용 완료시 본인의 물건이 없는지 확인해주시고 다음 사람을 위해 좌석을 깨끗이 정리해주시기 바랍니다.</Text>
                    <Text style={{ color: "#ccc", fontSize: 15, margin: 15 }}>*한시간 이전 예약 취소시 수수료 반환 불가</Text>
                  </View>
                </TouchableOpacity>
              )}
              numColumns={3}
            />

            {/*___<View style={getInfoStyle.image}>
              <Image
                source={require("../../img/coffeebayLogo_test.jpg")}
                style={getInfoStyle.cafeLogo}
              />
  </View>___*/}
          </PreviewLayout>
        </View>

        <View style={getConfirmReservationStyle.btnContainer}>
          <TouchableOpacity
            style={getConfirmReservationStyle.reserveButton}
            onPress={() => navigation.navigate("Reservation")}
          >
            <Text style={{ color: "white", fontSize: 20 }}>예약 취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

function CafeTable(props) {
  const [cafeName, setCafeName] = useState(props.name);
  const [cafeLocation, setCafeLocation] = useState(props.location);
  const [cafeInformation, setCafeInformaion] = useState(props.information);

  return (
    <>
      <View style={getCafeTableStyle.container}>
        <View style={getCafeTableStyle.imageContainer}>
          <View style={getCafeTableStyle.image}>
            <Image
              source={require("../../img/coffeebayLogo_test.jpg")}
              style={getConfirmReservationStyle.cafeLogo}
            />
          </View>
        </View>
        <View style={getCafeTableStyle.contentContainer}>
          <View style={getCafeTableStyle.textContent}>
            <Text style={getCafeTableStyle.nameText}>{cafeName}</Text>
            <Text style={getCafeTableStyle.contentText}>{cafeLocation}</Text>
            <Text style={getCafeTableStyle.contentText}>{cafeInformation}</Text>
          </View>
        </View>
      </View>
    </>
  );
}

const PreviewLayout = ({
  children,
  values,
  selectedValue,
  setSelectedValue,
}) => (
  <View style={{ padding: 10, flex: 1 }}>
    <Text style={{ marginBottom: 10, fontSize: 24 }}></Text>
    <View style={getConfirmReservationStyle.row}>
      {values.map((value) => (
        <TouchableOpacity
          key={value}
          onPress={() => setSelectedValue(value)}
          style={[
            getConfirmReservationStyle.button,
            selectedValue === value && getConfirmReservationStyle.selected,
          ]}
        >
          <Text
            style={[
              getConfirmReservationStyle.buttonLabel,
              selectedValue === value && getConfirmReservationStyle.selectedLabel,
            ]}
          >
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
    {(() => {
      if (selectedValue === "예약 내역")
        return <View style={getConfirmReservationStyle.container}>{children}</View>;
      else
        return (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Image
              source={require("../../img/anySeatPic_text.png")}
              style={getConfirmReservationStyle.seatPic}
            />
          </View>
        );
    })()}
  </View>
);

export default ConfirmReservationScreen;
