import { StyleSheet } from "react-native";

const FindStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  topContainer: {
    height: 180,
    backgroundColor: "#fafafa",
  },
  contentContainer: {
    flex: 3,
    backgroundColor: "#fafafa",
  },

  searchbarContainer: {
    flex: 2,
    marginTop: "10%",
    backgroundColor: "#fafafa",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  textinputBox: {
    height: 40,
    paddingLeft: 20,
    width: "70%",
    borderColor: "#aaa",
    borderWidth: 1.5,
    borderRadius: 10,
    marginRight: 8,
    placeholderTextColor: "#aaa",
  },
  btnSearch: {
    width: 40,
    height: 40,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: "#aaa",
    justifyContent: "center",
    alignItems: "center",
  },

  SortContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  btnSort: {
    width: "22%",
    height: "95%",
    marginHorizontal: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#aaa",
    justifyContent: "center",
    alignItems: "center",
  },
  btnSortText: {
    color: "#555",
    fontSize: 13,
  },

  filterContainer: {
    flex: 1,
    alignItems: "flex-end",
    backgroundColor: "#f8f8f8",
  },
  btnFilter: {
    height: "100%",
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FindStyles;
