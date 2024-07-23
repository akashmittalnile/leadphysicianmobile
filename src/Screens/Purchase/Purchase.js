//import : react components
import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Pressable,
  Text,
} from 'react-native';
//import : custom components
import Loader from '../../Components/Loader';
import MyAlert from '../../Global/MyAlert';
import {width} from '../../Global/Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//import : third parties
// import BraintreeDropIn from 'react-native-braintree-dropin-ui';
//import : styles
import {styles} from './PurschaseStyle';
//import : redux
import Toast from 'react-native-toast-message';
import {useSelector, useDispatch} from 'react-redux';
import Color, { dimensions } from '../../Global/Color';
import MyText from '../../Components/MyText/MyText';
import CustomHeader from '../../Components/CustomHeader';
import { CREATE_SUBSCRIPTION, postApiWithToken } from '../../Global/Service';

const PurchaseReview = props => {
  const userToken = useSelector(state => state.user.userToken);
console.log("ROUTE-PARAMA-data------",props?.route?.params?.item?.id);
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
 
  const paymentMethods = [
    {
      id: 1,
      name: 'PayPal',
      image_url: require('../../Global/Images/paypal.png'),
    },
  ];
  // {
  //   id:2,
  //   name:'Venmo',
  //   image_url: require('../../assets/images/Icons/paypal.png'),
  // }
  //variables : redux variables
  const dispatch = useDispatch();
  //hook : states

  const [orderInfoData, setOrderInfoData] = useState({});
  const [showCouponLoader, setshowCouponLoader] = useState(false);
  const [selectedPaymentType, setselectedPaymentType] = useState('');
  const [couponCode, setcouponCode] = useState('');
  const [isWalletSelected, setIsWalletSelected] = useState(true);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [enoughAmountInWallet, setEnoughAmountInWallet] = useState(false);
  const [cartData, setCartData] = useState([]);
  //function : navigation function

  const gotoPaymentWebView = url =>
    props?.navigation.navigate('PaymentWebView', {
      url: url,
      type: props?.route?.params?.type,
      // bookingdata: props?.route?.params,
    });
  // const gotoDownloadInvoice = orderId =>
  //   props?.navigation.replace(ScreensName.DOWNLOAD_INVOICE, {orderId: orderId});

  //function : imp function
  const clearState = () => {
    setcouponCode('');
  };
  const validation = () => {
    if (selectedPaymentType == '') {
      Toast.show({ text1: 'Please select payment method!' });
    } 
    else return true;
  };
  //function : service function
  // const getOrderInfo = async () => {
  //   setLoading(true);
  // try {
  //   const paramsData = {
  //     type: props.route?.params?.type,
  //     session_id: sessionId,
  //     user_id: Object.keys(userInfo).length > 0 ? userInfo.id : '',
  //   };
  //   const {response, status} = await Server.getAPI(
  //     Server.GET_CHECKOUT_ADDRESS,
  //     userToken,
  //     paramsData,
  //   );
  //   if (status) {
  //     const formattedData = [];
  //     const cartData = response.local_cart_list;
  //     for (const vendorId in cartData) {
  //       const data = {
  //         vendor_id: vendorId,
  //         data: cartData[vendorId],
  //       };
  //       formattedData.push(data);
  //     }
  //     setCartData(formattedData);
  //     response?.cart_list?.map(item => {
  //       if (item.isCouponApplied) {
  //         setIsCouponApplied(true);
  //       }
  //     });
  //     setOrderInfoData(response);
  //     if (response.wallet >= response?.order_summary?.total) {
  //       setEnoughAmountInWallet(true);
  //     }
  //     if (response.wallet == 0) {
  //       setIsWalletSelected(false);
  //     }
  //   }
  // } catch (error) {
  //   console.error('error in getOrderInfo', error);
  // }
  //   setLoading(false);
  // };
  // const applyOfferCode = async () => {
  //   if (couponCode != '') {
  //     setshowCouponLoader(true);
  //     try {
  //       const data = {
  //         coupon: couponCode,
  //         type: props.route?.params?.type,
  //         session_id: sessionId,
  //         user_id: Object.keys(userInfo).length > 0 ? userInfo.id : '',
  //       };
  //       const {status, response} = await Server.postAPI(
  //         Server.APPLY_OFFER,
  //         data,
  //         userToken,
  //       );
  //       if (status) {
  //         setalert_sms('Coupon applied successfully');
  //         setMy_Alert(true);

  //         getOrderInfo();
  //         clearState();
  //       } else {
  //         setalert_sms(response?.msg);
  //         setMy_Alert(true);
  //       }
  //     } catch (error) {
  //       console.error('error in applyOfferCode', error);
  //     }
  //     setshowCouponLoader(false);
  //   } else {
  //     setalert_sms('Please enter coupon code');
  //     setMy_Alert(true);
  //   }
  // };
 
  const placeOrder = async () => {
    if (validation()) {
      setLoading(true);
      // let formdata = new FormData();
      // formdata.append('user_id', user?.userid);
      // formdata.append('amount', parseFloat(props?.route?.params?.amount).toFixed(2));
      // formdata.append('tax',props?.route?.params?.tax)
      const data = {
        plan_id: props?.route?.params?.item?.id,
      };
      const resp = await postApiWithToken(userToken,CREATE_SUBSCRIPTION,data);
    console.log("CREATE_SUBSCRIPTION",resp.data);
        if (resp.data.status == true) {
          gotoPaymentWebView(resp?.data.data.link);
        } else {
          Toast.show({text1: resp.data.message}); 
        }
      
      setLoading(false);
    }
  };
  // const paymentWithVenmo = async() => {
  //   console.log("paymentWithVenmo call!!!!");
  //   try {
  //     BraintreeDropIn.show({
  //       merchantIdentifier: 'w7q3ss7bkhhbdnbk',
  //       countryCode: 'US', //apple pay setting
  //       currencyCode: 'USD', //apple pay setting
  //       orderTotal: 0.01,
  //       vaultManager: true,
  //       venmo: true,
  //       cardDisabled: true,
  //       darkTheme: true,
  //       paymentMethods: 'venmo',
  //       clientToken: 'sandbox_q7cn4g94_w7q3ss7bkhhbdnbk',
  //     })
  //       .then(response => {
  //         console.log('i am here ');
  //         console.log(response);
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       });
  //   } catch (error) {
  //     console.error('error in paymentWithVenmo', error);
  //   }
  // };
  
 
  //UI
  return (
    <View style={styles.container}>
        <CustomHeader
          navigation={props?.navigation}
          text="Payment"
          type={'Payment'}
        />

      <>
        <View
          style={{
            justifyContent: 'center',
            width: '100%',
            alignItems: 'center',
            marginTop: 10,
          }}>
          {paymentMethods.length > 0
            ? paymentMethods.map((item, index) => (
                <TouchableOpacity
                  key={index.toString()}
                  onPress={() => {
                    if (selectedPaymentType == '') {
                      setselectedPaymentType(item.id);
                    } else {
                      setselectedPaymentType('');
                    }
                  }}
                  style={styles.paymentMethodsView}>
                  <MaterialIcons
                    name={
                      selectedPaymentType == item.id
                        ? 'radio-button-on'
                        : 'radio-button-off'
                    }
                    size={22}
                    color={'#000'}
                  />
                  <Image
                    resizeMode="contain"
                    source={item.image_url}
                    style={{height: '100%', width: '20%'}}
                  />
                  <Text
                    style={{
                      marginHorizontal: 5,
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: 'black',
                    }}>
                    {item.name}
                  </Text>
                  {selectedPaymentType == item.id ? (
                    <TouchableOpacity
                      style={{position: 'absolute', right: 10}}
                      onPress={() => setselectedPaymentType('')}>
                      <Text
                        style={{
                          color: 'red',
                          fontWeight: '700',
                          fontSize: 14,
                        }}>
                        Reset
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </TouchableOpacity>
              ))
            : null}
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
            <View style={{ height: 100, width: width * 0.9,   justifyContent: 'center' }}>
                <TouchableOpacity style={{ width: dimensions.SCREEN_WIDTH * 0.9, height: 50, backgroundColor: Color.PRIMARY, alignSelf: 'center', borderRadius: 10, justifyContent: 'center' }} onPress={placeOrder}>
                    <MyText text='Pay' fontWeight='700' fontSize={14} textColor={Color.WHITE} fontFamily='Roboto' style={{ alignSelf: 'center' }} />
                </TouchableOpacity>
                {/* Content for the bottom view */}
            </View>
          {/* <CustomButton
            title={'Pay'}
            borderColor={COLORS.border_blue}
            onPress={() => {
              placeOrder();
            }}
            backgroundColor={COLORS.Primary_Blue}
          /> */}
        </View>
        <View style={{height: 30}} />
      </>

      {My_Alert ? (
        <MyAlert
        sms={alert_sms}
        okPress={() => {
          setMy_Alert(false);
        }}
      />
      ) : null}
      {loading ? <Loader /> : null}
    </View>
  );
};
export default PurchaseReview;
