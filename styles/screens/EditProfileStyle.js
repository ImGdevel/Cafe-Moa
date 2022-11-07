import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    alignItems: "center",
  },
  ProfilePicBtn: {
    width: 180,
    height: 180,
    marginVertical: "10%",
    borderWidth: 1,
    borderRadius: "100%",
    borderColor: "#ddd",
    alignSelf: "center",
    justifyContent: "center",
  },
  InputField: {
    flex: 1,
    backgroundColor: "#ccc",
    width: "100%",
    paddingTop: 5,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  ChangeBtn: {
    width: "100%",
    height: 80,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  FieldText: {
    fontSize: 18,
    paddingVertical: 6,
    paddingLeft: 10,
  },
  confirmEditBtn: {
    width: "80%",
    height: 50,
    borderRadius: 15,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#001D44",
    marginBottom: 15,
  },
  textInput: {
    width: "90%",
    height: 40,
    left: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#ccc",
    paddingHorizontal: 10,
  },
  confirmContainer: {
    width: "100%",
    height: "45%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});

export default styles;
