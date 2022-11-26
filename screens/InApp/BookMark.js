import React, { useState, useEffect } from "react";
import {
    Image,
    TouchableHighlight,
    View,
    Text,
    ScrollView,
} from "react-native";

import getMyMOAStyle from "../../styles/screens/BookMarkStyle";
import getBookmarkTableStyles from "../../styles/components/BookmarkTableStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getCafeDatas } from "../../lib/CafeService";

function BookMarkScreen({ navigation, route }) {
    const {userData: userData} = route.params;
    const [BookmarkTableList, setBookmarkTableList] = useState();

    useEffect(() => {
        BookmarkListLoad();
    }, []);

    async function BookmarkListLoad(){
        let bookmarkList = [];
        let Mark = await getCafeDatas(userData.bookmark);
        Mark.sort((a,b)=>{ return (a.rating < b.rating) });
        for (let i = 0; i < Mark.length; i++) {
          bookmarkList.push(
            <BookmarkTable
              key={i}
              cafeData={Mark[i]}
              userData={userData}
              navigation={navigation}
            />
          )
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
    const { cafeData: cafeData, userData: userData } = props;
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
    const [cafeSeatImage, setCafeSeatImage] = useState(cafeData.getSeatImage());
    const [rating, setRating] = useState(4.7);
    const [visitors, setVisitors] = useState(cafeData.getVisitors());

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
                        <Text style={getBookmarkTableStyles.contentText}>{" (총 " + visitors + " 명 방문)"}</Text>
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

export default BookMarkScreen;