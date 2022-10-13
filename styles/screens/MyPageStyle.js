import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "column",
  },

  contentContainer: {
    flex: 1,
    flexDirection: "column",
  },

  upContentContainer: {
    flex: 0.4,
    flexDirection: "row",
    marginBottom: "30%",
  },

  myPageText: {
    marginTop: "10%",
  },

  profilePicture: {
    marginTop: "10%",
    marginLeft: "-30%",
    width: "30%",
    height: "64%",
    borderRadius: 75,
    backgroundColor: "white",
  },

  idText: {
    marginVertical: "20%",
    marginLeft: "10%",
  },

  btn: {
    width: Dimensions.get("window").width,
    height: "15%",
    margin: "1%",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    fontSize: 20,
  },
});

export default styles;
