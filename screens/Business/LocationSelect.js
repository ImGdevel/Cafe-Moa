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
  StyleSheet,
} from "react-native";
import MapView, {Marker} from 'react-native-maps';
import { getAddressFromLocation } from "../../lib/LocationService";

function LocationSelectionScreen({ navigation, route }){
  const {location:loc, address: add} = route.params;
  const [location, setLocation] = useState(loc);
  const [address, setAddress] = useState(add);
  const [adressText, setAddressText] = useState();

  const onSubmit = () =>{
    navigation.navigate("CafeCreatForm",{
      location:location,
      address: address,
      addressText: adressText,
    });
  }

  const selectedLocation = async(loc) =>{
    const locate = {latitude:loc.latitude, longitude:loc.longitude}
    const adds = await getAddressFromLocation(locate);
    console.log(locate)
    console.log(adds);
    setLocation(locate);
    setAddress(adds);
    console.log(adds.text)
    setAddressText(adds.text);
  }


  return ( 
  <View style ={styles.container}>
      <View style={styles.headerContainer}>
        <Text>{adressText}</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.mapContainer}>
          <MapView
            mapType="standard"
            style={{flex:1}}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            onRegionChangeComplete={(e)=>{
              selectedLocation(e)
            }}
            onRegionChange={(loc)=>{
              const locate = {latitude:loc.latitude, longitude:loc.longitude}
              setLocation(locate);
            }}
            minZoomLevel = {15}
          >
              <Marker
                  coordinate={{latitude: location.latitude,longitude: location.longitude}}
                  title={"현위치"}
                />
          </MapView>
        </View>
      </View>
      <View style={styles.footContainer}>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={onSubmit}
        >
          <Text style={{color:"#fff", fontSize: 20}}>
            이 위치로 주소 설정
          </Text>
        </TouchableOpacity>
      </View>
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom:20,
  },
  headerContainer: {
    flex:2,
    backgroundColor:"#ddd",
  },
  contentContainer: {
    flex:6,
    backgroundColor:"#aaa",
    borderColor:"#ccc",
    borderWidth: 1,
  },
  mapContainer:{
    flex:1,
  },
  footContainer:{
    flex:1,
    backgroundColor:"#fff",
    alignItems:"center",
    justifyContent:"center",
  },
  submitBtn:{
    width:"80%",
    height:60,
    backgroundColor:"#001D44",
    borderRadius:10,
    alignItems:"center",
    justifyContent:"center",
  }
});

export default LocationSelectionScreen;
