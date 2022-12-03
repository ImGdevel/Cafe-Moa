import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TouchableHighlight,
  Alert,
  Platform,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import getInfoStyle from "../../styles/screens/InfoStyle";
import getCafeTableStyle from "../../styles/components/CafeTableStyle";
import getFindStyle from "../../styles/components/FindStyle";
import getBusinessInfoStyle from "../../styles/screens/BusinessInfoStyle";
import getPicManageStyle from "../../styles/screens/PicManageStyle";

import Ionicons from "react-native-vector-icons/Ionicons";
import { ReviewService } from "../../lib/ReviewService";
import { getImage, pickImage, uploadImage } from "../../lib/ImageService";

// Array that bring cafe's image
const imgArr = [
  require("../../img/coffeebayLogo_test.jpg"),
  require("../../img/coffeebayLogo_test.jpg"),
  require("../../img/coffeebayLogo_test.jpg"),
  require("../../img/coffeebayLogo_test.jpg"),
  require("../../img/coffeebayLogo_test.jpg"),
  require("../../img/coffeebayLogo_test.jpg"),
];

function CafePicManageScreen({ navigation, route }) {
  const { cafeData: cafeData, userData: userData } = route.params;
  const [direction, setDirection] = useState("사진");
  // const [seatImage, setSeatImage] = useState(cafe_Data.getSeatImage());
  
  const [seatImage, setSeatImage] = useState();

  useEffect(() => {
    
  },[]);


  return (
    <>
      <View style={getInfoStyle.container}>
        <View style={getFindStyle.container}>
          <View style={getFindStyle.contentContainer}>
            <CafeTable
              cafeDatas={cafeData}
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
            navigation={navigation}
            // cafeData={cafeData}
          >{/*
            <FlatList
              keyExtractor={(item) => item.idx}
              data={imgArr}
              style={getInfoStyle.picArea}
              renderItem={({ item }) => (
                <TouchableHighlight
                  onPress={() =>
                    navigation.navigate("사진 확대", {
                      // source: "../../img/coffeebayLogo_test.jpg",
                    })
                  }
                  onLongPress={longPressButton}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                    }}
                  >
                    <Image style={getInfoStyle.image} source={{}} />
                  </View>
                </TouchableHighlight>
              )}
              numColumns={3}
                  />*/}
          </PreviewLayout>
        </View>

        <View style={getInfoStyle.btnContainer}>
          <TouchableOpacity
            style={getInfoStyle.reserveButton}
            onPress={() =>
              navigation.navigate("카페 사진 추가", {
                // cafeData: cafeData,
                // userData: userData,
              })
            }
          >
            <Text style={{ color: "white", fontSize: 21 }}>사진 추가하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const longPressButton = () =>
  Alert.alert("", "사진을 삭제하시겠습니까?", [
    {
      text: "취소",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    { text: "삭제", onPress: () => console.log("OK Pressed") },
  ]);

const PicklogoImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 4],
    quality: 1,
  });
  console.log(result);
  if (!result.canceled) {
    return result.assets[0].uri;
  }
};

