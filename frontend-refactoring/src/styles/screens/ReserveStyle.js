import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 2.5,
    backgroundColor: "white",
  },
  topContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    flex: 1,
    alignItems: "center",
    marginBottom: "5%",
  },
  cafeLogo: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  cafeTitle: {
    fontSize: 25,
  },
  seatPic: {
    width: "90%",
    height: "100%",
  },
  reserveButton: {
    backgroundColor: "#001D44",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "25%",
    borderRadius: 10,
  },
  pickerBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  pickerLine: {
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: "#ddd",
    width: "63%",
    height: 55,
    marginRight: 10,
    justifyContent: "center",
  },
  picker: {
    justifyContent: "center",
    width: "100%",
    height: 55,
  },
  pickerTopText: {
    fontSize: 25,
    color: "#000",
  },
  pickerTopTextArea: {
    flex: 1,
    width: "91%",
    borderBottomColor: "#001D44",
    borderBottomWidth: 3,
    borderBottomEndRadius: 10,
    padding: 10,
    paddingLeft: 20,
  },
});

export default styles;
