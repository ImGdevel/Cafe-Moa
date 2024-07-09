import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  reserveButton: {
    backgroundColor: "#001D44",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginHorizontal: 5,
    marginBottom: 5,
    width: "84%",
    height: 55,
  },
  timeManagerButton: {
    width: 30,
    height: 30,
    margin: 5,
    position: "absolute",
    zIndex: 1,
    alignSelf: "flex-end",
  },
  modalView: {
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    height: "30%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
  },
  textInput: {
    width: "45%",
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    marginTop: 15,
    marginHorizontal: 5,
    textAlign: "center",
  },
});

export default styles;
