//react components
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
//third parties
import ImageZoom from 'react-native-image-pan-zoom';

// //styles
import { styles } from "./FullImageViewStyle";
//svg
import CrossSvg from "../../Global/Images/x-black.svg";


const FullImageView = ({ route, navigation }) => {
    // console.error("FullImageView--------?");
    //variables : route variables
    const image = route.params.image;
    //function : navigation function 
    const goBackToChat = () => navigation?.pop()
    //UI
    return (
        <>
            <View style={styles.headerStyle}>
                <View/>
                {/* <TouchableOpacity
                    onPress={() => goBackToChat()}
                >
                    <BackSvg />
                </TouchableOpacity> */}
                <TouchableOpacity
                    onPress={() => goBackToChat()}
                >
                    <CrossSvg />
                </TouchableOpacity>
            </View>
            <ImageZoom
                style={styles.container}
                cropWidth={Dimensions.get('screen').width}
                cropHeight={Dimensions.get('screen').height}
                imageWidth={Dimensions.get('screen').width - 20}
                imageHeight={Dimensions.get('screen').height / 1.5}
            >

                <Image
                    resizeMode="contain"
                    style={styles.imageStyle}
                    source={{ uri:image }} />
            </ImageZoom>
        </>
    )
}

export default FullImageView;
