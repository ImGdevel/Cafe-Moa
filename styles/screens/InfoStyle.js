import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "#ccc",
    alignItems: "center",
    marginHorizontal: "2%",
    marginBottom: 5,
    height:40,
    minWidth: "46%",
    textAlign: "center",
  },
  selected: {
    backgroundColor: "#001D44",
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: "500",
    textAlign:"center",
    lineHeight:25,
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
    width: '100%',
    height: 250,
    borderRadius: 10,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
    borderWidth: 1,
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
    height: "75%",
  },
  picArea: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
  },
  reserveButton: {
    backgroundColor: "#001D44",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: 5,
    width: "80%",
    height: 55,
  },
  btnContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    marginHorizontal: "8%",
    marginVertical: "10%",
  },
});

export default styles;
