import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  TopView:{
    flex:1,
    backgroundColor: "#fdfdfd",
    borderBottomColor: "#dddddd",
    borderBottomWidth: 3,
  },

  TopViewTop:{
    flex:2,
    backgroundColor:'#fdfdfd'
  },
  TopTitle:{
    flex:4,
    backgroundColor:'#fdfdfd',
    alignItems: "center",
    justifyContent: "center",
  },
  TopViewBottom:{
    flex:2,
    backgroundColor:'#fdfdfd'
  },

  MainView:{
    flex:3,
    backgroundColor: '#ffffff',
  },

  reserveArea:{
    marginTop:10,
    height:140,
    width:'100%',
    backgroundColor: "#dddddd",
  },

  BookMarkArea:{
    marginTop:10,
    height:200,
    width:'100%',
    backgroundColor: "#ffffff",
  },

  BookMarkPanel:{
    height: 200, 
    width: 160, 
    marginLeft:5,
    borderColor: "#dddddd",
    borderWidth: 2,
    borderRadius: 10,
  },

  BookMarkPanelImageBox:{
    flex:2,
    backgroundColor:"#dddddd",
  },
  BookMarkPanelTextBox:{
    flex:1,
    backgroundColor: "#aaaaaa",
  },




  AdArea:{
    marginTop:10,
    height:200,
    width:'100%',
    backgroundColor: "#ffffff",
  },

  AdPanel:{
    height: 200, 
    width: 300 , 
    marginHorizontal: 10 ,
    borderColor: "#dddddd",
    borderWidth: 2,
    borderRadius: 10,
  },

  homeText: {
    marginTop: "10%",
    marginBottom: "2%",
  },

  infoContainer: {
    borderColor: "#001D44",
    borderWidth: 2,
    borderRadius: 15,
    top: "-12%",
    left: "5%",
    position: "absolute",
    backgroundColor: "#001D44",
  },

  btnInfoReservation: {
    width: Dimensions.get("window").width * 0.95,
    height: "50%",
    borderWidth: 2,
    borderColor: "#001D44",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "white",
    marginVertical: "10%",
    marginHorizontal: "5%",
    paddingTop: "6%",
    paddingLeft: "2%",
  },

  infoContentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    borderColor: "#001D44",
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
    borderWidth: 1,
  },

  btnConfirmReservation: {
    width: Dimensions.get("window").width,
    height: "15%",
    //borderTopWidth: 2,
    //borderBottomWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    backgroundColor: "white",
    width: "94%",
    marginLeft: "43%",
  },
});

export default styles;
