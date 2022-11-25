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
    borderRadius: 10,
  },
  imageContainer: {
    width: 140,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "70%",
    height: "70%",
    borderRadius: 20,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  textContent: {
    flex: 1,
    justifyContent: "flex-end",
    paddingLeft: 5,
  },

  textContent: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 5,
  },
  nameText: {
    fontSize: 22,
    fontWeight: "700",
  },
  contentText: {
    fontSize: 15,
    fontWeight: "400",
    color: "gray",
  },
  ConfirmBoxInText: {
    color: "#001D44",
    fontSize: 20,
    marginHorizontal: 20,
  },
  icon: {
    fontSize: 15,
    fontWeight: "400",
    color: "gray",
  },
  iconContainer: {
    flexDirection: "row",
  },
  logoPickerContainer: {
    width: "100%",
    height: 32,
    marginBottom: 10,
  },
  LogoImagePicker: {
    width: "80%",
    height: "100%",
    backgroundColor: "#001D44",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CafeTableStyles;
