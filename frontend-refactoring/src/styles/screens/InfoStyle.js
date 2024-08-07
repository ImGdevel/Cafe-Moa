import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    paddingBottom: "10%",
  },

  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  contentLayout: {
    flex: 3,
  },
  box: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "#ccc",
    alignItems: "center",
    marginHorizontal: "2%",
    marginBottom: 5,
    height: 40,
    minWidth: "29%",
    textAlign: "center",
  },
  selected: {
    backgroundColor: "#001D44",
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 25,
    color: "black",
  },
  selectedLabel: {
    color: "white",
  },
  imageContainer: {
    width: 140,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 108,
    height: 108,
    borderRadius: 10,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    resizeMode: "contain",
    borderWidth: 1,
    margin: 5,
  },
  cafeLogo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  cafeTitle: {
    fontSize: 25,
  },
  seatPic: {
    resizeMode: "contain",
    width: "100%",
    height: "75%",
  },
  picArea: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    padding: 10,
  },
  reserveButton: {
    backgroundColor: "#001D44",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginVertical: 5,
    width: "80%",
    height: 55,
  },
  reserveButtonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "500",
  },
  btnContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  listContainer: {
    marginHorizontal: "8%",
    marginVertical: "10%",
  },

  LogoImagePicker: {
    width: 108,
    height: 108,
    borderRadius: 10,
    borderColor: "#ccc",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    margin: 5,
  },
});

export default styles;
