import Color, { dimensions } from '../../Global/Color';
import { Platform, StyleSheet } from 'react-native';
import { height, width } from '../../../global/Constant';
import { responsiveHeight } from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7FAEB',
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
    moduleView: {
        width: dimensions.SCREEN_WIDTH * 0.90,
        height: 'auto',
        padding: 10,
        backgroundColor: Color.WHITE, borderRadius: 10,
        marginVertical: 7, flexDirection: 'row', justifyContent: 'space-between'
    },
    boxView: {
        backgroundColor: 'white',
        borderLeftColor: Color.PRIMARY,
        borderStyle: 'solid',
        paddingVertical: 10,
        borderRightColor: Color.PRIMARY,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopColor: Color.PRIMARY,
        borderTopWidth: 1,
        borderBottomColor: Color.PURPLE_DARK,
        borderTopWidth: 30, // Consider removing this line if not needed
        width: dimensions.SCREEN_WIDTH * 0.9, // Consider removing this line if you set width later
        height: 'auto',
        alignSelf: 'center',
        width: dimensions.SCREEN_WIDTH * 0.41, // This line will override the previous width setting
    },
    text: {

        alignSelf: 'center',
        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: '500',
        color: Color.WHITE,
        position: 'absolute', bottom: 0, top: -22
    },
    buttonBack: {
        width: dimensions.SCREEN_WIDTH * 0.9,
        height: 60,
        borderRadius: 5,
        alignSelf: 'center',
        backgroundColor: Color.PRIMARY,
        marginVertical: 10,
        justifyContent: 'center',
        alignSelf: 'center', alignItems: 'center',
        flexDirection: 'row',
    }

});
