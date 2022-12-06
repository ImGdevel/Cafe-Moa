import React, { useState, useEffect } from "react";
import {
  Image,
  TouchableHighlight,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import getMyReviewStyle from "../../styles/screens/MyReviewStyle";
import getReviewStyle from "../../styles/components/ReviewStyle";
import Star from "../../Components/Star";

import { getCafeDatas } from "../../lib/CafeService";
import { getImage } from "../../lib/ImageService";
import { dbService } from "../../FireServer";

function MyReviewScreen({ navigation, route }) {
  const [userData, setUserData] = useState(route.params.userData);
  const [reviewList, setReviewList] = useState();
  const [reviews, setReviews] = useState();

  useEffect(() => {
    loadReview();
  }, []);

   async function loadReview(){
    const review = userData.getReview();
    const promises = review.map(async(data)=>{
      const cafeColl = dbService.collection("CafeData").doc(data.cafe);
      const cafe = (await cafeColl.get()).data();
      const review = (await cafeColl.collection("Review").doc(data.review).get()).data();  
      return {cafe,review}
    })
    const reviewlist = await Promise.all(promises);
   
    const list = reviewlist.map((data,index)=>{
      console.log(data)
      return (<ReviewContent key={index} review={data.review} cafe={data.cafe}/>)
    })
    setReviewList(list);
  }



  






  
  function ReviewContent({review,cafe}) {
    const [userID, setUserID] = useState(null);
    const [userName, setUserName] = useState("user");
    const [date, setDate] = useState("date");
    const [text, setText] = useState("");
    const [image, setImage] = useState();

  
    function leadingZeros(n, digits) {
      var zero = "";
      n = n.toString();
      if (n.length < digits) {
        for (var i = 0; i < digits - n.length; i++) zero += "0";
      }
      return zero + n;
    }
    useEffect(() => {
      console.log(review);
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
    }, []);
  
    async function getImages(id) {
      if (id != " ") {
        const img = await getImage("User", id, "profile");
        setImage({ uri: img });
      } else {
        setImage(require("../../img/initialProfile.jpg"));
      }
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
                <TouchableOpacity style={getMyReviewStyle.deleteButton}>
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
                source={require("../../img/coffeebayLogo_test.jpg")}
              />
            </View>
            <View style={getMyReviewStyle.cafeDataContainer}>
              <View style={getMyReviewStyle.cafeData}>
                <Text style={{ fontSize: 22 }}>--카페이름--</Text>
              </View>
              <View style={getMyReviewStyle.cafeData}>
                <Text style={{ fontSize: 18, color: "gray" }}>
                  --카페위치--
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
