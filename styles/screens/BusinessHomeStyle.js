import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  contentContainer: {
    width: "100%",
    height: "84%",
    alignItems: "center",
    padding: 5,
  },
  btnContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    width: "47%",
    height: 60,
    backgroundColor: "#ccc",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    margin: 5
  },
  manageReservationWindow: {
    width: "97%",
    height: "80%",
    margin: 5,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15
  },
  manageHeader: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  seatPicArea: {
    width: "100%",
    height: 300,
  },
  reservationListContainer: {
    flex: 1,
    width: "100%",
  },
  reservationList: {
    width: "100%",
    flexDirection: "row"
  },
  reserveTimeBox: {
    width: 80,
    height: 35,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#001D44",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 5,
  },
  reserveSeatnumber: {
    paddingLeft: 5,
    marginBottom: 5,
    justifyContent: "center",
  }
});

export default styles;
