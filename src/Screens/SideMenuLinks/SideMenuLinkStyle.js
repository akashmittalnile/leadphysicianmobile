import { StyleSheet } from 'react-native';
import { dimensions } from '../../Global/Color';
import Color from '../../Global/Color';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webViewStyle: {
        marginTop: 0,
        flex: 1,
    },
    hedaerContainer: {
        height: 'auto', width: dimensions.SCREEN_WIDTH,
        backgroundColor: '#E3F1B2',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'


    },
    touchableContainer: { backgroundColor: Color.PRIMARY, height: 50, width: dimensions.SCREEN_WIDTH * 0.12, borderRadius: 12, marginVertical: 6, borderWidth: 1, borderColor: Color.PRIMARY, flexDirection: 'row', alignItems: 'center', marginEnd: 12, marginVertical: 12, justifyContent: 'center', }
});
