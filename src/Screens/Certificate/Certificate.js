// //import : react components
// import React, { useEffect, useRef, useState, } from 'react';
// import {
//     View,
//     ScrollView,
//     Switch,
//     TouchableOpacity,
//     Dimensions,
//     Text,
//     Image,
//     FlatList,
//     ActivityIndicator,
//     Alert,
//     ImageBackground,
// } from 'react-native';
// //import : custom components
// import MyText from '../../Components/MyText/MyText';
// import Loader from '../../Components/Loader';
// //import : third parties
 
// import Toast from 'react-native-toast-message';
// //import : global
// import Color from '../../Global/Color';
// //import : styles
// import { styles } from './CertificateStyle';
// //import : modal
// //import : redux
// import { connect, useSelector } from 'react-redux';
// import { width, height } from '../../Global/Constants';

// import MyButton from '../../Components/MyButton/MyButton';
// // import {WebView} from 'react-native-webview';
// import Pdf from 'react-native-pdf';
// // import defaultCreatorImg from "../../../../../assets/images/default-content-creator-image.png";
// // svg images
// import Unfilledstar from '../../Global/Images/star.svg'
// import Thumbnil from '../../Global/Images/Thumbnail.svg'
// const Certificate = ({
//     certificateList,
//     downloadCertificate,
//     openInBrowser,
//     setShowViewPdfModal,
//     setPdfLink,
//     setPdfTitle,
//     loader
// }) => {
//     console.log('my loader from the other file---->>', loader);
//     // const defaultCreatorImgPath = Image.resolveAssetSource(defaultCreatorImg).uri;
//     const [loading, setLoading] = useState(true);
//     console.log('my loading details--->>', loading)
//     // useEffect(() => {
//     //   const timeout = setTimeout(() => {
//     //     setLoading(false); // Stop loading after timeout
//     //   }, 5000); // Timeout duration (in milliseconds)

//     //   return () => clearTimeout(timeout); // Cleanup on unmount or re-render

//     // }, []);
//     const data = [
//         {
//             id: 1,
//             title: 'kkkk',
//             rating: '6'

//         },
//         {
//             id: 2,
//             title: 'kkkk',
//             rating: '6'
//         }
//     ]
//     useEffect(() => {
//         console.log('did it reach to certificate', certificateList && certificateList.length > 0);
//         // if (certificateList.length > 0) {
//         //   console.log('my certificate lenght inside ---->>>');
//         //   setLoading(false); // Set loading to false when certificateList has data
//         // }

//     }, [certificateList]);

//     const renderCertificate = ({ item }) => {
//         return (
//             <View style={styles.courseContainer}>
//                 <View style={styles.courseSubContainer}>
//                     <Thumbnil height={100} width={50}></Thumbnil>
//                     {/* <ImageBackground
//                         source={{ uri: item?.thumb?.path }}
//                         style={styles.crseImg}
//                         imageStyle={{ borderRadius: 10 }}></ImageBackground> */}
//                     {/* <View style={styles.crseImg}>
//             <Pdf
//               source={{uri: item?.download_pdf}}
//               trustAllCerts={false}
//               onLoadComplete={(numberOfPages, filePath) => {
//                 console.log(`Number of pages: ${numberOfPages}`);
//               }}
//               onPageChanged={(page, numberOfPages) => {
//                 console.log(`Current page: ${page}`);
//               }}
//               onError={error => {
//                 console.log(error);
//               }}
//               onPressLink={uri => {
//                 console.log(`Link pressed: ${uri}`);
//               }}
//               style={styles.crseImg}
//             />
//           </View> */}
//                     <View style={{ marginLeft: 11, width: width * 0.55 }}>
//                         <MyText
//                             text={item.title}
//                             fontFamily="regular"
//                             fontSize={13}
//                             textColor={
//                                 '#6A6A6A'
//                             }
//                             style={{}}
//                         />
//                         <View style={styles.middleRow}>
//                             <View style={styles.ratingRow}>
//                                 {/* <Image source={require('assets/images/star.png')} style={{ height: 12, width: 12, resizeMode: 'contain' }} /> */}
//                                 <Unfilledstar></Unfilledstar>
//                                 <MyText
//                                     text={'5.7'}
//                                     fontFamily="regular"
//                                     fontSize={13}
//                                     textColor={'#6A6A6A'}
//                                     letterSpacing={0.13}
//                                     style={{ marginLeft: 5 }}
//                                 />
//                             </View>
//                             <View style={styles.crtrRow}>
//                                 {/* <Image
//                   source={require('assets/images/profile-circle.png')}
//                   // style={styles.crtrImg}
//                 /> */}
//                                 {/* <Image
//                                     source={{
//                                         uri: item?.creator_image ? item?.creator_image :

//                                             // defaultCreatorImgPath

