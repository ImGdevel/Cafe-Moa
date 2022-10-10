import { StyleSheet } from "react-native";

const CafeTableStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: 140,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    borderColor: "#DDD",
    borderWidth: 1,
  },
  imageContainer: {
    width: 140,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: "80%",
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column",
  },
  textContent: {
    flex: 1,
    justifyContent: "flex-end",
    paddingLeft: 15,
  },

  textContent: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 15,
  },
  nameText: {
    fontSize: 22,
    fontWeight: "700",
  },
  contentText: {
    fontSize: 16,
    fontWeight: "400",
    color: "gray",
  },
});

export default CafeTableStyles;
