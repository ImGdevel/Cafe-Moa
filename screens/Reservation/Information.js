import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";

import getInfoStyle from "../../styles/screens/InfoStyle";
import getCafeTableStyle from "../../styles/components/CafeTableStyle";
import getFindStyle from "../../styles/components/FindStyle";

const imgArr = [
  {
    idx: "1",
    src: require("../../img/coffeebayLogo_test.jpg"),
  },
  {
    idx: "2",
    src: require("../../img/coffeebayLogo_test.jpg"),
  },
  {
    idx: "3",
    src: require("../../img/coffeebayLogo_test.jpg"),
  },
  {
    idx: "4",
    src: require("../../img/coffeebayLogo_test.jpg"),
  },
  {
    idx: "5",
    src: require("../../img/coffeebayLogo_test.jpg"),
  },
  {
    idx: "6",
    src: require("../../img/coffeebayLogo_test.jpg"),
  },
  {
    idx: "7",
    src: require("../../img/coffeebayLogo_test.jpg"),
  },
  {
    idx: "8",
    src: require("../../img/coffeebayLogo_test.jpg"),
  },
  {
    idx: "9",
    src: require("../../img/coffeebayLogo_test.jpg"),
  },
  {
    idx: "10",
    src: require("../../img/coffeebayLogo_test.jpg"),
  },
  {
    idx: "11",
    src: require("../../img/coffeebayLogo_test.jpg"),
  },
  {
    idx: "12",
    src: require("../../img/anySeatPic_text.png"),
  },
];

function InformationScreen({ navigation }) {
  const [direction, setDirection] = useState("사진");

  return (
    <>
      <View style={getInfoStyle.container}>
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
            values={["사진", "좌석"]}
            setSelectedValue={setDirection}
            style={getInfoStyle.contentLayout}
          >
            <FlatList
              keyExtractor={(item) => item.idx}
              data={imgArr}
              style={getInfoStyle.picArea}
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      margin: 10,
                    }}
                  >
                    <Image style={getInfoStyle.image} source={item.src} />
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

        <View style={getInfoStyle.btnContainer}>
          <TouchableOpacity
            style={getInfoStyle.reserveButton}
            onPress={() => navigation.navigate("Reservation")}
          >
            <Text style={{ color: "white", fontSize: 20 }}>예약하기</Text>
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
              style={getInfoStyle.cafeLogo}
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
    <View style={getInfoStyle.row}>
      {values.map((value) => (
        <TouchableOpacity
          key={value}
          onPress={() => setSelectedValue(value)}
          style={[
            getInfoStyle.button,
            selectedValue === value && getInfoStyle.selected,
          ]}
        >
          <Text
            style={[
              getInfoStyle.buttonLabel,
              selectedValue === value && getInfoStyle.selectedLabel,
            ]}
          >
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
    {(() => {
      if (selectedValue === "사진")
        return <View style={getInfoStyle.container}>{children}</View>;
      else
        return (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Image
              source={require("../../img/anySeatPic_text.png")}
              style={getInfoStyle.seatPic}
            />
          </View>
        );
    })()}
  </View>
);

export default InformationScreen;
