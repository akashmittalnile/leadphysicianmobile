import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  ScrollView,
  RefreshControl,
  ImageBackground,
  FlatList,
} from 'react-native';
import Color, {dimensions} from '../../Global/Color';
import MyText from '../../Components/MyText/MyText';
import {
  useSharedValue,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';

import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyButton from '../../Components/MyButton/MyButton';
import {styles} from './ProfileStyle';
import MyHeader from '../../Components/MyHeader/MyHeader';
import Loader from '../../Components/Loader';
import AppIntroSlider from 'react-native-app-intro-slider';
import {
  GET_PROFILE,
  postApiWithToken,
  LOGOUT,
  getApiWithToken,
} from '../../Global/Service';
import {CommonActions} from '@react-navigation/core';
import {connect, useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import ProfileCall from '../../Global/Images/callProfile.svg';
import EmailProfile from '../../Global/Images/smsProfile.svg';
import ArrowRigt from '../../Global/Images/Shape.svg';
import Nodata from '../../Global/Images/lock-circle.svg';
import {logOutUser} from '../../reduxToolkit/reducer/user';
const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState('');
  const [profile, setProfile] = useState('');
  const [currentPlan, setCurrentPlan] = useState({});
  const isFocus = useIsFocused();

  ///my dispatch function
  const gotoWelcome = () =>
    CommonActions.reset({
      index: 1,
      routes: [{name: 'SignIn'}],
    });
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      getCartCount();
      setLoading(false);
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [isFocus]);
  //get data for list
  const getCartCount = async () => {
    setLoading(true);
    try {
      const resp = await getApiWithToken(userToken, GET_PROFILE);
      console.log('get profile get plan----->>>>', resp?.data);
      if (resp?.data?.success) {
        setProfile(resp?.data?.data);
        setCurrentPlan(resp?.data?.current_plan);
      } else {
        // Toast.show({text1: resp.data.message});
      }
    } catch (error) {
      console.log('error in getCartCount', error);
    }
    setLoading(false);
  };

  // logout user
  const logout = async () => {
    console.log('does it reach to logout function');
    setLoading(true);
    try {
      const resp = await postApiWithToken(userToken, LOGOUT, {});
      console.log('logout resp', resp?.data?.message);
      if (resp?.data?.status) {
        // closeDrawer();
        navigation.dispatch(gotoWelcome);
        Toast.show({text1: resp?.data?.message});
        dispatch(logOutUser());
        await AsyncStorage.clear();
      }
    } catch (error) {
      console.log('error in logout', error);
    }
    setLoading(false);
  };
  //variables : redux
  const userToken = useSelector(state => state.user.userToken);
  console.log('my user token---->>', userToken);
  const [animating, setAnimating] = useState(true);
  const [scrolling, setscrolling] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useSharedValue(0);

  const physicianCourse = [
    {
      id: '0',
      title: 'My Certificates',
    },
    {
      id: '1',
      title: 'Change password',
    },
    {
      id: '2',
      title: 'Terms & Conditions',
    },
    {
      id: '3',
      title: 'Privacy Policy',
    },

    {
      id: '4',
      title: 'Logout',
    },
  ];

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

  //ui for schdule
  const RenderSchdule = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.scduleView}
        onPress={() => {
          item.id === '1'
            ? navigation.navigate('ChangePassword')
            : item.id === '2'
            ? navigation.navigate('TermsCondition', {params: 'Privacy'})
            : item.id === '3'
            ? navigation.navigate('TermsCondition', {params: 'Policy'})
            : item.id === '4'
            ? logout()
            : item.id === '0'
            ? navigation.navigate('Certificate')
            : null;
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: dimensions.SCREEN_WIDTH * 0.8,
            justifyContent: 'space-between',
          }}>
          <MyText
            text={item.title}
            fontWeight="700"
            fontSize={14}
            textColor={'#132A3A'}
            fontFamily="Roboto"
            style={{alignSelf: 'center'}}
          />
          <ArrowRigt height={13} width={8}></ArrowRigt>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F7FAEB'}}>
      <StatusBar backgroundColor={Color.LIGHT_BLACK} />
      <View
        style={{
          flex: 1,
          backgroundColor: '#F7FAEB',
        }}>
        <MyHeader
          Title="Home"
          scrolling={scrolling}
          scrollY={scrollY}
          style={scrolling ? {zIndex: 99} : null}
          isBorderRadius={true}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: '20%'}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          // onScrollBeginDrag={() => {
          //   setscrolling(true);
          // }}
          // onMomentumScrollEnd={() => {
          //   setscrolling(false);
          // }}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.mainView}>
          {!scrolling ? (
            <View style={styles.appView}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: dimensions.SCREEN_WIDTH * 0.8,
                  alignSelf: 'center',
                  paddingVertical: 14,
                }}>
                <View style={{flexDirection: 'row'}}>
                  {/* <ProfilePic height={64} width={64}></ProfilePic> */}
                  {console.log(
                    'my profilre image--->>',
                    profile?.profile_image,
                  )}
                  <Image
                    source={
                      profile?.profile_image
                        ? {uri: profile?.profile_image}
                        : require('../../Global/Images/user-default.png')
                    }
                    style={{
                      height: 64,
                      width: 64,
                      borderRadius: 50,
                      backgroundColor: '#E6E6E6',
                    }}
                  />
                  <MyText
                    text={`${profile.first_name} ${profile.last_name}`}
                    fontWeight="bold"
                    fontSize={16}
                    textColor={'#4F5168'}
                    fontFamily="Roboto"
                    style={{marginHorizontal: 12, marginVertical: 18}}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    width: 66,
                    height: 34,
                    borderRadius: 50,
                    backgroundColor: Color.PRIMARY,
                    marginVertical: 12,
                    justifyContent: 'center',
                  }}
                  onPress={() => navigation.navigate('EditProfile')}>
                  <MyText
                    text="Edit"
                    fontWeight="600"
                    fontSize={14}
                    textColor={Color.WHITE}
                    fontFamily="Roboto"
                    style={{alignSelf: 'center'}}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  position: 'absolute',
                  backgroundColor: '#F7FAEB',
                  height: 48,
                  width: dimensions.SCREEN_WIDTH,
                  bottom: 0,
                  alignSelf: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: dimensions.SCREEN_WIDTH * 0.8,
                    alignSelf: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginVertical: 12,
                    }}>
                    <ProfileCall height={25} width={25}></ProfileCall>
                    <MyText
                      text={profile?.phone}
                      fontWeight="400"
                      fontSize={14}
                      textColor={'#66757F'}
                      fontFamily="Roboto"
                      style={{marginHorizontal: 5}}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginVertical: 12,
                    }}>
                    <EmailProfile height={25} width={25}></EmailProfile>
                    <MyText
                      text={`${
                        profile?.email === undefined
                          ? ''
                          : profile?.email?.length > 19
                          ? `${profile?.email.substring(0, 19)}.....`
                          : `${profile?.email.substring(0, 19)}`
                      }`}
                      fontWeight="400"
                      fontSize={14}
                      textColor={'#66757F'}
                      fontFamily="Roboto"
                      style={{marginHorizontal: 5, marginVertical: 3}}
                    />
                  </View>
                </View>
              </View>
            </View>
          ) : null}
          {console.log('my profile plans-->>>>', profile)}
          <View style={styles.greenView}>
            <ImageBackground
              source={require('../../Global/Images/MaskBackground.png')}
              style={{width: '106%', height: '100%', alignSelf: 'center'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: dimensions.SCREEN_WIDTH * 0.9,
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={currentPlan?.id === 1
                        ? require('../../Global/Images/silverMembership.png')
                        : currentPlan?.id === 2
                        ? require('../../Global/Images/goldMembership.png')
                        : require('../../Global/Images/PlataniumMembership.png')}
                    style={{
                      width: 62,
                      height: 62,
                      resizeMode: 'contain',
                      marginHorizontal: 14,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginVertical: 25,
                    }}></Image>
                  <View>
                    {console.log('my current pan values---->>', currentPlan)}
                    <MyText
                      text={currentPlan.name}
                      fontWeight="400"
                      fontSize={16}
                      textColor={Color.WHITE}
                      fontFamily="Roboto"
                      style={{}}
                    />
                    <MyText
                      text={`$ ${
                        currentPlan?.price
                          ? currentPlan?.price
                          : currentPlan?.monthly_price
                      }`}
                      fontWeight="500"
                      fontSize={24}
                      textColor={Color.WHITE}
                      fontFamily="Roboto"
                      style={{}}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    width: 103,
                    height: 44,
                    borderRadius: 5,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    navigation.navigate('Subscription');
                  }}>
                  <MyText
                    text="Renew"
                    fontWeight="700"
                    fontSize={14}
                    textColor={'#070F14'}
                    fontFamily="Roboto"
                    style={{alignSelf: 'center'}}
                  />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
          <View style={{marginVertical:8}}>
            <FlatList
              horizontal={false}
              data={physicianCourse}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={RenderSchdule}
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
        </ScrollView>
      </View>

      {loading ? <Loader /> : null}
    </SafeAreaView>
  );
};

export default Profile;
