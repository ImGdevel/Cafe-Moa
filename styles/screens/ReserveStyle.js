import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "white",
  },
  cafeLogo: {
    width: '100%',
    height: '100%',
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
  reserveBtn: {
    backgroundColor: "#001D44",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "25%",
    borderRadius: 5,
  },
  pickerBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  pickerLine: {
    borderWidth:1.5,
    borderRadius:10,
    borderColor:"#ddd",
    width: "63%",
    height:55,
    marginRight:10
  },
  picker: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingLeft:10,
  },
  pickerTopText:{
    fontSize:25,
    color:"#000",
  },
  pickerTopTextArea:{
    flex:1,
    width:"91%",
    borderBottomColor:"#001D44",
    borderBottomWidth:3,
    borderBottomEndRadius:10,
    padding:10,
    paddingLeft:20,
  },
});

export default styles;
