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

  infoContainer: {
    borderColor: "#001D44",
    borderWidth: 2,
    borderRadius: 15,
    marginTop: "-25%",
    marginLeft: "5%",
    backgroundColor: "#001D44",
  },

  btnInfoReservation: {
    width: Dimensions.get("window").width * 0.95,
    height: "50%",
    borderWidth: 2,
    borderColor: "#001D44",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "white",
    marginVertical: "10%",
    marginHorizontal: "5%",
    paddingTop: "6%",
    paddingLeft: "2%",
  },

  infoContentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    borderColor: "#001D44",
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
    borderWidth: 1,
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
    backgroundColor: "white",
    width: "94%",
    marginLeft: "43%",
  },
});

export default styles;
