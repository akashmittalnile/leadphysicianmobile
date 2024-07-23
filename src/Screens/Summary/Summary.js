//import : react components
import React, {useEffect, useRef, useState} from 'react';
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
} from 'react-native';
//import : custom components
import MyHeader from '../../Components/MyHeader/MyHeader';
import MyText from '../../Components/MyText/MyText';
import CustomLoader from '../../Components/CustomLoader/CustomLoader';
import {useIsFocused} from '@react-navigation/native';
import {
  getApiWithToken,
  GET_MODULEDETAIL,
  MARK_COMPLETE,
  postApiWithToken,
  LIKE,
  GET_STEPDETAIL,
  SAVE_LATER,
} from '../../Global/Service';
import {connect, useSelector} from 'react-redux';
//import : third parties

import Toast from 'react-native-toast-message';
//import : global
import Color, {dimensions} from '../../Global/Color';
import {Service} from '../../../global/Index';
//import : styles
import {styles} from './SummaryStyle';
import * as Progress from 'react-native-progress';
//import : modal
//import : redux
// import { connect, useSelector } from 'react-redux';
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
// import AccordionItem from '../../../components/AccordionItem/AccordionItem';
// import ViewAll from '../../../components/ViewAll/ViewAll';
// import FAB_Button from '../../../components/FAB_Button/FAB_Button';
// import { createThumbnail } from 'react-native-create-thumbnail';
// import Review from '../../../modals/Review/Review';
// import VideoModal from '../../../components/VideoModal/VideoModal';
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
import thumbnailImg from '../../Global/Images/Thumbnail.svg';
import PlayImg from '../../Global/Images/playButton.svg';
import Star from '../../Global/Images/star.svg';
import Laptop from '../../Global/Images/laptop.svg';
import Profile from '../../Global/Images/profileCircle.svg';
import Calendar from '../../Global/Images/calendar.svg';
import Chapter from '../../Global/Images/savedBook.svg';
import Module from '../../Global/Images/moduleImg.svg';
import Arrow from '../../Global/Images/arrowRight.svg';
import Close from '../../Global/Images/close-circle.svg';
// import Progress from '../../Global/Images/Progrees.svg'
import rightArrow from '../../Global/Images/arrowRight.svg';
import ProfileImg from '../../Global/Images/profile.svg';
import ProgreeNew from '../../Global/Images/ProgreeNew.svg';
import Downlad from '../../Global/Images/download.svg';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

