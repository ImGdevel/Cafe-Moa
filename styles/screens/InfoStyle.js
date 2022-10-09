import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "white",
  },
  cafeLogo: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  cafeTitle: {
    fontSize: 25,
  },
  seatPic: {
    width: "100%",
    height: "100%",
  },
  infoBtn: {
    flex: 1,
    width: "50%",
  },
});

export default styles;
