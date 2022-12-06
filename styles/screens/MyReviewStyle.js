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
    width: "100%",
    height: 100,
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
    width: 50,
    height: 25,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cafeLogoContainer: {
    width: 90,
    height: 90,
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
    height: "50%",
    justifyContent: "center",
    paddingLeft: 10,
  },
});

export default styles;
