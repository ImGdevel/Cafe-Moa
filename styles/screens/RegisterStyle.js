import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  contentArea: {
    width: "90%",
    height: 560,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  titleText: {
    marginTop: 0,
  },
  subTitleText: {
    paddingRight: 200,
  },

  formArea: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  btnArea: {
    width: "75%",
    height: 100,
  },
  btnNormal: {
    margin: 5,
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
  },
  btnPress: {
    margin: 5,
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A0A0FF",
  },
  btnText: {
    color: "white",
    fontSize: 20,
  },
  textInput: {
    marginVertical: 5,
    width: "100%",
    height: 60,
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    fontSize: 20,
  },
  errorText: {
    color: "red",
    fontSize: 15,
    fontWeight: "400",
  },
});

export default styles;
