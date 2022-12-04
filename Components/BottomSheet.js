import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
  TouchableOpacity,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

const BottomSheet = (props) => {
  const {
    modalVisible: modalVisible,
    setModalVisible: setModalVisible,
    reserveSeat: selectedSeat,
  } = props;
  const screenHeight = Dimensions.get("screen").height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (props.modalVisible) {
      resetBottomSheet.start();
    }
  }, [props.modalVisible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
  };

  return (
    <Modal
      visible={modalVisible}
      animationType={"fade"}
      transparent
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            ...styles.bottomSheetContainer,
            transform: [{ translateY: translateY }],
          }}
          {...panResponders.panHandlers}
        >
          <Text style={styles.header}>{selectedSeat}번 좌석</Text>
          <TouchableOpacity
            style={styles.Button}
            onPress={() => {
              closeModal();
            }}
          >
            <Text style={{ color: "black", fontSize: 20 }}>
              배정 확정{" "}
              <Ionicons
                name="checkmark-sharp"
                style={{ fontSize: 30, color: "lightgreen" }}
              ></Ionicons>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Button}
            onPress={() => {
              closeModal();
            }}
          >
            <Text style={{ color: "black", fontSize: 20 }}>
              예약 취소{" "}
              <Ionicons
                name="close-sharp"
                style={{ fontSize: 30, color: "red" }}
              ></Ionicons>
            </Text>
          </TouchableOpacity>
          <View style={{ height: "7%" }}></View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  background: {
    flex: 1,
  },
  bottomSheetContainer: {
    height: 200,
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  header: {
    width: "100%",
    height: "33%",
    justifyContent: "center",
    fontSize: 25,
    fontWeight: "600",
    paddingTop: 20,
    paddingLeft: 20,
  },
  Button: {
    width: "100%",
    height: "30%",
    backgroundColor: "white",
    justifyContent: "center",
    paddingLeft: 20,
    borderRadius: 10,
  },
});

export default BottomSheet;
