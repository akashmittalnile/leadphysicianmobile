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
import moment from 'moment';
import {
  useSharedValue,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import Hyperlinks from 'react-native-hyperlinks';
import Toast from 'react-native-toast-message';

import {styles} from './SchduleStyle';
import MyHeader from '../../Components/MyHeader/MyHeader';
import Loader from '../../Components/Loader';

import {
  GET_PROFILE,
  postApiWithToken,
  LOGOUT,
  getApiWithToken,
  GET_SHDULEDETAIL,
} from '../../Global/Service';

import {connect, useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import OnGoing from '../../Global/Images/clock.svg';
import Clock from '../../Global/Images/clockHome.svg';
import Calendar from '../../Global/Images/calendarHome.svg';
import Monitor from '../../Global/Images/monitor.svg';
const SchduleDetails = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState('');
  const [profile, setProfile] = useState({});
  const isFocus = useIsFocused();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCartCount();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [isFocus]);
  //hyperlink

  const handleOnLinkPress = url => {
    // Open the link using a web browser or a WebView
    // <View style={{flex: 1}}>
    //       {console.log('my webview url---?>>', JSON.stringify(url))}
    //       <WebView
    //         source={{uri:`${url}`}}
    //         // Other WebView props...
    //       />
          
    //     </View>
  };

  function handleOnMentionPress(username) {}

  function handleOnHashtagPress(tag) {}
  //get data for list
  const getCartCount = async () => {
    var url = GET_SHDULEDETAIL;
    var murl = `/` + route?.params?.id;
    url = url + murl;
    try {
      setLoading(true);
      const resp = await getApiWithToken(userToken, url);

      if (resp?.data?.status === true) {
        setProfile(resp?.data?.data);
      } else {
        Toast.show({text1: resp.data.message});
      }
    } catch (error) {
      console.log('error in getCartCount', error);
    }
    setLoading(false);
  };

  // logout user

  //variables : redux
  const userToken = useSelector(state => state.user.userToken);

  const [animating, setAnimating] = useState(true);
  const [scrolling, setscrolling] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useSharedValue(0);

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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F7FAEB'}}>
      <StatusBar backgroundColor={Color.LIGHT_BLACK} />
      <View
        style={{
          flex: 1,
          backgroundColor: '#F7FAEB',
        }}>
        <MyHeader Title={`Scheduled Meeting Details`} isBackButton />
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
                style={{width: '100%', alignSelf: 'center', height: 'auto'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: dimensions.SCREEN_WIDTH * 0.84,
                    alignSelf: 'center',
                    marginTop: 12,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.circleView}>
                      <MyText
                        text={'LP'}
                        fontFamily="Roboto"
                        fontWeight="500"
                        fontSize={14}
                        textColor={Color.PRIMARY}
                        style={{alignSelf: 'center'}}
                      />
                    </View>

                    <MyText
                      text={'Dr. Elsie Koh, MD MHL'}
                      fontFamily="Roboto"
                      fontWeight="bold"
                      fontSize={14}
                      textColor={Color.LIGHT_BLACK}
                      style={{alignSelf: 'center', marginLeft: 12}}
                    />
                  </View>

                  <View style={styles.buttonBi}>
                    <MyText
                      text={profile?.meeting_type}
                      fontFamily="Roboto"
                      fontWeight="700"
                      fontSize={12}
                      textColor={Color.WHITE}
                      style={{alignSelf: 'center'}}
                    />
                  </View>
                </View>
                <View
                  style={{
                    width: dimensions.SCREEN_WIDTH,
                    height: 1,
                    backgroundColor: '#E7EAF1',
                    marginVertical: 12,
                  }}></View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 12,
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: dimensions.SCREEN_WIDTH * 0.53,
                    }}>
                    <MyText
                      text={profile?.meeting_title}
                      fontFamily="Roboto"
                      fontWeight="700"
                      fontSize={14}
                      textColor={'#132A3A'}
                      style={{}}
                    />

                    <View style={{flexDirection: 'row', marginTop: 9}}>
                      <Calendar></Calendar>
                      <MyText
                        text={`${profile.schedule_start_date}`}
                        fontFamily="Roboto"
                        fontWeight="400"
                        fontSize={13}
                        textColor={'#132A3A'}
                        style={{alignSelf: 'center', marginLeft: 4}}
                      />
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 4}}>
                      <Clock></Clock>
                      <MyText
                        text={
                          `${moment(
                            profile.schedule_start_time,
                            'HH:mm:ss',
                          ).format('hh:mm A')}-${moment(
                            profile.schedule_end_time,
                            'HH:mm:ss',
                          ).format('hh:mm A')}` !== undefined
                            ? `${moment(
                                profile.schedule_start_time,
                                'HH:mm:ss',
                              ).format('hh:mm A')}-${moment(
                                profile.schedule_end_time,
                                'HH:mm:ss',
                              ).format('hh:mm A')}`
                            : ''
                        }
                        fontFamily="Roboto"
                        fontWeight="400"
                        fontSize={13}
                        textColor={'#132A3A'}
                        style={{
                          marginLeft: 4,
                          top: 2,
                        }}
                      />
                    </View>
                  </View>
                  <Monitor></Monitor>
                </View>
                <View
                  style={{
                    width: dimensions.SCREEN_WIDTH,
                    height: 1,
                    backgroundColor: '#E7EAF1',
                    marginVertical: 12,
                  }}></View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingBottom: 10,
                    width: dimensions.SCREEN_WIDTH,
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}>
                  {/* <Zoom height={36} width={36} style={{ marginLeft: 21 }}></Zoom> */}
                  {/* <MyText
                                        text={' Join Zoom Meeting :'}
                                        fontFamily="Roboto"
                                        fontWeight='400'
                                        fontSize={13}
                                        textColor={'#3DA1E3'}
                                        style={{ alignSelf: 'center', marginLeft: 4 }}

                                    /> */}
                  {/* <MyText
                                        text={profile?.zoom_link}
                                        fontFamily="Roboto"
                                        fontWeight='400'
                                        fontSize={13}
                                        textColor={Color.LIGHT_BLACK}
                                        style={{ alignSelf: 'center', marginLeft: 4 }}

                                    /> */}

                  <Hyperlinks
                    text={
                      profile?.zoom_link != undefined ? profile?.zoom_link : ''
                    }
                    style={{
                      fontSize: 15,
                      width: dimensions.SCREEN_WIDTH * 0.78,
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}
                    hyperlinkStyle={{color: '#3DA1E3'}}
                    onPress={() => handleOnLinkPress(profile?.zoom_link)}
                    // onLinkPress={handleOnLinkPress}
                    onMentionPress={handleOnMentionPress}
                    onHashtagPress={handleOnHashtagPress}
                  />
                </View>
                {/* <View style={{ marginHorizontal: 10, flexDirection: 'row' }} >
                                    <Zoom height={22} ></Zoom>
                                    <MyText
                                        text={'Join Zoom Meeting'}
                                        fontFamily="Roboto"
                                        fontWeight='400'
                                        fontSize={13}
                                        textColor={'#3DA1E3'}
                                        style={{}}

                                    />
                                </View> */}
              </View>
            </View>
          ) : null}
          <View style={styles.description}>
            <MyText
              text={`Meeting keynotes : ${
                profile?.note != null ? profile?.note : 'none'
              }`}
              fontFamily="Roboto"
              fontWeight="400"
              fontSize={14}
              textColor={Color.BLACK}
              style={{lineHeight: 24, paddingHorizontal: 10}}
            />
          </View>
        </ScrollView>

        {loading ? <Loader /> : null}
      </View>
    </SafeAreaView>
  );
};

export default SchduleDetails;
