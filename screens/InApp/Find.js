import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

function CafeTable(props){

  return(
    <View>

    </View>
  );
}

function FindScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}></View>
      <View style={styles.contentContainer}>
      <Button
        title="카페정보"
        onPress={() => navigation.navigate('Imfomation')}
      />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  topContainer: {
    flex: 1,
    backgroundColor: 'red',
  },
  contentContainer: {
    flex: 4,
    backgroundColor: 'green',
  },
}); 

export default FindScreen;