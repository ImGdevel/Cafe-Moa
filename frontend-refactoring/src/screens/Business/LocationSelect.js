import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import MapView, {Marker} from 'react-native-maps';
import { getAddressFromLocation } from "../../lib/LocationService";

function LocationSelectionScreen({ navigation, route }){
  const {location:loc, address: add, addressText: adt} = route.params;
  const [location, setLocation] = useState({latitude:37.0, longitude:128.0});
  const [address, setAddress] = useState();
  const [adressText, setAddressText] = useState();
  useState(()=>{
    setLocation(loc);
    setAddress(add);
    setAddressText(adt);
  },[])

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
    setLocation(locate);
    setAddress(adds);
    setAddressText(adds.text);
  }
  


  return ( 
  <View style ={styles.container}>
      <View style={styles.headerContainer}>
        <Text>{`주소 ${adressText}`}</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.mapContainer}>
          <MapView
            mapType="standard"
            style={{flex:1}}
            initialRegion={{
              latitude: loc.latitude,
              longitude: loc.longitude,
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
          style={styles.submitButton}
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
    backgroundColor:"#fff",
    alignItems:"center",
    justifyContent:"flex-end",
    paddingBottom: 10,
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
  submitButton:{
    width:"80%",
    height:60,
    backgroundColor:"#001D44",
    borderRadius:10,
    alignItems:"center",
    justifyContent:"center",
  }
});

export default LocationSelectionScreen;
