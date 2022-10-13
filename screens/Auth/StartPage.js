import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image } from 'react-native';

import getStartPageStyle from "../../styles/screens/StartPageStyle";

function StartPageScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => GoToLoginScreen(), 1000);
  }, []);

  function GoToLoginScreen() {
    navigation.replace("Auth");
  }

  return (
    <View style={getStartPageStyle.container}>
      <View style={getStartPageStyle.iconArea}>
        <Image
          style={{ width: "40%", resizeMode: "contain" }}
          source={require("../../img/IconMoa.png")}
        />
      </View>
    </View>
  );
}

export default StartPageScreen;
