import { StyleSheet } from "react-native";

const BookmarkTableStyles = StyleSheet.create({
    container: {
        width: "100%",
        height: 240,
        backgroundColor: "white",
        flexDirection: "column",
        justifyContent: "center",
        borderColor: "#DDD",
        borderWidth: 1,
        paddingTop: 0,
        paddingBottom: 10,
        paddingRight: 10,
    },
    imageContainer: {
        width: 140,
        height: 140,
        marginLeft: 10,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    image: {
        width: "80%",
        height: "80%",
        borderColor: "#ddd",
        flexDirection: "row",
        borderWidth: 1,
        marginLeft: -1,
    },
    contentContainer: {
        flex: 1,
        flexDirection: "column",
        paddingLeft: 10,
    },
    textContent: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 5,
    },
    nameText: {
        fontSize: 22,
        fontWeight: "700",
    },
    contentText: {
        fontSize: 15,
        fontWeight: "400",
        color: "gray",
        marginRight: 10,
    },
    icon: {
        fontSize: 15,
        fontWeight: "400",
        color: "gray",
    },
    iconContainer: {
        flexDirection: "row",
    },
})

export default BookmarkTableStyles;