import Color from '../../Global/Color';
import { Platform, StyleSheet } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { dimensions } from '../../Global/Color';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.SCREEN_BG,
    },
    mainView: {
        padding: 20,
        paddingTop: 0,
        marginTop: -30,
    },
    viewContainer: {
        width: dimensions.SCREEN_WIDTH * 0.90,
        height: 'auto',
        borderRadius: 10,
        marginVertical: 12,
        padding: 10,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 0.05,
        elevation: 2,


    },
    roundView: {
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: Color.PRIMARY,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    subHeadView: { flexDirection: 'row', marginHorizontal: 10, marginVertical: 14 },
    actionButtonView: {
        width: 125,
        height: 44,
        borderRadius: 5, backgroundColor: '#F1190A',
        marginHorizontal: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
    }
});
