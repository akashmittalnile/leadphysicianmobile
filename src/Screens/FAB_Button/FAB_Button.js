import { Image, View, Text, TouchableOpacity, } from 'react-native';
import React from 'react';
import Color from '../../Global/Color';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const FAB_Button = ({
    onPress = () => { },
    padding = 10,
    right = 20,
    bottom = 30,
    icon = <Image source={require('.././../Global/Images/ReviewGreenPng.png')} style={{ width: 22, height: 22 }} />,
    style = {},
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                position: 'absolute',
                right: right,
                bottom: bottom,
                backgroundColor: Color.WHITE,
                justifyContent: 'center',
                alignItems: 'center',
                padding: padding,
                height: 59,
                width: 59,
                borderRadius: 59 / 2,
                borderColor: Color.PRIMARY,
                borderWidth: 1,

                ...style,
            }}>
            {/* <Image source={require('.././../Global/Images/ReviewGreenPng.png')} style={{ width: 22, height: 22 }} /> */}
            {icon}
            {/* <MyIcon.AntDesign name="plus" size={30} color={Color.WHITE} /> */}
        </TouchableOpacity>
    );
};

export default FAB_Button;
