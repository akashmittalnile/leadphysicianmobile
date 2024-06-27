import Color from '../../Global/Color';
import { StyleSheet } from 'react-native';
import { dimensions } from '../../Global/Color';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // color: Colors.LITE_GREY,
        backgroundColor: Color.LIGHT_BLACK,
    },
    mainView: {
        paddingTop: 30,
        paddingBottom: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Color.LIGHT_BLACK,
        justifyContent: 'center'
    },
    logoCloseView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    logoImageStyle: {
        height: 70,
        width: 70,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 2,
        borderRadius: 5,
    },
    profileCardView: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        padding: 10,
        backgroundColor: Color.WHITE,
        marginVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
    },
    profileImageStyle: {
        height: 70,
        width: 70,
        borderRadius: 100,
        alignSelf: 'center',
    },
    imageNameView: {
        // alignItems: 'center',
    },
    flexRowView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    // logoImage: {width: 127, height: 127, borderRadius: 50},
    crossImage: { width: 46, height: 46, marginRight: 10 },
    menuContainer: {
        flexDirection: 'row',
        marginTop: 25,
        width: '100%',
    },
    menuImage: { width: 20, height: 18 },
    image: {
        width: 160,
        height: (160 * 120) / 200,
    },
    socialMediaContainer: {
        backgroundColor: Color.PRIMARY,
        padding: 22,
        paddingBottom: 28,
        marginTop: 30,
    },
    socialRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    followText: {
        fontSize: 12,
        fontWeight: '400',
        color: Color.BLACK,
    },
    versionText: {
        fontSize: 12,
        fontWeight: '400',
        color: Color.LIGHT_GRAY,
        padding: 20,
    },
    overflowView: {
        backgroundColor: Color.PRIMARY, zIndex: 9, position: 'absolute', height: 91, width: dimensions.SCREEN_WIDTH * 0.65, top: 100, borderRadius: 15, alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',


    },
    viewProfile: {
        height: 32, width: 74, backgroundColor: 'white', borderRadius: 5, marginLeft: 0, justifyContent: 'center',
        marginBottom: 12

    }
});
