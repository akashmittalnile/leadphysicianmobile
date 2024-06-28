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
    Linking,
    Platform,
    RefreshControl,
    PermissionsAndroid,
    Modal
} from 'react-native';
//import : custom components
import MyHeader from '../../Components/MyHeader/MyHeader';
import MyText from '../../Components/MyText/MyText';
import Loader from '../../Components/Loader';
import CustomLoader from '../../Components/CustomLoader/CustomLoader';
import { useIsFocused } from "@react-navigation/native";
import WebView from 'react-native-webview';
//import : third parties

import Toast from 'react-native-toast-message';
//import : global
import Color, { dimensions } from '../../Global/Color';
// import { GET_PROFILE, postApiWithToken, LOGOUT, getApiWithToken, GET_MYCOURSES, GET_COURSEDETAIL, GET_MODULEDETAIL } from '../Global/Service';
import { getApiWithToken, GET_MODULEDETAIL, MARK_COMPLETE, postApiWithToken, LIKE, GET_STEPDETAIL, SAVE_LATER } from '../../Global/Service';
//import : styles
import { styles } from './ModuleScreenStyle';
//import : modal
//import : redux
import { connect, useDispatch, useSelector } from 'react-redux';
// import { width, height } from 'global/Constant';
// import Divider from 'components/Divider/Divider';
// // import {WebView} from 'react-native-webview';
// import MyButton from '../../../components/MyButton/MyButton';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import Pdf from '../../Global/Images/pdfsvg.svg'
// import AccordionItem from '../../../components/AccordionItem/AccordionItem';
// import ViewAll from '../../../components/ViewAll/ViewAll';
// import FAB_Button from '../../../components/FAB_Button/FAB_Button';
// import { createThumbnail } from 'react-native-create-thumbnail';
// import Review from '../../../modals/Review/Review';
import VideoModal from '../../Components/VideoModal/VideoModal';
import ViewPdf from '../../Modals/ViewPdf/ViewPdf';
// import RNFetchBlob from 'rn-fetch-blob';

import MyIcon from '../../Global/Images/pdfsvg.svg'
// import Modal from 'react-native-modal';
// import PrerequisiteModal from '../../../modals/PrerequisiteModal/PrerequisiteModal';
// import CourseNotPurshasedModal from '../../../modals/CourseNotPurchasedModal/CourseNotPurshasedModal';
// import RNFetchBlob from 'rn-fetch-blob';
// import ViewPdf from '../../../modals/ViewPdf/ViewPdf';
// import { setCartCount } from 'src/reduxToolkit/reducer/user';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import CourseTypeModal from '../../../modals/CourseType/CourseTypeModal';
// import { shareItemHandler } from '../../../global/globalMethod';
// import defaultImg from '../../../assets/images/default-content-creator-image.png';

//svg image
import thumbnailImg from '../../Global/Images/Thumbnail.svg'
import PlayImg from '../../Global/Images/playButton.svg'
import Module from '../../Global/Images/moduleImg.svg'
import Arrow from '../../Global/Images/arrowRight.svg'
import Tick from '../../Global/Images/tickCircleVide.svg'
import Saved from '../../Global/Images/frame.svg'
import Like from '../../Global/Images/like.svg'
import TickDark from '../../Global/Images/tickGreen.svg'
import HeartFilled from '../../Global/Images/heartGreen.svg'
import SaveFilled from '../../Global/Images/savedBook.svg'
import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { setFavCount } from '../../reduxToolkit/reducer/user';

