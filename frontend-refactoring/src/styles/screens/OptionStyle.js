import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#ddd",
  },
  subtitleHeader: {
    flex: 1,
    width: "100%",
    height: 30,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  optionBtn: {
    backgroundColor: "white",
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    height: 60,
    width: "100%",
  },
});

export default styles;
