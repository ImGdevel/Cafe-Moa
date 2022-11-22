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
import { CafeData } from "../../lib/CafeData";

import IonIcons from "react-native-vector-icons/Ionicons";

// Array that bring cafe's image
const imgArr = [];

// Array that bring cafe's review
const reviewArr = [];


function InformationScreen({ navigation, route }) {
  const { cafeData: cafe_Data, userData: user_data } = route.params;
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
            values={["사진", "좌석", "리뷰"]}
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

  //북마크 관련
  const [cafeId, setcafeId] = useState(cafeData.getId());
  const [bookmarkList, setBookmark] = useState(cafeData.getBookmark());
  function Bookmark(cafeId){
    for(let i = 0; i < bookmarkList.length; i++){
      if(bookmarkList[i].cafeId == cafeId){
        return (
          <IonIcons
            name="heart-outline"
            style={{ fontSize: 30}}
          ></IonIcons>
        )
      }
      else {
        return (
          <IonIcons
            name="heart"
            style={{ fontSize: 30}}
          ></IonIcons>
        )
      }
    }
  }

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
            <View style={getCafeTableStyle.divideContent}>
              <Text style={getCafeTableStyle.nameText}>{cafeName}</Text>

              {/* <IonIcons
                name="heart-outline"
                style={{ fontSize: 30}}
              ></IonIcons> */}

              <Bookmark
                onPress={() => setBookmark(cafeId)}/>
              {/* 북마크 되면 name="heart" 사용, bookmark-outline 안 예쁨*/}

            </View>
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
              source={cafeData ? { uri: cafeData.getSeatImage() } : {}}
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
                <Text style={getReviewStyle.reviewBtnText}>리뷰 작성하기</Text>
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

export default InformationScreen;
