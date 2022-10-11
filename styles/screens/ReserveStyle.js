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
  seatContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  seatPic: {
    width: "100%",
    height: "75%",
  },
  reserveBtn: {
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    height: "15%",
    width: "18%",
    borderRadius: 5,
  },
  pickerBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  picker: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
});

export default styles;
