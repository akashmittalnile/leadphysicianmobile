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
import MyHeader from '../Components/MyHeader/MyHeader';
import MyText from '../Components/MyText/MyText';
import * as Progress from 'react-native-progress';
import moment from 'moment';
//import : third parties

import Toast from 'react-native-toast-message';
import {dimensions} from '../Global/Color';
//import : global
import Color from '../Global/Color';
import {Service} from '../../../global/Index';
import {useIsFocused} from '@react-navigation/native';
//import api
import {
  GET_PROFILE,
  postApiWithToken,
  LOGOUT,
  getApiWithToken,
  GET_MYCOURSES,
  GET_COURSEDETAIL,
  GET_MODULEDETAIL,
} from '../Global/Service';
//import : styles
import {styles} from './ModuleListingStyle';
//import : modal
//import : redux
import {connect, useSelector, useDispatch} from 'react-redux';
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

import Loader from '../Components/Loader';

import Video from '../Global/Images/videoSvg.svg';
import Pdf from '../Global/Images/pdfsvg.svg';
import Quiz from '../Global/Images/quizSvg.svg';
import Worksheet from '../Global/Images/worksheetSvg.svg';
import Module from '../Global/Images/moduleImg.svg';
import Arrow from '../Global/Images/arrowRight.svg';
import Nodata from '../Global/Images/lock-circle.svg';
import TickDark from '../Global/Images/tickGreen.svg';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import VideoModal from '../Components/VideoModal/VideoModal';
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
  {
    id: '4',
    title: 'Module 4: Overcoming Obstacles',
  },
  {
    id: '5',
    title: 'Module 5: Dealing with Fear & Focus',
  },
  {
    id: '6',
    title: 'Module 6: Module 06',
  },
  {
    id: '7',
    title: 'Module 6: Module 07',
  },
  {
    id: '8',
    title: 'Module 6: Module 08',
  },
];
const addToCartObject = {};
const ModuleListing = ({navigation, dispatch, route}) => {
  console.log('my modle listing--->>>', route?.params?.id);
  const userToken = useSelector(state => state.user.userToken);
  console.log('my user tokemnnn--->>', userToken);
  const isFocus = useIsFocused();
  const LINE_HEIGTH = 25;
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState({isVisible: false, data: null});
  const [loading, setLoading] = useState('');
  const [moduleDetails, setModuleDeails] = useState([]);
  const [scrolling, setscrolling] = useState(false);
  const [date, setDate] = React.useState(moment().format('YYYY-MM-DD'));
  const [data, setData] = React.useState({});
  const [disableArrowRight, setDisableArrowRight] = React.useState(false);

  const [currentMonth, setCurrentMonth] = React.useState(
    parseInt(moment().format('YYYY-MM-DD').split('-')[1]),
  );
  const [currentYear, setCurrentYear] = React.useState(
    moment().format('YYYY-MM-DD').split('-')[0],
  );
  const [showTrendingLoader, setShowTrendingLoader] = useState(false);
  const [showSpecialLoader, setShowSpecialLoader] = useState(false);
  const scrollY = useSharedValue(0);
  const toggleModal = state => {
    setShowModal({
      isVisible: state.isVisible,
      data: state.data,
    });
  };
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
    var url = GET_MODULEDETAIL;
    var murl = `/` + route?.params?.id;
    url = url + murl;
    console.log('mu murlmodule===>', url);
    try {
      setLoading(true);
      const resp = await getApiWithToken(userToken, url);
      if (resp?.data?.status) {
        setModuleDeails(resp?.data?.data?.steps);
      } else {
        // Toast.show({ text1: resp.data.message });
      }
    } catch (error) {
      console.log('error in getCartCount', error);
    }
    setLoading(false);
  };

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
    console.log('my detailssstitle---->>>', item);
    return (
      <TouchableOpacity
        style={styles.moduleView}
        onPress={() => {
          item?.pass_status !== null && item?.pass_status === 'Pass'
            ? navigation.navigate('Summary', {
                detail: item,
                id: route?.params?.id,
              })
            : navigation.navigate('ModuleScreen', {
                id: item?.id,
                type: item?.type,
                courseId: item?.course_module_id,
              });
        }}>
        {item?.type === 'pdf' ? (
          <Pdf
            height={40}
            width={40}
            style={{justifyContent: 'center', marginTop: 12}}></Pdf>
        ) : item?.type === 'worksheet' ? (
          <Worksheet
            height={40}
            width={40}
            style={{justifyContent: 'center', marginTop: 12}}></Worksheet>
        ) : item?.type === 'quiz' ? (
          <Quiz
            height={42}
            width={42}
            style={{justifyContent: 'center', marginTop: 8}}></Quiz>
        ) : item?.type === 'video' ? (
          <Video
            height={40}
            width={40}
            style={{justifyContent: 'center', marginTop: 12}}></Video>
        ) : (
          <Module></Module>
        )}
        <View>
          <MyText
            text={`${
              item?.title === null
                ? ''
                : item.title.length > 25
                ? `${item?.title.substring(0, 25)}.....`
                : `${item?.title.substring(0, 25)}`
            }`}
            fontFamily="Roboto"
            fontWeight="bold"
            fontSize={15}
            textColor={Color.LIGHT_BLACK}
            style={{width: dimensions.SCREEN_WIDTH * 0.55, marginTop: 10}}
          />
          <MyText
            text={`${
              item?.description === null
                ? ''
                : item.description.length > 30
                ? `${item?.description.substring(0, 30)}.....`
                : `${item?.description.substring(0, 20)}`
            }`}
            fontFamily="Roboto"
            fontWeight="500"
            fontSize={14}
            textColor={Color.PRIMARY}
            style={{}}
          />
        </View>
        <TouchableOpacity
          style={
            item.is_complete === 1
              ? [styles.arrowView, {backgroundColor: 'white'}]
              : [styles.arrowView, {}]
          }
          onPress={() => {
            item?.pass_status !== null && item?.pass_status === 'Pass'
              ? navigation.navigate('Summary', {
                  detail: item,
                  id: route?.params?.id,
                })
              : navigation.navigate('ModuleScreen', {
                  id: item?.id,
                  type: item?.type,
                  courseId: item?.course_module_id,
                });
          }}>
          {item.is_complete === 1 ? <TickDark></TickDark> : <Arrow></Arrow>}
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  ///more data from the item
  const fetchMoreSpecialCourses = async () => {
    setShowSpecialLoader(true);
    console.log('klklklklklkl---->>');
  };
  ////loader
  const renderSpecialFooter = () => {
    console.log('renderT');
    return showSpecialLoader
      ? console.log('my loaderrrrrrr')
      : // <View style={{ flex: 1, justifyContent: 'center' }} >
        //     <ActivityIndicator size="large" color={'red'} />
        // </View>
        null;
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={Color.LIGHT_BLACK} />
      <View style={styles.container}>
        <MyHeader
          Title="List of Sections"
          isBackButton
          // shouldNavigateToModuleScreen={true}
          scrolling={scrolling}
          scrollY={scrollY}
          style={scrolling ? {zIndex: 99} : null}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: '20%'}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.mainView}>
          <View style={{flex: 1}}>
            <FlatList
              horizontal={false}
              data={moduleDetails}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={RenderItemLead}
              onEndReached={fetchMoreSpecialCourses}
              onEndReachedThreshold={0.1}
              ListFooterComponent={renderSpecialFooter}
              ListEmptyComponent={() => (
                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    width: dimensions.SCREEN_WIDTH * 0.9,
                    flex: 1,
                    alignItems: 'center',
                    height: dimensions.SCREEN_HEIGHT * 0.6,
                  }}>
                  <Nodata
                    style={{alignSelf: 'center'}}
                    height={119}
                    width={119}></Nodata>
                  <MyText
                    text={'No data found !'}
                    fontWeight="500"
                    fontSize={24}
                    textColor={Color.LIGHT_BLACK}
                    fontFamily="Roboto"
                    style={{alignSelf: 'center', top: 4}}
                  />
                  <MyText
                    text={
                      'Oops! this information is not available for a moment'
                    }
                    fontWeight="400"
                    fontSize={16}
                    textColor={'#959FA6'}
                    fontFamily="Roboto"
                    style={{
                      alignSelf: 'center',
                      textAlign: 'center',
                      width: dimensions.SCREEN_WIDTH * 0.6,
                      top: 4,
                    }}
                  />
                </View>
              )}
            />
          </View>
          {showModal.isVisible ? (
            <VideoModal
              isVisible={showModal.isVisible}
              toggleModal={toggleModal}
              videoDetail={{
                ...showModal?.data,
                url: showModal?.data?.introduction_video,
              }}
            />
          ) : null}
        </ScrollView>
        {loading ? <Loader /> : null}
      </View>
    </SafeAreaView>
  );
};

export default ModuleListing;
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
