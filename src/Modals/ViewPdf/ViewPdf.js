//import : react components
import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Modal,
    TextInput,
    Keyboard,
    KeyboardAvoidingView,
    SafeAreaView,
} from 'react-native';
import FAB_Button from '../../Screens/FAB_Button/FAB_Button';
import FabDownload from '../../Screens/FabDownload/FabDownload';
import { useNavigation } from '@react-navigation/native';
//import : custom components
import MyText from '../../Components/MyText/MyText';
//import : globals

import Color from '../../Global/Color';
//import : styles
import { styles } from './ViewPdfStyle';
// import Modal from 'react-native-modal';


import Pdf from 'react-native-pdf';
import GlobalUtils from '../../Global/GlobalUtils';

const ViewPdf = ({ visible, setVisibility, pdfLink, handleDownload, pdfName }) => {
    const [pdfHeight, setPdfHeight] = useState(null);
    const [pdfWidth, setPdfWidth] = useState(null);
    //variables : navigation
    const navigation = useNavigation();
    //function : navigation function
    //function : modal function
    const closeModal = () => {
        setVisibility(false);
    };

    // console.log("pdfLink........",pdfLink);

    // const fileName = new URL(pdfLink).pathname.split('/').pop();
    const parts = pdfLink.split('/');

// Get the last part of the URL
const lastPart = parts[parts.length - 1];

// Split the last part by "." to get the filename without extension
const filenameParts = lastPart.split('.');
const lastName = filenameParts[0];

    // console.log("pdfName", lastName);



    const renderHeader = () => {
        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={closeModal} style={{ flex: 1 }}>
                    <Image
                        source={require('../../Global/Images/back-arrow.png')}
                        style={styles.backImage}
                    />
                </TouchableOpacity>
                <View style={styles.titleView}>
                    <MyText
                        text="PDF"
                        textColor={Color.DARK_GREY}
                        textAlign="center"
                        fontSize={16}
                        fontFamily="medium"
                    />
                </View>
                <View style={{ flex: 1 }} />
            </View>
        );
    };
    //UI
    return (
        <Modal
            isVisible={visible}
            onRequestClose={closeModal}
            animationType="fade"
            transparent>
            <SafeAreaView></SafeAreaView>
            <View style={styles.container}>
                <TouchableOpacity style={styles.blurView} onPress={closeModal} />
                <View style={styles.mainView}>
                    {renderHeader()}
                    <View
                        style={[
                            styles.pdfContainer,
                            // pdfHeight === null ? {} : {height: pdfHeight}
                        ]}>
                        <Pdf
                            source={{ uri: `${pdfLink}` }}
                            // source={{uri: `http://samples.leanpub.com/thereactnativebook-sample.pdf`}}
                            trustAllCerts={false}
                            onLoadComplete={(
                                numberOfPages,
                                path,
                                { width, height },
                                tableContents,
                            ) => {
                                console.log(`Number of pages: ${numberOfPages}`);
                                console.log(`{width, height}`, { width, height });
                                setPdfHeight(height);
                                setPdfWidth(width);
                            }}
                            onPageChanged={(page, numberOfPages) => {
                                console.log(`Current page: ${page}`);
                            }}
                            onError={error => {
                                console.log(error);
                            }}
                            onPressLink={uri => {
                                console.log(`Link pressed: ${uri}`);
                            }}
                            style={[
                                styles.crseImg,
                                // pdfHeight === null ? {} : {height: pdfHeight, width: pdfWidth}
                            ]}
                        />
                    </View>
                    <FabDownload
                        icon={<Image source={require('../../Global/Images/dowloadPdf.png')} style={{ height: 24, width: 24, resizeMode: 'contain' }} />}
                        bottom={50}
                        // onPress={handleDownload}
                        onPress={() => {
                            GlobalUtils.downloadPDF(pdfLink, lastName)
                            setVisibility(false);
                            console.log("dd");
                        }}

                    />
                 
                </View>
            </View>
        </Modal>
    );
};

export default ViewPdf;
