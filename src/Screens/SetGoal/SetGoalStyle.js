import Color, { dimensions } from '../../Global/Color';
import { Platform, StyleSheet } from 'react-native';
import { height, width } from '../../../global/Constant';
import { responsiveHeight } from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
    input: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 10,
        width: dimensions.SCREEN_WIDTH * 0.9,
        marginHorizontal: 12,
        marginLeft: 12,
        alignSelf: 'center',
        borderRadius: 5,
        borderColor: '#959FA6',
        borderWidth: 1,
        backgroundColor: Color.WHITE,
        padding: 12,
        fontWeight: '500',
        color: '#292929',
    },
    calendarView: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        width: dimensions.SCREEN_WIDTH * 0.9,
        backgroundColor: 'red',
        alignSelf: 'center',
        borderRadius: 5,
        borderColor: '#959FA6',
        borderWidth: 1,
        backgroundColor: Color.WHITE,
        fontWeight: '500',
        color: '#292929',
        alignItems: 'center'
    },
    groupView: {
        width: 'auto',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: Color.PRIMARY,
        borderWidth: 1,
        borderColor: '#959FA6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 18
    },
    calendarImg: {
        width: 38,
        height: 38,
        backgroundColor: Color.PRIMARY,
        borderRadius: 10,
        marginVertical: 5,
        marginRight: 12,
        justifyContent: 'center'

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
    myText: { fontFamily: 'Inter', fontWeight: '500', fontSize: 12, color: Color.BLACK },
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
    shape: {
        position: 'absolute',
        backgroundColor: '#fff',
        width: 1000,
        height: 1000,
        flexDirection: 'row',
        bottom: 0,
        transform: [{ rotate: '45deg' }],
        bottom: -450,
        left: -302,
        right: 0,
        borderRadius: 80,
        marginLeft: 'auto',
        marginRight: 'auto',

    },
    content: {
        position: 'relative',
        zIndex: 9,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    txt: {
        fontWeight: '400',
        fontSize: 13,
        color: '#132A3A',
        fontFamily: 'Roboto', paddingHorizontal: 12
    },
    line: { width: dimensions.SCREEN_WIDTH * 0.40, height: 1, backgroundColor: Color.BLACK, top: 8, },
    socialTxt: {
        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: '500',
        color: Color.LIGHT_BLACK, marginHorizontal: 10
    },
    socialView: {
        flexDirection: 'row',
        width: dimensions.SCREEN_WIDTH * 0.90,
        height: 60,
        borderRadius: 5,
        backgroundColor: Color.WHITE,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.13,
        shadowRadius: 13,
        alignSelf: 'center',

        borderWidth: 1,
        borderColor: 'rgba(247, 250, 235, 1)',
        elevation: 10
    },
    backgroundImg: { height: 333, width: dimensions.SCREEN_WIDTH, }

})