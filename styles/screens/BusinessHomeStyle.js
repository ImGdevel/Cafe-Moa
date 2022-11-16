import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  contentContainer: {
    width: "100%",
    height: "84%",
    alignItems: "center",
    padding: 5,
  },
  btnContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    width: "47%",
    height: 70,
    backgroundColor: "#ccc",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    margin: 5
  },
  manageReservationWindow: {
    width: "97%",
    height: "80%",
    margin: 5,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15
  },
  manageHeader: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5
  }

});

export default styles;
