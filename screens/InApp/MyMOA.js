import React, { useState, useEffect } from "react";
import {
    Image,
    TouchableOpacity,
    TouchableHighlight,
    View,
    Text,
    ScrollView,
    Switch,
    ImageStore,
} from "react-native";

import getMyMOAStyle from "../../styles/screens/MyMOAStyle";
import { UserDataService } from "../../lib/UserDataService";
import Ionicons from "react-native-vector-icons/Ionicons";
import getBookmarkTableStyles from "../../styles/components/BookmarkTableStyle";
import { CafeService, getCafeDatabaseAd } from "../../lib/CafeService";
import { getGeoLocation } from "../../lib/LocationService";

function MyMOAScreen({ navigation, route }) {
    const [userData, setUserData] = useState();
    const [BookmarkTableList, setBookmarkTableList] = useState([]);
    const [cafeservice,setCafeService] = useState(new CafeService());
    const [cafeDatas, setcafeDatas] = useState([]);
    const [location, setLocation] = useState();

    useEffect(() => {
        FindStart();
        BookmarkListLoad();
    }, [setBookmarkTableList]);
    
    useEffect(() => {
        BookmarkListLoad();
    }, [cafeDatas]);
    //bookmarkDatas 로 변경 예정
    
    async function FindStart() {
        let user = new UserDataService();
        await user.getUserProfile();
        setUserData(user);
        let cafeservice = new CafeService();
        await cafeservice.getCafeDatabaseAd();
        setCafeService(cafeservice);
        setcafeDatas(cafeservice.getCafeDataListArray());
    };
    
    const BookmarkListLoad = () => {
        console.log("북마크 리스트 출력");
        let bookmarkList = [];
        //bookmarkDatas로 변경 예정
        for (let i = 0; i < cafeDatas.length; i++) {
            bookmarkList.push(
                <BookmarkTable
                    key={i}
                    cafeData={cafeDatas[i]}
                    userData={userData}
                    navigation={navigation}
                />
            );
        }
        setBookmarkTableList(bookmarkList);
    };
    
    return (
        <View style={getMyMOAStyle.container}>
            <View style={getMyMOAStyle.contentContainer}>
            <ScrollView>{BookmarkTableList}</ScrollView>
            </View>
        </View>
    );
}


function BookmarkTable(props) {
    const { cafeData: cafe_data, userData: user_data } = props;
    const [userData, setUserData] = useState(user_data);
    const [cafeData, setCafeData] = useState(cafe_data);
    const [cafeName, setCafeName] = useState(cafe_data.getName());
    const [cafeLocation, setCafeLocation] = useState(cafe_data.getAdress(1, 3));
    const [cafeInformation, setCafeInformaion] = useState(
        "Open : " +
        cafe_data.getOpenTime() +
        ":00 ~ Close : " +
        cafe_data.getCloseTime() +
        ":00"
    );
    const [cafeLogoImage, setCafeLogoImage] = useState(cafe_data.getLogo());
    const [cafeSeatImage, setCafeSeatImage] = useState(cafe_data.getSeatImage());
    const [rating, setRating] = useState(4.7);
    const [visitors, setVisitors] = useState(cafe_data.getVisitors());

    return (
        <TouchableHighlight
            style={getBookmarkTableStyles.container}
            onPress={() =>
                props.navigation.navigate("카페 정보", {
                    cafeData: cafeData,
                    userData: userData,
                })
            }
            activeOpacity={0.5}
            underlayColor="#DDDDDD"
        >
            <>
            <View style={getBookmarkTableStyles.imageContainer}>
                <View style={getBookmarkTableStyles.image}>
                    <Image
                        source={{ uri: cafeLogoImage }}
                        style={{ width: "100%", height: "100%" }}
                    />
                </View>
                <View style={getBookmarkTableStyles.image}>
                    <Image
                        source={{ uri: cafeSeatImage }}
                        style={{ width: "100%", height: "100%" }}
                    />
                </View>
                <View style={getBookmarkTableStyles.image}>
                    <Image
                        source={{ uri: cafeSeatImage }}
                        style={{ width: "100%", height: "100%" }}
                    />
                </View>
            </View>
            <View style={getBookmarkTableStyles.contentContainer}>
                <View style={getBookmarkTableStyles.textContent}>
                    <Text style={getBookmarkTableStyles.nameText}>{cafeName}</Text>
                    <View styles={getBookmarkTableStyles.iconContainer}>
                        <Text style={getBookmarkTableStyles.icon}>
                        <Ionicons name="star" style={{ color: "gold" }}></Ionicons>{" "}
                        {rating}
                        <Text style={getBookmarkTableStyles.contentText}>{" (총 " + visitors + " 명이 방문)"}</Text>
                        </Text>
                    </View>
                    <Text style={getBookmarkTableStyles.contentText}>{cafeLocation}</Text>
                    <Text style={getBookmarkTableStyles.contentText}>{cafeInformation}</Text>
                </View>
            </View>
            </>
        </TouchableHighlight>
    );
}

export default MyMOAScreen;