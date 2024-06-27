import Color, { dimensions } from '../../Global/Color';
import { Platform, StyleSheet } from 'react-native';
import { height, width } from '../../../global/Constant';
import { responsiveHeight } from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
    container: {

        alignItems: 'center',
        justifyContent: 'center',
    },
    mainView: {
        padding: 20,
        paddingTop: 0,
        marginTop: -30,
    },
    buttonsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 10,
    },
    courseTypeContainer: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 0.05,
        elevation: 2,
    },
    crseImg: {
        height: 232,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    crtrRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    middleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    middleLeftRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    chaptersRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quizRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 22,
    },
    iconsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16,
    },
    validDateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 7
        // marginLeft: 16,
    },
    viewAllContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    viewAll: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: Color.THEME_BROWN,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ratingView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reviewContainer: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 0.05,
        elevation: 2,
    },
    reviewTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    reviewTopLeftRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reviewImg: {
        height: 31,
        width: 31,
        borderRadius: 31 / 2,
    },
    createImgStyle: {
        height: responsiveHeight(5),
        width: responsiveHeight(5),
        borderRadius: responsiveHeight(5),
    },
    // moduleView: {
    //     width: dimensions.SCREEN_WIDTH * 0.90,
    //     height: 'auto',
    //     padding: 10,
    //     backgroundColor: Color.WHITE, borderRadius: 10,
    //     marginVertical: 7, flexDirection: 'row', justifyContent: 'space-between'
    // },
    moduleView: {
        width: dimensions.SCREEN_WIDTH * 0.90,
        height: 200,
        padding: 10,
        backgroundColor: Color.WHITE, borderRadius: 10,
        marginVertical: 7, flexDirection: 'row', justifyContent: 'space-between'
    },
    background: { width: dimensions.SCREEN_WIDTH * 0.90, height: 'auto', backgroundColor: 'white', marginTop: 20, borderRadius: 10 },
    completeButton: {
        flexDirection: 'row', width: dimensions.SCREEN_WIDTH * 0.90, height: 50, backgroundColor: Color.PRIMARY, borderRadius: 5, marginTop: 18, marginBottom: 9, alignSelf: 'center', justifyContent: 'center', alignItems: 'center'
    },
    ViewDescription: {
        width: dimensions.SCREEN_WIDTH * 0.89,
        backgroundColor: Color.WHITE,
        height: 'auto', padding: 10, borderRadius: 5
    },
    circleView: {
        width: 41,
        height: 41,
        resizeMode: 'contain',
        borderRadius: 20,
        backgroundColor: '#F7FAEB',
        justifyContent: 'center',

    },
    buttonBi: {
        width: 84,
        height: 32, borderRadius: 5, backgroundColor: Color.PRIMARY,
        alignSelf: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.12,
        shadowRadius: 13,
    }
});
