import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  reviewedCafeInfoContainer: {
    marginTop:20,
    backgroundColor: "#fff",
    width: "100%",
    height: 80,
    flexDirection: "row",
  },
  reviewHead: {
    paddingLeft: 15,
    width: 310,
    height: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  deleteButton: {
    width: 70,
    height: 30,
    borderWidth: 1,
    borderColor: "#aaa",
    backgroundColor:"#fdfdfd",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cafeLogoContainer: {
    width: 70,
    height: 70,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
  },
  cafeDataContainer: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
  },
  cafeData: {

    height: "38%",
    justifyContent: "center",
    paddingLeft: 10,
  },
});

export default styles;
