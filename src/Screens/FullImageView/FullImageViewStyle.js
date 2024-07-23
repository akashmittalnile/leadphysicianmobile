import { Dimensions, StyleSheet } from "react-native";
import Color from "../../Global/Color";
 

export const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
    
        padding: 20
    },
    headerStyle: {
        // position: "absolute",
        flexDirection: "row",
        justifyContent: "space-between",
        right: 0, left: 0, height: 50,
        elevation: 4,
        alignItems:"center",
        paddingHorizontal:10,
        backgroundColor: Color.WHITE
    },
    imageStyle: {
        width:Dimensions.get('screen').width,
        height: 500,
    }
})