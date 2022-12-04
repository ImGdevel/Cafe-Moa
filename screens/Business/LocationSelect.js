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

function LocationSelectionScreen({ navigation, route }){
  const {location:loc} = route.params;
  console.log(loc);
  const [location, setLocation] = useState(loc);

  

  const onSubmit = () =>{
    navigation.navigate("CafeCreatForm",{

    });
  }

  const selectedLocation = (loc) =>{
    setLocation({latitude:loc.latitude, longitude:loc.longitude});
    
  }


  return ( 
  <View style ={styles.container}>
      <View style={styles.headerContainer}>
        <Text></Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.mapContainer}>
          <MapView
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
            
            
            minZoomLevel = {15}
          >
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
