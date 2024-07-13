import React, {useState,useEffect} from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import getCafeTableStyle from "../styles/components/CafeTableStyle";
import Ionicons from "react-native-vector-icons/Ionicons";

const CafeTable = ({ cafeData }) => {
  const cafeName = cafeData.name;
  const cafeLocation = cafeData.address;
  const cafeInformation = `Open : ${cafeData.openingTime}:00 ~ Close : ${cafeData.closingTime}:00`;
  const cafeLogoImage = cafeData.logo;

  return (
    <View style={getCafeTableStyle.container}>
      {/* <View style={getCafeTableStyle.imageContainer}>
        <View style={getCafeTableStyle.image}>
          <Image
            source={{ uri: cafeLogoImage }}
            style={getReserveStyle.cafeLogo}
          />
        </View>
      </View>
      <View style={getCafeTableStyle.contentContainer}>
        <View style={getCafeTableStyle.textContent}>
          <Text style={getCafeTableStyle.nameText}>{cafeName}</Text>
          <Text style={getCafeTableStyle.contentText}>{cafeLocation}</Text>
          <Text style={getCafeTableStyle.contentText}>{cafeInformation}</Text>
        </View>
      </View> */}
    </View>
  );
};

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