// const data = [
//     {
//         id: 1,
//         title: 'New Methods to try',
//         description:
//             'How to create animated swipe button from react native? Here we use react native reanimated v2 for creating this swipe button. React native animations are something that was complicated for me at the beginning.',
//         time: '15:00',
//     },
//     {
//         id: 3,
//         title: 'How to use coding ',
//         description:
//             'How to create animated swipe button from react native? Here we use react native reanimated v2 for creating this swipe button. React native animations are something that was complicated for me at the beginning.',
//         time: '15:00',
//     },
//     {
//         id: 4,
//         title: 'What is coding about',
//         description:
//             'How to create animated swipe button from react native? Here we use react native reanimated v2 for creating this swipe button. React native animations are something that was complicated for me at the beginning.',
//         time: '15:00',
//     },
//     {
//         id: 5,
//         title: 'How to create animations',
//         description:
//             'How to create animated swipe button from react native? Here we use react native reanimated v2 for creating this swipe button. React native animations are something that was complicated for me at the beginning.',
//         time: '15:00',
//     },
//     {
//         id: 6,
//         title: 'Possible to create layout animations?',
//         description:
//             'How to create animated swipe button from react native? Here we use react native reanimated v2 for creating this swipe button. React native animations are something that was complicated for me at the beginning.',
//         time: '15:00',
//     },
//     {
//         id: 7,
//         title: 'How to Create Swipe Buttons',
//         description:
//             'How to create animated swipe button from react native? Here we use react native reanimated v2 for creating this swipe button. React native animations are something that was complicated for me at the beginning.',
//         time: '15:00',
//     },
// ];
const reviewsData = [
  {
    id: '1',
    name: 'Annete Black',
    img: `https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60`,
    msg: `Perfectly packed all products received as said...but when connected with power supply it doesn't work, After some adjustments it worked perfectly felt very happy with the product. Thank you`,
  },
  {
    id: '2',
    name: 'Annete Black',
    img: `https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60`,
    msg: `Perfectly packed all products received as said...but when connected with power supply it doesn't work, After some adjustments it worked perfectly felt very happy with the product. Thank you`,
  },
];
const tags = [
  {name: 'Tatoos', id: '1'},
  {name: 'Tatoos Course', id: '2'},
  {name: 'Tatoos 2023', id: '3'},
  {name: 'Body Piercing', id: '4'},
];
const data = [
  {
    id: '1',
    title: 'Module 01',
  },
  {
    id: '2',
    title: 'Module 02 Improving Self-Image and Confidence',
  },
  {
    id: '3',
    title: 'Module 3 Goal Setting & Achieving',
  },
];
const addToCartObject = {};
const Summary = ({navigation, dispatch, route}) => {
  const isFocus = useIsFocused();
  const userToken = useSelector(state => state.user.userToken);
  const user = useSelector(state => state.user.userInfo);
  console.log('my user details--->>>', user);
  console.log('my route in summary0--->>', route?.params?.detail?.id);
  // const defaultImgPath = Image.resolveAssetSource(defaultImg).uri;
  //variables
  const LINE_HEIGTH = 25;
  //variables : redux
  // const userToken = useSelector(state => state.user.userToken);
  // const userInfo = useSelector(state => state.user.userInfo);
  // const [showLoader, setShowLoader] = useState(false);
  // const [selectedTag, setSelectedTag] = useState('1');
  // const [productDetails, setProductDetails] = useState({});
  // const [review, setReview] = useState('');
  // const [starRating, setStarRating] = useState(1);
  // const [showReviewModal, setShowReviewModal] = useState(false);
  // const [showModal, setShowModal] = useState({ isVisible: false, data: null });
  // const [documents, setDocuments] = useState([]);
  // const [showPrerequisiteModal, setShowPrerequisiteModal] = useState(false);
  // const [prerequisiteModalText, setPrerequisiteModalText] = useState('');
  // const [showNotPurchasedModal, setShowNotPurchasedModal] = useState(false);
  // const [showViewPdfModal, setShowViewPdfModal] = useState(false);
  // const [pdfLink, setPdfLink] = useState('');

  const [refreshing, setRefreshing] = useState(false);
  // const [showCourseTypeModal, setShowCourseTypeModal] = useState(false)
  const [scrolling, setscrolling] = useState(false);
  const [loading, setLoading] = useState('');
  const [moduleScreen, setModuleScreen] = useState({});
  const scrollY = useSharedValue(0);
  // useEffect(() => {
  //     // const unsubscribe = navigation.addListener('focus', () => {
  //     //   console.log('userToken', userToken);
  //     getProductDetails();
  //     // });
  //     // return unsubscribe;
  // }, []);
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

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      getCartCount();
      setLoading(false);
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [isFocus]);
  const getCartCount = async () => {
    var url = GET_STEPDETAIL;
    var murl = `/` + route?.params?.detail?.id;
    url = url + murl;
    console.log('mu murl===>', url);
    try {
      setLoading(true);
      const resp = await getApiWithToken(userToken, url);
      console.log('get sumary detailsss---->', resp?.data?.data);
      // resp?.data?.data?.steps
      if (resp?.data?.status) {
        console.log(
          'klklkll in other screennnn----->>>>',
          resp?.data?.data?.title,
        );

        setModuleScreen(resp?.data?.data);
        setLoading(false);
      } else {
        Toast.show({text1: resp.data.message});
      }
    } catch (error) {
      console.log('error in getCartCount', error);
      setLoading(false);
    }
    setLoading(false);
  };
  const handleScroll = event => {
    const yOffset = event.nativeEvent.contentOffset.y;
    scrollY.value = event.nativeEvent.contentOffset.y;
    if (yOffset === 0) {
      // Your code to handle reaching the top of the scroll view
      console.log('Reached the top');
      setscrolling(false);
    } else {
      setscrolling(true);
    }
  };

  const RenderItemLead = ({item}) => {
    console.log('muuuu item--->>', item);
    return (
      <TouchableOpacity
        style={styles.moduleView}
        onPress={() => {
          item.id === '1' ? navigation.navigate('ModuleScreen') : null;
        }}>
        <Module></Module>
        <View>
          <MyText
            text={item?.title}
            fontFamily="Roboto"
            fontWeight="bold"
            fontSize={14}
            textColor={Color.LIGHT_BLACK}
            style={{width: dimensions.SCREEN_WIDTH * 0.52}}
          />
          <MyText
            text={'2/4'}
            fontFamily="Roboto"
            fontWeight="500"
            fontSize={18}
            textColor={Color.PRIMARY}
          />
        </View>
        <TouchableOpacity
          style={{
            width: 44,
            height: 44,
            borderRadius: 5,
            backgroundColor: Color.PRIMARY,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 6,
          }}>
          <Arrow></Arrow>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  //retkae quiz
  const gotoSideMenuLinks = (name, link, detail, type) => {
    navigation.navigate('SideMenuLinks', {name, link, detail, type});
  };
  //UI
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={Color.LIGHT_BLACK} />
      {console.log('headerrrr--->>', route?.params?.id)}
      <View style={styles.container}>
        <MyHeader
          Title={moduleScreen.title ? moduleScreen.title : ''}
          isBackButton
          shouldNavigateToModuleScreen={true} // Set this based on your condition
          toNavigParams={{id: route?.params?.id}}
          scrolling={scrolling}
          scrollY={scrollY}
          style={scrolling ? {zIndex: 99} : null}
        />
        {/* <MyHeader Title="Home" isBackButton /> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: '20%'}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.mainView}>
          <View
            style={{
              width: dimensions.SCREEN_WIDTH * 0.9,
              height: 'auto',
              backgroundColor: Color.PRIMARY,
              marginTop: 20,
              borderRadius: 30,
            }}>
            {/* <ProfileImg style={{ alignSelf: 'center', marginVertical: 12 }}></ProfileImg> */}

            <Image
              source={
                user?.profile_image
                  ? {uri: user?.profile_image}
                  : require('../../Global/Images/user-default.png')
              }
              style={{
                height: 54,
                width: 54,
                borderRadius: 50,
                alignSelf: 'center',
                marginVertical: 12,
              }}
            />
            <MyText
              text={`${user?.first_name} ${user?.last_name}`}
              fontWeight="500"
              fontSize={14}
              textColor={Color.WHITE}
              fontFamily="Roboto"
              style={{alignSelf: 'center'}}
            />
            {/* <ImageBackground source={require('../../Global/Images/progress.png')}
                            style={{
                                width: 148,
                                height: 148,
                                alignSelf: 'center',
                                marginVertical: 16,
                                justifyContent: 'center'

                            }}>

                            <MyText text={`${route?.params?.detail?.percentage_obtained}%`} fontWeight='500' fontSize={27} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' style={{ alignSelf: 'center', }} />
                            <MyText text={'OVERALL SCORE'} fontWeight='500' fontSize={14} textColor={Color.WHITE} fontFamily='Roboto' style={{ alignSelf: 'center', }} />
                        </ImageBackground> */}

            <MyText
              text={
                moduleScreen?.is_complete === 1 &&
                moduleScreen?.is_complete !== undefined
                  ? 'Congratulations!'
                  : ''
              }
              fontWeight="500"
              fontSize={24}
              textColor={Color.WHITE}
              fontFamily="Roboto"
              style={{alignSelf: 'center', marginTop: 12}}
            />
            <MyText
              text={
                moduleScreen?.is_complete === 1 &&
                moduleScreen?.is_complete !== undefined
                  ? 'Quiz Passed!'
                  : 'Quiz Failed!'
              }
              fontWeight="400"
              fontSize={18}
              textColor={Color.WHITE}
              fontFamily="Roboto"
              style={{alignSelf: 'center', marginBottom: 20}}
            />
            <View
              style={{
                width: 63,
                height: 63,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                alignSelf: 'center',
                marginVertical: 55,
              }}>
              <Progress.Circle
                size={155}
                progress={
                  moduleScreen?.percentage_obtained !== undefined
                    ? moduleScreen?.percentage_obtained / 100
                    : 0.0
                }
                thickness={6}
                color={Color.LIGHT_BLACK}
                unfilledColor={Color.WHITE}
                borderWidth={0}
                showsText={false}
              />

              <MyText
                text={
                  moduleScreen?.percentage_obtained
                    ? `${moduleScreen?.percentage_obtained}%`
                    : '0%'
                }
                fontWeight="500"
                fontSize={29}
                textColor={Color.LIGHT_BLACK}
                fontFamily="Roboto"
                style={{
                  alignSelf: 'center',
                  alignSelf: 'center',
                  position: 'absolute',
                  top: -10,
                  width: 124,
                  textAlign: 'self',
                  textAlign: 'center',
                }}
              />
              <MyText
                text={'OVERALL SCORE'}
                fontWeight="500"
                fontSize={14}
                textColor={Color.WHITE}
                fontFamily="Roboto"
                style={{
                  position: 'absolute',
                  top: 40,
                  width: 128,
                  alignSelf: 'center',
                  textAlign: 'center',
                }}
              />
            </View>
          </View>

          <View
            style={{
              width: dimensions.SCREEN_WIDTH * 0.89,
              backgroundColor: Color.WHITE,
              height: 'auto',
              padding: 10,
              borderRadius: 5,
              marginVertical: 12,
            }}>
            <MyText
              text={
                moduleScreen?.title !== undefined ? moduleScreen?.title : null
              }
              fontWeight="bold"
              fontFamily="Roboto"
              fontSize={16}
              textColor={Color.LIGHT_BLACK}
              style={{marginHorizontal: 10}}
            />
            <MyText
              text={moduleScreen?.description}
              fontWeight="400"
              fontFamily="Roboto"
              fontSize={16}
              textColor={'#66757F'}
              style={{marginHorizontal: 10, lineHeight: 24}}
            />
          </View>
          {moduleScreen?.is_complete === 1 &&
          moduleScreen?.is_complete !== undefined ? null : (
            <TouchableOpacity
              style={styles.buttonBack}
              onPress={() => {
                gotoSideMenuLinks(
                  moduleScreen?.title,
                  moduleScreen?.quiz_url,
                  moduleScreen,
                  (type = 'quiz'),
                );
              }}>
              {/* <Arrow></Arrow> */}
              <MyText
                text={'Retake Quiz'}
                fontWeight="500"
                fontSize={14}
                textColor={Color.WHITE}
                fontFamily="Roboto"
                style={{
                  alignSelf: 'center',
                  marginVertical: 12,
                  marginLeft: 12,
                }}
              />
            </TouchableOpacity>
          )}

          {/* <TouchableOpacity style={[styles.buttonBack, { backgroundColor: Color.LIGHT_BLACK }]}>
                        <Downlad></Downlad>
                        <MyText text={'Download'} fontWeight='500' fontSize={14} textColor={Color.WHITE} fontFamily='Roboto' style={{ alignSelf: 'center', marginLeft: 12 }} />
                    </TouchableOpacity> */}
        </ScrollView>
      </View>

      {loading ? <Loader /> : null}
    </SafeAreaView>
  );
};
// const mapDispatchToProps = dispatch => ({
//     dispatch,
// });
export default Summary;
// export default connect(null, mapDispatchToProps)(CourseDetails);

const ViewAllSub = ({
  text,
  rating,
  reviews,
  onPress,
  style = {},
  buttonText = 'See All',
}) => {
  return (
    <View style={[styles.viewAllContainer, style]}>
      <View>
        <MyText
          text={text}
          fontFamily="medium"
          fontSize={18}
          textColor={'#455A64'}
        />
        <View style={styles.ratingView}>
          {/* <Image
                        source={require('assets/images/selected-star.png')}
                        style={{ height: 10, width: 10 }}
                    /> */}
          <star></star>
          <MyText
            text={'Reviews'}
            fontSize={13}
            fontFamily="regular"
            textColor={Color.PRIMARY}
            style={{marginLeft: 5}}
          />
          <MyText
            text={' (' + reviews + ')'}
            fontSize={13}
            fontFamily="regular"
            textColor={Color.PRIMARY}
            style={{}}
          />
        </View>
      </View>
      <TouchableOpacity onPress={onPress} style={styles.viewAll}>
        <MyText
          text={buttonText}
          fontFamily="regular"
          fontSize={13}
          textColor={'white'}
        />
      </TouchableOpacity>
    </View>
  );
};
