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
    justifyContent: "center",
  },
  button: {
    width: "47%",
    height: 60,
    backgroundColor: "#ccc",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  manageReservationWindow: {
    width: "97%",
    height: "80%",
    margin: 5,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
  },
  manageHeader: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  pickerContainer: {
    width: "100%",
    height: 50,
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  pickerHeader: {
    width: "45%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  pickerBox: {
    width: "25%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  pickerContent: {
    width: "100%",
  },
  addButtonContainer: {
    width: "30%",
    height: "100%",
    padding: 5,
  },
  addButton: {
    width: "100%",
    height: "100%",
    backgroundColor: "#001D44",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
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
    flexDirection: "row",
  },
  reserveTimeBox: {
    width: 70,
    height: 35,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
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
  },
  logoutContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  logoutButton: {
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginVertical: 5,
    width: "80%",
    height: 55,
  },
});

export default styles;
