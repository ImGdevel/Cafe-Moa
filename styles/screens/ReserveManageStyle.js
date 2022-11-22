import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  manualContianer: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  descriptionContainer: {
    width: "60%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    width: "20%",
    height: "100%",
  },
  picker: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "50%",
    paddingLeft: 10,
  },
  addButtonContainer: {
    width: "20%",
    height: "100%",
    padding: 5,
  },
  addButton: {
    width: "100%",
    height: "100%",
    backgroundColor: "#001D44",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  timeArea: {
    width: 70,
    height: 30,
    justifyContent: "center",
    backgroundColor: "#001D44",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  timeText: {
    fontSize: "18",
    fontWeight: "400",
    color: "white",
  },
  numContainer: {
    width: "100%",
    height: 80,
    backgroundColor: "white",
    flexDirection: "row",
    paddingLeft: 5,
    marginBottom: 10,
  },
  setNumBox: {
    width: 70,
    height: 70,
    margin: 5,
    borderWidth: 1,
    borderColor: "#001D44",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
