import React, {useState,useEffect} from "react";
import { View, Text, Image } from "react-native";
import getCafeTableStyle from "../styles/components/CafeTableStyle";
import Ionicons from "react-native-vector-icons/Ionicons";


export function CafeTable(props) {
    const { cafeData: cafeData, userData: userData } = props;
    const [cafeName, setCafeName] = useState(cafeData.getName());
    const [cafeLocation, setCafeLocation] = useState(cafeData.getAdress(1, 3));
    const [cafeInformation, setCafeInformaion] = useState("Open : " + cafeData.getOpenTime() + ":00 ~ Close : " + cafeData.getCloseTime() + ":00");
    const [cafeLogoImage, setCafeLogoImage] = useState(cafeData.getLogo());
    const [rating, setRating] = useState(4.7);
  
    return (
        <View style={getCafeTableStyle.container_NoneStyle}>
          <View style={getCafeTableStyle.imageContainer}>
            <View style={getCafeTableStyle.image}>
              <Image
                source={{ uri: cafeLogoImage }}
                style={{ width: "100%", height: "100%", borderRadius: 20 }}
              />
            </View>
          </View>
          <View style={getCafeTableStyle.contentContainer}>
            <View style={getCafeTableStyle.textContent}>
              <Text style={getCafeTableStyle.nameText}>{cafeName}</Text>
              <Text style={getCafeTableStyle.contentText}>{cafeLocation}</Text>
              <Text style={getCafeTableStyle.contentText}>{cafeInformation}</Text>
              <View styles={getCafeTableStyle.iconContainer}>
                <Text style={getCafeTableStyle.icon}>
                  <Ionicons name="star" style={{ color: "gold" }}></Ionicons>{" "}
                  {rating}
                </Text>
              </View>
            </View>
          </View>
        </View>
    );
  }