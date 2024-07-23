//import : react components
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Clipboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native';
//import :third parties
import Pdf from 'react-native-pdf';
import {WebView} from 'react-native-webview';
 
//import : styles
import {styles} from './ViewPdfStyle';
//svg
import CrossSvg from "../../Global/Images/x-black.svg";
 

const ViewPdf = ({navigation, route}) => {
  //variables : ref
  const pdfRef = useRef(null);
  //variables : route variables
  const pdfUrl = route.params.pdfUrl;
  const pdfTitle = route.params.pdfTitle;
  const Type = route.params.type;
  //hook : states
  const [selectedText, setSelectedText] = useState('');
  //function : navigation function
  const goBackToDetailPage = () => {
    navigation.pop();
  };
  //function : imp function
  const handleTextExtract = async page => {
    const extractedText = await pdfRef.current?.extractText(page);
    console.log('extractedText', extractedText);
    setSelectedText(extractedText);
  };
  //UI
  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <View />
        {/* <TouchableOpacity
                    onPress={() => goBackToChat()}
                >
                    <BackSvg />
                </TouchableOpacity> */}
        <Text style={styles.titleStyle}>{pdfTitle}</Text>
        <TouchableOpacity onPress={() => goBackToDetailPage()}>
        
        <CrossSvg />
               
        </TouchableOpacity>
      </View>
      {Type == 'PDF' ? (
        <Pdf
          ref={pdfRef}
          source={{uri: pdfUrl}}
          trustAllCerts={Platform.OS === 'ios' ? true : false}
          style={styles.pdf}
          // onPageChanged={page => {
          //   handleTextExtract(page);
          // }}
        />
      ) : (
        <WebView
          style={{flex: 1}}
          javaScriptEnabled={true}
          source={{
            uri: pdfUrl,
          }}
        />
      )}
    </View>
  );
};

export default ViewPdf;
