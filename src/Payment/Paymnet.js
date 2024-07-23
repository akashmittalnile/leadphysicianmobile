import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  Alert,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
// import HomeHeaderRoundBottom from './components/HomeHeaderRoundBottom';
import {androidCameraPermission} from './Permissions';
import {
  CardField,
  CardFieldInput,
  useStripe,
  StripeContainer,
  Token,
} from '@stripe/stripe-react-native';
import MyButton from '../Modals/MyButton/MyButton';
import MyButtons from '../Components/MyButtons';
import Loader from '../Components/Loader';
// import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Loader from '../../../WebApi/Loader';
import {
  saveUserResult,
  saveUserToken,
  setVenderDetail,
  onLogoutUser,
  savepeoplemoduleuserdata,
} from '../../../redux/actions/user_action';
import {connect, useSelector, useDispatch} from 'react-redux';
import {
  ADD_CARDS,
  requestPostApi,
  GET_CARDS,
  requestGetApi,
  getApiWithToken,
  BUY_PLAN,
} from '../Global/Service';
// import SearchInput2 from '../../../component/SearchInput2';
// import SearchInputEnt from '../../../component/SearchInputEnt';
// import FashionSearch from './components/FashionSearch';
// import SerchInput from '../../../component/SerchInput';
import {dimensions} from '../Global/Color';
import Color from '../Global/Color';
// import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
// import MyButtons from '../../../component/MyButtons';
// import MultiSlider from '@ptomasroos/react-native-multi-slider';
import TickDark from '../Global/Images/tickGreen.svg';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import MyHeader from '../Components/MyHeader/MyHeader';
import { CommonActions } from '@react-navigation/core';
import { userisSubscribedHandler } from '../reduxToolkit/reducer/user';
// import Loader from '../Components/Loader';

// import AppIntroSlider from 'react-native-app-intro-slider';
// import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

// import VideoPlayer from 'react-native-video-player'
// import { createThumbnail } from "react-native-create-thumbnail";
// import ViewMoreText from 'react-native-view-more-text';
// import { VideoModel } from '../../../component/VideoModel';

