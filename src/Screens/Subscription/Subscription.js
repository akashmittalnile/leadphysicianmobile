import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  tyleSheet,
  Button,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {styles} from './SubscriptionStyle';
import Loader from '../../Components/Loader';
import MyText from '../../Components/MyText/MyText';
import MyAlert from '../../Global/MyAlert';
import {
  GET_CARDS,
  getApiWithToken,
  GET_PLANS,
  CHECK_SUBSCRIPTION,
} from '../../Global/Service';

import {useIsFocused} from '@react-navigation/native';
import {connect, useSelector, useDispatch} from 'react-redux';
import Service from '../../Global/Service';
import CustomButtonBlue from '../../Components/CustomButtonBlue';
import CustomTextBox from '../../Components/CustomTextBox';

import Color from '../../Global/Color';
import {dimensions} from '../../Global/Color';
import AppIntroSlider from 'react-native-app-intro-slider';
import CustomHeader from '../../Components/CustomHeader';
// svg image
import Tick from '../../Global/Images/subscriptionTick.svg';
const Subscription = ({navigation, route}) => {
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const userToken = useSelector(state => state.user.userToken);
  const isSubscribed = useSelector(
    state => state.user?.isSubscribed?.isSubscribed,
  );
  const subscriptionid = useSelector(state => state.user?.subscription_id);
  const [subscrptnStatusCheck, setSubscrptnStatusCheck] = useState(false);
  console.log(subscriptionid, 'isSubscribed====subscriptionid==', isSubscribed);

  const H = Dimensions.get('screen').height;
  const W = Dimensions.get('screen').width;
  const countryCodes = [
    {code: '+1', label: 'United States'},
    {code: '+44', label: 'United Kingdom'},
    {code: '+91', label: 'India'},
    // Add more country codes as needed
  ];
  const banner = [
    {
      id: '1',
      img: require('../../Global/Images/silverMembership.png'),
      price: '$9.99',
      type: `Silver Membership`,
      list: [
        {
          id: '1',
          title: 'Course with all modules ',
        },

        {id: '2', title: 'All Worksheets'},
      ],
    },
    {
      id: '2',
      img: require('../../Global/Images/goldMembership.png'),
      price: '$20.10',
      type: `Gold Membership`,
      list: [
        {
          id: '1',
          title: 'Course with all modules ',
          title: 'All Worksheets',
        },
        {id: '3', title: 'Scheduler'},
        {id: '4', title: 'Group Chat'},
        {id: '5', title: 'Chat Module'},
      ],
    },
    {
      id: '3',
      img: require('../../Global/Images/PlataniumMembership.png'),
      price: '$15.99',
      type: 'Platinum Membership',
      list: [
        {
          id: '1',
          title: 'Course with all modules ',
          title: 'All Worksheets',
        },
        {id: '3', title: 'Scheduler'},
      ],
    },
  ];
  const renderNextButton = () => null;
  const renderDoneButton = () => null;

  const RenderItem = ({item}) => {
    // console.log('item slider7777----->', item);
    // setSeletcedItem(item)
    return (
      <View style={{marginBottom: 90}}>
        <View style={styles.mainView}>
          <MyText
            text={`$${item?.monthly_price}/${item?.plan_type}`}
            fontWeight="bold"
            fontSize={28}
            textColor={Color.WHITE}
            fontFamily="Roboto"
            style={styles.textAbove}
          />
          <View style={styles.hoverView}>
            <MyText
              text={item.name}
              fontWeight="500"
              fontSize={18}
              textColor={Color.LIGHT_BLACK}
              fontFamily="Roboto"
              style={{alignSelf: 'center'}}
            />
          </View>
          <ScrollView
            style={{zIndex: 999}}
            keyboardShouldPersistTaps="always"
            bounces={false}
            contentContainerStyle={{flexGrow: 1}}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.listContainer}>
                <View style={styles.sub}>
                  <Tick></Tick>
                  <MyText
                    text={item.feature1}
                    style={{
                      marginHorizontal: 10,
                      fontWeight: '600',
                      fontSize: 16,
                      color: '#070F14',
                      width: dimensions.SCREEN_WIDTH * 0.7,
                      marginTop: 0,
                    }}
                  />
                </View>
                <View style={[styles.sub, {marginVertical: 7}]}>
                  <Tick></Tick>
                  <MyText
                    text={item.feature2}
                    style={{
                      marginHorizontal: 10,
                      fontWeight: '600',
                      fontSize: 16,
                      color: '#070F14',
                      width: dimensions.SCREEN_WIDTH * 0.7,
                    }}
                  />
                </View>
                <View style={[styles.sub]}>
                  <Tick></Tick>
                  <MyText
                    text={item.feature3}
                    style={{
                      marginHorizontal: 10,
                      fontWeight: '600',
                      fontSize: 16,
                      color: '#070F14',
                      width: dimensions.SCREEN_WIDTH * 0.7,
                    }}
                  />
                </View>
                <View style={[styles.sub, {marginVertical: 7}]}>
                  <Tick></Tick>
                  <MyText
                    text={item.feature4}
                    style={{
                      marginHorizontal: 10,
                      fontWeight: '600',
                      fontSize: 16,
                      color: '#070F14',
                      width: dimensions.SCREEN_WIDTH * 0.7,
                    }}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
          <ImageBackground
            source={
              item?.id === 1
                ? require('../../Global/Images/silverMembership.png')
                : item?.id === 2
                ? require('../../Global/Images/goldMembership.png')
                : require('../../Global/Images/PlataniumMembership.png')
            }
            style={{
              height: 100,
              width: 100,
              resizeMode: 'contain',
              position: 'absolute',
              bottom: 42,
              right: 20,
            }}
          />
        </View>
        {console.log("daasdadad0000".checkCurrentUserPlan?.is_subscription_active,checkCurrentUserPlan?.subscription_status)}
        {/* {console.log('klklk tytyyy---->>>', item)} */}
        {item?.current_plan === false ? (
          <TouchableOpacity
            style={{
              height: 52,
              width: dimensions.SCREEN_WIDTH * 0.8,
              borderRadius: 5,
              backgroundColor: Color.PRIMARY,
              justifyContent: 'center',
              alignSelf: 'center',
              position: 'absolute',
              // bottom: -26, // Half the height of the button to make it overlap
              // bottom: -26,
              bottom: -10,
              // marginTop: 420,

              // zIndex: 1
            }}
            // hitSlop={{  bottom: 100}}

            onPress={() => {
              if (subscrptnStatusCheck != true) {
                if (checkCurrentUserPlan?.is_subscription_active != true) {
                  navigation.navigate('PurchaseReview', {
                    item: item,
                    type: 'Subscription',
                  });
                } else if (checkCurrentUserPlan?.is_subscription_active == true) {
                  if (checkCurrentUserPlan?.subscription_status == 'active') {
                    Toast.show({text1: 'Please cancel the previous subscription'});
                    // getSubscription();
                  }
                  else if(checkCurrentUserPlan?.subscription_status == 'pending'){
                    getSubscription();
                  }else{
                    navigation.navigate('PurchaseReview', {
                      item: item,
                      type: 'Subscription',
                    });
                  }
                } else {
                  getSubscription();
                }

                // navigation.navigate('Payment', {item: item});
              } else {
                Toast.show({text1: 'Please cancel the previous subscription'});
              }
            }}>
            <MyText
              text={
                item?.current_plan === false ? `Subscribe Now ` : `Current Plan`
              }
              fontWeight="bold"
              fontSize={16}
              textColor={Color.WHITE}
              fontFamily="Roboto"
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              height: 52,
              width: dimensions.SCREEN_WIDTH * 0.8,
              borderRadius: 5,
              backgroundColor: Color.WHITE,
              justifyContent: 'center',
              alignSelf: 'center',
              position: 'absolute',
              borderWidth: 1,
              borderColor: Color.PRIMARY,
              bottom: -26, // Half the height of the button to make it overlap
            }}
            onPress={() => navigation.navigate('Payment', {item: item})}>
            <MyText
              text={
                item?.current_plan === false ? `Buy Now Plan` : `Current Plan`
              }
              fontWeight="bold"
              fontSize={16}
              textColor={Color.PRIMARY}
              fontFamily="Roboto"
              style={{alignSelf: 'center'}}
            />
          </View>
        )}
      </View>
    );
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // console.log('my subscruption iscaleed');
      getCartCount();
      getSubscription();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [isFocus]);

  //get deatails
  const getCartCount = async () => {
    console.log('get cart count subscrpition userToken', userToken);
    // var url = GET_PLANS;

    // console.log('mu murl worksheet===>', url);
    try {
      setLoading(true);
      console.log('api is hit for ----->>>');
      const resp = await getApiWithToken(userToken, GET_PLANS);
      // resp?.data?.data?.steps
      console.log('my plans----->>>', resp?.data);
      if (resp?.data?.status) {
        setCheckCurrentUserPlan(resp?.data);
        setPlans(resp?.data?.data);
        setLoading(false);
      } else {
        setLoading(false);
        // Toast.show({ text1: resp.data.message });
        console.log('hi adi', resp);
      }
    } catch (error) {
      console.log('error in getCartCount', error);
    }
    setLoading(false);
  };
  const getSubscription = async () => {
    try {
      var url = CHECK_SUBSCRIPTION;
      var subs = `?subscription_id=` + subscriptionid;
      url = url + subs;

      console.log('getSubscription-000', url);

      const resp = await getApiWithToken(userToken, url);
      if (resp.data) {
        // if (resp.data?.plan_status != true ) {
        //   dispatch(
        //     userisSubscribedHandler({
        //       isSubscribed: false,
        //     }),
        //   );
        //   const jsonValue = JSON.stringify(resp.data.data);
        //   await AsyncStorage.setItem('userInfo', jsonValue);
        //   dispatch(setUser(resp.data.data));
        //   navigation.navigate('Subscription');
        // }
        console.error('CHECK_SUBSCRIPTION', resp.data?.plan_status);
        setSubscrptnStatusCheck(resp.data?.plan_status);
      }
    } catch (error) {
      console.error('error in getCount', error);
      //   setUnreadCount(0);
    }
  };
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    countryCodes[0].code,
  );

  const [loading, setLoading] = useState('');
  const [checkCurrentUserPlan, setCheckCurrentUserPlan] = useState('');
  const [plans, setPlans] = useState([]);
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');

  const [selectedItem, setSeletcedItem] = useState('');
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Color.LIGHT_BLACK}}>
      {/* <ScrollView contentContainerStyle={{flexGrow: 1}}> */}
      <CustomHeader
        navigation={navigation}
        text="Subscription Plans"
        type={'subscription'}
        backButton={isSubscribed}
      />
      {/* <TouchableOpacity style={{ position: 'absolute', top: 36, right: 20, height: 36, width: 60, backgroundColor: 'white', borderRadius: 5, flexDirection: 'row', alignSelf: 'center' }}>
                    <MyText text='Skip' fontWeight='500' fontSize={14} textColor={'#070F14'} fontFamily='Roboto' style={{ alignSelf: 'center', marginHorizontal: 15 }} />
                </TouchableOpacity> */}
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View
          style={{
            backgroundColor: Color.LIGHT_BLACK,
            width: '95%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          <MyText
            text=""
            fontWeight="bold"
            fontSize={24}
            textColor={Color.PRIMARY}
            fontFamily="Roboto"
            style={{alignSelf: 'center', marginBottom: 40}}
          />

          {/* <ScrollView
                        horizontal
                        contentContainerStyle={styles.mainDiv}>
                        {banner.map((item, index) => (
                            <RenderItem key={index} item={item} />
                        ))}
                    </ScrollView> */}
          <View
            style={{
              width: dimensions.SCREEN_WIDTH * 0.9,
              alignSelf: 'center',
              height: 'auto',
            }}>
            <AppIntroSlider
              // data={sucessStories}
              data={plans}
              renderNextButton={renderNextButton}
              renderDoneButton={renderDoneButton}
              dotStyle={[styles.dotStylee]}
              renderItem={RenderItem}
              activeDotStyle={[styles.activeStylee]}
              keyExtractor={(item, id) => String(item?.id)}
            />
          </View>
        </View>
      </ScrollView>
      {My_Alert ? (
        <MyAlert
          sms={alert_sms}
          okPress={() => {
            setMy_Alert(false);
          }}
        />
      ) : null}
      {/* </ScrollView> */}

      {loading ? <Loader /> : null}
    </SafeAreaView>
  );
};

export default Subscription;
