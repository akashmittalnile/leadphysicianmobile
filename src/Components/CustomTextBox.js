
import {
    Text,
    TextInput,
    View,
    Animated, Dimensions, StyleSheet, Image,
    TouchableOpacity
} from 'react-native';
import Color from '../Global/Color';
import { dimensions } from '../Global/Color';
import { useState, React } from 'react';
import Eye from '../Global/Images/eye.svg';

// global
const H = Dimensions.get('screen').height;
const W = Dimensions.get('screen').width;
const CustomTextBox = ({ imageComponent, placeholder, value, onChangeText, err, secureTextEntry = false, keyboardType = '' }) => {
    const [isSecureTextEntry, setIsSecureTextEntry] = useState(secureTextEntry);

    const toggleSecureEntry = () => {
        setIsSecureTextEntry(!isSecureTextEntry);
    };
    console.log('error------>', err, placeholder);
    return (
        // { ...styles.input, borderColor: err == 2  ? '#133072' : '#FFFFFF' }
        <View style={[styles.input, value?.trim()?.length > 0 ? styles.selectedinput : null]}>
            {imageComponent && (
                <View style={styles.imageContainer}>
                    {imageComponent}
                </View>
            )}
            <TextInput
                style={[styles.text, secureTextEntry && { paddingRight: 40 }]}
                value={value}
                secureTextEntry={isSecureTextEntry}
                placeholderTextColor='#959FA6'
                onChangeText={onChangeText}
                placeholder={placeholder}
                keyboardType={keyboardType}
            />
            {secureTextEntry && (
                <TouchableOpacity style={styles.togglePassword} onPress={toggleSecureEntry}>
                    <Eye width={24} height={24} />
                </TouchableOpacity>
            )}
        </View>)
}
export default CustomTextBox;
const styles = StyleSheet.create({
    input: {
        height: 64,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 5,
        width: '100%',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        alignSelf: 'center',
        borderWidth: 1,
        color: 'black'
    },
    text: { height: 40, color: '#292929', width: '90%' },
    togglePassword: {
        marginRight: 12
    },
    input: {
        height: 64,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 5,
        width: '100%',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#959FA6',
        color: 'black'
    },
    imageContainer: {
        marginRight: 2,
    },
    text: {
        flex: 1,
        color: 'black'
        // Your text input styles here
    },
    togglePassword: {
        position: 'absolute',
        right: 5,
    },

})