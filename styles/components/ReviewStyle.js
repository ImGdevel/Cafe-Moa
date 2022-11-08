import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
  },
  noticeHeader: {
    width: "100%",
    height: 200,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
  },
  noticeText: {
    fontSize: 20,
    fontWeight: "1000",
    marginBottom: 10,
  },
  notice: {
    paddingHorizontal: 10,
  },
  ratingHeader: {
    width: "100%",
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
  },
  ratingContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  ratings: {
    width: 50,
    height: 50,
    fontSize: 50,
    color: "gold",
  },
  ratingsText: {
    paddingTop: 5,
    fontSize: 20,
    fontWeight: "500",
  },
  reviewBtn: {
    width: "80%",
    height: "80%",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "blue",
  },
  reviewBtnText: {
    paddingTop: 5,
    fontSize: 20,
    color: "white",
    fontWeight: "500",
  },
});

export default styles;
