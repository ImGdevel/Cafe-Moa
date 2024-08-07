import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 0,
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
    marginLeft: 10,
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
  reviewButton: {
    width: "50%",
    height: 50,
    marginHorizontal: 45,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#001D44",
    borderRadius: 4,
  },
  reviewButtonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "500",
  },
  reviewContentContainer: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
    padding: 10,
  },
  reviewContentHeader: {
    width: "100%",
    height: 50,
    flexDirection: "row",
  },
  reviewHead: {
    paddingLeft: 15,
    height: "100%",
    justifyContent: "space-evenly",
  },
  reviewContent: {
    padding: 10,
    fontSize: 15,
  },
  icon: {
    fontSize: 15,
    fontWeight: "400",
    color: "gray",
  },
});

export default styles;
