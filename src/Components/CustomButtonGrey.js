import React from 'react';
import {
    Text,
    TextInput,
    View,
    Animated, Dimensions, StyleSheet
} from 'react-native';
import Color from '../Global/Color';

const W = Dimensions.get('screen').width;
const H = Dimensions.get('screen').height;
const CustomButtonGrey = (props) => {

    return (
        <View style={styles.button}>
            <Text style={styles.text}>{props.name}</Text>
        </View>)
}
export default CustomButtonGrey
    ;
const styles = StyleSheet.create({
    button: { width: '100%', height: 62, borderRadius: 5, backgroundColor: Color.LIGHT_BLACK, top: -10, alignSelf: 'center', justifyContent: 'center' },
    text: { color: Color.WHITE, fontWeight: '500', fontSize: 14, alignItems: 'center', alignSelf: 'center' }
})