//import : react components
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
//import : custom components
import Color, { dimensions } from '../Global/Color';
//third parties
import {WebView} from 'react-native-webview';
//global
// import {
//   bookingPhotoBooth,
//   booking_tour,
//   requestGetApi,
//   requestPostApi,
// } from '../WebApi/Service';
//redux
// import CustomButton from '../components/CustomButton/CustomButton';
import {connect} from 'react-redux';
import {CartAction, CustomToastAction} from '../../redux/actions/actions';
import {useSelector, useDispatch} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import Loader from '../Components/Loader';
import MyAlert from '../Global/MyAlert';
// import images from '../global/images';
import moment from 'moment';
 
import CustomHeader from './CustomHeader';

const PaymentWebView = props => {
  const webViewRef = useRef(null);
  //variables : route variables
  // const PaymentUrl = props.route.params.url.data + '&transaction_id='+`${props?.route?.params?.url?.transactionId}`;
  const PaymentUrl = props.route.params.url;
  // console.log("PaymentUrl-1-211--2",props.route.params.url);
  // console.log("PaymentUrl with transactionid:::::",PaymentUrl);
  const user = useSelector(state => state.user.user_details);
  const [My_Alert, setMy_Alert] = useState(false);
  const [apiCountCheck, setApiCountCheck] = useState(0);
  const [todaydate, settodaydate] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [tourdetails, setTourDetail] = useState('');
  const [tourdata, setTourData] = useState(
    props?.route?.params?.bookingdata?.TourData,
  );
  const [popup, setpopup] = useState(false);
  const [popupsuccess, setpopupsuccess] = useState(false);

  //function : navigation function
  // const gotoDownloadInvoice = orderId =>
  // props.navigation.replace(ScreensName.DOWNLOAD_INVOICE, {orderId: orderId});
  const gotoCart = () => props.navigation.navigate('HomeStack');
  //function : imp function
  const onNavigationStateChange = async webViewState => {
    console.log(
      apiCountCheck,
      'Screen-Type-check ',
      props?.route?.params?.type,
    );
    // console.log('STATUS-Check-captureId', webViewState?.url);
    // console.log('PaymentUrl----', PaymentUrl);
    const isSuccessful = webViewState?.url.includes('successs');
    const isCanceled = webViewState?.url.includes('cancel');

    if (isSuccessful) {
      // console.log("SUccess.-------",webViewState);
      // try {
      //   // const resp = await fetch(webViewState?.url);
      //   // const respJson = await resp.json();
      //   const {responseJson, err} = await requestPostApi(
      //     webViewState?.url,
      //     '',
      //     'GET',
      //     '',
      //   );
      //    console.log('==============webview state fetch======================');
      //    console.log(responseJson);
      //    console.log('==================respJson==================');
      // } catch (error) {
      //   console.error('Error fetching webview resp:', error);
      // }
      const isFailed = webViewState?.url.includes('false');
      // console.log('captureId-after-success', webViewState);
      if (!isFailed) {
        if (props?.route?.params?.type === 'photobooth') {
          if (apiCountCheck < 1) {
            console.log('CALL bookPhotoBoothApi!!!!');
            bookPhotoBoothApi(props.route.params.bookingdata.tour_id);
          }
        } else if (
          props?.route?.params?.type == 'reviewbooking' ||
          props?.route?.params?.type == 'audiopurchase'
        ) {
          if (apiCountCheck < 1) {
            console.log('CALL bookTourApi!!!!');
            bookTourApi();
          }

       
        }
        //  else if (props?.route?.params?.type === 'audiopurchase') {
        //   bookVirtualTourApi(props?.route?.params?.bookingdata?.tour_id);
        // }
        // setalert_sms('Payment completed successfully');
        // setMy_Alert(true);
      } else {
        setalert_sms('Something went wrong');
        setMy_Alert(true);
      }
    } else if (isCanceled) {
      setalert_sms('You have cancelled your payment process');
      setMy_Alert(true);
      gotoCart();
    }
  };
  //   const getOrderId = async url => {
  //     try {
  //       const resp = await axios.get(url);
  //       dispatch(CartAction.setToCart([]));
  //       gotoDownloadInvoice(resp.data.order_number);
  //     } catch (error) {
  //       console.error('error in getOrderId', error);
  //     }
  //   };
  // const getOrderId = async (url) => {
  //   setLoading(true);
  //   const {responseJson, err} = await requestGetApi(url, '', 'GET', '');

  //   if (err == null) {
  //     if (responseJson.status == true) {
  //       setOrderID(responseJson?.PayerID)
  //       // gotoDownloadInvoice(resp.data.order_number);
  //     } else {
  //       setalert_sms("error in getOrderId false status",responseJson.message);
  //       setMy_Alert(true);
  //     }
  //   } else {
  //     setalert_sms("error in getOrderId",err);
  //     setMy_Alert(true);
  //   }
  //   setLoading(false);
  // };
  const bookTourApi = async () => {
    console.log('bookTourApi-call', apiCountCheck);
    setApiCountCheck(apiCountCheck + 1);
    setLoading(true);
    let formdata = new FormData();
    formdata.append(
      'tour_id',
      props?.route?.params?.type == 'reviewbooking'
        ? props?.route?.params?.bookingdata?.bookid
        : props?.route?.params?.bookingdata?.tour_id,
    );
    formdata.append(
      'tour_type',
      props?.route?.params?.type == 'reviewbooking' ? '1' : '2',
    ); /*1-Normal Tour, 2:Virtual tour */
    formdata.append(
      'booking_date',
      props?.route?.params?.type == 'reviewbooking'
        ? props?.route?.params?.bookingdata?.selectdate
        : todaydate,
    );
    formdata.append(
      'no_adults',
      props?.route?.params?.type == 'reviewbooking'
        ? props?.route?.params?.bookingdata?.no_adult
        : '',
    );
    formdata.append(
      'no_senior_citizen',
      props?.route?.params?.type == 'reviewbooking'
        ? props?.route?.params?.bookingdata?.no_senior_citizen
        : '',
    );
    formdata.append(
      'no_childerns',
      props?.route?.params?.type == 'reviewbooking'
        ? props?.route?.params?.bookingdata?.no_childerns
        : '',
    );
    formdata.append(
      'adults_amount',
      props?.route?.params?.type == 'reviewbooking'
        ? props?.route?.params?.bookingdata?.adults_amount
        : '',
    );
    formdata.append(
      'senior_amount',
      props?.route?.params?.type == 'reviewbooking'
        ? props?.route?.params?.bookingdata?.senior_amount
        : '',
    );
    formdata.append(
      'childrens_amount',
      props?.route?.params?.type == 'reviewbooking'
        ? props?.route?.params?.bookingdata?.childrens_amount
        : '',
    );
    formdata.append(
      'amount',
      props?.route?.params?.type == 'reviewbooking'
        ? parseFloat(props?.route?.params?.bookingdata?.amount).toFixed(2)
        : parseFloat(props?.route?.params?.bookingdata?.amount).toFixed(2),
    );
    formdata.append('tax', props.route.params.bookingdata.tax);
    formdata.append('transaction_id', props?.route?.params?.url?.transactionId);
    formdata.append(
      'pickup_location',
      props?.route?.params?.type == 'reviewbooking'
        ? props?.route?.params?.bookingdata?.pickuptext
        : '',
    );
    // formdata.append('capture_id', "2313");
    console.log('FormDATA----', formdata);
    const {responseJson, err} = await requestPostApi(
      booking_tour,
      formdata,
      'POST',
      user.token,
    );
    console.log('===============booking_tour=====================');
    console.log(responseJson);
    console.log('================booking_tour====================');
    setLoading(false);
    if (err == null) {
      if (responseJson.status == true) {
        if (props?.route?.params?.type == 'reviewbooking') {
          setLoading(false);
          setpopup(true);
        } else {
          setLoading(false);
          setTourDetail(responseJson?.booking_id);
          setpopupsuccess(true);
        }
      } else {
        setLoading(false);
        setalert_sms(responseJson.message);
        setMy_Alert(true);
      }
    } else {
      setLoading(false);
      setalert_sms(err);
      setMy_Alert(true);
    }
  };
  // const bookVirtualTourApi = async (id) => {
  //   setLoading(true);

  //   let formdata = new FormData();
  //   formdata.append('tour_id', id);
  //   formdata.append('tour_type', '2'); /*1-Normal Tour, 2:Virtual tour */
  //   formdata.append('booking_date', todaydate);
  //   formdata.append('no_adults', '');
  //   formdata.append('no_senior_citizen', '');
  //   formdata.append('no_childerns', '');
  //   formdata.append('adults_amount', '');
  //   formdata.append('senior_amount', '');
  //   formdata.append('childrens_amount', '');
  //   formdata.append('amount', props?.route?.params?.bookingdata?.amount);
  //   const {responseJson, err} = await requestPostApi(
  //     booking_tour,
  //     formdata,
  //     'POST',
  //     user.token,
  //   );

  //   if (err == null) {
  //     if (responseJson.status == true) {
  //       setTourDetail(responseJson?.booking_id);
  //       setpopupsuccess(true);
  //     } else {
  //       setalert_sms(responseJson.message);
  //       setMy_Alert(true);
  //     }
  //   } else {
  //     setalert_sms(err);
  //     setMy_Alert(true);
  //   }
  //   setLoading(false);
  // };
  const bookPhotoBoothApi = async id => {
    setApiCountCheck(apiCountCheck + 1);
    setLoading(true);
    let formdata = new FormData();
    formdata.append('photo_booth_id', id);
    formdata.append('tour_type', '3');
    formdata.append('booking_date', todaydate);
    formdata.append(
      'amount',
      parseFloat(props.route.params.bookingdata.amount).toFixed(2),
    );
    formdata.append('tax', props.route.params.bookingdata.tax);
    formdata.append('transaction_id', props?.route?.params?.url?.transactionId);
    // formdata.append('capture_id', "2313");
    console.log('bookPhotoBoothApi00------', formdata);
    const {responseJson, err} = await requestPostApi(
      bookingPhotoBooth,
      formdata,
      'POST',
      user.token,
    );
    setLoading(false);
    if (err == null) {
      if (responseJson.status == true) {
        setTourDetail(responseJson?.booking_id);
        setpopupsuccess(true);
      } else {
        setalert_sms(responseJson.message);
        setMy_Alert(true);
      }
    } else {
      setalert_sms(err);
      setMy_Alert(true);
    }
    setLoading(false);
  };

  const debugging = `
  const consoleLog = (type, log) => window.ReactNativeWebView.postMessage(JSON.stringify({'type': 'Console', 'data': {'type': type, 'log': log}}));
  console = {
      log: (log) => consoleLog('log', log),
      debug: (log) => consoleLog('debug', log),
      info: (log) => consoleLog('info', log),
      warn: (log) => consoleLog('warn', log),
      error: (log) => consoleLog('error', log),
    };
`;
  const onMessage = async payload => {
    Alert.alert(payload.nativeEvent.data);
    let dataPayload;
    try {
      dataPayload = JSON.parse(payload.nativeEvent.data);
    } catch (e) {}

    if (dataPayload) {
      if (dataPayload.type === 'Console') {
        console.info(`[Console] ${JSON.stringify(dataPayload.data)}`);
      } else {
      }
    }
  };
  // console.log('=============webViewRef=======================');
  // console.log(webViewRef.current);
  // console.log('=============webViewRef=======================');

  //UI
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1,backgroundColor: Color.LIGHT_BLACK}}>
         
         <CustomHeader
          navigation={props?.navigation}
          text="Payment"
          type={'Payment'}
        />
        <WebView
          ref={webViewRef}
          startInLoadingState={true}
          source={{uri: PaymentUrl}}
          javaScriptEnabled={true}
          onMessage={onMessage}
          onNavigationStateChange={onNavigationStateChange}
          injectedJavaScript={debugging}
          onLoad={() => <Loader />}
          renderLoading={() => {
            return loading ? <Loader /> : null;
          }}
          style={{backgroundColor: 'white'}}
        />
      </View>
      {popup ? (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: dimensions.SCREEN_HEIGHT,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            padding: 20,
          }}>
          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              backgroundColor: '#fff',
              padding: 15,
              borderRadius: 15,
            }}>
            <TouchableOpacity>
              {/* <Image
                source={images.successimg}
                style={{
                  alignSelf: 'center',
                  width: 120,
                  height: 120,
                  resizeMode: 'stretch',
                  marginTop: 20,
                }}
              /> */}
            </TouchableOpacity>
            <View
              style={{
                width: '80%',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 40,
              }}>
              <Text
                numberOfLines={3}
                style={{
                  color: '#000',

                  marginTop: 20,
                  fontSize: 20,
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                Your booking for {tourdata?.title} is successfully submitted
              </Text>
            </View>

            <Text
              style={{
                color: '#000',
                alignSelf: 'center',
                marginTop: 10,
                fontSize: 13,
                fontWeight: '400',
              }}>
              We Will Get Back To You…
            </Text>
            <Text
              style={{
                color: '#000',
                textAlign: 'center',
                marginTop: 10,
                fontSize: 13,
                fontWeight: '400',
              }}>
              Allow me and my team, to take you on a private tour of your life,
              while visiting beautiful O’ahu.
            </Text>

            {/* <CustomButton
              title={'Close'}
              borderColor={'#83CDFD'}
              onPress={() => {
                props.navigation.reset({
                  index: 0,
                  routes: [{name: 'ConfirmedTour'}],
                });
                // props.navigation.navigate('HomeStack', {
                //   screen: 'MyTour',
                //   params: {},
                // });

                setpopup(false);
              }}
              backgroundColor={COLORS.Primary_Blue}
            /> */}
          </View>
        </View>
      ) : null}
      {popupsuccess ? (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: dimensions.SCREEN_HEIGHT,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            padding: 20,
          }}>
          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              backgroundColor: '#fff',
              padding: 15,
              borderRadius: 15,
            }}>
            <TouchableOpacity>
              {/* <Image
                source={images.successimg}
                style={{
                  alignSelf: 'center',
                  width: 120,
                  height: 120,
                  resizeMode: 'stretch',
                  marginTop: 20,
                }}
              /> */}
            </TouchableOpacity>
            <View
              style={{
                width: '80%',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 40,
              }}>
              <Text
                numberOfLines={2}
                style={{
                  color: '#000',
                  marginTop: 20,
                  fontSize: 20,
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                {props?.route?.params?.type != 'photobooth'
                  ? 'Virtual Tour Purchased Successfully'
                  : 'Photo Booth Purchased Successfully'}
              </Text>
            </View>

            <Text
              style={{
                color: '#000',
                alignSelf: 'center',
                marginTop: 10,
                fontSize: 13,
                fontWeight: '400',
              }}>
              Order Id : {tourdetails}
            </Text>

            {/* <CustomButton
              title={'Close'}
              borderColor={'#83CDFD'}
              onPress={() => {
                if (props?.route?.params?.type == 'audiopurchase') {
                  props.navigation.reset({
                    index: 0,
                    routes: [{name: 'MyVirtualTour'}],
                  });
                } else if (props?.route?.params?.type == 'photobooth') {
                  props.navigation.reset({
                    index: 0,
                    routes: [{name: 'TotalPurchasedScreen'}],
                  });
                } else {
                  props.navigation.reset({
                    index: 0,
                    routes: [{name: 'MyTour'}],
                  });
                }
                // props.navigation.navigate('TotalPurchasedScreen', {
                //   screen: 'TotalPurchasedScreen',
                //   params: {},
                // });
                // if (props?.route?.params?.type === 'photobooth') {
                //   props.navigation.reset({
                //     index: 0,
                //     routes: [{ name: 'TotalPurchasedScreen' }],
                //   });
                // } else if (
                //   props?.route?.params?.type == 'reviewbooking' ||
                //   props?.route?.params?.type == 'audiopurchase'
                // ){
                //   props.navigation.reset({
                //     index: 0,
                //     routes: [{ name: 'MyTour' }],
                //   });
                // }
                // else{
                //   props.navigation.reset({
                //     index: 0,
                //     routes: [{ name: 'HomeScreen' }],
                //   });
                // }

                setpopupsuccess(false);
              }}
              backgroundColor={COLORS.Primary_Blue}
            /> */}
          </View>
        </View>
      ) : null}
      {My_Alert ? (
        <MyAlert
          sms={alert_sms}
          okPress={() => {
            setMy_Alert(false);
            props.navigation.navigate('HomeStack', {
              screen: 'MyTour',
              params: {},
            });
          }}
        />
      ) : null}
      {loading ? <Loader /> : null}
    </View>
  );
};

export default PaymentWebView;