//                                             null

//                                     }}
//                                     style={styles.createImgStyle}
//                                 /> */}
//                                 <MyText
//                                     text={item.creator_name}
//                                     fontFamily="regular"
//                                     fontSize={13}
//                                     textColor={Color.PRIMARY}
//                                     letterSpacing={0.13}
//                                     numberOfLines={1}
//                                     style={{ marginLeft: 10, width: '70%' }}
//                                 />
//                             </View>
//                         </View>
//                         <View style={styles.buttonsRow}>
//                             <MyButton
//                                 text="VIEW"
//                                 style={{
//                                     width: '35%',
//                                     height: 40,
//                                     marginTop: 8,
//                                     backgroundColor: Color.PRIMARY,
//                                 }}
//                                 onPress={() => {
//                                     // openInBrowser(item.download_pdf)
//                                     setShowViewPdfModal(true);
//                                     setPdfLink(item.download_pdf);
//                                     setPdfTitle(item.title);
//                                 }}
//                             />
//                             <MyButton
//                                 text="DOWNLOAD"
//                                 style={{
//                                     width: '50%',
//                                     height: 40,
//                                     marginTop: 8,
//                                     marginLeft: 12,
//                                     backgroundColor: Color.PRIMARY,
//                                 }}
//                                 onPress={() =>
//                                     downloadCertificate(item?.download_pdf, item?.title)
//                                 }
//                             />
//                         </View>
//                     </View>
//                 </View>
//             </View>
//         );
//     };
//     // if (loading) {
//     //   return (
//     //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//     //       <ActivityIndicator size="large" color="black" />
//     //       <Text>Loading...</Text>
//     //     </View>
//     //   ); // Show loader until certificates are loaded
//     // } else if
//     if (data.length === 0) {
//         return (
//             <View style={{ alignItems: 'center', marginTop: 50 }}>
//                 {/* <Image source={require('assets/images/no-data.png')} /> */}
//                 <MyText
//                     text={'No Certificates found'}
//                     fontFamily="medium"
//                     fontSize={40}
//                     textAlign="center"
//                     textColor={'black'}
//                 />
//             </View>
//         );
//     }
//     return (
//         <FlatList
//             data={data}
//             style={{ marginTop: 28 }}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={renderCertificate}
//         />
//     );
// };

// export default Certificate;
//import : react components
import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    ScrollView,
    Switch,
    TouchableOpacity,
    Dimensions,
    Text,
    Image,
    FlatList,
    ActivityIndicator,
    Alert,
    ImageBackground,
    SafeAreaView,
    StatusBar,
    RefreshControl,
    PermissionsAndroid,
    Platform
} from 'react-native';
import { dimensions } from '../../Global/Color';
import SearchWithIcon from '../../Components/SearchWithIcon/SearchWithIcon';

//import : custom components
import MyHeader from '../../Components/MyHeader/MyHeader';
import MyText from '../../Components/MyText/MyText';
import Bat from '../../Global/Images/bat.svg'
import NoData from '../../Global/Images/lock-circle.svg'
import Ongoing from '../../Global/Images/clock.svg'
import Pending from '../../Global/Images/timer.svg'
import Completed from '../../Global/Images/completedCourse.svg'
import { styles } from './CertificateStyle';
import Loader from '../../Components/Loader';
import { useIsFocused } from "@react-navigation/native";
// import CustomLoader from 'components/CustomLoader/CustomLoader';
import ViewPdf from '../../Modals/ViewPdf/ViewPdf';
//import : third parties

import Toast from 'react-native-toast-message';
//import : global
import Color from '../../Global/Color';
import { getApiWithToken, GET_FAVORIES, postApiWithToken, LIKE, GET_CETIFICATE } from '../../Global/Service';
import { width } from '../../Global/Constants';
import Unfilledstar from '../../Global/Images/star.svg'
import MyButton from '../../Components/MyButton/MyButton';
import Thumbnil from '../../Global/Images/Thumbnail.svg'
//import : styles

//import : modal
//import : redux
import { connect, useSelector } from 'react-redux';
//import svg
import Mycourse from '../../Global/Images/courses.svg'
import Resume from '../../Global/Images/playCircle.svg'
import Delte from '../../Global/Images/trash.svg'
const physicianCourse = [{
    id: '1',
    title: 'Leg joints',
    status: 'Completed'
},
{
    id: '2',
    title: 'Muscle repture',
    status: 'Ongoing'
},
{
    id: '3',
    title: 'Knee aligment',
    status: 'Pending'
},
{
    id: '4',
    title: 'Disloacted bones',
    status: 'Pending'
},

]
const data = [
    {
        id: 1,
        title: 'kkkk',
        rating: '6'

    },
    {
        id: 2,
        title: 'kkkk',
        rating: '6'
    }
]

