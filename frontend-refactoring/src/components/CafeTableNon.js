import React, {useState,useEffect} from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import getCafeTableStyle from "../styles/components/CafeTableStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import getInfoStyle from "@styles/screens/InfoStyle";

function CafeTable({ cafeData, userData, navigation }) {
    const [cafeName, setCafeName] = useState(cafeData.name);
    const [cafeLocation, setCafeLocation] = useState(cafeData.address);
    const [cafeInformation, setCafeInformation] = useState(
      `Open : ${cafeData.openingTime} ~ Close : ${cafeData.closingTime}`
    );
    const [cafeLogoImage, setCafeLogoImage] = useState(cafeData.logoImage);
  
    useEffect(() => {
      setCafeName(cafeData.name);
      setCafeLocation(cafeData.address);
      setCafeInformation(`Open : ${cafeData.openingTime} ~ Close : ${cafeData.closingTime}`);
      setCafeLogoImage(cafeData.logoImage);
    }, [cafeData]);
  
    const Bookmark = () => {
      const cafeId = cafeData.id;
      const [icon, setIcon] = useState('heart-outline');
      const [iconStyle, setIconStyle] = useState({ fontSize: 30, color: 'black' });
      const [checked, setChecked] = useState(false);
  
      useEffect(() => {
        // if (userData.isBookmarked(cafeId)) {
        //   setIcon('heart');
        //   setIconStyle({ fontSize: 30, color: '#e00' });
        //   setChecked(true);
        // }
      }, []);
  
      const bookMarked = async () => {
        if (checked) {
          await userData.deleteBookmark(cafeId);
          setIcon('heart-outline');
          setIconStyle({ fontSize: 30, color: 'black' });
          setChecked(false);
        } else {
          await userData.addBookmark(cafeId);
          setIcon('heart');
          setIconStyle({ fontSize: 30, color: '#e00' });
          setChecked(true);
        }
      };
  
      return <Ionicons name={icon} style={iconStyle} onPress={bookMarked} />;
    };
  
    return (
      <View style={getCafeTableStyle.container}>
        <View style={getCafeTableStyle.imageContainer}>
          <Image source={{ uri: cafeLogoImage }} style={getInfoStyle.cafeLogo} />
        </View>
        <View style={getCafeTableStyle.contentContainer}>
          <View style={getCafeTableStyle.textContent}>
            <View style={getCafeTableStyle.divideContent}>
              <Text style={getCafeTableStyle.nameText}>{cafeName}</Text>
              <Bookmark />
            </View>
            <Text style={getCafeTableStyle.contentText}>{cafeLocation}</Text>
            <Text style={getCafeTableStyle.contentText}>{cafeInformation}</Text>
          </View>
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    topView: {
      flex: 1,
      backgroundColor: '#fdfdfd',
      borderBottomColor: '#dddddd',
      borderBottomWidth: 3,
    },
    topTitle: {
      flex: 4,
      backgroundColor: '#fdfdfd',
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleText: {
      color: '#001D44',
      fontWeight: '900',
      fontSize: 60,
    },
    mainView: {
      flex: 3,
      backgroundColor: '#ffffff',
    },
    reserveArea: {
      marginTop: 25,
      height: 260,
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: 30,
    },
    reserveAreaTop: {
      height: 50,
    },
    reserveAreaContent: {
      flex: 1,
      backgroundColor: '#fff',
      borderColor: '#ddd',
      borderWidth: 1,
    },
    reserveCafeContainer: {
      flex: 1,
      backgroundColor: '#fff',
    },
    reserveBtnContainer: {
      height: 48,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: '#fff',
    },
    reserveBtn: {
      width: '45%',
      height: '95%',
      marginBottom: '3%',
      backgroundColor: '#001D44',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    reserveBtnText: {
      color: '#fff',
      fontSize: 18,
    },
    bookmarkArea: {
      marginTop: 10,
      height: 270,
      width: '100%',
      backgroundColor: '#fff',
    },
    bookmarkTitleContainer: {
      height: 50,
      flexDirection: 'row',
    },
    areaTitle: {
      fontSize: 23,
      fontWeight: '600',
      paddingLeft: 15,
      paddingBottom: 10,
    },
    bookmarkContainer: {
      height: 210,
      width: 160,
      marginHorizontal: 4,
      borderColor: '#aaa',
      borderWidth: 1,
      borderRadius: 5,
    },
    bookmarkImageArea: {
      flex: 7,
      margin: '5%',
      borderRadius: 10,
    },
    bookmarkImage: {
      width: '100%',
      height: '100%',
    },
    bookmarkTextArea: {
      flex: 3,
      paddingHorizontal: '5%',
    },
    bookmarkTextAreaTop: {
      flex: 1,
      flexDirection: 'row',
    },
    cafeName: {
      flex: 2,
      paddingLeft: '4%',
      fontSize: 17,
      fontWeight: '700',
    },
    rating: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    starIcon: {
      color: 'gold',
    },
    cafeLocationContainer: {
      flex: 1,
      backgroundColor: '#fff',
    },
    cafeLocation: {
      paddingLeft: '3%',
      color: '#aaa',
      fontSize: 12,
    },
    noBookmarkText: {
      alignSelf: 'center',
      fontSize: 20,
      paddingLeft: 20,
    },
  });
  
  
  export default CafeTable;