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
import getReviewStyle from "../../styles/components/ReviewStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ReviewService } from "../../lib/ReviewService";

// Array that bring cafe's image
const imgArr = [];

// Array that bring cafe's review
const reviewArr = [];


function BusinessInformationScreen({ navigation, route }) {
  // const { cafeData: cafe_Data, userData: user_data } = route.params;
  // const [cafeData, setCafeData] = useState(cafe_Data);
  // const [userData, setUserData] = useState(user_data);
  const [direction, setDirection] = useState("사진");
  // const [seatImage, setSeatImage] = useState(cafe_Data.getSeatImage());

  // useEffect(()=>{
  //   //리뷰 및 사진 불러오기
  //   //


  // },[])
  


  // const loadreview = () => {
  //   let Review = ReviewService(cafeData.id);
    
  // }

  return (
    <>
      <View style={getInfoStyle.container}>
        <View style={getFindStyle.container}>
          <View style={getFindStyle.contentContainer}>
            <CafeTable
              name={"--카페 이름--"}
              location={"--카페 위치--"}
              image={require("../../img/coffeebayLogo_test.jpg")}
              information={"--카페 정보--"}
              // cafeData={cafeData}
              navigation={navigation}
            />
          </View>
        </View>

        <View style={{ flex: 4.5 }}>
          <PreviewLayout
            selectedValue={direction}
            values={["사진", "좌석", "리뷰"]}
            setSelectedValue={setDirection}
            style={getInfoStyle.contentLayout}
            // cafeData={cafeData}
          >
            <FlatList
              keyExtractor={(item) => item.idx}
              data={imgArr}
              style={getInfoStyle.picArea}
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <View
                    style={{ flex: 1, flexDirection: "column", margin: 10 }}
                  >
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
                // cafeData: cafeData,
                // userData: userData,
              })
            }
          >
            <Text style={{ color: "red", fontSize: 21 }}>카페 삭제하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

//카페 테이블
function CafeTable(props) {
  // const cafeData = props.cafeData;
  const [cafeName, setCafeName] = useState(props.name);
  const [cafeLocation, setCafeLocation] = useState(props.location);
  const [cafeInformation, setCafeInformaion] = useState(props.information);
  const [cafeLogoImage, setCafeLogoImage] = useState(props.image);

  return (
    <>
      <View style={getCafeTableStyle.container}>
        <View style={getCafeTableStyle.imageContainer}>
          <View style={getCafeTableStyle.image}>
            <Image
              source={cafeLogoImage}
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
  // cafeData,
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
      else if (selectedValue === "좌석")
        return (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Image
              source={require("../../img/anySeatPic_text.png")}
              style={getInfoStyle.seatPic}
            />
          </View>
        );
      else
        return (
          <ScrollView style={getReviewStyle.container}>
            <View style={getReviewStyle.noticeHeader}>
              <Text style={getReviewStyle.noticeText}>
                <Ionicons
                  name="alert-circle-outline"
                  style={{ fontSize: 20 }}
                ></Ionicons>{" "}
                사장님 공지
              </Text>
              <Text style={getReviewStyle.notice}>
                공지사항 내용(사업자가 작성한 공지사항)
              </Text>
            </View>
            <View style={getReviewStyle.ratingHeader}>
              <View style={getReviewStyle.ratingContainer}>
                <Ionicons name="star" style={getReviewStyle.ratings}></Ionicons>
                <Text style={getReviewStyle.ratingsText}>4.7</Text>
              </View>
              <TouchableOpacity style={getReviewStyle.reviewBtn} onPress={{}}>
                <Text style={getReviewStyle.reviewBtnText}>공지 작성하기</Text>
              </TouchableOpacity>
            </View>
            <View style={getReviewStyle.reviewContentContainer}>
              <View style={getReviewStyle.reviewContentHeader}>
                <Image
                  style={{ width: 50, height: 50, borderRadius: 50 }}
                  source={require("../../img/initialProfile.jpg")}
                ></Image>
                <View style={getReviewStyle.reviewHead}>
                  <Text style={{ fontSize: 15 }}>--UserID--</Text>
                  <Text style={{ color: "gray" }}>--Date--</Text>
                </View>
              </View>
              <Text style={getReviewStyle.reviewContent}>
                사용자가 작성한 리뷰의 내용이 들어가는 부분 사용자가 작성한
                리뷰의 내용이 들어가는 부분 사용자가 작성한 리뷰의 내용이
                들어가는 부분 사용자가 작성한 리뷰의 내용이 들어가는 부분
                사용자가 작성한 리뷰의 내용이 들어가는 부분 사용자가 작성한
                리뷰의 내용이 들어가는 부분
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name="star"
                  style={{ fontSize: 15, color: "gold", paddingRight: 2 }}
                ></Ionicons>
                <Ionicons
                  name="star"
                  style={{ fontSize: 15, color: "gold", paddingRight: 2 }}
                ></Ionicons>
                <Ionicons
                  name="star"
                  style={{ fontSize: 15, color: "gold", paddingRight: 2 }}
                ></Ionicons>
                <Ionicons
                  name="star"
                  style={{ fontSize: 15, color: "gold", paddingRight: 2 }}
                ></Ionicons>
                <Ionicons
                  name="star"
                  style={{ fontSize: 15, color: "gold", paddingRight: 2 }}
                ></Ionicons>
              </View>
            </View>
          </ScrollView>
        );
    })()}
  </View>
);

export default BusinessInformationScreen;
