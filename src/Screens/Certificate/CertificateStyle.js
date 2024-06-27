import { StyleSheet } from 'react-native';
import Color, { dimensions } from '../../Global/Color';
import { width } from '../../Global/Constants';

export const styles = StyleSheet.create({
    courseContainer: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        marginBottom: 11,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 0.05,
        elevation: 2,

    },
    courseSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    courseTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 11,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 10 / 2,
        backgroundColor: Color.PRIMARY,
    },
    courseSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    crseImg: {
        height: 99,
        width: width * 0.33,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        resizeMode: 'contain'
    },
    iddleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    crtrRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 22,
    },
    courseButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    middleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    buttonsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pdf: {
        height: 99,
        width: width * 0.33,
    },
    createImgStyle: {
        height: 13,
        width: 13,
        borderRadius: 13 / 2,
    },
    ///circle vew
    circleView: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        borderRadius: 20,
        backgroundColor: '#F7FAEB',
        justifyContent: 'center',

    },
});
