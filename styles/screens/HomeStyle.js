import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  homeText: {
    marginTop: "20%",
    marginBottom: "20%",
  },

  btnNearbyCafe: {
    width: Dimensions.get("window").width,
    height: "20%",
    borderTopWidth: 2,
    borderBottomWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  btnConfirmReservation: {
    width: Dimensions.get("window").width,
    height: "20%",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  btnMyPage: {
    width: Dimensions.get("window").width,
    height: "20%",
    borderTopWidth: 1,
    borderBottomWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default styles;
