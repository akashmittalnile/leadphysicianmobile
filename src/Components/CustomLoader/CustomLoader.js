//react components
import React from 'react';
import { View, Platform, ActivityIndicator } from 'react-native';
//global
import Color from '../../Global/Color';
import MyText from '../MyText/MyText';

const CustomLoader = ({ showLoader, text = 'Loading....' }) => {
    //UI
    return (
        <>
            {showLoader ? (
                <View
                    style={{
                        position: 'absolute',
                        backgroundColor:
                            Platform.OS === 'android'
                                ? Color.BLACK + 'aa'
                                : Color.BLACK + '66',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 100
                    }}>
                    <ActivityIndicator
                        animating={true}
                        size="large"
                        color={Color.WHITE}
                    />
                    <MyText
                        text={text}
                        fontSize={16}
                        fontFamily="medium"
                        textColor="white"
                        marginVertical={10}
                    />
                </View>
            ) : null}
        </>
    );
};

export default CustomLoader;
