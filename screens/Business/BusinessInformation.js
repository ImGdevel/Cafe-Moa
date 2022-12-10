import React, { useEffect, useState, createRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";

import getInfoStyle from "../../styles/screens/InfoStyle";
import getCafeTableStyle from "../../styles/components/CafeTableStyle";
import getFindStyle from "../../styles/components/FindStyle";
import getReviewStyle from "../../styles/components/ReviewStyle";
import getBusinessInfoStyle from "../../styles/screens/BusinessInfoStyle";
import getModalStyle from "../../styles/components/ModalStyle";
import getEditProfileStyle from "../../styles/screens/EditProfileStyle";

import Ionicons from "react-native-vector-icons/Ionicons";
import { dbService } from "../../FireServer";
import Star from "../../Components/Star";
import { getImage } from "../../lib/ImageService";
import { CafeTable } from "../../Components/CafeTable";
import { signOut } from "../../lib/AuthService";
import { List } from "../../lib/DataStructure/List";

// Array that bring cafe's image
const imgArr = [];

// Array that bring cafe's review
const reviewArr = [];

function BusinessInformationScreen({ navigation, route }) {
  const { cafeData: cafeData, userData: userData } = route.params;
  const [direction, setDirection] = useState("사진");
  // const [modalVisible, setModalVisible] = useState(false);
  // const [openTime, setOpenTime] = useState();
  // const [closeTime, setCloseTime] = useState();
  // const openTimeInputRef = createRef();
  // const closeTimeInputRef = createRef();

  useEffect(()=>{
    dbService.collection("CafeData").doc(cafeData.getId()).onSnapshot((doc)=>{
      cafeData.loadData(doc.data());
    })
  },[])

  const [imageDatas, setImageDatas ] = useState([]);

  useEffect(()=>{
    loadCafeImages();
  },[,cafeData])
  
  const loadCafeImages = async() =>{
    const datas = new List();
    const arr = cafeData.getCafeImage();

    const promises = arr.map(async (id) => {
      const img = await getImage("Cafe",cafeData.getId(),`Img/${id.id}`)
      
      datas.push({image:img, id:id.id, date: id.date});
    });
    await Promise.all(promises);

    const sortdata = datas.sort((a,b)=>{
      return a.date.seconds<b.date.seconds;
    });
    sortdata.push({image:"end",id:"z"});
    setImageDatas(sortdata);
  }
  
  const CafeImages = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("사진 확대", {image: item.image})
        }
        style={{ flex:1, flexDirection:"row"}}
      >
        <View
          style={{
          }}
        >
          <Image style={getInfoStyle.image} source={{uri:item.image}} />
        </View>
      </TouchableOpacity>
    )
  }


  return (
    <>
      <View style={getInfoStyle.container}>
        {/* <TouchableOpacity
          style={getBusinessInfoStyle.timeManagerButton}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Modal
            isVisible={modalVisible}
            useNativeDriver={true}
            hideModalContentWhileAnimating={true}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <>
              <View style={getBusinessInfoStyle.modalView}>
                <View style={getModalStyle.modalWrapper}>
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: 20,
                      color: "black",
                    }}
                  >
                    운영시간변경
                  </Text>
                </View>
                <View style={getModalStyle.ScrollView}>
                  <View style={{ flexDirection: "row", alignSelf: "center" }}>
                    <TextInput
                      ref={openTimeInputRef}
                      style={getBusinessInfoStyle.textInput}
                      placeholder={"오픈시간"}
                      keyboardType="number-pad"
                      onChangeText={(text) => {
                        setOpenTime(text);
                      }}
                      secureTextEntry={false}
                      autoCapitalize="none"
                    />
                    <TextInput
                      ref={closeTimeInputRef}
                      style={getBusinessInfoStyle.textInput}
                      placeholder={"마감시간"}
                      keyboardType="number-pad"
                      onChangeText={(text) => {
                        setCloseTime(text);
                      }}
                      secureTextEntry={false}
                      autoCapitalize="none"
                    />
                  </View>
                </View>
                <View style={getEditProfileStyle.btnArea}>
                  <TouchableOpacity
                    style={getEditProfileStyle.modalButton}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={{ color: "black", fontSize: 15 }}>취소</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={getEditProfileStyle.modalButton}
                    onPress={SubmitTime}
                  >
                    <Text style={{ color: "black", fontSize: 15 }}>변경</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          </Modal>
          <Ionicons
            name="time"
            style={{ fontSize: 30, color: "#001D44" }}
          ></Ionicons>
        </TouchableOpacity> */}
        <View style={getFindStyle.container}>
          <View style={getFindStyle.contentContainer}>
            <CafeTable cafeData={cafeData} navigation={navigation} />
          </View>
        </View>

        <View style={{ flex: 6 }}>
          <PreviewLayout
            selectedValue={direction}
            values={["사진", "좌석", "리뷰"]}
            setSelectedValue={setDirection}
            navigation={navigation}
            style={getInfoStyle.contentLayout}
            cafeData={cafeData}
          >
            <FlatList
              keyExtractor={(item) => String(item.id)}
              data={imageDatas}
              style={getInfoStyle.picArea}
              renderItem={CafeImages}
              numColumns={3}
            />
          </PreviewLayout>
        </View>

        <View style={getInfoStyle.btnContainer}>
          <TouchableOpacity
            style={getBusinessInfoStyle.reserveButton}
            onPress={() =>
              navigation.navigate("카페 사진 관리", {
                cafeData: cafeData,
                userData: userData,
              })
            }
          >
            <Text style={{ color: "white", fontSize: 21 }}>사진 관리하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getBusinessInfoStyle.reserveButton}
            onPress={() =>{
              signOut();
              navigation.navigate("Auth");
            }}
          >
            <Text style={{ color: "red", fontSize: 21 }}>카페 삭제하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

