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
    borderBottomColor: "#ccc",
  },

  myPageText: {
    marginTop: "10%",
  },

  profilePicture: {
    marginTop: "7%",
    marginLeft: "7%",
    width: "30%",
    height: "67%",
  },

  idText: {
    marginVertical: "10%",
    marginLeft: "10%",
    width: "50%",
  },

  btn: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingLeft: "5%",
    justifyContent: "center",
    height: "15%",
    width: "100%",
  },
  infoButton: {
    backgroundColor: "#001D44",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "001D44",
    borderRadius: 8,
    height: "34%",
    width: "95%",
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default styles;