const data = [{
    id: '1',
    title: 'Module 01',

},
{
    id: '2',
    title: 'Module 02 Improving Self-Image and Confidence',

},
{
    id: '3',
    title: 'Module 3 Goal Setting & Achieving'
},
]
const addToCartObject = {};
const ModuleScreen = ({ navigation,  route }) => {

    // const defaultImgPath = Image.resolveAssetSource(defaultImg).uri;
    //variables
    const LINE_HEIGTH = 25;
    const isFocus = useIsFocused()
    //variables : redux

    const userToken = useSelector(state => state.user.userToken);

    const dispatch = useDispatch()

    const [webViewVisible, setWebViewVisible] = React.useState(false);

    const [loading, setLoading] = useState('')
    const [showModal, setShowModal] = useState({ isVisible: false, data: null });
    const [showViewPdfModal, setShowViewPdfModal] = useState(false);
    const [pdfLink, setPdfLink] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [moduleScren, setModuleScreen] = useState({})
    // const [showCourseTypeModal, setShowCourseTypeModal] = useState(false)
    const [scrolling, setscrolling] = useState(false);
    const scrollY = useSharedValue(0);

    const checkcon = () => {
        // getProductDetails();
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
    const handleCloseWebView = () => {
        setWebViewVisible(false);
        navigation.navigate('BottomTab')
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
        console.log('get cart count ');
        var url = GET_STEPDETAIL
        var murl = `/` + route?.params?.id
        url = url + murl
        console.log('mu murl worksheet===>', url);
        try {
            setLoading(true);
            const resp = await getApiWithToken(userToken, url);
            // resp?.data?.data?.steps
            if (resp?.data?.status) {
                setModuleScreen(resp?.data?.data)
                setLoading(false)

            } else {
                setLoading(false)
                Toast.show({ text1: resp.data.message });
            }
        } catch (error) {
            console.log('error in getCartCount', error);
        }
        setLoading(false);
    };

    /////marked as completed
    const markAsCompleted = async (chapter_step_id, status) => {

        setLoading(true);
        const formdata = new FormData();
        formdata.append('step_id', chapter_step_id);
        formdata.append('type', status === 0 ? 'save' : 'unsave')

        try {
            const resp = await postApiWithToken(
                userToken,
                MARK_COMPLETE,
                formdata,
            );
            // console.log('markAsCompleted resp', resp?.data);
            if (resp?.data?.status) {
                Toast.show({ text1: resp.data.message });
                getCartCount();
                setLoading(false)
            } else {
                Toast.show({ text1: resp.data.message });
            }
        } catch (error) {
            // console.log('error in markAsCompleted', error);
        }
        setLoading(false);
    };

    //like or unlike
    const onLike = async (type, id, status) => {

        const formdata = new FormData();
        formdata.append('type', status === 0 ? 'save' : 'unsave');
        formdata.append('step_id', id);
        // formdata.append('status', status == '1' ? '0' : '1');
        console.log('onLike formdata', formdata);
        try {
            const resp = await postApiWithToken(
                userToken,
                // status == '1' ? Service.UNLIKE_OBJECT_TYPE : LIKE_OBJECT_TYPE,
                LIKE,
                formdata,
            );

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

    // save or unsave
    const onSave = async (type, id, status) => {
        setLoading(true);
        const formdata = new FormData();
        formdata.append('type', status === 1 ? 'unsave' : 'save');
        formdata.append('step_id', id);
        // formdata.append('status', status == '1' ? '0' : '1');
        console.log('my saved formdata--->>', formdata);
        try {
            const resp = await postApiWithToken(
                userToken,
                // status == '1' ? Service.UNLIKE_OBJECT_TYPE : LIKE_OBJECT_TYPE,
                SAVE_LATER,
                formdata,
            );

            if (resp?.data?.status) {
                Toast.show({ text1: resp.data.message });
                dispatch(setFavCount((1)))
                getCartCount();
            } else {
                Toast.show({ text1: resp.data.message });
            }
        } catch (error) {
            // console.log('error in onLike', error);
        }
        setLoading(false);
    };

    const handleScroll = event => {
        const yOffset = event.nativeEvent.contentOffset.y;
        scrollY.value = event.nativeEvent.contentOffset.y;
        if (yOffset === 0) {
            // Your code to handle reaching the top of the scroll view

            setscrolling(false);
        } else {
            setscrolling(true);
        }
    };

    const RenderItemLead = ({ item }) => {
        return (
            <View style={styles.moduleView}>
                <Module></Module>
                <View>
                    <MyText
                        text={item?.title}
                        fontFamily="Roboto"
                        fontWeight='bold'
                        fontSize={14}
                        textColor={Color.LIGHT_BLACK}
                        style={{ width: dimensions.SCREEN_WIDTH * 0.52 }}
                    />
                    <MyText
                        text={'2/4'}
                        fontFamily="Roboto"
                        fontWeight='500'
                        fontSize={18}
                        textColor={Color.PRIMARY}
                    />
                </View>
                <TouchableOpacity style={{
                    width: 44, height: 44,
                    borderRadius: 5, backgroundColor: Color.PRIMARY, justifyContent: 'center', alignItems: 'center', marginTop: 6
                }}>
                    <Arrow></Arrow>
                </TouchableOpacity>
            </View>
        )
    }

    const toggleModal = state => {
        setShowModal({
            isVisible: state.isVisible,
            data: state.data,
        });
    };
    /// for quiz redirection
    const gotoSideMenuLinks = (name, link, detail, type, id) => {
        navigation.navigate('SideMenuLinks', { name, link, detail, type, id });
    };


    ////download certificate



    ////render item id
    const RenderItemPdf = ({ item }) => {
        console.log('my detailssstitle---->>>', item);
        return (
            <TouchableOpacity onPress={() => { setShowViewPdfModal(true), setPdfLink(item?.details); }} style={styles.moduleView}  >
                <MyIcon height={40} width={40} style={{ justifyContent: 'center', marginTop: 12 }}></MyIcon>
                <View style={{ justifyContent: 'center' }}>
                    <MyText
                        text={item?.pdf_name}
                        fontFamily="Roboto"
                        fontWeight='bold'
                        fontSize={15}
                        textColor={Color.LIGHT_BLACK}
                        style={{ width: dimensions.SCREEN_WIDTH * 0.50, marginTop: 10, marginLeft: 12 }}
                    />

                </View>
                {/* <TouchableOpacity style={item.is_complete === 1 ? [styles.arrowView, { backgroundColor: 'white' }] : [styles.arrowView, {}]} onPress={() => {
                    item?.pass_status !== null && item?.pass_status === 'Pass' ? navigation.navigate('Summary', { detail: item, id: route?.params?.id }) : navigation.navigate('ModuleScreen', { id: item?.id, type: item?.type, courseId: item?.course_module_id })
                }}>
                    {item.is_complete === 1 ? <TickDark></TickDark> : <Arrow></Arrow>}
                </TouchableOpacity> */}
                <TouchableOpacity style={[styles.arrowView, { backgroundColor: Color.PRIMARY }]}
                    onPress={() => { setShowViewPdfModal(true), setPdfLink(item?.details); }}>
                    <Arrow></Arrow>
                </TouchableOpacity >
            </TouchableOpacity >
        )
    }



    //UI
    return (

        <SafeAreaView style={{ flex: 1 }}>
            {console.log('llll module detail===>', moduleScren?.title)}
            <StatusBar backgroundColor={Color.LIGHT_BLACK} />
            <View style={styles.container}>
                <MyHeader Title={`Module : ${moduleScren?.title !== undefined || moduleScren?.title === null ? moduleScren?.title : "Chapter 3"}`} isBackButton
                    scrolling={scrolling}
                    scrollY={scrollY}
                    style={scrolling ? { zIndex: 99 } : null}
                />
                {/* <MyHeader Title="Home" isBackButton /> */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: '20%' }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    style={styles.mainView}>

                    {/* {productDetails?.thumb?.path && <ImageBackground
                        source={{ uri: productDetails?.thumb?.path }}
                        // source={require('assets/images/rectangle-1035.png')}
                        style={styles.crseImg}
                        imageStyle={{ borderRadius: 10 }}> */}
                    <View style={styles.background}>
                        {console.log('mu tytytytyt---->>>', route?.params?.type)}
                        {route?.params?.type === 'video' ? <ImageBackground
                            // source={{ uri: productDetails?.thumb?.path }}
                            source={{ uri: moduleScren?.course_thumbnail }}
                            style={styles.crseImg}
                            imageStyle={{ borderRadius: 10 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setShowModal({
                                        isVisible: true,
                                        data: moduleScren,
                                    });
                                }}>
                                {/* <Image source={require('assets/images/play-icon.png')} /> */}
                                <PlayImg></PlayImg>
                            </TouchableOpacity>
                        </ImageBackground>
                            :
                            route?.params?.type === 'pdf' ?
                                <View
                                    style={{
                                        height: 232,

                                        position: 'relative',
                                        width: 140,
                                        borderRadius: 10,
                                        width: dimensions.SCREEN_WIDTH * 0.90,
                                        overflow: 'hidden', // Clip content that exceeds the borderRadius
                                    }}
                                    onPress={() => {

                                    }}
                                >
                                    <LinearGradient
                                        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.43)']}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            position: 'absolute',
                                            zIndex: 1,
                                            borderRadius: 10, // Apply the borderRadius to the LinearGradient
                                        }}
                                    >
                                        <View
                                            style={{
                                                flex: 1,
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginBottom: 20,

                                            }}
                                        >
                                            {/* <TouchableOpacity style={{ backgroundColor: Color.PRIMARY, height: 50, width: 'auto', alignSelf: 'center', justifyContent: 'center', borderRadius: 10 }} onPress={() => { setShowViewPdfModal(true), setPdfLink(moduleScren?.details); }}>
                                                <Text style={{ fontSize: 14, fontWeight: '500', color: Color.WHITE, alignSelf: 'center', paddingHorizontal: 12 }}>{'View PDF'}</Text>
                                            </TouchableOpacity> */}
                                        </View>
                                    </LinearGradient>
                                    <Image
                                        source={{ uri: moduleScren?.course_thumbnail }}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            position: 'absolute',
                                            borderRadius: 10, // Apply the same borderRadius to the image
                                        }}
                                        resizeMode='cover'
                                    />
                                </View> :
                                route?.params?.type === 'quiz' ?
                                    <View
                                        style={{
                                            height: 232,

                                            position: 'relative',
                                            width: 140,
                                            borderRadius: 10,
                                            width: dimensions.SCREEN_WIDTH * 0.90,
                                            overflow: 'hidden', // Clip content that exceeds the borderRadius
                                        }}
                                        onPress={() => {

                                        }}
                                    >
                                        <LinearGradient
                                            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.43)']}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                position: 'absolute',
                                                zIndex: 1,
                                                borderRadius: 10, // Apply the borderRadius to the LinearGradient
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flex: 1,
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    marginBottom: 20,

                                                }}
                                            >
                                                <TouchableOpacity style={{ backgroundColor: Color.PRIMARY, height: 50, width: 'auto', alignSelf: 'center', justifyContent: 'center', borderRadius: 10 }} onPress={() => { gotoSideMenuLinks(moduleScren?.title, moduleScren?.quiz_url, moduleScren, type = 'quiz', route?.params?.courseId) }}>
                                                    <Text style={{ fontSize: 14, fontWeight: '500', color: Color.WHITE, alignSelf: 'center', paddingHorizontal: 12 }}>{'Start Quiz'}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </LinearGradient>
                                        {console.log('my module thumbnail--->>', module?.course_thumbnail)}
                                        <Image
                                            source={{ uri: module?.course_thumbnail }}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                position: 'absolute',
                                                borderRadius: 10, // Apply the same borderRadius to the image
                                            }}
                                            resizeMode='cover'
                                        />
                                    </View> :
                                    route?.params?.type === 'worksheet' ?
                                        <View
                                            style={{
                                                height: 232,

                                                position: 'relative',
                                                width: 140,
                                                borderRadius: 10,
                                                width: dimensions.SCREEN_WIDTH * 0.90,
                                                overflow: 'hidden', // Clip content that exceeds the borderRadius
                                            }}
                                            onPress={() => {

                                            }}
                                        >
                                            <LinearGradient
                                                colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.43)']}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    position: 'absolute',
                                                    zIndex: 1,
                                                    borderRadius: 10, // Apply the borderRadius to the LinearGradient
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        flex: 1,
                                                        flexDirection: 'column',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        marginBottom: 20,

                                                    }}
                                                >
                                                    <TouchableOpacity style={{ backgroundColor: Color.PRIMARY, height: 50, width: 'auto', alignSelf: 'center', justifyContent: 'center', borderRadius: 10 }} onPress={() => {
                                                        const url = moduleScren?.submitted_worksheet_url ? moduleScren?.submitted_worksheet_url : moduleScren?.worksheet_url
                                                        { gotoSideMenuLinks('Chapter 3', url, moduleScren, type = 'worksheet',) }
                                                    }

                                                    }  >
                                                        <Text style={{ fontSize: 14, fontWeight: '500', color: Color.WHITE, alignSelf: 'center', paddingHorizontal: 12 }}>{'View Worksheet'}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </LinearGradient>
                                            <Image
                                                source={{ uri: moduleScren?.course_thumbnail }}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    position: 'absolute',
                                                    borderRadius: 10, // Apply the same borderRadius to the image
                                                }}
                                                resizeMode='cover'
                                            />
                                        </View>
                                        : null}
                    </View>
                    {console.log('moduleScren?.is_complete', moduleScren?.course_thumbnail)}
                    {console.log('my module screenstatus--->>', moduleScren?.is_complete)}
                    {
                        route?.params?.type === 'worksheet' || route?.params?.type === 'quiz' ? null :
                            <TouchableOpacity style={moduleScren?.is_complete === 0 ? [styles.completeButton, {
                                backgroundColor: 'white', borderWidhth: 1, borderColor: Color.PRIMARY
                            }] : [styles.completeButton,]}
                                onPress={() => { markAsCompleted(moduleScren?.id, moduleScren?.is_complete) }}>
                                {moduleScren?.is_complete === 0 ?
                                    <TickDark></TickDark> :
                                    <Image source={require('../../Global/Images/tickWhiteCircle.png')}></Image>}
                                <MyText
                                    text={moduleScren?.is_complete === 0 ? 'Mark as Complete' : 'Completed'}
                                    fontWeight="500"
                                    fontSize={14}
                                    textColor={moduleScren?.is_complete === 0 ? Color.PRIMARY : Color.WHITE}
                                    fontFamily="Roboto"
                                    style={{ marginHorizontal: 12 }}
                                />
                            </TouchableOpacity>
                    }

                    {
                        route?.params?.type === 'worksheet' || route?.params?.type === 'quiz' ?
                            <View style={{ marginTop: 15 }}>

                            </View> : null
                    }
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={moduleScren?.is_favourite === 0 ? styles.buttonClick : [styles.buttonClick, { backgroundColor: 'white' }]}
                            onPress={() => {
                                onLike('1', moduleScren.id, moduleScren?.is_favourite
                                );
                            }}
                        >
                            {moduleScren?.is_favourite === 0 ? <Like></Like> : <HeartFilled></HeartFilled>}
                            {console.log('my favoriyrrrrrr---->>>', moduleScren?.is_favourite)}
                            <MyText
                                text={moduleScren?.is_favourite === 0 ? 'Save to Favorites' : 'Added to Favorites'}
                                fontWeight='500'
                                fontFamily="Roboto"
                                fontSize={14}
                                textColor={moduleScren?.is_favourite === 0 ? Color.WHITE : Color.PRIMARY}
                                style={{ marginHorizontal: 3 }}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity style={moduleScren?.is_saved === 0 ? [styles.buttonClick, { backgroundColor: Color.LIGHT_BLACK }] : [styles.buttonClick, { backgroundColor: Color.WHITE, borderColor: Color.LIGHT_BLACK }]} onPress={() => {
                            // navigation.navigate('Saved')
                            onSave('1', moduleScren?.id, moduleScren?.is_saved)
                        }}>
                            {moduleScren?.is_saved === 0 ? <Saved></Saved> : <SaveFilled></SaveFilled>}

                            {/* HeartFilled */}
                            <MyText
                                text={moduleScren?.is_saved === 0 ? 'Save for Later' : 'Saved to Later'}
                                fontWeight='500'
                                fontFamily="Roboto"
                                fontSize={14}
                                textColor={moduleScren?.is_saved === 0 ? Color.WHITE : Color.LIGHT_BLACK}
                                style={{ marginHorizontal: 3 }}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.ViewDescription}>
                        <MyText
                            text={moduleScren?.title === null ? 'Chapter 3' : moduleScren?.title}
                            fontWeight='bold'
                            fontFamily="Roboto"
                            fontSize={16}
                            textColor={Color.LIGHT_BLACK}
                            style={{ marginHorizontal: 10 }}
                        />
                        <MyText
                            text={moduleScren?.description}
                            fontWeight='400'
                            fontFamily="Roboto"
                            fontSize={16}
                            textColor={'#66757F'}
                            style={{ marginHorizontal: 10, lineHeight: 24 }}
                        />
                    </View>

                    {route?.params?.type === 'pdf' ? <View>
                        <MyText text={`Worksheet PDF's`} fontWeight='500' fontSize={24} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' style={{ top: 4, marginVertical: 12 }} />
                    </View> : null}

                    {route?.params?.type === 'pdf' ? <View style={{ flex: 1, }}>
                        <FlatList
                            horizontal={false}
                            data={moduleScren?.pdfs}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={RenderItemPdf}

                            ListEmptyComponent={() => (
                                <View style={{
                                    alignSelf: 'center', justifyContent: 'center', width: dimensions.SCREEN_WIDTH * 0.90, flex: 1,
                                    alignItems: 'center', height: dimensions.SCREEN_HEIGHT * 0.60
                                }}>

                                    <MyText text={'No data found !'} fontWeight='500' fontSize={24} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' style={{ alignSelf: 'center', top: 4 }} />
                                    <MyText text={'Oops! this information is not available for a moment'} fontWeight='400' fontSize={16} textColor={'#959FA6'} fontFamily='Roboto' style={{ alignSelf: 'center', textAlign: 'center', width: dimensions.SCREEN_WIDTH * 0.60, top: 4 }} />

                                </View>
                            )}

                        />
                    </View> : null}


                </ScrollView >
            </View >

            {/* pdf modal */}
            {
                showViewPdfModal ? (
                    <ViewPdf
                        visible={showViewPdfModal}
                        setVisibility={setShowViewPdfModal}
                        pdfLink={pdfLink || ''}
                        handleDownload={() => {
                            // downloadCertificate(pdfLink);
                        }}
                    />
                ) : null
            }

            {/* Video Modal */}
            {
                showModal.isVisible ? (
                    <VideoModal
                        isVisible={showModal.isVisible}
                        toggleModal={toggleModal}
                        videoDetail={{
                            ...showModal?.data,
                            url: moduleScren?.details,
                        }}
                    // {...props}
                    />
                ) : null
            }


            {loading ? <Loader /> : null}
        </SafeAreaView >
    );
};
// const mapDispatchToProps = dispatch => ({
//     dispatch,
// });
export default ModuleScreen;
// export default connect(null, mapDispatchToProps)(CourseDetails);


