import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 3,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    flexDirection: "column",
    alignSelf: "center",
  },

  contentContainer: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
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
    marginTop: "7%",
    marginLeft: "7%",
    width: "30%",
    height: "74%",
  },

  idText: {
    marginVertical: "10%",
    marginLeft: "10%",
    width: "50%",
  },

  btn: {
    backgroundColor: "#7AF67A",
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    height: "20%",
    width: "100%",
    borderRadius: 5,
  },
  infoBtn: {
    backgroundColor: "#7AF67A",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    height: "40%",
    width: "100%",
    borderRadius: 5,
  },
});

export default styles;
