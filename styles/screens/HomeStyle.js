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
    marginBottom: "2%",
  },

  btnInfoReservation: {
    width: Dimensions.get("window").width,
    height: "50%",
    //borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "white",
    marginTop: "10%",
    marginBottom: "5%",
    paddingLeft: "2%",
  },

  btnNearbyCafe: {
    width: Dimensions.get("window").width,
    height: "15%",
    borderTopWidth: 2,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  btnConfirmReservation: {
    width: Dimensions.get("window").width,
    height: "15%",
    //borderTopWidth: 2,
    //borderBottomWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    backgroundColor: "#001D44",
    width: "94%",
  },

  btnMyPage: {
    width: Dimensions.get("window").width,
    height: "15%",
    borderTopWidth: 1,
    borderBottomWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default styles;
