import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalView: {
    flexDirection: "column",
    alignItems: "center",
    width: "80%",
    height: "80%",
    backgroundColor: "black",
    borderRadius: 10,
  },
  modalButton: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
  },
  modalWrapper: {
    flex: 0.5,
    width: "100%",
    justifyContent: "center",
  },
  modalGradeText: {
    alignSelf: "center",
    fontSize: 20,
    color: "white",
  },
});

export default styles;
