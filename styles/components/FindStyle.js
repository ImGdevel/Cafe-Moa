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
    flex: 4,
    backgroundColor: "#fff",
  },
  searchbarContainer: {
    width: "100%",
    height: "50%",
    
    marginTop: "10%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",


  },
  textinputBox: {
    height: 40,
    paddingLeft: 20,
    width: "70%",
    borderColor: "#bbb",
    borderWidth: 1,
    borderRadius: 15,
    marginRight: 8,
    placeholderTextColor: "#bbb",
    
  },
  btnSearch: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#bbb",
    justifyContent: "center",
    alignItems: "center",

  },
  filterContainer: {
    width: "100%",
    height: "50%",
    backgroundColor: "#fff",
    alignItems: "flex-end",

  },
  btnFilter: {
    height: 50,
    width: 100,
    borderColor: "#bbb",
    justifyContent: "center",
    alignItems: "center",

    
  },
});

export default FindStyles;
