import React, { useState, useEffect } from 'react';
import { Text, View, Image, ActivityIndicator, Button, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import Color, { dimensions } from '../../Global/Color';

import Svg, { Circle, Rect } from 'react-native-svg';

import KeySvg from '../../Global/Images/logo.svg';
const Course = ({ navigation }) => {
    // const dispatch = useDispatch();
    const [animating, setAnimating] = useState(true);
    ;



    // useEffect(() => {
    //     // getTheme();
    //     setTimeout(() => {
    //         setAnimating(false);

    //         // Check if user_id is set or not
    //         // If not then send for Authentication
    //         // else send to Home Screen
    //           AsyncStorage.getItem('user_id').then(value =>
    //             navigation.replace(value !== null ? 'RegisterScreen' : 'MainContainer'),
    //           );
    //         navigation.replace('WelcomeScreen')
    //     }, 5000);
    // }, []);


    return (

        <View style={styles.container}>

            <View style={styles.imageContainer}></View>
            <KeySvg width={dimensions.SCREEN_WIDTH * 0.70} height={dimensions.SCREEN_WIDTH * 0.40} style={{ alignSelf: 'center', }} />
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                <ActivityIndicator size="large" color={Color.PRIMARY} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.LIGHT_GREEN
        // set the top padding to move the image to the top
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 120,
        height: 130,
    },
    spinnerTextStyle: {
        color: 'red',
    },
    containerr: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingBottom: 10, // set the bottom padding to move the image up from the bottom
        //paddingRight: 30, // set the right padding to move the image to the right
        marginTop: '40%'
    },
    imagee: {
        width: 100,
        height: 130,
        borderTopLeftRadius: 70,
        borderBottomLeftRadius: 70
    },
    spinnerContainer: {
        position: 'absolute',
        bottom: 50,
    },
});
export default Course;