// import {WebView} from 'react-native-webview';
import RNFetchBlob from 'rn-fetch-blob';
import GlobalUtils from '../../Global/GlobalUtils';
const Certificate = ({ navigation }) => {
    const isFocus = useIsFocused()
    //variables : redux

    const userToken = useSelector(state => state.user.userToken);
    //variables
    const LINE_HEIGTH = 25;
    //variables : redux

    const [showLoader, setShowLoader] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [categoriesData, setCategoriesData] = useState([]);
    const [filteredcategoryData, setFilteredcategoryData] = useState([]);
    const [favorites, setFvaorites] = useState([])
    const [loading, setLoading] = useState('')
    const [refreshing, setRefreshing] = useState(false);
    const [showViewPdfModal, setShowViewPdfModal] = useState(false);
    const [pdfLink, setPdfLink] = useState('');

    useEffect(() => {

    }, []);
    const checkcon = () => {
        getCartCount();
    };
    const wait = timeout => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    };
    const onRefresh = React.useCallback(() => {
        checkcon();
        wait(2000).then(() => {
            setRefreshing(false);
        });
    }, []);
    const downloadCertificate = async (link, title) => {
        console.log('my link in itke for the certificate-->>', link, title);
        // const androidExternalStoragePermission = null;

        if (Platform.OS == 'android') {
            // androidExternalStoragePermission = await PermissionsAndroid.request(
            //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            // );

            if (await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            ) != "granted") {
                Toast.show({ text1: "Android Permission Required!" });
                return;
            }
        }

        // if (androidExternalStoragePermission === "granted") {
        console.log('downloadCertificate', link);
        let pdfUrl = link;
        let DownloadDir =
            Platform.OS == 'ios'
                ? RNFetchBlob.fs.dirs.DocumentDir
                : RNFetchBlob.fs.dirs.DownloadDir;
        const { dirs } = RNFetchBlob.fs;
        const dirToSave =
            Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
        const configfb = {
            fileCache: true,
            useDownloadManager: true,
            notification: true,
            mediaScannable: true,
            title: `${title}`,
            path: `${dirToSave}.pdf`,
        };
        console.log('here');
        const configOptions = Platform.select({
            ios: {
                fileCache: configfb.fileCache,
                title: configfb.title,
                path: configfb.path,
                appendExt: 'pdf',
            },
            android: configfb,
        });
        console.log('here2');
        Platform.OS == 'android'
            ? RNFetchBlob.config({
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path: `${DownloadDir}/.pdf`,
                    description: 'LeadPhysician',
                    title: `${title} course certificate.pdf`,
                    mime: 'application/pdf',
                    mediaScannable: true,
                },

            })
                .fetch('GET', `${pdfUrl}`)
                .catch(error => {
                    console.warn(error.message);
                })
            : RNFetchBlob.config(configOptions)
                .fetch('GET', `${pdfUrl}`, {})
                .then(res => {
                    if (Platform.OS === 'ios') {
                        RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
                        RNFetchBlob.ios.previewDocument(configfb.path);
                    }
                    console.log('The file saved to ', res);
                })
                .catch(e => {
                    console.log('The file saved to ERROR', e.message);
                });
        // }
    };
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            getCartCount()

        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [isFocus]);

    ///get deatils
    const getCartCount = async () => {
        var url = GET_CETIFICATE
        console.log('mu murl===>', url);
        try {
            setLoading(true);
            const resp = await getApiWithToken(userToken, url);
            console.log('get resp?.data?.status--->>', resp);
            // resp?.data?.data?.steps
            if (resp?.data?.status) {

                setFvaorites(resp?.data?.data)
                setLoading(false)
                // setModuleScreen(resp?.data?.data)

            } else {
                Toast.show({ text1: resp.data.message });
                setLoading(false)
            }
        } catch (error) {
            console.log('error in getCartCount', error);
        }
        setLoading(false);
    };

    ///unfavorite
    // save or unsave
    const onSave = async (type, id, status) => {
        console.log('on save  id--->>>', id)
        setLoading(true);
        const formdata = new FormData();
        formdata.append('type', 'unsave');
        formdata.append('step_id', id);
        // formdata.append('status', status == '1' ? '0' : '1');
        console.log('onunsave formdata', formdata);
        try {
            const resp = await postApiWithToken(
                userToken,
                // status == '1' ? Service.UNLIKE_OBJECT_TYPE : LIKE_OBJECT_TYPE,
                LIKE,
                formdata,
            );
            console.log('onLike resp', resp?.data);
            if (resp?.data?.status) {
                Toast.show({ text1: resp.data.message });
                getCartCount();
            } else {
                Toast.show({ text1: resp.data.message });
            }
        } catch (error) {
            // console.log('error in onLike', error);
        }
        setLoading(false);
    };

    const RenderItemLead = ({ item }) => {
        console.log('item lead physician--->>dattaa', item);
        return (
            <View style={[styles.courseContainer, { width: dimensions.SCREEN_WIDTH * 0.93, alignSelf: 'center' }]}>
                <View style={styles.courseSubContainer}>
                    <ImageBackground
                        source={{ uri: item?.thumbnail }}
                        style={styles.crseImg}
                        imageStyle={{ borderRadius: 10, resizeMode: 'cover' }}></ImageBackground>
                    {/* <View style={styles.crseImg}>
                <Pdf
                  source={{uri: item?.download_pdf}}
                  trustAllCerts={false}
                  onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
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
                  style={styles.crseImg}
                />
              </View> */}
                    <View style={{ marginLeft: 11, width: width * 0.55 }}>
                        <MyText
                            text={item?.title}
                            fontFamily="regular"
                            fontWeight='bold'
                            fontSize={14}
                            textColor={'#6A6A6A'} />
                        <View style={styles.middleRow}>
                            <View style={styles.ratingRow}>
                                <Unfilledstar></Unfilledstar>
                                <MyText
                                    text={item?.avg_review}
                                    fontFamily="regular"
                                    fontSize={13}
                                    textColor={'#6A6A6A'}
                                    letterSpacing={0.13}
                                    style={{ marginLeft: 5 }} />
                            </View>
                            <View style={styles.crtrRow}>
                                <View style={styles.circleView}>
                                    <MyText
                                        text={'LP'}
                                        fontFamily="Roboto"
                                        fontWeight='500'
                                        fontSize={12}
                                        textColor={Color.PRIMARY}
                                        style={{ alignSelf: 'center' }} />
                                </View>
                                <MyText
                                    text={'Dr. Elsie Koh, MD MHL'}
                                    fontFamily="regular"
                                    fontSize={13}
                                    textColor={'#6A6A6A'}
                                    letterSpacing={0.13}
                                    numberOfLines={1}
                                    style={{ marginLeft: 10, width: '70%' }}
                                />
                            </View>
                        </View>
                        <View style={styles.buttonsRow}>
                            <MyButton
                                text="VIEW"
                                style={{
                                    width: '35%',
                                    height: 40,
                                    marginTop: 8,
                                    backgroundColor: Color.PRIMARY,
                                }}
                                onPress={() => {
                                    // openInBrowser(item.download_pdf)
                                    setShowViewPdfModal(true);
                                    setPdfLink(item?.certificate);
                                    // setPdfTitle(item?.title);
                                }}
                            />
                            <MyButton
                                text="DOWNLOAD"
                                style={{
                                    width: '50%',
                                    height: 40,
                                    marginTop: 8,
                                    marginLeft: 12,
                                    backgroundColor: Color.PRIMARY,
                                }}
                                onPress={() =>
                                    GlobalUtils.downloadPDF(item?.certificate, item?.title)
                                }
                            />
                        </View>
                    </View>
                </View>
            </View >
        )
    }
    //UI
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={Color.LIGHT_BLACK} />
            <View style={{
                flex: 1,
                backgroundColor: '#FDF6FF',
            }}>
                <MyHeader
                    Title={`My Certificates`}
                    isBackButton
                />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: '20%' }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    style={{}}>
                    <View style={{ marginTop: 10, }}>
                        <FlatList
                            horizontal={false}
                            data={favorites}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={RenderItemLead}
                            ListEmptyComponent={() => (
                                <View style={{
                                    alignSelf: 'center', justifyContent: 'center', width: dimensions.SCREEN_WIDTH * 0.90, flex: 1,
                                    alignItems: 'center', height: dimensions.SCREEN_HEIGHT * 0.60
                                }}>
                                    <NoData style={{ alignSelf: 'center' }} height={119} width={119}></NoData>
                                    <MyText text={'No data found !'} fontWeight='500' fontSize={24} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' style={{ alignSelf: 'center', top: 4 }} />
                                    <MyText text={'Oops! this information is not available for a moment'} fontWeight='400' fontSize={16} textColor={'#959FA6'} fontFamily='Roboto' style={{ alignSelf: 'center', textAlign: 'center', width: dimensions.SCREEN_WIDTH * 0.60, top: 4 }} />

                                </View>
                            )}
                        />
                    </View>

                </ScrollView>
                {loading ? <Loader /> : null}
                {/* <CustomLoader showLoader={showLoader} /> */}
            </View>
            {showViewPdfModal ? (
                <ViewPdf
                    visible={showViewPdfModal}
                    setVisibility={setShowViewPdfModal}
                    pdfLink={pdfLink || ''}
                    handleDownload={() => {
                        downloadCertificate(pdfLink);
                    }}
                />
            ) : null}
        </SafeAreaView>
    );
};
export default Certificate

