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
import ViewPdf from '../../Modals/ViewPdf/ViewPdf';
//import : custom components
import MyButton from '../../Components/MyButton/MyButton';
import MyHeader from '../../Components/MyHeader/MyHeader';
import MyText from '../../Components/MyText/MyText';
import Loader from '../../Components/Loader';
import CustomLoader from '../../Components/CustomLoader/CustomLoader';
import FAB_Button from '../FAB_Button/FAB_Button';
import Review from '../../Modals/Review/Review';
//import : third parties
import RNFetchBlob from 'rn-fetch-blob';
import Toast from 'react-native-toast-message';
//import : global
import Color, {dimensions} from '../../Global/Color';
import {Service} from '../../../global/Index';
//import : styles
import {styles} from './CourseDetailStyle';
import {useIsFocused} from '@react-navigation/native';
import * as Progress from 'react-native-progress';

//import api
import {
  GET_PROFILE,
  postApiWithToken,
  LOGOUT,
  getApiWithToken,
  GET_MYCOURSES,
  GET_COURSEDETAIL,
  POST_REVIEW,
  ALL_REVIE,
} from '../../Global/Service';
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

import thumbnailImg from '../../Global/Images/Thumbnail.svg';
import PlayImg from '../../Global/Images/playButton.svg';
import Star from '../../Global/Images/star.svg';
import Laptop from '../../Global/Images/laptop.svg';
import Profile from '../../Global/Images/profileCircle.svg';
import Calendar from '../../Global/Images/calendar.svg';
import Chapter from '../../Global/Images/savedBook.svg';
import Module from '../../Global/Images/moduleImg.svg';
import Arrow from '../../Global/Images/arrowRight.svg';
import LaptopBar from '../../Global/Images/laptopBar.svg';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import VideoModal from '../../Components/VideoModal/VideoModal';
import ReviewImg from '../../Global/Images/ReviewGreen.svg';
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
const CourseDetail = ({navigation, route}) => {
     // variables : ref
  const reviewRef=useRef();
  //variables
  const dispatch = useDispatch();
  //variables
  const LINE_HEIGTH = 25;
  //variables : redux
  const userToken = useSelector(state => state.user.userToken);
  const userInfo = useSelector(state => state.user.userInfo);
  const isFocus = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const[reviewbutton,setReviewbutton]=useState('false');
  const [showModal, setShowModal] = useState({isVisible: false, data: null});
  const [loading, setLoading] = useState('');
  const [myCoursesDetail, setMyCoursesDetail] = useState("");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showViewPdfModal, setShowViewPdfModal] = useState(false);
  const [review, setReview] = useState('');
  const [starRating, setStarRating] = useState('');
  const [selectedId, setSelectedId] = useState('1');
  const [selectedType, setSelectedType] = useState(null);
  const[avgRating,setAvgRating]=useState("");
  const [reviews, setReviews] = useState([]);
  const [pdfLink, setPdfLink] = useState('');
  // const [showCourseTypeModal, setShowCourseTypeModal] = useState(false)
  const [scrolling, setscrolling] = useState(false);
  const scrollY = useSharedValue(0);
  const toggleModal = state => {
    setShowModal({
      isVisible: state.isVisible,
      data: state.data,
    });
  };
  // useEffect(() => {

  const checkcon = () => {
    getCartCount();
    setReviewbutton(false);
    allReview();
  };
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  // const onRefresh = React.useCallback(() => {
  //     checkcon();
  //     wait(2000).then(() => {
  //         setRefreshing(false);
  //     });
  // }, [route?.params?.id]);
  const onRefresh = React.useCallback(() => {
    checkcon();
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);

  ////all reviews
  const gotoAllReviews = () => {
    navigation.navigate('AllReviews', {
      id: route?.params?.id,
      //   type: '1',
      //   isPurchased: productDetails?.isPurchased,
    });
  };
  ///get course detail
  const getCartCount = async () => {
    var url = GET_COURSEDETAIL;
    var murl = `/` + route?.params?.id;
    url = url + murl;

    try {
      setLoading(true);
      const resp = await getApiWithToken(userToken, url);

      if (resp?.data?.status) {
        console.log("Cousre details resp data------>".resp?.data?.data);
        // setReviewbutton(resp?.data?.data?.is_reviewed);
        // setProfile(resp?.data?.data)
        setMyCoursesDetail(resp?.data?.data);
      } else {
        Toast.show({text1: resp.data.message});
      }
    } catch (error) {
      console.log('error in getCartCount', error);
    }
    setLoading(false);
  };
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // setLoading(true);
      getCartCount();
      allReview();
      // setLoading(false);
      setReviewbutton(false);
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [isFocus]);

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

  const RenderItemLead = ({item,index}) => {
    const totalSteps = item.total_step_count;
    const completedSteps = item.completed_step_count;
    const progress = totalSteps === 0 ? 0 : completedSteps / totalSteps;

    return (
      <TouchableOpacity key={item?.id}
        style={[styles.moduleView, {}]}
        onPress={() => navigation.navigate('ModuleListing', {id: item.id})}>
        <View
          style={{
            width: 63,
            height: 63,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}>
          <Progress.Circle
            size={63}
            progress={progress}
            thickness={6}
            color={Color.PRIMARY}
            unfilledColor={Color.LIGHT_BLACK}
            borderWidth={0}
            showsText={false}
          />
          <LaptopBar
            style={{
              alignSelf: 'center',
              position: 'absolute',
              width: 30, // Adjust the size as needed
              height: 30, // Adjust the size as needed
              borderRadius: 15,
            }}></LaptopBar>
        </View>
        <View>
          <MyText
            text={item?.module}
            fontFamily="Roboto"
            fontWeight="bold"
            fontSize={14}
            textColor={Color.LIGHT_BLACK}
            style={{
              width: dimensions.SCREEN_WIDTH * 0.52,
              justifyContent: 'center',
              marginTop: 9,
            }}
          />
          <MyText
            text={`${item.completed_step_count}/${item.total_step_count}`}
            fontFamily="Roboto"
            fontWeight="500"
            fontSize={18}
            textColor={Color.PRIMARY}
            style={{
              width: dimensions.SCREEN_WIDTH * 0.52,
              justifyContent: 'center',
            }}
          />
        </View>

        <TouchableOpacity
          style={styles.arrowVew}
          onPress={() => navigation.navigate('ModuleListing', {id: item.id})}>
          <Arrow></Arrow>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  //open review modal
  const openReviewModal = () => {
    console.log("dadadadadadadadadad");
    setShowReviewModal(true);
    // setSelectedId(id);
    // setSelectedType(type);
     
  };
  ////download certficate
  const downloadCertificate = async link => {
    const androidExternalStoragePermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (androidExternalStoragePermission === 'granted') {
      console.log('downloadCertificate', link);
      let pdfUrl = link;
      let DownloadDir =
        Platform.OS == 'ios'
          ? RNFetchBlob.fs.dirs.DocumentDir
          : RNFetchBlob.fs.dirs.DownloadDir;
      const {dirs} = RNFetchBlob.fs;
      const dirToSave =
        Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
      const configfb = {
        fileCache: true,
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: 'LeadPhysician',
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
              description: 'Arkansas',
              title: `${myCoursesDetail?.title} course certificate.pdf`,
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
    }
  };
  //submit reviiewww
  const submitReview = async () => {
    if (review?.trim()?.length === 0) {
      Toast.show({text1: 'Please enter review'});
      return;
    }
    const postData = new FormData();
    postData.append('course_id', route?.params?.id);
    // postData.append('type', selectedType);
    postData.append('rating', starRating);
    postData.append('review', review);

    setLoading(true);
    try {
      const resp = await postApiWithToken(userToken, POST_REVIEW, postData);
      console.log("POST_REVIEW-------->",resp?.data);
      if (resp?.data?.status) {
        Toast.show({text1: resp?.data?.message || resp?.data?.Message});

        getCartCount();
        allReview();
        setStarRating(resp?.data?.data?.rating);
        setReview('');
        
      } else {
        Toast.show({text1: resp?.data?.message || resp?.data?.Message});
      }
    } catch (error) {
      console.log('error in submitReview', error);
    }
    setShowReviewModal(false);
    setLoading(false);
  };

  ///all review
  const allReview = async () => {
console.log("userinfo---",userInfo);
    var url = ALL_REVIE;
    var murl = `/` + route?.params?.id;
    url = url + murl;
console.log("allReview",url);
    try {
      setLoading(true);
      const resp = await getApiWithToken(userToken, url);

      if (resp?.data?.status) {
        console.log("my review-resp data",resp?.data?.data);
        setReviews(resp?.data?.data?.reviews);
        setAvgRating(resp?.data?.data);
        setReviewbutton(resp?.data?.data?.isReviews);
        setStarRating(resp?.data?.data?.myReview[0].rating);
        setReview(resp?.data?.data?.myReview[0].review);
       
      } else {
        Toast.show({text1: resp.data.message});
      }
    } catch (error) {
      console.log('error in getCartCount', error);
    }
    setLoading(false);
  };

  //UI
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={Color.LIGHT_BLACK} />
      <View style={styles.container}>
        <MyHeader
          Title="Course Details"
          isBackButton
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
              backgroundColor: 'white',
              marginTop: 20,
              borderRadius: 10,
            }}>
            <ImageBackground
              // source={{ uri: productDetails?.thumb?.path }}
              source={{uri: `${myCoursesDetail.thumbnail}`}}
              style={styles.crseImg}
              imageStyle={{borderRadius: 10}}>
              <TouchableOpacity
                onPress={() => {
                  setShowModal({
                    isVisible: true,
                    data: myCoursesDetail,
                  });
                }}>
                {/* <Image source={require('assets/images/play-icon.png')} /> */}

                <PlayImg></PlayImg>
              </TouchableOpacity>
            </ImageBackground>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 12,
                marginTop: 12,
              }}>
              <Laptop style={{marginTop: 12}}></Laptop>

              <View
                style={{
                  flexDirection: 'column',
                  marginHorizontal: 12,
                  width: dimensions.SCREEN_WIDTH * 0.7,
                }}>
                <MyText
                  text={myCoursesDetail?.title}
                  fontWeight="500"
                  fontSize={14}
                  textColor={Color.LIGHT_BLACK}
                  fontFamily="Roboto"
                />

                <View style={{flexDirection: 'row', marginVertical: 10}}>
                  <Star style={{marginTop: 2}}></Star>
                  <MyText
                    text={myCoursesDetail?.avg_review}
                    fontWeight="400"
                    fontSize={14}
                    textColor={'#959FA6'}
                    fontFamily="Roboto"
                    style={{marginHorizontal: 4}}
                  />
                  {/* <TouchableOpacity style={{ width: 90, height: 24, borderRadius: 5, backgroundColor: Color.PRIMARY, marginHorizontal: 8, justifyContent: 'center' }} onPress={() => openReviewModal(myCoursesDetail?.id, '1')}>
                                        <MyText text={'Write Review'} fontWeight='500' fontSize={12} textColor={Color.WHITE} fontFamily='Roboto' style={{ alignSelf: 'center' }} />
                                    </TouchableOpacity> */}
                </View>
              </View>
            </View>
            <MyText
              text={myCoursesDetail?.description}
              fontWeight="400"
              fontSize={14}
              textColor={'#66757F'}
              fontFamily="Roboto"
              style={{alignSelf: 'center', marginHorizontal: 14}}
            />

            {/* progress bar functionality */}
            <View style={{alignSelf: 'center', marginVertical: 12}}>
              <Progress.Bar
                progress={
                  parseFloat(
                    myCoursesDetail?.course_complete_percentage || '0',
                  ) / 100
                }
                width={dimensions.SCREEN_WIDTH * 0.84}
                thickness={34}
                height={20}
                borderRadius={5}
                color={Color.PRIMARY}
                unfilledColor={Color.LIGHT_BLACK}
                borderWidth={0}
                showsText={true}
              />

              <Text
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  color: 'white', // or any color that contrasts with the progress bar
                  fontWeight: 'bold',
                }}>{`${myCoursesDetail?.course_complete_percentage}% Completed`}</Text>
            </View>
            <View
              style={{
                backgroundColor: '#F3F8E1',
                height: 'auto',
                width: dimensions.SCREEN_WIDTH * 0.9,
                paddingVertical: 12,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                marginTop: 7,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: dimensions.SCREEN_WIDTH * 0.85,
                  marginHorizontal: 9,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Profile></Profile>
                  <MyText
                    text={myCoursesDetail?.created_by}
                    fontWeight="400"
                    fontSize={13}
                    textColor={'#6A6A6A'}
                    fontFamily="Roboto"
                    style={{
                      alignSelf: 'center',
                      lineHeight: 24,
                      marginHorizontal: 6,
                    }}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Chapter></Chapter>
                  <MyText
                    text={`${myCoursesDetail?.modules_count} MODULES`}
                    fontWeight="400"
                    fontSize={13}
                    textColor={'#6A6A6A'}
                    fontFamily="Roboto"
                    style={{
                      alignSelf: 'center',
                      lineHeight: 24,
                      marginHorizontal: 6,
                    }}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Calendar height={22} width={22}></Calendar>
                  <MyText
                    text={myCoursesDetail?.created_date}
                    fontWeight="400"
                    fontSize={13}
                    textColor={'#6A6A6A'}
                    fontFamily="Roboto"
                    style={{
                      alignSelf: 'center',
                      lineHeight: 24,
                      marginHorizontal: 6,
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
          <View>
            <FlatList
              horizontal={false}
              data={myCoursesDetail?.modules}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={RenderItemLead}
              ListEmptyComponent={() => (
                <View
                  style={{
                    height: dimensions.SCREEN_HEIGHT * 0.58,
                    width: dimensions.SCREEN_WIDTH * 0.9,
                    backgroundColor: '#F3F3F3',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: 20,
                  }}>
                  <MyText
                    text={'No results found'}
                    fontWeight="black"
                    fontSize={12}
                    textColor={Color.BLACK}
                    fontFamily="Inter"
                    style={{
                      fontWeight: '500',
                      alignSelf: 'center',
                      width: '55%',
                      justifyContent: 'center',
                      textAlign: 'center',
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
                url: myCoursesDetail?.disclaimers_introduction,
              }}
              // {...props}
            />
          ) : null}

          <View style={{height: 37}}></View>

          <ViewAllSub
            text="Ratings & Reviews"
            rating={avgRating?.avg_review}
            reviews={avgRating?.review_count}
            onPress={gotoAllReviews}
            length={reviews?.length}
            style={{marginBottom: 17, color: 'white', textColor: 'white'}}
          />
 
          {reviews?.length > 0 ? (
            reviews?.map((item, index) => (
              <View key={item.index?.toString()} style={styles.reviewContainer}>
                <View style={[styles.reviewTopRow, {}]}>
                  <View style={[styles.reviewTopLeftRow, {}]}>
                    <Image
                      source={
                        item?.profile_image
                          ? {uri: item?.user?.profile_image}
                          : require('../../Global/Images/userDefault.png')
                      }
                      style={styles.reviewImg}
                    />
                    <MyText
                      text={`${item?.user?.first_name} ${item?.user?.last_name}`}
                      // text={'Vrinda'}
                      fontFamily="medium"
                      fontSize={13}
                      textColor={'#6A6A6A'}
                      style={{marginLeft: 10}}
                    />
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={require('../../Global/Images/filledGreenStart.png')}
                      style={{height: 22, width: 22}}></Image>
                    <MyText
                      text={item?.rating}
                      fontFamily="medium"
                      fontSize={13}
                      textColor={'#6A6A6A'}
                      style={{top: 3, marginLeft: 5}}
                    />
                  </View>
                </View>
                <MyText
                  text={item?.review}
                  fontFamily="medium"
                  fontSize={13}
                  textColor={'#6A6A6A'}
                  style={{marginLeft: 10}}
                />
              </View>
            ))
          ) : (
            <MyText
              text={'No Reviews Found'}
              fontFamily="medium"
              fontSize={18}
              textAlign="center"
              textColor={'black'}
            />
          )}
          <View style={{height: 37}}></View>
        </ScrollView>
        <View style={{marginTop: responsiveHeight(0)}}>
          <FAB_Button
            bottom={ myCoursesDetail?.course_completed == '1' ? responsiveHeight(8):responsiveHeight(1)}
            style={{tintColor: 'white'}}
            onPress={()=>{openReviewModal()}}
          />
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
        {/* {productDetails?.isPurchased &&
                    productDetails?.courseCompleted == '1' ? (
                    <View style={[styles.buttonsRow, { paddingHorizontal: 20 }]}>
                        <MyButton
                            text="View Certificate"
                            onPress={() => {
                                setShowViewPdfModal(true);
                                setPdfLink(productDetails?.certificate);
                                // openInBrowser(productDetails?.certificate);
                            }}
                            style={{
                                width: '48%',
                                height: 50,
                                 
                            }}
                        />
                        <MyButton
                            text="Download Certificate"
                            textColor='black'
                            onPress={() => {
                                downloadCertificate(productDetails?.certificate);
                            }}
                            style={{
                                width: '48%',
                                height: 50,
                                backgroundColor: 'white',
                                borderWidth: 2,
                                borderRadius: 5,
                                
                                padding: 10,

                            }}
                        />
                    </View>
                ) : null} */}
                {
                  console.log("cetificate---",myCoursesDetail?.course_completed)
                }
        {myCoursesDetail?.course_completed == '1' ? (
          <View style={[styles.buttonsRow, {paddingHorizontal: 20}]}>
            <MyButton
              text="View Certificate"
              onPress={() => {
                setShowViewPdfModal(true);
                setPdfLink(myCoursesDetail?.certificate);
                // openInBrowser(productDetails?.certificate);
              }}
              style={{
                width: '48%',
                height: 50,
                backgroundColor: Color.PRIMARY,
              }}
            />
            <MyButton
              text="Download Certificate"
              textColor="black"
              onPress={() => {
                downloadCertificate(myCoursesDetail?.certificate);
              }}
              style={{
                width: '48%',
                height: 50,
                backgroundColor: 'white',
                borderWidth: 2,
                borderRadius: 5,
                borderColor: Color.PRIMARY,
                padding: 10,
              }}
            />
          </View>
        ) : null}
        {loading ? <Loader /> : null}
      </View>

      <Review
      key={reviewRef}
        visible={showReviewModal}
        setVisibility={setShowReviewModal}
        starRating={starRating}
        setStarRating={setStarRating}
        review={review}
        setReview={setReview}
        submitReview={submitReview}
        isReviewed={reviewbutton}
      />
    </View>
  );
};

// const mapDispatchToProps = dispatch => ({
//     dispatch,
// });
export default CourseDetail;
// export default connect(null, mapDispatchToProps)(CourseDetails);

const ViewAllSub = ({
  text,
  rating,
  reviews,
  length,
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
          <Image
            source={require('../../Global/Images/filledGreenStart.png')}
            style={{height: 10, width: 10}}
          />
          {/* <star></star> */}

          <MyText
            text={rating}
            fontSize={13}
            fontFamily="regular"
            textColor={'#6A6A6A'}
            style={{marginLeft: 5}}
          />
          <MyText
            text={' (' + reviews + ')'}
            fontSize={13}
            fontFamily="regular"
            textColor={'#6A6A6A'}
            style={{}}
          />
        </View>
      </View>

      {length > 3 ? (
        <TouchableOpacity onPress={onPress} style={styles.viewAll}>
          <MyText
            text={buttonText}
            fontFamily="regular"
            fontSize={13}
            textColor={'white'}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
