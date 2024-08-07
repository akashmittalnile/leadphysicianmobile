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
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Color, {dimensions} from '../Global/Color';
import MyText from '../Components/MyText/MyText';
import {
  useSharedValue,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import Loader from '../Components/Loader';
import {styles} from './NotificationStyle';
import MyHeader from '../Components/MyHeader/MyHeader';
import {useIsFocused} from '@react-navigation/native';
//import : redux
import {connect, useSelector, useDispatch} from 'react-redux';
import {setUserNotifications} from '../reduxToolkit/reducer/user';
import {
  GET_NOTIFICATION,
  getApiWithToken,
  CLEAR_NOTIFICATION,
  requestPostApi,
  READ_NOTIFICATION,
} from '../Global/Service';

///svg
import Notofication from '../Global/Images/notificationNoData.svg';
const Notification = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const [animating, setAnimating] = useState(true);
  const [notification, setNotification] = useState([]);
  const [scrolling, setscrolling] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState('');
  const scrollY = useSharedValue(0);
  const renderNextButton = () => null;
  const renderDoneButton = () => null;
  const userToken = useSelector(state => state.user.userToken);
  console.log('my--->>>', userToken);

  const physicianCourse = [
    {
      id: '1',
      title:
        'Reference site about Lorem Ipsum, giving information on its origins, ',
      time: '01:25PM',
    },
    {
      id: '2',
      title:
        'Reference site about Lorem Ipsum, giving information on its origins, ',
      time: '01:25PM',
    },
    {
      id: '3',
      title:
        'Reference site about Lorem Ipsum, giving information on its origins, ',
      time: '01:25PM',
    },
    {
      id: '4',
      title:
        'Reference site about Lorem Ipsum, giving information on its origins, ',
      time: '01:25PM',
    },
  ];
  const schedule = [
    {
      id: '1',
      name: 'Jane Doe (Admin)',
      module: 'Module 3',
      time: '12 Mar, 09:30 Am',
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
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      getCartCount();
      readNotification();
      setLoading(false);
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [isFocus]);

  const checkcon = () => {
    setLoading(true);
      getCartCount();
      readNotification();
      setLoading(false);
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

  const getCartCount = async item => {
    var url = GET_NOTIFICATION;

    try {
      setLoading(true);
      const resp = await getApiWithToken(userToken, url);
      console.log('get notificationnnn---->', resp?.data?.data);
      if (resp?.data?.success) {
        // setProfile(resp?.data?.data)
        setLoading(false);
        setNotification(resp?.data?.data);
      } else {
        // Toast.show({ text1: resp.data.message });
      }
    } catch (error) {
      setLoading(false);
      console.log('error in getCartCount', error);
    }
    setLoading(false);
  };

  ////read notifications
  const readNotification = async item => {
    var url = READ_NOTIFICATION;

    try {
      const resp = await requestPostApi(
        READ_NOTIFICATION,
        '',
        'POST',
        userToken,
      );
      if (resp?.data?.success) {
        // setProfile(resp?.data?.data)
        setLoading(false);
        // setNotification(resp?.data?.data)
      } else {
        // Toast.show({ text1: resp.data.message });
      }
    } catch (error) {
      setLoading(false);
      console.log('error in getCartCount', error);
    }
    setLoading(false);
  };
  ////clear oification
  const clearAll = async () => {
    // console.log('my clear notification function');

    try {
      setLoading(true);
      const resp = await requestPostApi(
        CLEAR_NOTIFICATION,
        '',
        'DELETE',
        userToken,
      );
      console.log('on clear notification', resp?.responseJson);
      if (resp?.responseJson?.status) {
        Toast.show({test1:"All notifications cleared successfully"});
        setLoading(false);
        
        // Toast.show({text1: resp?.responseJson?.message});
        // getCartCount();
        const isNotificaton = '0';
        dispatch(setUserNotifications(isNotificaton));
        await AsyncStorage.setItem(
          'userNotifications',
          JSON.stringify(isNotificaton),
        );
        setNotification([]);
      } else {
        setLoading(false);
        Toast.show({text1: resp?.responseJson?.message});
      }
    } catch (error) {
      console.log('error in onLike', error);
    }
    setLoading && setLoading(false);
  };

  //ui for schdule
  const RenderSchdule = ({item}) => {
    return (
      <TouchableOpacity style={styles.scduleView}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              width: 63,
              height: 63,
              backgroundColor: '#F7FAEB',
              borderRadius: 50,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* {console.log('my image--->>', item?.image)}
                        {item.image === null ?
                            <Notofication height={41} width={41}></Notofication> : <Image source={{ uri: item?.image }} style={{
                                he
                                    : 41, width: 41, alignSelf: 'center'
                            }}></Image>} */}
            <Image
              source={
                item?.image
                  ? {uri: item?.image}
                  : require('../Global/Images/notification.png')
              }
              style={{height: 41, width: 41, borderRadius: 50}}
            />
          </View>
          <View>
            <MyText
              text={item.title}
              fontWeight="400"
              fontSize={14}
              textColor={Color.LIGHT_BLACK}
              fontFamily="Roboto"
              style={{
                textAlign: 'left',
                marginHorizontal: 16,
                width: dimensions.SCREEN_WIDTH * 0.6,
              }}
            />
            <MyText
              text={moment(item.created_at).format('YYYY-MM-DD')}
              fontWeight="400"
              fontSize={14}
              textColor={'#959FA6'}
              fontFamily="Roboto"
              style={{
                textAlign: 'left',
                marginHorizontal: 16,
                width: dimensions.SCREEN_WIDTH * 0.6,
                marginTop: 9,
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  // useEffect(() => {
  //     // getTheme();
  //     setTimeout(() => {
  //         setAnimating(false);

  //         // Check if user_id is set or not
  //         // If not then send for Authentication
  //         // else send to Home Screen
  //           AsyncStorage.getItem('user_id').then(value =>
  //             navigation.replace(value !== null ? 'RegisterScreen' : 'MainContainer'),
  //           );
  //         navigation.replace('WelcomeScreen')
  //     }, 5000);
  // }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F7FAEB'}}>
      <StatusBar backgroundColor={Color.LIGHT_BLACK} />
      <View
        style={{
          flex: 1,
          backgroundColor: '#F7FAEB',
        }}>
        <MyHeader Title={`Notifications`} isBackButton />
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
          {!scrolling ? <></> : null}

          <View style={{marginTop: 50}}>
         
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                 {notification.length !== 0 ? (
              <MyText
                text={`Notifications`}
                fontWeight="500"
                fontSize={16}
                textColor={Color.LIGHT_BLACK}
                fontFamily="Roboto"
                style={{textAlign: 'center'}}
              />)
              :
              null}

              {notification.length !== 0 ? (
                <TouchableOpacity
                  onPress={() => {
                    clearAll();
                  }}>
                  <MyText
                    text={'Clear All'}
                    fontWeight="500"
                    fontSize={16}
                    textColor={Color.LIGHT_BLACK}
                    fontFamily="Roboto"
                    style={{textAlign: 'center'}}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            
            <FlatList
              horizontal={false}
              data={notification}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={RenderSchdule}
              ListEmptyComponent={() => (
                <View
                  style={{
                    width: dimensions.SCREEN_WIDTH * 0.9,
                    backgroundColor: '#F7FAEB',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: dimensions.SCREEN_HEIGHT * 0.2,
                  }}>
                  <View
                    style={{
                      height: 119,
                      width: 119,
                      backgroundColor: 'white',
                      borderRadius: 60,
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <Notofication style={{marginVertical: 18}}></Notofication>
                  </View>
                  {/* No Notification Yet */}
                  <MyText
                    text={'No Notifications Yet'}
                    fontWeight="700"
                    fontSize={24}
                    textColor={Color.LIGHT_BLACK}
                    fontFamily="Roboto"
                    style={{textAlign: 'center', marginVertical: 12}}
                  />
                  <MyText
                    text={
                      'Stay Connected!  &  Informed with Our Notification Center'
                    }
                    fontWeight="400"
                    fontSize={18}
                    textColor={'#959FA6'}
                    fontFamily="Roboto"
                    style={{textAlign: 'center'}}
                  />
                  <TouchableOpacity
                    style={{
                      width: 142,
                      height: 49,
                      borderRadius: 5,
                      backgroundColor: Color.PRIMARY,
                      marginVertical: 17,
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <MyText
                      text={' Back to home'}
                      fontWeight="500"
                      fontSize={14}
                      textColor={'#FFFFFF'}
                      fontFamily="Roboto"
                      style={{textAlign: 'center'}}
                    />
                  </TouchableOpacity>
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

export default Notification;
