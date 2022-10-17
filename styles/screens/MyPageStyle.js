import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 3,
    width: "100%",
    height: "100%",
    backgroundColor: "#ccc",
    flexDirection: "column",
    alignSelf: "center",
  },

  contentContainer: {
    flex: 1,
    backgroundColor: "#ccc",
    width: "100%",
    justifyContent: "flex-start",
  },

  upContentContainer: {
    flex: 0.4,
    flexDirection: "row",
    backgroundColor: "white",
    marginBottom: "5%",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },

  myPageText: {
    marginTop: "10%",
  },

  profilePicture: {
    marginTop: "7%",
    marginLeft: "7%",
    width: "30%",
    height: "63%",
  },

  idText: {
    marginVertical: "10%",
    marginLeft: "10%",
    width: "50%",
  },

  btn: {
    borderBottomWidth: 1,
    backgroundColor: "white",
    borderColor: "gray",
    paddingLeft: "5%",
    justifyContent: "center",
    height: "15%",
    width: "100%",
  },
  infoBtn: {
    backgroundColor: "#001D44",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    height: "30%",
    width: "100%",
    borderRadius: 5,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "#ccc",
  },
});

export default styles;