const Payment = (props, route) => {
  console.log('props route898989', props?.route);
  const dispatch = useDispatch();
  // const User = useSelector(state => state.user.user_details)
  // console.log('User', User);
  const userToken = useSelector(state => state.user.userToken);
  const user = useSelector(state => state.user);
  console.log('my--->>>', userToken);
  const [categoryData, setCategoryData] = useState([]);
  const [articleData, setArticleData] = useState('');
  const [searchValue, setsearchValue] = useState('');
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [card, setCard] = useState(CardFieldInput.Details | null);
  const [ammount, setAmmount] = useState('500');
  // props.route.params.ammount
  const myTextInput = useRef();
  // const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
  const [checkitem, setcheckitem] = useState('');
  console.log(checkitem, 'my checkitem in usesst');

  const [showChooseMilesModal, setShowChooseMilesModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState({isVisible: false, data: null});
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState({});
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReasonId, setSelectedReasonId] = useState(null);
  const [image, setImage] = useState('');
  const [image2, setimage2] = useState('');
  const [profileModal, setProfileModal] = useState('');

  const [isimageChange, setisimageChange] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [profileImg, setProfileImg] = useState('');
  const [addpayment, setaddpayment] = useState(false);

  const [modlevisual5, setmodlevisual5] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [myselectcat, setMyslectcat] = useState('');
  const [modlevisual, setmodlevisual] = useState(false);
  const {confirmPayment, handleCardAction} = useStripe();
  const {initPaymentSheet, createToken, presentPaymentSheet} = useStripe();
  const [reportReasonData, setReportReasonData] = useState([
    {
      id: '1',
      name: 'I just don’t like it',
      description: '',
      selected: true,
    },
    {
      id: '2',
      name: 'Nudity or pornography',
      description: '',
      selected: false,
    },
    {
      id: '3',
      name: 'Hate speech or symbols',
      description: 'Racist, homophobic or sexist slurs',
      selected: false,
    },
    {
      id: '4',
      name: 'Violence or threat of violence',
      description: `Graphic injury, unlawful activity, dangerous or criminal organizations`,
      selected: false,
    },
    {
      id: '5',
      name: 'Sale or promotion of firearms',
      description: '',
      selected: false,
    },
    {
      id: '6',
      name: 'Sale or promotion of drugs',
      description: '',
      selected: false,
    },
    {
      id: '7',
      name: 'Harassment or bullying',
      description: '',
      selected: false,
    },
    {
      id: '8',
      name: 'Intellectual property violation',
      description: 'Copyright or trademark infringement',
      selected: false,
    },
  ]);

  const [ctegoryData, setCategorydata] = useState('');
  const [selectedCategory, setSelectedCategory] = useState({});
  console.log('selected category', selectedCategory);

  const [likes, setLikes] = useState('');
  const [dislike, setdisikes] = useState('');
  const [comment, setcommes] = useState('');
  const [profile, setProile] = useState('');
  const [desData, setData] = useState([]);
  const [desc, setdesc] = useState('');
  const [allCardList, setallCardList] = useState([]);
  const [title, setTile] = useState('');
  const [article, setArticle] = useState('');
  const [userame, setUserName] = useState();
  const [selectedCategoryy, setSelectedCategoryy] = useState(null);
  const [loading2, setLoading2] = useState(false);
  const [isViewVisible, setIsViewVisible] = useState(false);
  const [articleId, setArticleId] = useState('9');
  // props.route.params.id
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isEditingOptionsVisible, setEditingOptionsVisible] = useState(false);

  const handleToggleView = itemId => {
    console.log('itemId', itemId[0].article_id);
    setSelectedItemId(itemId[0].article_id);
  };
  useEffect(() => {
    if (selectedItemId !== null) {
      console.log('is selected item selecte', selectedItemId);

      setEditingOptionsVisible(true);
    } else {
      setEditingOptionsVisible(false);
    }
  }, [selectedItemId]);
  React.useEffect(() => {
    // props.navigation.goBack()
    const unsubscribe = props.navigation.addListener('focus', () => {
      // The screen is focused
      // const id = props.route.params.id
      // const amm = props.route.params.ammount
      // setArticleId(props.route.params.id)
      setArticleId('1');
      setAmmount('34');
      // setAmmount(props.route.params.ammount)
      // console.log('id article reiceved form other fr startup', id, amm);
      setSelectedItemId(null);
      // ammount: totalAmount, id: setArticleID
      // Call any action
      // ArtCategory()
      getpaymentList();
      // setcheckitem({
      //     id: '',
      //     card_no: 'Cash Payment',
      //     exp_month: 'Default method',
      //     exp_year: '',
      //     time: 'Default method',
      //     img: require('../../../assets/images/cashondelivery.png'),
      // })
      // Categories()

      // console.log('my user id of state----->', userID);
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props]);
  // const ArtCategory = async () => {
  //     setLoading(true)
  //     var fUrl = creation_profile
  //     var urls = User.userid
  //     var murl = '?module_id=' + '57'
  //     console.log('my url---------->', urls)
  //     if (urls != undefined) {
  //         fUrl = fUrl + urls + murl
  //     }

  //     console.log("LIKE CLICK for cooking:::", murl);
  //     const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
  //     setLoading(false)

  //     console.log('the res after sucess of profile vrinda', responseJson.body)
  //     if (Object.keys(responseJson.body).length == 0) {
  //         // If data is null, set the states to 0
  //         console.log('0 is called  kkkkkkkk');
  //         setLikes(0);
  //         setdisikes(0);
  //         setcommes(0);
  //     } else {

  //         // Check if the API call was successful (responseJson.headers.success == 1)
  //         if (responseJson.headers.success === 1) {

  //             generateThumb(responseJson.body.data.dataArray);
  //             console.log('username for profile data ', responseJson.body.data.dataArray[0].username
  //             );
  //             setLikes(responseJson.body.data.total_article_likes);
  //             setdisikes(responseJson.body.data.total_article_dislikes);
  //             setcommes(responseJson.body.data.total_article_comments);
  //             setProile(responseJson.body.data.user_profileImage);
  //             setUserName(responseJson.body.data.dataArray[0].username);
  //             // Toast.show({ text1: responseJson.headers.message });
  //         } else {
  //             setalert_sms(err);
  //             setMy_Alert(true);
  //         }
  //     }
  // }
  // const multiSliderValuesChange = (values) => { setMultiSliderValue(values) }

  const toggleModal = state => {
    console.log('state', state);
    setShowModal({
      isVisible: state.isVisible,
      data: state.data,
    });
  };

  const Delete = async id => {
    setLoading(true);
    console.log('the deleteee post id', id);
    console.log('myy url ', creation_delete + id);

    const {responseJson, err} = await requestPostApi(
      creation_delete + id,
      '',
      'DELETE',
      User.token,
    );
    // props.navigation.navigate('MyProfile')
    console.log('the deleteee post of cooking', responseJson);

    if (responseJson.headers.success == 1) {
      // setUserid(nameAgeList[0].rest.userid)
      // props.navigation.navigate('MyProfile')
      // setdescrbe(responseJson.post.post_description)
      Toast.show({text1: responseJson.headers.message});
      setLoading(false);
      ArtCategory();
      // setLoading(false)
      // Toast.show({ text1: responseJson.headers.message });
    } else {
      setalert_sms(err);
      setMy_Alert(true);
    }
    setLoading(false);
  };
  // const openImageModal = index => {
  //   console.log('my image');
  //   setmodlevisual(true);
  // };
  // const onCamera = () => {
  //   ImagePicker.openCamera({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //   }).then(image => {
  //     setImage(image);
  //     setimage2(image?.path);
  //     console.log('imagre set-------////////', image);
  //     setisimageChange(true);
  //     console.log(image.path);
  //     {
  //       profile ? UpdateProfileImg(image) : changeProfileImg(image);
  //     }
  //     setmodlevisual(false);
  //   });
  // };
  // const onGallery = async () => {
  //   try {
  //     let value = await ImagePicker.openPicker({
  //       width: 1080,
  //       height: 1080,
  //       cropping: true,
  //       mediaType: 'photo',
  //       compressImageQuality: 1,
  //       compressImageMaxHeight: 1080 / 2,
  //       compressImageMaxWidth: 1080 / 2,
  //     }).then(image => {
  //       setImage(image);
  //       setimage2(image?.path);
  //       setisimageChange(true);
  //       console.log('imagre set------- profile////////', profile);
  //       console.log('my profile cccccccccc');
  //       {
  //         profile ? UpdateProfileImg(image) : changeProfileImg(image);
  //       }
  //       setmodlevisual(false);
  //     });
  //   } catch (error) {
  //     console.log('error in openLibrary', error);
  //   }
  // };

  // const changeProfileImg = async image => {
  //   console.log('oes it reach to profile image');
  //   setLoading(true);
  //   const feedBackData = new FormData();
  //   console.log('image-------->', image);
  //   if (image != '') {
  //     var imageName = image.path.slice(
  //       image.path.lastIndexOf('/'),
  //       image.path.length,
  //     );
  //     feedBackData.append('file', {
  //       name: imageName,
  //       type: image.mime,
  //       uri: image.path,
  //     });
  //   }
  //   console.log('formdata-------->', feedBackData);
  //   const headers = {
  //     'Content-Type': 'multipart/form-data',
  //     Authorization: `Bearer ${User.token}`,
  //   };
  //   const url =
  //     'http://54.153.75.225/backend/api/v1/creation/common/add-profile-image';
  //   try {
  //     const response = await fetch(url, {
  //       method: 'POST',
  //       headers,
  //       body: feedBackData,
  //     });

  //     const responseJson = await response.json();
  //     console.log('myyyyyyyy edit profile image', responseJson);

  //     // console.log(responseJson
  //     //     , 'my response of profile');
  //     setLoading(false);
  //     //Toast.show({ text1: responseJson.message });
  //   } catch (error) {
  //     console.log('Error uploading data:', error);
  //   }
  // };

  // const UpdateProfileImg = async image => {
  //   console.log('oes it reach to updateee image');
  //   setLoading(true);
  //   const feedBackData = new FormData();
  //   console.log('image-------->', image);
  //   if (image != '') {
  //     var imageName = image.path.slice(
  //       image.path.lastIndexOf('/'),
  //       image.path.length,
  //     );
  //     feedBackData.append('file', {
  //       name: imageName,
  //       type: image.mime,
  //       uri: image.path,
  //     });
  //   }
  //   console.log('formdata-------->', feedBackData);
  //   const headers = {
  //     'Content-Type': 'multipart/form-data',
  //     Authorization: `Bearer ${User.token}`,
  //   };
  //   const url =
  //     'http://54.153.75.225/backend/api/v1/creation/common/update-profile-image';
  //   try {
  //     const response = await fetch(url, {
  //       method: 'PUT',
  //       headers,
  //       body: feedBackData,
  //     });

  //     const responseJson = await response.json();
  //     console.log(
  //       'myyyyyyyy update  profile image uploaded success',
  //       responseJson,
  //     );

  //     // console.log(responseJson
  //     //     , 'my response of profile');
  //     setLoading(false);
  //     //Toast.show({ text1: responseJson.message });
  //   } catch (error) {
  //     console.log('Error uploading data:', error);
  //   }
  // };

  // const generateThumb = async item => {
  //   console.log('item  profile', item);
  //   setLoading2(true);
  //   const allData1 = await Promise.all(
  //     item?.map(async el => {
  //       console.log('myyyy thumb commr', el.total_comments);
  //       const data = await Promise.all(
  //         el.images?.map(async (imgData, index) => {
  //           if (imgData?.post_type === 'Image') {
  //             return {
  //               ...imgData,
  //               type: 'image',
  //               id: index,
  //               description: el.description,
  //               likes: el.total_likes,
  //               dislike: el.total_dislikes,
  //               cretedTime: el.created_date,
  //               article_id: el.article_id,
  //               title: el.headline,
  //               comment: el.total_comments,
  //               category_data: el.category_id,
  //               category_name: el.category,
  //             };
  //           } else {
  //             console.log(
  //               'createThumbnail will be called for profile ',
  //               imgData,
  //             );
  //             const thumb = await createThumbnail({
  //               url: imgData.file_url,
  //               timeStamp: 10, // Specify the time position for the thumbnail (in milliseconds)
  //             });
  //             return {
  //               ...imgData,
  //               thumb,
  //               type: 'video',
  //               id: index,
  //               description: el.description,
  //               likes: el.total_likes,
  //               dislike: el.total_dislikes,
  //               cretedTime: el.created_date,
  //               article_id: el.article_id,
  //               title: el.headline,
  //               comment: el.total_comments,
  //               category_data: el.category_id,
  //               category_name: el.category,
  //             };
  //           }
  //         }),
  //       );
  //       return data;
  //     }),
  //   );
  //   console.log(allData1, 'my profile thumb11111');
  //   setData(allData1);

  //   setLoading2(false);
  // };
  const handlePayClick = async () => {
    setLoading(true);
    console.log('card', card);
    const res = await createToken({card, type: 'Card'});
    console.log('res', res);
    if (res.error) {
      // If there's an error in the createToken response, show a toast message
      //   Toast.show({ text1: 'Card details not complete' });
      Toast.show({text1: 'Provide the card details first'});
      setLoading(false);
      return; // Stop further execution
    }

    var data = {
      stripeToken: res.token.id,
      // card_no: res.token.card.last4,
      // exp_month: res.token.card.expMonth,
      // exp_year: res.token.card.expYear,
      // card_type: res.token.card.brand
    };
    console.log('the form data==>>', data);
    setLoading(true);
    const {responseJson, err} = await requestPostApi(
      ADD_CARDS,
      data,
      'POST',
      userToken,
    );
    console.log(
      'responseJson.headers.success for add card---->>>',
      responseJson,
    );

    if (responseJson.status) {
      console.log('the res of add card under successsss==>>', responseJson);
      setLoading(false);

      Toast.show({text1: responseJson.message});
      getpaymentList();
      setaddpayment(false);
    } else {
      setLoading(false);
      setalert_sms(err);
      setMy_Alert(true);
    }
  };
  const getpaymentList = async () => {
    console.log('my paymnet listing');
    setLoading(true);
    const resp = await getApiWithToken(userToken, GET_CARDS);
    console.log('the res user_payment_method==>>', resp?.data?.status);
    if (resp?.data?.status) {
      console.log('klklklkl--->>>', resp?.data?.data);
      var arr = [];
      for (let i = 1; i <= resp?.data?.data?.length; i++) {
        console.log('klkl yuyuyu---->>>', i);
        arr.push(resp?.data?.data[i - 1]);
      }
      setLoading(false);
      console.log(arr, 'my cards');
      setallCardList(arr);
    } else {
      console.log('kokokok');
      //  setalert_sms(err)
      //  setMy_Alert(true)
      setLoading(false);
      console.log('resp', resp, {userToken});
    }
  };
  const resetIndexGoToBottomTab = CommonActions.reset({
    index: 1,
    routes: [{name: 'BottomTab'}],
  });

  const placeOrder = async () => {
    console.log('my checleddddd vardddd ---??', checkitem.card_id);

    if (checkitem == '') {
      console.log('my checked item-->', checkitem);
      // Toast.show('Please select payment method')
      Toast.show({text1: 'Select the card first'});
    } else {
      setLoading(true);
      var data = {
        plan_id: props?.route?.params?.item?.id,
        plan_timeperiod: '1',
        price: props?.route?.params?.item?.monthly_price,
        price_id: props?.route?.params?.item?.monthly_price_id,
        card_id: checkitem.card_id,
      };
      // BUY_PLAN
      console.log('the form data for the payment==>>', data);

      const {responseJson, err} = await requestPostApi(
        BUY_PLAN,
        data,
        'POST',
        userToken,
      );

      console.log('requestPostApiErrREsp', responseJson, err);
      setLoading(false);
      console.log('the res shop_eat_cart_place_order==>>', responseJson);
      if (responseJson.status === true) {
        Toast.show({text1: responseJson.message});
        dispatch(
          userisSubscribedHandler({
            isSubscribed: true,
          }),
        );
        props.navigation.dispatch(resetIndexGoToBottomTab);
       
        // props.navigation.navigate('Profile');
      } else {
        // setalert_sms(err)
        // setMy_Alert(true)
      }
    }
  };
  const _renderItem = ({item}) => {
    console.log(item, 'item ggggg');
    return (
      <>
        {item.type === 'video' ? (
          // <VideoPlayer
          //     resizeMode="contain"
          //     video={{ uri: item.file_url }}
          //     style={{ borderWidth: 2 }}
          //     videoWidth={dimensions.SCREEN_WIDTH}
          //     videoHeight={120}
          //     autoplay={false}
          //     thumbnail={{ uri: item.thumb.path }}
          //     endWithThumbnail
          //     disableControlsAutoHide
          //     customStyles={{
          //         thumbnail: { width: '100%', height: 200, },
          //         videoWrapper: { width: '100%', height: 150, resizeMode: 'stretch' },
          //         // wrapper: { width: '100%', height: 227 },
          //     }}
          // />
          <TouchableOpacity
            style={{
              width: '100%',
              height: 200,
              borderRadius: 10,
              alignSelf: 'center',
              resizeMode: 'cover',
            }}
            onPress={() => {
              setShowModal({
                isVisible: true,
                data: item,
              });
            }}>
            <ImageBackground
              source={{uri: item.thumb.path}}
              style={{
                width: '100%',
                height: 200,
                alignSelf: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                overflow: 'hidden',
              }}
              resizeMode="cover">
              {/* <Image source={require('../../../assets/images/people-play-button.png')} style={{ width: '20%', height: '20%', alignSelf: 'center', }} resizeMode='contain' ></Image> */}
            </ImageBackground>
          </TouchableOpacity>
        ) : (
          <Image
            source={{uri: item.file_url}}
            style={{width: '100%', height: 350, alignSelf: 'center'}}
          />
        )}
      </>
    );
  };
  return (
    <SafeAreaView
      scrollEnabled={scrollEnabled}
      style={{height: '100%', backgroundColor: '#F8F8F8'}}>
      <MyHeader Title="Payment" isBackButton />
      <ScrollView>
        <StripeContainer>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="never">
            <View style={{width: '92%', alignSelf: 'center'}}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                  marginVertical: 15,
                }}>
                <Text
                  style={{
                    color: Color.LIGHT_BLACK,
                    fontWeight: '500',
                    fontSize: 12,
                  }}>
                  CHOOSE CARD
                </Text>
                <TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setaddpayment(true);
                    }}>
                    <Text
                      style={{
                        color: Color.PRIMARY,
                        fontWeight: '500',
                        textDecorationLine: 'underline',
                        fontSize: 13,
                      }}
                      onPress={() => {
                        setaddpayment(true);
                      }}>
                      Add New Card
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>

              {addpayment ? (
                <KeyboardAvoidingView
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                  keyboardVerticalOffset={20}
                  style={{flex: 1}}>
                  <View style={{}}>
                    <CardField
                      accessible={true}
                      postalCodeEnabled={false}
                      placeholder={{
                        number: '4242 4242 4242 4242',
                        color: 'black',
                      }}
                      cardStyle={{
                        // borderRadius: 20,
                        // backgroundColor: '#fff',
                        // borderColor: 'red',
                        // borderWidth: 1,
                        textColor: 'black', // Ensure text is visible in dark mode
                        placeholderColor: '#c9c9c9',
                      }}
                      style={{
                        width: '100%',
                        height: 200,
                        marginTop: 20,
                        marginBottom: 30,
                        color: 'black',
                      }}
                      onCardChange={cardDetails => {
                        setCard(cardDetails);
                        if (cardDetails?.complete) {
                          Keyboard.dismiss();
                        }
                      }}
                      onFocus={focusedField => {
                        console.log('focusField', focusedField);
                      }}
                    />

                    <View></View>
                  </View>

                  <View style={{width: '100%', marginTop: -10}}>
                    <MyButton
                      title="Add"
                      height={53}
                      width={'100%'}
                      borderRadius={5}
                      alignSelf="center"
                      press={() => {
                        handlePayClick();
                      }}
                      marginHorizontal={20}
                      fontSize={14}
                      titlecolor={Color.WHITE}
                      backgroundColor={Color.PRIMARY}
                    />
                    {/* <View>
                                            <Text>kkkkkkk</Text>
                                        </View> */}
                  </View>
                  {console.log()}
                </KeyboardAvoidingView>
              ) : null}
              {allCardList.map((item, index) => {
                console.log(item, 'allCardList');
                return (
                  <>
                    {checkitem != item ? (
                      <TouchableOpacity
                        style={{
                          width: '100%',
                          borderColor: 'red',
                          borderWidth: 0.02,
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingVertical: 17,
                          paddingHorizontal: 17,
                          borderRadius: 7,
                          backgroundColor: '#fff',
                          marginTop: 15,
                        }}
                        onPress={() => {
                          setcheckitem(item);
                          console.log(
                            'my checked item for the card--->>',
                            item,
                          );
                        }}>
                        <View style={{width: 51, height: 40}}>
                          {/* <Image source={item.img} style={{ width: '100%', height: '100%', alignSelf: 'center', borderRadius: 5, resizeMode: 'stretch' }} ></Image> */}
                          {/* <Image source={require('../../../assets/Art/visaCard.png')} style={{ width: '100%', height: '100%', alignSelf: 'center', borderRadius: 5, resizeMode: 'stretch' }} ></Image> */}
                        </View>
                        <View style={{marginLeft: 15}}>
                          <Text
                            style={{
                              color: Color.TEXT_COLOR,
                              fontWeight: '500',
                              fontSize: 13,
                            }}>
                            **** **** **** {item.last4}
                          </Text>
                          <Text
                            style={{
                              color: 'red',
                              fontWeight: '400',
                              fontSize: 11,
                              top: 2,
                            }}>
                            {item.id == '' ? '' : 'Expires :'} {item.exp_month}
                            {item.id == '' ? '' : '/'}
                            {item.exp_year}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <></>
                    )}
                  </>
                );
              })}
              {console.log(checkitem, 'setcheckitem')}
              {checkitem.length != 0 ? (
                <>
                  <Text
                    style={{
                      color: 'red',
                      fontWeight: '300',
                      fontSize: 12,
                      marginVertical: 20,
                    }}>
                    CURRENT METHOD
                  </Text>
                  <View
                    style={{
                      width: '100%',
                      borderColor: '#FFC40C',
                      borderWidth: 0.2,
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 17,
                      paddingHorizontal: 17,
                      borderRadius: 7,
                      backgroundColor: '#fff',
                    }}>
                    <View style={{width: 51, height: 40}}>
                      {/* <Image source={checkitem.img} style={{ width: '100%', height: '100%', alignSelf: 'center', borderRadius: 5, resizeMode: 'stretch' }} ></Image> */}
                      {/* <Image source={require('../../../assets/Art/visaCard.png')} style={{ width: '100%', height: '100%', alignSelf: 'center', borderRadius: 5, resizeMode: 'stretch' }} ></Image> */}
                      <TickDark></TickDark>
                    </View>
                    <View style={{marginLeft: 15}}>
                      <Text
                        style={{
                          color: Color.TEXT_COLOR,
                          fontWeight: '500',
                          fontSize: 13,
                        }}>
                        **** **** **** {checkitem.last4}
                      </Text>
                      <Text
                        style={{
                          color: 'red',
                          fontWeight: '400',
                          fontSize: 10,
                          top: 2,
                        }}>
                        {checkitem.id == '' ? '' : 'Expires :'}{' '}
                        {checkitem.exp_month}
                        {checkitem.id == '' ? '' : '/'}
                        {checkitem.exp_year}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 5,
                        position: 'absolute',
                        right: 20,
                        justifyContent: 'center',
                      }}>
                      <TickDark></TickDark>
                      {/* <Image source={require('../../../assets/tickw.png')} style={{ width: 15, height: 15, alignSelf: 'center', borderRadius: 5, resizeMode: 'stretch' }} ></Image> */}
                    </View>
                  </View>
                </>
              ) : null}

              <View style={{width: '100%', marginTop: 30}}>
                <MyButtons
                  title="Proceed to Payment"
                  height={53}
                  width={'100%'}
                  borderRadius={5}
                  alignSelf="center"
                  press={() => {
                    placeOrder();
                    // props.navigation.goBack()
                  }}
                  marginHorizontal={20}
                  fontSize={14}
                  titlecolor={'white'}
                  backgroundColor={Color.PRIMARY}
                />
              </View>
            </View>
            <View style={{height: 100}} />
          </ScrollView>
        </StripeContainer>
      </ScrollView>
      <Modal
        isVisible={editModal}
        swipeDirection="down"
        selectedId={selectedId}
        selectedCategoryy={selectedCategoryy}
        title={title}
        desc={desc}
        onBackdropPress={() => setEditModal(false)}
        onSwipeComplete={e => {
          setEditModal(false);
        }}
        scrollTo={() => {}}
        scrollOffset={1}
        propagateSwipe={true}
        coverScreen={false}
        backdropColor="transparent"
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          backgroundColor: 'rgba(211, 211, 211, 0.7)',
        }}>
        <View
          style={{
            height: '35%',
            backgroundColor: '#FFF',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingVertical: 20,
          }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}>
            <View style={{width: '90%', alignSelf: 'center', marginTop: 20}}>
              <View
                style={{
                  backgroundColor: '#F8F8F8',
                  paddingHorizontal: 10,
                  paddingVertical: 20,
                  borderRadius: 10,
                }}>
                <TouchableOpacity
                  style={{
                    marginHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    console.log('my id111', title);
                    props.navigation.navigate('EditArticle', {
                      id: selectedId,
                      cat: selectedCategoryy,
                      desc: desc,
                      title: title,
                    }),
                      setEditModal(false);
                  }}>
                  <Text style={{fontSize: 14, color: 'black'}}>
                    Edit Article
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  backgroundColor: '#F8F8F8',
                  paddingHorizontal: 10,
                  paddingVertical: 20,
                  borderRadius: 10,
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  style={{
                    marginHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => {}}>
                  <Text style={{fontSize: 14, color: 'black'}}>
                    Delete Article
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{width: 100, height: 100}} />
          </ScrollView>
        </View>
      </Modal>
      {showModal.isVisible ? (
        <VideoModel
          isVisible={showModal.isVisible}
          toggleModal={toggleModal}
          videoDetail={{...showModal?.data, url: showModal?.data?.file_url}}
          {...props}
        />
      ) : null}

      {/* <Modal
        isVisible={modlevisual}
        swipeDirection="down"
        onSwipeComplete={() => setmodlevisual(false)}
        coverScreen={false}
        backdropColor="transparent"
        style={{justifyContent: 'flex-end', margin: 0}}>
        <View
          style={{
            height: 150,
            backgroundColor: 'green',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            padding: 20,
            margin: 0,
            bottom: 0,
          }}>
          <View style={styles.mainView}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <TouchableOpacity
                style={{width: 150, height: 150}}
                onPress={onGallery}>
                <Image source={require('../../../assets/Art/GalleryCreation.png')} style={{ width: 40, height: 40, alignSelf: 'center' }} />
                <Text style={{textAlign: 'center', color: Color.TEXT_COLOR}}>
                  Open Library
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{width: 150, height: 150}}
                onPress={onCamera}>
                <Image source={require('../../../assets/Art/cameraCreation.png')} style={{ width: 40, height: 35, alignSelf: 'center' }} />
                <Text style={{textAlign: 'center', color: Color.TEXT_COLOR}}>
                  Open Camera
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> */}
      {/* edit modal */}

      {/* modify edit modal */}
      {/* <Modal
        isVisible={profileModal}
        // swipeDirection="down"

        // onSwipeComplete={e => {
        //   setProfileModal(false);
        // }}
        swipeDirection="down"
        onBackdropPress={() => setProfileModal(false)}
        onSwipeComplete={e => {
          setProfileModal(false);
        }}
        scrollTo={() => {}}
        scrollOffset={1}
        propagateSwipe={true}
        coverScreen={false}
        backdropColor="transparent"
        style={{
          justifyContent: 'flex-start', // Update justifyContent to 'flex-start'
          margin: 0,
          height: 30,
          backgroundColor: 'transparent',
        }}>
        <View
          style={{
            height: '15%',
            backgroundColor: '#FFF',
            marginTop: '24%',
            width: '70%',
            alignSelf: 'flex-end',
            justifyContent: 'flex-end',
            right: 20,
            borderRadius: 20,
          }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}>
            <View style={{width: '90%', alignSelf: 'center', marginTop: 20}}>
              <View style={{borderRadius: 10}}>
                <TouchableOpacity
                  style={{
                    marginHorizontal: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    props.navigation.navigate('EditArticle', {
                      id: selectedId,
                      cat: selectedCategoryy,
                      desc: desc,
                      title: title,
                    }),
                      setProfileModal(false);
                  }}>
                  <Image source={require('../../../assets/People/PeopleProfileIConModal.png')} style={{ width: 34, height: 34 }} resizeMode='contain' />
                  <Text
                    style={{
                      marginLeft: 4,
                      fontSize: 14,
                      left: 10,
                      color: 'black',
                    }}>
                    Edit Artile
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  backgroundColor: '#EDEEEE',
                  height: 1,
                  width: '100%',
                  marginTop: 5,
                }}></View>
              <View style={{marginTop: 10}}>
                <TouchableOpacity
                  style={{
                    marginHorizontal: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    Delete(selectedId), setProfileModal(false);
                  }}>
                  <Image source={require('../../../assets/People/PeopleLogoutIconModal.png')} style={{ width: 34, height: 34 }} resizeMode='contain' />

                  <Text style={{fontSize: 14, left: 14, color: 'black'}}>
                    Delete Article
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{width: 100, height: 100}} />
          </ScrollView>
        </View>
      </Modal> */}

      {loading ? <Loader /> : null}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  unselectedTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#263238',
  },
  requestCallView: {
    marginTop: 10,
    width: 140,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#29913C',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6D2F91',
    shadowOffset: {width: 3, height: 3},
    shadowRadius: 5,
    shadowOpacity: 0.17,
    elevation: 2,
  },
  VideoThumbWrapper: {
    position: 'relative',
    // width: '48%',
    // marginRight: 8,
    marginBottom: 4,

    width: dimensions.SCREEN_WIDTH / 1.5,
    height: 160,
    marginRight: 20,
    borderRadius: 15,
    // shadowColor:'#000',
    // shadowOffset: {width: 0,height: 3},
    // shadowRadius: 1,
    // shadowOpacity: 0.03,
    // elevation: 1,
  },
  PlayIconContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  PlayIconWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BackGroundImage: {
    width: '100%',
    height: 160,
    justifyContent: 'center',
    borderRadius: 15,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    // backgroundColor: 'red',
    width: '50%',
    alignSelf: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#8F93A0',
    marginLeft: 5,
  },
  reasonView: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 15,
    // paddingVertical:10,
    paddingHorizontal: 10,
    width: '90%',
    height: 60,
  },
  selectedReasonView: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 15,
    // paddingVertical:10,
    paddingHorizontal: 10,
    width: '90%',
    height: 60,
    borderColor: '#E7F7FF',
    borderWidth: 1,
    shadowColor: '#455A64',
    shadowOffset: {width: 3, height: 3},
    shadowRadius: 5,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  reportButtonView: {
    height: 60,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#0089CF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 3},
    shadowRadius: 5,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  contMap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20%',
    alignSelf: 'center',
    marginHorizontal: 20,
  },
  categorySelectedStyle: {
    borderWidth: 2,
    borderColor: '#835E23',
    borderRadius: 10,
  },
  refreshView: {
    flexDirection: 'row',
    alignItems: 'center',
    // width: '25%',
    // marginTop: 10,
    marginRight: 10,
    backgroundColor: '#29913C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  descriptionView: {
    paddingTop: 10,
    width: dimensions.SCREEN_WIDTH * 0.9,
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingBottom: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowRadius: 5,
    shadowOpacity: 0.03,
    elevation: 1,
  },
  imageRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  followingView: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#0089CF',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.1,
    elevation: 5,
  },
  numView: {
    alignItems: 'center',
    width: 90,
    height: 90,
    justifyContent: 'center',
    borderRadius: 15,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.03,
    elevation: 1,
  },
  numValue: {
    fontSize: 20,
    fontWeight: '500',
    color: '#455A64',
  },
  numText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#455A64',
  },
  blueButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0089CF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#0089CF',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  blueButtonSuperView: {
    justifyContent: 'center',
    backgroundColor: '#0089CF',
    width: 120,
    height: 40,
    borderRadius: 20,
    shadowColor: '#0089CF',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  blueButtonSubView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  blueButtonText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#fff',
    marginLeft: 10,
  },
  allFiltersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  filter1View: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  filter2View: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  filter3View: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  threeDotsView: {
    backgroundColor: '#FFC40C',
    padding: 10,
    borderRadius: 20,
    right: 12,
    width: 103,
    height: 31,
  },
  imageView: {
    width: dimensions.SCREEN_WIDTH,
    height: 200,
    backgroundColor: '#F8F8F8',
  },
  scrollViewContent: {
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: dimensions.SCREEN_WIDTH * 1,
    height: '99%',
    alignSelf: 'center',

    justifyContent: 'center',
  },
  imageContainer: {
    marginRight: 10, // Add margin between images
  },
  textContainer: {
    marginTop: 5, // Add margin between image and text

    flex: 1, // Allow the text container to take up remaining space
    flexDirection: 'row',
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#263238',
    textAlign: 'left',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4, // Add margin between text and buttons
    // Align buttons with the text,
    justifyContent: 'space-between',
    width: '99%',
    alignSelf: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 3,
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20, // Add margin between buttons
  },
  buttonIcon: {
    height: 20,
    width: 20,
  },
  buttonText: {
    marginLeft: 5, // Add spacing between icon and text
    fontSize: 14,
    color: '#263238',
  },
  topRightImage: {
    position: 'absolute',
    top: 10, // Adjust the top position as needed
    right: 10, // Adjust the right position as needed
    width: 30,
    height: 30,
    resizeMode: 'contain',
    //  backgroundColor: 'red'
  },
  topRightImageContainer: {
    position: 'absolute',
    top: 30, // Adjust the top position as needed
    right: 30, // Adjust the right position as needed
    zIndex: 999,
    backgroundColor: 'transparent',
  },
  flatlistMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: dimensions.SCREEN_WIDTH * 0.9,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 1,
    borderLeftColor: '#EDEEEE',
    borderRightColor: '#EDEEEE',
    borderBottomColor: '#EDEEEE',
    zIndex: 999,
  },
  followingImageView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followingView: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  flatlistMainBottomView: {
    backgroundColor: '#fff',
    paddingVertical: 10,

    width: dimensions.SCREEN_WIDTH * 0.9,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftColor: '#EAEBEB',
    borderRightColor: '#EAEBEB',
    borderBottomColor: '#EAEBEB',
  },
  flatlistBottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //  marginBottom: 12
  },
  textContainerrrr: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  descriptionTextrrrr: {
    fontSize: 14,
    fontWeight: '400',
    color: '#263238',
    width: '50%',
  },
  createdTimeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#263238',
    textAlign: 'right',
  },
});
export default Payment;
