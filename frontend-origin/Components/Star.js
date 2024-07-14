import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Stars from "react-native-stars";
import Ionicons from "react-native-vector-icons/Ionicons";

const Star = ({value}) => {
    return (
        <View style={{alignSelf:"baseline"}}>
            <Stars
                display={value}
                spacing={3}
                count={5}
                starSize={10}
                fullStar={
                    <Ionicons name="star" style={[styles.myStarStyle]}></Ionicons>
                }
                halfStar={
                    <Ionicons
                    name="star-half"
                    style={[styles.myStarStyle]}
                    ></Ionicons>
                }emptyStar={
                    <Ionicons
                    name="star-outline"
                    style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                    ></Ionicons>
                }
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "white",
    },
  
    viewContainer: {
      width: "100%",
      flex: 3,
      height: 55,
      flexDirection: "column",
      backgroundColor: "white",
    },
  
    imageContainer: {
      fontSize: 18,
      flexShrink: 1,
      height: 220,
      margin: 10,
      marginHorizontal: "7%",
      borderRadius:5,
      borderWidth: 1,
      borderColor: "#aaa",
      borderRadius: 0,
    },
    ratingContainer: {
      width: "100%",
      height: 60,
      alignItems: "center",
      justifyContent: "center",
    },
    myStarStyle: {
      fontSize: 17,
      color: "gold",
    },
    myEmptyStarStyle: {
      color: "#ccc",
    },
    textInput: {
      fontSize: 18,
      flexShrink: 1,
      height: 150,
      margin: 10,
      marginHorizontal: "5%",
      textAlignVertical: "top",
      borderWidth: 1,
      borderColor: "#bbb",
      borderRadius: 15,
      padding: 15,
    },
  
    button: {
      marginHorizontal:"5%",
      borderRadius: 5,
      alignItems: "center",
      justifyContent:"center",
      alignSelf:"center",
      marginBottom: 10,
      height: 53,
      width: "80%",
      backgroundColor: "#001D44",
    },
  });
  

export default Star;
