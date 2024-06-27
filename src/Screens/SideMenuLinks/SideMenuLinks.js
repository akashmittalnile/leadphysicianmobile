//import : react components
import React, { useState, useEffect } from 'react';
import { Dimensions, View, Text, TouchableOpacity } from 'react-native';
import MyText from '../../Components/MyText/MyText';
import MyHeader from '../../Components/MyHeader/MyHeader';
//import : custom components
// import MyHeader from 'components/MyHeader/MyHeader';
// import CustomLoader from 'components/CustomLoader/CustomLoader';
import Loader from '../../Components/Loader';
//import : third parties
import { WebView } from 'react-native-webview';

//import : styles
import { styles } from './SideMenuLinkStyle';
import Color, { dimensions } from '../../Global/Color';
//import : redux
///svg

import Arrow from '../../Global/Images/arroRight.svg'
import Cross from '../../Global/Images/close-circle.svg'
const SideMenuLinks = ({ navigation, route }) => {
    console.log('my url link for type--->>', route?.params?.type);
    //variables : redux variables
    //variables : route variables

    const [showLoader, setShowLoader] = useState(false);
    const [showLoader2, setShowLoader2] = useState(false);


    //UI
    return (
        <View style={styles.container}>

            <View style={[styles.hedaerContainer, { alignItems: 'center' }]}>

                <MyText
                    text={route?.params?.name ? route?.params?.name : ''}
                    fontFamily="Roboto"
                    fontWeight='500'
                    fontSize={18}
                    textColor={Color.LIGHT_BLACK}
                    style={{ width: dimensions.SCREEN_WIDTH * 0.80, textAlign: 'center', marginLeft: 23 }}
                />
                {console.log(route?.params?.id, 'route?.params?.id')}
                <TouchableOpacity style={styles.touchableContainer} onPress={() => {
                    route?.params?.type === 'quiz' ? navigation.navigate('Summary', { detail: route?.params?.detail, id: route?.params?.id }) :
                    // navigation.navigate('ModuleScreen', { detail: route?.params?.detail, id: route?.params?.id }) }
                    navigation.goBack()
                }
                    // SummaryWorksheet
                }>
                    <Cross style={{ alignSelf: 'center', alignItems: 'center' }} ></Cross>
                </TouchableOpacity>
            </View>
            <WebView
                source={{ uri: route?.params?.link }}
                contentMode="mobile"
                style={styles.webViewStyle}
            />
            {/* <CustomLoader showLoader={showLoader} /> */}

        </View >
    );
};

export default SideMenuLinks;
