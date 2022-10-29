import { StyleSheet } from "react-native";

const FindStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  topContainer: {
    flex: 1,
    backgroundColor: "#ccc",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchbarContainer: {
    width: "100%",
    height: "50%",
    marginTop: "8%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  textinputBox: {
    height: 40,
    width: "70%",
    textAlign: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
    marginRight: 8,
    placeholderTextColor: "#ccc",
  },
  btnSearch: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  filterContainer: {
    width: "100%",
    height: "50%",
    backgroundColor: "white",
    alignItems: "flex-end",
  },
  btnFilter: {
    height: 50,
    width: 100,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FindStyles;
