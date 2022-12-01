import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalView: {
    flexDirection: "column",
    alignItems: "center",
    width: "80%",
    height: "80%",
    backgroundColor: "#001D44",
    borderRadius: 10,
  },
  modalButton: {
    flex: 1,
    width: "100%",
    height: 60,
    justifyContent: "center",
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
  },
  modalWrapper: {
    flex: 0.5,
    width: "100%",
    justifyContent: "center",
  },
  modalGradeText: {
    marginVertical: 10,
    alignSelf: "center",
    fontSize: 20,
    color: "white",
  },
  ScrollView: {
    flex: 1,
    width: "100%",
    marginBottom: 20,
  },
});

export default styles;
