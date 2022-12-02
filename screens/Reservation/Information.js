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
import { dbService } from "../../FireServer";

// Array that bring cafe's image
const imgArr = [];

// Array that bring cafe's review
const reviewArr = [];


function InformationScreen({ navigation, route }) {
  const { cafeData: cafeData, userData: userData } = route.params;
  const [direction, setDirection] = useState("사진");
  const [seatImage, setSeatImage] = useState(cafeData.getSeatImage());

  useEffect(()=>{
    


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
              cafeData={cafeData}
              userData={userData}
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
            userData={userData}
            navigation={navigation}
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
            <Text style={{ color: "white", fontSize: 23, fontWeight: "600" }}>예 약 하 기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

//카페 테이블
function CafeTable(props) {
  const {cafeData: cafeData, userData: userData, navigation: navigation } = props;
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

  function Bookmark(props){
    const cafeId = cafeData.getId();
    const [icon, seticon] = useState("heart-outline");
    const [iconStyle, setIconStyle] = useState({fontSize: 30, color: "black"});
    const [checked, setChecked] = useState(false);

    useEffect(()=>{
      if(userData.isBookmarked(cafeId)){
        seticon("heart");
        setIconStyle({fontSize: 30, color: "#e00"});
        setChecked(true);
      }
    },[])
    
    async function bookMarked(){
      if(checked){
        await userData.deletBookMark(cafeId);
        seticon("heart-outline");
        setIconStyle({fontSize: 30, color: "black"});
        setChecked(false);
      }else{
        await userData.addBookMark(cafeId);
        seticon("heart");
        setIconStyle({fontSize: 30, color: "#e00"});
        setChecked(true);
      }
    }
    return(
      <Ionicons
        name={icon}
        style={iconStyle}
        onPress={bookMarked}
      />
    )
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
              <Bookmark/>
            </View>
            <Text style={getCafeTableStyle.contentText}>{cafeLocation}</Text>
            <Text style={getCafeTableStyle.contentText}>{cafeInformation}</Text>
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

  useEffect(()=>{
    dbService.collection("CafeData").doc(cafeData.getId()).collection("Review").onSnapshot((snapshot)=>{
      const reviews = snapshot.docs.map((doc)=>({
        id:doc.id,
        ...doc.data(),
      }))
      setreviewDatas(reviews);
    })
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

  function ReviewPanel(props){
    const {review:review} = props;
    const [userID, setUserID] = useState("user");
    const [date, setDate] = useState("date");
    const [text, setText] = useState("");
    const [image, setImage] = useState(require("../../img/initialProfile.jpg"));

    function leadingZeros(n, digits) {
      var zero = ''; n = n.toString();
      if (n.length < digits) {
        for (var i = 0; i < digits - n.length; i++)
          zero += '0';
        }
      return zero + n;
    }
    useEffect(()=>{
      if(review !=null){
        const date = review.date.toDate();
        setUserID(review.user.name);
        setDate(`${leadingZeros(date.getMonth()+1,2)}/${leadingZeros(date.getDate(),2)} (${leadingZeros(date.getHours(),2)}:${leadingZeros(date.getMinutes(),2)})`);
        setText(review.text)
      }

    },[])

    return(
      <View style={getReviewStyle.reviewContentContainer}>
        <View style={getReviewStyle.reviewContentHeader}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 50 }}
            source={image}
          />
          <View style={getReviewStyle.reviewHead}>
            <Text style={{ fontSize: 17 }}>{userID}</Text>
            <Text style={{ color: "gray" }}>{date}</Text>
          </View>
        </View>
        <Text style={getReviewStyle.reviewContent}>
            {text}
          </Text>
      </View>
    )
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
          <Text style={getReviewStyle.ratingsText}>4.7</Text>
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

export default InformationScreen;