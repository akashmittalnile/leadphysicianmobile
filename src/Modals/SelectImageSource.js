//react components

import MyText from '../Components/MyText/MyText';
import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    TextInput,
    Keyboard,
    Image
} from 'react-native';
//styles
// import {styles} from './VerifyApptOtpStyle';
// global
import Color from '../Global/Color';
// import { Image } from 'react-native-svg';

const SelectImageSource = ({
    visible,
    setVisibility,
    openLibrary,
    openCamera,
}) => {
    //function : modal function
    const closeModal = () => {
        setVisibility(false);
    };

    return (
        <Modal
            visible={visible}
            onRequestClose={closeModal}
            animationType="fade"
            transparent>
            <View
                style={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    zIndex: 100,
                    backgroundColor: Color.BLACK + '66',
                }}>
                <TouchableOpacity onPress={closeModal} style={{ flex: 1 }} />
                <View
                    style={{
                        backgroundColor: Color.WHITE,
                        padding: 20,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 10,
                        }}>

                        <MyText
                            text={'Choose from '}
                            fontFamily="medium"
                            textAlign="center"
                            fontSize={18}
                        />

                        <TouchableOpacity
                            onPress={closeModal}
                            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                            {/* <MyIcon.AntDesign name="closecircleo" size={24} /> */}
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            marginVertical: 20,
                        }}>

                        <OptionButton
                            IconName={'camerao'}
                            Title="Camera"
                            onPress={openCamera}
                        />
                        <OptionButton
                            IconName={'picture'}
                            Title="Gallery"
                            onPress={openLibrary}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default SelectImageSource;

const OptionButton = ({ IconName, Title, onPress = () => { } }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ alignItems: 'center' }}>
            <View
                style={{
                    backgroundColor: Color.THEME_GOLD,
                    padding: 10,
                    borderRadius: 100,
                }}>
                {/* <MyIcon.AntDesign name={IconName} size={30} color="white" /> */}
                {Title === 'Camera' ? <Image source={require('../Global/Images/cameraModal.png')} style={{ height: 48, width: 48 }}></Image> : <Image source={require('../Global/Images/galleryModal.png')} style={{ height: 48, width: 48 }}></Image>}
            </View>
            <MyText text={Title} fontFamily="medium" marginVertical={10} />
        </TouchableOpacity>
    );
};