function PreviewLayout(props) {
  const {
    children: children,
    values: values,
    selectedValue: selectedValue,
    setSelectedValue: setSelectedValue,
    cafeData: cafeData,
    userData: userData,
    navigation: navigation,
  } = props;

  return (
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

function ReviewPage(props) {
  const {
    navigation: navigation,
    cafeData: cafeData,
    userData: userData,
  } = props;
  const [reviewList, setReviewList] = useState();
  const [notice, setNotice] = useState("");
  const [reviewDatas, setreviewDatas] = useState([]);
  const [rating, setRating] = useState();

  useEffect(() => {
    dbService
      .collection("CafeData")
      .doc(cafeData.getId())
      .collection("Review")
      .onSnapshot((snapshot) => {
        const reviews = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        reviews.sort((a, b) => a.date < b.date);
        setreviewDatas(reviews);
      });
    dbService
      .collection("CafeData")
      .doc(cafeData.getId())
      .onSnapshot((doc) => {
        if (doc.exists && doc.data().notice != null) {
          setNotice(doc.data().notice);
        } else {
          setNotice("");
        }
      });
    setNotice(cafeData.getNotice());
    setRating(cafeData.getRating());
  }, []);
  useEffect(() => {
    loadReview();
  }, [reviewDatas]);

  async function loadReview() {
    const reviews = reviewDatas;
    let table = [];
    for (let i = 0; i < reviews.length; i++) {
      table.push(<ReviewPanel key={i} review={reviews[i]} />);
    }
    setReviewList(table);
  }

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
        <Text style={getReviewStyle.notice}>{notice}</Text>
      </View>
      <View style={getReviewStyle.ratingHeader}>
        <View style={getReviewStyle.ratingContainer}>
          <Ionicons name="star" style={getReviewStyle.ratings}></Ionicons>
          <Text style={getReviewStyle.ratingsText}>{rating}</Text>
        </View>
        <TouchableOpacity
          style={getReviewStyle.reviewBtn}
          onPress={() => {
            navigation.navigate("공지 작성", {
              cafeData: cafeData,
              userData: userData,
            });
          }}
        >
          <Text style={getReviewStyle.reviewBtnText}>카페 공지 작성</Text>
        </TouchableOpacity>
      </View>
      <View>{reviewList}</View>
    </ScrollView>
  );
}

function ReviewPanel(props) {
  const { review: review } = props;
  const [userID, setUserID] = useState(null);
  const [userName, setUserName] = useState("user");
  const [date, setDate] = useState("date");
  const [text, setText] = useState("");
  const [image, setImage] = useState();

  const leadingZeros = (n, digits) => {
    var zero = "";
    n = n.toString();
    if (n.length < digits) {
      for (var i = 0; i < digits - n.length; i++) zero += "0";
    }
    return zero + n;
  };

  const getImages = async (id) => {
    if (id != null) {
      const img = await getImage("User", id, "profile");
      setImage({ uri: img });
    } else {
      setImage(require("../../img/initialProfile.jpg"));
    }
  };

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
  }, []);

  return (
    <View style={getReviewStyle.reviewContentContainer}>
      <View style={getReviewStyle.reviewContentHeader}>
        <Image
          style={{ width: 50, height: 50, borderRadius: 50 }}
          source={image}
        />
        <View style={getReviewStyle.reviewHead}>
          <View>
            <Star value={review.rate} />
          </View>
          <View
            style={{
              flexDirection: "row",
              marginLeft: 0,
              justifyContent: "flex-end",
            }}
          >
            <Text style={{ fontSize: 15, color: "gray" }}>{userName}</Text>
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
      </View>
      <Text style={getReviewStyle.reviewContent}>{text}</Text>
    </View>
  );
}

export default BusinessInformationScreen;
