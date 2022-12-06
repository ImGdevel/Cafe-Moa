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

function MyReviewScreen({ navigation, route }) {
  const [userData, setUserData] = useState(route.params.userData);

  const [userID, setUserID] = useState(null);
  const [userName, setUserName] = useState("user");
  const [date, setDate] = useState("date");
  const [text, setText] = useState("");
  const [image, setImage] = useState();

  useEffect(() => {
    getImages(userData.id);
  }, []);

  async function getImages(id) {
    if (id != null) {
      console.log("이미지 출력");
      const img = await getImage("User", id, "profile");
      setImage({ uri: img });
    } else {
      setImage(require("../../img/initialProfile.jpg"));
    }
  }

  return (
    <View style={getMyReviewStyle.container}>
      <ScrollView style={getMyReviewStyle.contentContainer}>
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
            이게 뭔데 이게 뭔데 이게 뭔데 이게 뭔데 이게 뭔데 이게 뭔데 이게
            뭔데 이게 뭔데 이게 뭔데 이게 뭔데 이게 뭔데 이게 뭔데 이게 뭔데
            이게 뭔데 이게 뭔데 이게 뭔데 이게 뭔데 이게 뭔데 이게 뭔데 이게
            뭔데 이게 뭔데 이게 뭔데 이게 뭔데 이게 뭔데
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
      </ScrollView>
    </View>
  );
}

export default MyReviewScreen;
