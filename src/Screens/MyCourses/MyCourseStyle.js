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
    height: 24,
    width: 24,
    tintColor:'red'
  },
});
