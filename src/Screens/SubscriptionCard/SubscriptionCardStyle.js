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
    optionView: { width: dimensions.SCREEN_WIDTH * 0.43, height: 107, borderRadius: 10, borderColor: '#959FA6', borderWidth: 1, marginVertical: 12 }
});
