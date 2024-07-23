import Color, { dimensions } from '../../Global/Color';
import { Platform, StyleSheet } from 'react-native';
import { height, width } from '../../../global/Constant';
import { responsiveHeight } from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        flexDirection: 'row',
        width: '90%'
    },
    container: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        flexDirection: 'row',
        width: '90%'
    },
    text: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 14,
        color: '#000000'
    },
    myText: { fontFamily: 'Inter', fontWeight: '400', fontSize: 13, color: Color.LIGHT_BLACK },
    textunderline: { fontFamily: 'Inter', fontWeight: '500', fontSize: 12, color: Color.PRIMARY, },
    ////styles const name = new type(arguments);
    body: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#132A3A',
        padding: 8,
        position: 'relative',
        overflow: 'hidden',
    },
    boxView: {
        backgroundColor: 'red',
        borderLeftColor: Color.PRIMARY,
        borderStyle: 'solid',
        paddingVertical: 10,
        borderRightColor: Color.PRIMARY,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopColor: Color.PRIMARY,
        borderTopWidth: 1,
        borderBottomColor: Color.PURPLE_DARK,
        borderTopWidth: 30, // Consider removing this line if not needed
        width: dimensions.SCREEN_WIDTH * 0.9, // Consider removing this line if you set width later
        height: 'auto',
        alignSelf: 'center',
        width: dimensions.SCREEN_WIDTH * 0.41, // This line will override the previous width setting

    },
    mainView: {
        backgroundColor: 'white',
        paddingVertical: 10,
        borderTopColor: Color.PRIMARY,
        borderTopWidth: 90, // Consider removing this line if not needed

        width: dimensions.SCREEN_WIDTH * 0.90,
        height: 485,
        alignSelf: 'center',
        borderRadius: 10,


    },
    sub: { flexDirection: 'row', justifyContent: 'center', marginHorizontal: 10 },
    // mainView: {
    //     backgroundColor: 'white',
    //     paddingVertical: 10,
    //     borderTopColor: Color.PRIMARY,
    //     borderTopWidth: 1,
    //     borderBottomWidth: 1,
    //     borderBottomColor: Color.PURPLE_DARK,
    //     borderTopWidth: 90, // Consider removing this line if not needed
    //     width: dimensions.SCREEN_WIDTH * 0.90,
    //     height: 445,
    //     alignSelf: 'center',

    //     borderTopLeftRadius: 20, // Set the border radius for the top-left corner
    //     borderTopRightRadius: 20, // Set the border radius for the top-right corner
    //     borderBottomLeftRadius: 20, // Set the border radius for the bottom-left corner

    //     borderBottomRightRadius: 20, // Set the border radius for the bottom-right corner
    // },
    mainDiv: {
        flexDirection: 'row', // Arrange cards horizontally
        justifyContent: 'space-between', // Distribute space between cards
        paddingHorizontal: 20,
        marginLeft: 30
    },



    // This line will override the previous width setting

    activeStylee: {
        backgroundColor: Color.PRIMARY,

        borderRadius: 50,
        height: 12,
        width: 12,
        marginTop: 200,
    },
    dotStylee: {
        backgroundColor: '#CBCBCB',
        height: 12,
        width: 12,
        borderRadius: 50,

        marginTop: 200,
    },
    textAbove: {
        alignSelf: 'center',
        fontFamily: 'Roboto',

        position: 'absolute', bottom: 0, top: -75
    },
    hoverView: {
        position: 'absolute', top: -30, backgroundColor: 'white', height: 41, width: dimensions.SCREEN_WIDTH * 0.80, alignSelf: 'center', shadowColor: '#000000',
        shadowRadius: 6,
        shadowOpacity: 0,
        elevation: 7,
        borderRadius: 5,
        justifyContent: 'center'
    },
    listContainer: {
        marginBottom: 30, marginTop: 22
    },
    listItem: {
        marginBottom: 5,
        flexDirection: 'row', marginHorizontal: 12
    },

    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
});
