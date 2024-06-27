import React, { useState, useEffect } from 'react';
import { Text, View, Image, ActivityIndicator, Button, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import Color, { dimensions } from '../Global/Color'
// import Spinner from 'react-native-spinkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Circle, Rect } from 'react-native-svg';
import { setUserToken, setUser } from '../reduxToolkit/reducer/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
// import SvgUri from 'react-native-svg-uri';
import { useDispatch } from 'react-redux';
// import { setUser, setUserToken, } from '../../../src/reduxToolkit/reducer/user';
//src/reduxToolkit/reducer/user
// import AsyncSStyleSheettorage from '@react-native-async-storage/async-storage';
//import { useSelector, useDispatch } from 'react-redux';
import KeySvg from '../Global/Images/logo.svg';
const Splash = ({ navigation }) => {
    const dispatch = useDispatch();
    const [animating, setAnimating] = useState(true);
    ;
    // useEffect(() => {
    //     setTimeout(async () => {
    //         // const userInfo = await AsyncStorage.getItem('userInfo');
    //         // const userToken = await AsyncStorage.getItem('userToken');
    //         // const userData = JSON.parse(userInfo);

    //         // if (userData) {
    //         //     dispatch(setUserToken(userToken));
    //         //     dispatch(setUser(userData));
    //         //     if (userData != null) {
    //         //         navigation.navigate("MainContainer");
    //         //     } else {
    //         //         navigation.navigate("Register");
    //         //     }
    //         // } else {
    //         //     navigation.navigate("Register");
    //         // }
    //     }, 2000);
    //     // useEffect(() => {
    //     // getTheme();
    //     setTimeout(() => {
    //         setAnimating(false);


    //         navigation.replace('Welcome')
    //     }, 5000);
    // }, []);


    // useEffect(() => {
    //     // getTheme();
    //     setTimeout(() => {
    //         setAnimating(false);

    //         // Check if user_id is set or not
    //         // If not then send for Authentication
    //         // else send to Home Screen
    //         AsyncStorage.getItem('user_id').then(value =>
    //             console.log('my user value---??', value)
    //             // navigation.replace(value !== null ? 'RegisterScreen' : 'MainContainer'),
    //         );
    //         navigation.replace('WelcomeScreen')
    //     }, 5000);
    // }, []);
    const resetIndexGoToUserBottomTab = CommonActions.reset({
        index: 1,
        routes: [{ name: 'BottomTab' }],
    });

    const resetIndexGoToWelcome = CommonActions.reset({
        index: 1,
        routes: [{ name: 'Welcome' }],
    });
    useEffect(() => {
        setTimeout(async () => {
            const userInfo = await AsyncStorage.getItem('userInfo');
            const userToken = await AsyncStorage.getItem('userToken');

            const userData = JSON.parse(userInfo);
            if (userData) {
                console.log('my userData--->>', userData);
                dispatch(setUserToken(userToken));
                dispatch(setUser(userData));
                console.log('got to homeee');
                navigation.dispatch(resetIndexGoToUserBottomTab);
            } else {
                console.log('got to  weeee')
                navigation.dispatch(resetIndexGoToWelcome);
            }

        }, 2000);
        return () => { };
    }, []);
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
        backgroundColor: Color.LIGHT_BLACK
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
export default Splash;
