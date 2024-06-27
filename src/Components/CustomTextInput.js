import React from 'react';
import {
    Text,
    TextInput,
    View,
    Animated, Dimensions, StyleSheet, Image
} from 'react-native';
import Color from '../global/Color';

// styles

// global
const H = Dimensions.get('screen').height;
const W = Dimensions.get('screen').width;
const CustomTextInput = ({ placeholder, value, onChangeText, err, secureTextEntry = false, editable = true, keyboardType = '' }) => {
    console.log('error------>', err, placeholder);
    return (
        // { ...styles.input, borderColor: err == 2  ? '#133072' : '#FFFFFF' }
        <View style={styles.input}>
            <TextInput
                style={styles.text}
                value={value}
                secureTextEntry={secureTextEntry}
                placeholderTextColor='#000000'
                onChangeText={onChangeText}
                placeholder={placeholder}
                editable={editable}
                keyboardType={keyboardType}
            />

        </View>)
}
export default CustomTextInput;
const styles = StyleSheet.create({
    input: {
        height: 47,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 10,
        width: '100%',

        justifyContent: "center",
        alignItems: "center",
        shadowColor: '#000000',
        shadowRadius: 6,
        shadowOpacity: 0,
        elevation: 1,
        borderColor: '#CCD2E3',
        borderWidth: 1,
        alignSelf: 'center', borderRadius: 5,
        backgroundColor: Color.WHITE
    },
    inputt: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 5,
        padding: 10,
        width: W * 0.83,
        backgroundColor: 'white',

        alignItems: "center",
        shadowColor: '#000000',
        shadowRadius: 6,
        shadowOpacity: 0,
        elevation: 1,
        borderWidth: 1,
        marginLeft: 30, marginTop: 20, marginRight: 10, borderRadius: 10, borderColor: '#EB001B'
    },
    text: { height: 40, color: '#000000', width: '90%', fontSize: 16 },
    TextInput: {

        borderRadius: 10
    }
})