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
    marginTop:25,
    height:260,
    width:'100%',
    backgroundColor: "#fff",
    borderRadius: 30,
  },

  reserveAreaTop:{
    height: 50,
  },
  reserveAreaContent:{
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  reserveCafeContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  reserveBtnContainer: {
    height: 48,
    flexDirection: "row",
    alignItems:"center",
    justifyContent:"space-evenly",
    backgroundColor: "#fff",
  },
  reserveBtn:{
    width: "45%",
    height: "95%",
    marginBottom: "3%",
    backgroundColor:"#001D44",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  reserveBtnText:{
    color:"#fff",
    fontSize: 18,
  },

  BookMarkArea:{
    marginTop:10,
    height:270,
    width:'100%',
    backgroundColor: "#fff",
  },

  BookMarkContainer:{
    height: 210, 
    width: 160, 
    marginHorizontal:4,
    
    borderColor: "#aaa",
    borderWidth: 1,
    borderRadius: 5,
  },

  BookMarkPanelImageArea:{
    flex:7,
    margin:"5%",
    borderRadius:10,
  },

  BookMarkPanelTextArea:{
    flex:3,
    borderColor:"#ddd",
    paddingHorizontal: "5%",
    // //borderWidth:1,
    // borderColor: "#aaa",
    // borderWidth: 1,
    // borderRadius: 5,
  },

  BookMarkPanelTextAreaTop:{
    flex:1,
    flexDirection:"row",
  },

  AreaTitle:{
    fontSize: 23,
    fontWeight:"600",
    paddingLeft:15,
  },
  AreaTitleLink:{
    fontSize: 17,
    paddingTop: 9,
    fontWeight:"600",
    color: "#777",
    paddingLeft:15,
  },


  AdArea:{
    marginTop:10,
    height:200,
    width:'100%',
  },

  AdPanel:{
    height: 200, 
    width: 300 , 
    marginHorizontal: 10 ,
    borderColor: "#aaa",
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
