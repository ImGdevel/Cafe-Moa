import React, { useEffect, useState } from "react";
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
import { ReviewService } from "../../lib/ReviewService";
import { CafeData } from "../../lib/CafeData";

function InformationScreen({ navigation, route }) {
  const { cafeData: cafe_Data , userData: user_data } = route.params;
  const [cafeData, setCafeData] = useState(cafe_Data);
  const [userData, setUserData] = useState(user_data);
  const [direction, setDirection] = useState("사진");
  const [seatImage, setSeatImage] = useState(cafe_Data.getSeatImage());

  useEffect(()=>{
    //리뷰 및 사진 불러오기
    //


  },[])
  


  const loadreview = () => {
    let Review = ReviewService(cafeData.id);
    
  }



  return (
    <>
      <View style={getInfoStyle.container}>
        <View style={getFindStyle.container}>
          <View style={getFindStyle.contentContainer}>
            <CafeTable
              name={route.params.name}
              location={route.params.location}
              image={route.params.cafeData.getLogo()}
              information={route.params.information}
              cafeData={cafeData}
              navigation={navigation}
            />
          </View>
        </View>

        <View style={{ flex: 4.5 }}>
          <PreviewLayout
            selectedValue={direction}
            values={["사진", "좌석"]}
            setSelectedValue={setDirection}
            style={getInfoStyle.contentLayout}
            cafeData={cafeData}
          >
            <FlatList
              keyExtractor={(item) => item.idx}
              data={imgArr}
              style={getInfoStyle.picArea}

              renderItem={({ item }) => (
                <TouchableOpacity>
                  <View style={{flex: 1, flexDirection: "column", margin: 10 }}>
                    <Image style={getInfoStyle.image} source={{}} />
                  </View>
                </TouchableOpacity>
              )}
              numColumns={3}
            />
          </PreviewLayout>
        </View>

        <View style={getInfoStyle.btnContainer}>
          <TouchableOpacity
            style={getInfoStyle.reserveButton}
            onPress={() =>
              navigation.navigate("예약하기", {
                cafeData: cafeData,
                userData: userData,
              })
            }
          >
            <Text style={{ color: "white", fontSize: 21 }}>예약하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

//카페 테이블
function CafeTable(props) {
  const cafeData = props.cafeData;
  const [cafeName, setCafeName] = useState(cafeData.getName());
  const [cafeLocation, setCafeLocation] = useState(cafeData.getAdress(1, 3));
  const [cafeInformation, setCafeInformaion] = useState(
    "Open : " +
      cafeData.getOpenTime() +
      ":00 ~ Close : " +
      cafeData.getCloseTime() +
      ":00"
  );
  const [cafeLogoImage, setCafeLogoImage] = useState(cafeData.getLogo());

  return (
    <>
      <View style={getCafeTableStyle.container}>
        <View style={getCafeTableStyle.imageContainer}>
          <View style={getCafeTableStyle.image}>
            <Image
              source={{ uri: cafeLogoImage }}
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
  cafeData,
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
          ]}>
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
              source={(cafeData)?{uri:cafeData.getSeatImage()}: {}}
              style={getInfoStyle.seatPic}
            />
          </View>
        );
    })()}
  </View>
);

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

export default InformationScreen;
