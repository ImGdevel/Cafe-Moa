import React, { useState, useEffect } from "react";
import {
  Image,
  TouchableHighlight,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

import getMyReviewStyle from "../../styles/screens/MyReviewStyle";
import getReviewStyle from "../../styles/components/ReviewStyle";
import Star from "../../Components/Star";
import { getCafeData, getCafeDatas } from "../../lib/CafeService";
import { getImage } from "../../lib/ImageService";
import { dbService, MyDatabase } from "../../FireServer";

function MyReviewScreen({ navigation, route }) {
  const [userData, setUserData] = useState(route.params.userData);
  const [reviewList, setReviewList] = useState([]);
  useEffect(() => {
    loadReview();
  }, []);

  async function loadReview(){
    dbService.collection("User").doc(userData.getId()).onSnapshot(async(data)=>{
      const review = data.data().review
      const promises = review.map(async(data)=>{
        const cafeColl = dbService.collection("CafeData").doc(data.cafe);
        const reviewColl = (await cafeColl.collection("Review").doc(data.review).get());
        const review = reviewColl.data();
        const reviewId = reviewColl.id;
        const cafe = await getCafeData(data.cafe);
        return {cafe,review, reviewId}
      })
      const reviewlist = await Promise.all(promises);
      const list = reviewlist.map((data)=>{
        return (<ReviewContent key={data.reviewId} review={data.review} cafe={data.cafe} id={data.reviewId}/>)
      })
      list.sort();
      setReviewList(list);
    })
  }


  function ReviewContent({review,cafe,id}) {
    const [userID, setUserID] = useState(null);
    const [userName, setUserName] = useState("user");
    const [date, setDate] = useState("date");
    const [text, setText] = useState("");
    const [image, setImage] = useState();
    const [cafeImage, setCafeImage] = useState();
    const [cafeName, setCafeName] = useState();
    const [cafeLocation, setCafeLocation] = useState();

    function leadingZeros(n, digits) {
      var zero = "";
      n = n.toString();
      if (n.length < digits) {
        for (var i = 0; i < digits - n.length; i++) zero += "0";
      }
      return zero + n;
    }
    useEffect(() => {
      if (review != null) {
        const date = review.date.toDate();
        setUserName(review.user.name);
        setUserID(review.user.id);
        setDate(
          `${leadingZeros(date.getMonth() + 1, 2)}/${leadingZeros(
            date.getDate(),
            2
          )} (${leadingZeros(date.getHours(), 2)}:${leadingZeros(
            date.getMinutes(),
            2
          )})`
        );
        setText(review.text);
        getImages(review.user.id);
      }
      if(cafe != null){
        setCafeImage(cafe.getLogo());
        setCafeName(cafe.getName());
        setCafeLocation(cafe.getAdress(1,3))
      }
    }, []);
  
    async function getImages(id) {
      if (id != " ") {
        const img = await getImage("User", id, "profile");
        setImage({ uri: img });
      } else {
        setImage(require("../../img/initialProfile.jpg"));
      }
    }
    function deletAlert(){
      let isdelet = false;
      Alert.alert("리뷰삭제", "리뷰를 삭제하시겠습니까?", [
        {
          text: "취소",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "삭제",
          onPress: () => {
            deleteReview();
          },
        },
      ]);
    }

    async function deleteReview(){
      await dbService.collection("User").doc(review.user.id).update({
        review : MyDatabase.firestore.FieldValue.arrayRemove({cafe:cafe.id, review:id}),
      })
      await dbService.collection("CafeData").doc(cafe.getId()).collection("Review").doc(id).delete();
      await loadReview();
    }

    return(
      <>
       <View style={getReviewStyle.reviewContentContainer}>
          <View style={getReviewStyle.reviewContentHeader}>
            <Image
              style={{ width: 50, height: 50, borderRadius: 50 }}
              source={image}
            />
            <View style={getMyReviewStyle.reviewHead}>
              <View style={{ justifyContent: "space-evenly" }}>
                <View>
                  <Star value={5} />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 0,
                    justifyContent: "flex-start",
                  }}
                >
                  <Text style={{ fontSize: 15, color: "gray" }}>
                    {userName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: "gray",
                      marginLeft: 10,
                      marginTop: 2,
                    }}
                  >
                    {date}
                  </Text>
                </View>
              </View>
              <View>
                <TouchableOpacity 
                  style={getMyReviewStyle.deleteButton}
                  onPress={deletAlert}
                >
                  <Text style={{ fontSize: 14, color: "gray" }}>삭제</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text style={getReviewStyle.reviewContent}>
            {text}
          </Text>
          <View style={getMyReviewStyle.reviewedCafeInfoContainer}>
            <View style={getMyReviewStyle.cafeLogoContainer}>
              <Image
                style={{ width: "100%", height: "100%", borderRadius: 15 }}
                source={{uri:cafeImage}}
              />
            </View>
            <View style={getMyReviewStyle.cafeDataContainer}>
              <View style={getMyReviewStyle.cafeData}>
                <Text style={{ fontSize: 17 }}>{cafeName}</Text>
              </View>
              <View style={getMyReviewStyle.cafeData}>
                <Text style={{ fontSize: 15, color: "gray"}}>
                  {cafeLocation}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </>
    )
  }
  return (
    <View style={getMyReviewStyle.container}>
      <ScrollView style={getMyReviewStyle.contentContainer}>
        {reviewList}
      </ScrollView>
    </View>
  );
}

export default MyReviewScreen;
