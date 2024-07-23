import Color from '../../Global/Color';
import { Platform, StyleSheet } from 'react-native';
import { dimensions } from '../../Global/Color';
import { responsiveHeight } from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.SCREEN_BG,
    },
    mainView: {

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
    teamView: {
        width: dimensions.SCREEN_WIDTH * 0.90,
        height: 'auto',
        borderRadius: 10,
        backgroundColor: Color.WHITE,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        marginTop: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        justifyContent: 'center',


    },

    statusView: {
        width: 95, height: 28, borderRadius: 5,
        borderWidth: 1, borderColor: Color.PRIMARY, alignSelf: 'center', top: 8, justifyContent: 'center', alignSelf: 'center',


    },
    rowView: { flexDirection: 'row', alignSelf: 'center' },

    // mmeting modal
    mainUpperView: {
        flexDirection: 'row',

        width: dimensions.SCREEN_WIDTH * 0.60
    },
    circleView: {
        width: 41,
        height: 41, borderRadius: 40, backgroundColor: '#F7FAEB',
        justifyContent: 'center'
    },
    mainMidView: {
        // flexDirection: 'column'
        justifyContent: 'center'
    },
    membershipImg: {
        width: 24,
        height: 24,
        resizeMode: 'contain'
    },
    button: {
        width: 64,
        height: 32,
        borderRadius: 5,
        backgroundColor: 'red'
    },
    divideLine: {
        width: dimensions.SCREEN_WIDTH * 0.90,
        alignSelf: 'center',
        height: 2,
        backgroundColor: '#E7EAF1',
        marginVertical: 15
    },
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bottomViewNew: { flexDirection: 'row', justifyContent: 'space-between' },
    rowView: { marginTop: 10, marginHorizontal: 12 },
    rowChildView: { flexDirection: 'row', marginTop: 10, },
    containerView: {
        width: dimensions.SCREEN_WIDTH * 0.88,
        height: 'auto',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 0,
        borderStyle: 'solid',
        borderLeftColor: '#959FA6',
        borderLeftWidth: 3,
        borderRightColor: '#959FA6',
        borderTopColor: '#959FA6',
        borderBottomColor: '#959FA6',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        paddingVertical: 10,
        margin: 5,
        paddingHorizontal: 12,

        borderColor: 'rgba(0, 0, 0, 0.15)',
        // iOS shadow properties
        shadowColor: 'rgba(0, 0, 0, 0.15)',
        shadowOffset: { width: 0, height: 10 }, // Increased height for a more pronounced bottom shadow
        shadowOpacity: 1,
        shadowRadius: 11,
        // Android shadow property
        elevation: 12,
    },
    containerBottomView: {
        backgroundColor: 'white',


        borderRadius: 10,
        borderStyle: 'solid',
        margin: 5,

        paddingVertical: 10,
        borderRightColor: '#959FA6',
        borderTopColor: '#959FA6',

        borderBottomColor: '#959FA6',
        borderBottomWidth: 3,
        width: dimensions.SCREEN_WIDTH * 0.88,
        height: 'auto',
        // iOS shadow properties
        shadowColor: 'rgba(0, 0, 0, 0.15)',
        shadowOffset: { width: 0, height: 10 }, // Increased height for a more pronounced bottom shadow
        shadowOpacity: 1,
        shadowRadius: 11,
        // Android shadow property
        elevation: 12,
    },
    noDataContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    noDataText: {
        // color: Color.THEME_BLACK,
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
    },
    showMeImageView: {
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor:'red',
        height: 22,
        width: 22,
        borderRadius: 20 / 2,
        marginLeft: 3,
      },
      showMeImage: {
        height: 20,
        width: 20,
        tintColor:'red'
      },

});
