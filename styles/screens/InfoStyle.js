import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  contentLayout: {
    flex: 3,
    backgroundColor: "blue",
  },
  box: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "#ccc",
    alignItems: "center",
    marginHorizontal: "1%",
    marginBottom: 5,
    minWidth: "48%",
    textAlign: "center",
  },
  selected: {
    backgroundColor: "black",
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "black",
  },
  selectedLabel: {
    color: "white",
  },
  label: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 24,
  },
  cafeLogo: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  cafeTitle: {
    fontSize: 25,
  },
  seatPic: {
    width: "100%",
    height: "100%",
  },
  picArea: {
    flex: 1,
    backgroundColor: "red",
  },
  reserveButton: {
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: 5,
    width: "80%",
  },
  btnContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
