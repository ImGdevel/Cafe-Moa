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
    height: "75%",
  },
  reserveBtn: {
    backgroundColor: "#001D44",
    alignItems: "center",
    justifyContent: "center",
    height: 30,
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