//카페 테이블
function CafeTable(props) {
  const { cafeDatas: cafeData } = props;
  const [cafeName, setCafeName] = useState();
  const [cafeLocation, setCafeLocation] = useState();
  const [cafeInformation, setCafeInformaion] = useState();
  const [cafeLogoImage, setCafeLogoImage] = useState();
  const [rating, setRating] = useState();
  
  useEffect(()=>{
    if(cafeData != null){
      setCafeName(cafeData.getName());
      setCafeLocation(cafeData.getAdress(1, 3));
      setCafeInformaion( "Open : " + cafeData.getOpenTime() +":00 ~ Close : " +cafeData.getCloseTime() +":00");
      setCafeLogoImage(cafeData.getLogo());
      setRating(cafeData.getRating());
      setCafeLogoImage( {uri:cafeData.getLogo()});
    }else{
    }
  },[,cafeData])

  const changeLogo = async() => {
    const img = await pickImage();
    setCafeLogoImage({uri:img}); //이미지 피커에서 가져온 이미지 쓸라면 {uri: 가져온 uri} 로 싸야한다.
    await uploadImage(img,"Cafe",cafeData.getId(),"logo")
  }

  return (
    <>
      <View style={getCafeTableStyle.container}>
        <View style={getCafeTableStyle.imageContainer}>
          <View style={getCafeTableStyle.image}>
            <Image source={cafeLogoImage} style={getInfoStyle.cafeLogo} />
          </View>
        </View>
        <View style={getCafeTableStyle.contentContainer}>
          <View style={getCafeTableStyle.textContent}>
            <Text style={getCafeTableStyle.nameText}>{cafeName}</Text>
            <Text style={getCafeTableStyle.contentText}>{cafeLocation}</Text>
            <Text style={getCafeTableStyle.contentText}>{cafeInformation}</Text>
          </View>
          <View style={getCafeTableStyle.logoPickerContainer}>
            <TouchableOpacity
              style={getCafeTableStyle.LogoImagePicker}
              onPress={changeLogo}
            >
              <Text style={{ color: "white", fontSize: 18 }}>
                로고 변경하기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

function PreviewLayout (props){
  const { children: children, 
          values: values, 
          selectedValue: selectedValue, 
          setSelectedValue: setSelectedValue, 
          cafeData: cafeData, 
          userData: userData, 
          navigation: navigation} = props;

  return(
    <View style={{ padding: 10, flex: 1 }}>
      <Text style={{ marginBottom: 10, fontSize: 24 }}></Text>
      <View style={getInfoStyle.row}>
        {values.map((value) => (
          <TouchableOpacity
            key={value}
            onPress={() => setSelectedValue(value)}
            style={[getInfoStyle.button,
              selectedValue === value && getInfoStyle.selected,
            ]}
          >
            <Text
              style={[
                getInfoStyle.buttonLabel,
                selectedValue === value && getInfoStyle.selectedLabel,
              ]}
            >
              {`${value}`}
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
            <ReviewPage
              cafeData={cafeData}
              userData={userData}
              navigation={navigation}
            />
          );
      })()}
    </View>
  );
}



function ReviewPage(props){
  const {navigation: navigation, cafeData:cafeData ,userData:userData} = props;
  const [reviewList, setReviewList] = useState();
  const [notice, setNotice] = useState("공지사항 내용(사업자가 작성한 공지사항)");
  const [reviewDatas, setreviewDatas] = useState([]);
  const [rating, setRating] = useState();

  useEffect(()=>{
    dbService.collection("CafeData").doc(cafeData.getId()).collection("Review").onSnapshot((snapshot)=>{
      const reviews = snapshot.docs.map((doc)=>({
        id:doc.id,
        ...doc.data(),
      }))
      setreviewDatas(reviews);
    })
    setNotice(cafeData.getNotice());
    setRating(cafeData.getRating());
    
  },[])
  
  useEffect(()=>{
    loadReview();
  },[reviewDatas])

  async function loadReview(){
    const reviews = reviewDatas;
    let table = [];
    for (let i = 0; i < reviews.length; i++) {
      table.push(
        <ReviewPanel
          key={i}
          review={reviews[i]}
        />
      );
    }
    setReviewList(table);
  }

  return(
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
          {notice}
        </Text>
      </View>
      <View style={getReviewStyle.ratingHeader}>
        <View style={getReviewStyle.ratingContainer}>
          <Ionicons name="star" style={getReviewStyle.ratings}></Ionicons>
          <Text style={getReviewStyle.ratingsText}>{rating}</Text>
        </View>
        <TouchableOpacity
          style={getReviewStyle.reviewBtn}
          onPress={() => {
            navigation.navigate("리뷰 작성",{
              cafeData: cafeData,
              userData: userData,
            });
          }}
        >
          <Text style={getReviewStyle.reviewBtnText}>리뷰 작성하기</Text>
        </TouchableOpacity>
      </View>
      <View>
        {reviewList}
      </View>
    </ScrollView>
  )
}

function ReviewPanel(props){
  const {review:review} = props;
  const [userID, setUserID] = useState(null);
  const [userName, setUserName] = useState("user");
  const [date, setDate] = useState("date");
  const [text, setText] = useState("");
  const [image, setImage] = useState();

  function leadingZeros(n, digits) {
    var zero = ''; n = n.toString();
    if (n.length < digits) {
      for (var i = 0; i < digits - n.length; i++)
        zero += '0';
      }
    return zero + n;
  }
  useEffect(()=>{
    console.log(review);
    if(review !=null){
      const date = review.date.toDate();
      setUserName(review.user.name);
      setUserID(review.user.id);
      setDate(`${leadingZeros(date.getMonth()+1,2)}/${leadingZeros(date.getDate(),2)} (${leadingZeros(date.getHours(),2)}:${leadingZeros(date.getMinutes(),2)})`);
      setText(review.text)
      getImages(review.user.id);
    }
  },[])

  async function getImages(id){
    if(id != null){
      console.log("이미지 출력")
      const img = await getImage("User",id,"profile");
      setImage({uri:img});
    }else{
      setImage(require("../../img/initialProfile.jpg"))
    }
  }

  return(
    <View style={getReviewStyle.reviewContentContainer}>
      <View style={getReviewStyle.reviewContentHeader}>
        <Image
          style={{ width: 50, height: 50, borderRadius: 50 }}
          source={image}
        />
        <View style={getReviewStyle.reviewHead}>
          <View>
            <Star value={review.rate}/>
          </View>
          <View style={{flexDirection:"row", marginLeft:0, justifyContent:"flex-end", }}>
            <Text style={{fontSize: 15, color:"gray"}}>{userName}</Text>
            <Text style={{fontSize: 13, color:"gray", marginLeft:10, marginTop:2}}>{date}</Text> 
          </View> 
        </View>
      </View>
      <Text style={getReviewStyle.reviewContent}>
          {text}
        </Text>
    </View>
  )
}

export default CafePicManageScreen;
