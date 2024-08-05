//import : react components
import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Keyboard,
    Platform,
    Alert,
} from 'react-native';
import {
    DrawerActions,
    useNavigation,
    useFocusEffect,
    CommonActions,
    useIsFocused
} from '@react-navigation/native';
//import : custom components
import MyText from '../MyText/MyText';
//import : global
import Color, { dimensions } from '../../Global/Color';
//import : styles
import { styles } from './MyHeaderStyle';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { setAdminCount, setUser, setUserNotifications, userisSubscribedHandler, } from '../../reduxToolkit/reducer/user';
import { logOutUser } from 'src/reduxToolkit/reducer/user';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    Easing,
    useDerivedValue,
    withSpring,
} from 'react-native-reanimated';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { setCartCount } from '../../reduxToolkit/reducer/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiWithToken, GET_NOTIFICATION, UNSEEN_MESSAGE, CHECK_SUBSCRIPTION } from '../../Global/Service';

const personImg = `https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60`;
//svg imgess
import Profile from '../../Global/Images/profile.svg'
import Notfication from '../../Global/Images/notification.svg'
import Cart from '../../Global/Images/frame.svg'
import messaging from '@react-native-firebase/messaging';
import DrawerIcon from '../../Global/Images/drawer.svg'
import ArrowLeft from '../../Global/Images/arrowLeft.svg'
const MyHeader = ({
    Title,
    isBackButton = false,
    isBorderRadius = true,
    IsCartIcon = true,
    IsNotificationIcon = true,
    style = {},
    scrolling,
    scrollY = { "value": 0 },
    toNavigParams = null,
    shouldNavigateToModuleScreen = false, // New prop to decide the navigation behavior
}) => {
    const isFocus = useIsFocused();
    const dispatch = useDispatch();
    const userNotifications = useSelector(state => state.user.userNotifications);
    const favCount = useSelector(state => state.user.favCount);
    // const favCount = 1
    // console.log('my usernotification-->>', userNotifications);
    //variables
    const navigation = useNavigation();
    //   const dispatch = useDispatch();
    //   const cartCount = useSelector(state => state.user.cartCount);
    //   const userInfo = useSelector(state => state.user.userInfo);
 
    //   const userNotifications = useSelector(state => state.user.userNotifications);

    const [greetingMsg, setGreetingMsg] = useState('');
    const [loading, setLoading] = useState('')
    // animated code

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getGreetingMessage();
            getCartCount();
            gotoUnseenMessageCount();
            // const interval = setInterval(() => {
            //     // gotoUnseenMessageCount();
            //     // console.log('This will run every  3 second!');
            //   }, 3000);
            //   return () => clearInterval(interval);
          });
          // Return the function to unsubscribe from the event so it gets removed on unmount
          return unsubscribe;
    }, [isFocus]);

    useFocusEffect(
        useCallback(() => {
          const getCount = async () => {
            console.error('==token*********', userToken);
            try {
                const resp = await getApiWithToken(userToken, CHECK_SUBSCRIPTION);
              if (resp.data) {
                console.error(
                  'your plan has expired plz upgra===========>>>>>>>>>>*********resp.data?.is_plan_expired',
                  resp.data?.plan_status,
                );
               
                if (resp.data?.plan_status != true ) {
                  // console.log(headerName,"9090909090-CHAT_NOTIFICATION_COUNT",resp.data.is_plan_expired_msg);
                  
                  navigation.navigate('Subscription');
                    
        
                  const jsonValue = JSON.stringify(resp.data.data);
                  await AsyncStorage.setItem('userInfo', jsonValue);
                  dispatch(setUser(resp.data.data));
                } else if(resp.data?.plan_status == true ) {
                    dispatch(
                        userisSubscribedHandler({
                          isSubscribed: true,
                        }),
                      );
                }
                // else if (resp?.data?.status == 'N') {
                  
                //   Toast.show({text1: `Your account is temporary inactive please contact the owner for same.`});
    
                // //   await AsyncStorage.clear();
                // //   dispatch(UserAction.logOutUser());
                // //   navigation.dispatch(resetIndexGoWelcom);
                // }
              } else {
                if (resp?.msg == 'User not found') {
                  
                  Toast.show({text1: `Your account has been deleted please contact the owner for same.`});
    
                //   await AsyncStorage.clear();
                //   dispatch(UserAction.logOutUser());
                //   navigation.dispatch(resetIndexGoWelcom);
                }
                // setUnreadCount(0);
              }
            } catch (error) {
              console.error('error in getCount', error);
            //   setUnreadCount(0);
            }
          };

         
          if (userToken == null || userToken == '') {
          } else {
            getCount();
            
          }
          return () => {};
        }, [isFocus]),
      );

     //get data for admin chat count
  const gotoUnseenMessageCount = async () => {
    // setShowLoader(true);
   try {
     const resp = await getApiWithToken(userToken, UNSEEN_MESSAGE);
    //  console.log('DRAWR---admincount-', resp?.data?.unseen_message_count);
     if (resp?.data?.status) {
    //    setAdminChatCount(resp?.data?.unseen_message_count);
        
       dispatch(setAdminCount(resp?.data?.unseen_message_count));
    //    setShowLoader(false);
     } else {
       Toast.show({text1: resp.data.message});
    //    setShowLoader(false);
     }
   } catch (error) {
     console.log('error in gotoUnseenMessageCount', resp);
    //  setShowLoader(false);
   } finally {
    //  setShowLoader(false);
   }
 };


    const headerRadius = useDerivedValue(() => {
        // console.log('scrollY.value', scrollY.value, scrollY.value === 0 ? 30 : 0);
        return withSpring(scrollY.value === 0 ? 0 : 30);
    });
    const headerPaddingBottom2 = useDerivedValue(() => {
        return withSpring(scrollY.value === 0 ? 63 : 20);
    });
    const headerStyle = {
        borderBottomLeftRadius: headerRadius.value,
        borderBottomRightRadius: headerRadius.value,
        paddingBottom: headerPaddingBottom2,
    };

    const getGreetingMessage = () => {
        const now = new Date();
        const hrs = now.getHours();
        let msg = '';

        if (hrs >= 0 || hr == 24) msg = 'Good Morning,';
        if (hrs >= 12) msg = 'Good Afternoon,';
        if (hrs >= 16) msg = 'Good Evening,';
        setGreetingMsg(msg);
    };
    const getCartCount = async () => {
        // console.log('my get cart count is called');
        setLoading(true);
        try {
            const resp = await getApiWithToken(userToken, GET_NOTIFICATION);
            console.log('get notification contssss--->>>', resp?.data?.length);
            if (resp?.data?.success) {
                dispatch(setUserNotifications(resp?.data?.count));
                await AsyncStorage.setItem(
                    'userNotifications',
                    JSON.stringify(resp?.data?.count),
                );
                // setProfile(resp?.data?.data)
                // setCurrentPlan(resp?.data?.current_plan)
            } else {
                // console.log('error in getCartCount in Myheader', resp.data.message);
                // Toast.show({ text1: resp.data.message });
            }
        } catch (error) {
            console.log('error in getCartCount', error);
        }
        setLoading(false);
    };

    ////m otificationt counterIncrement: 
    messaging().onMessage(remoteMessage => {
        const data = remoteMessage;
        if (data && Object.keys(data).length !== 0) {
            console.log('when appp isss--->>>', data)
            dispatch(setUserNotifications('1'));
        } else {
            null
        }
        console.log('onMessage remoteMessage', remoteMessage);
    });

    messaging().onNotificationOpenedApp(remoteMessage => {

        const data = remoteMessage;
        console.log('when app is closed',);
        if (data && Object.keys(data).length !== 0) {
            dispatch(setUserNotifications('1'));
        } else {
            null
        }
    });

    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            const data = remoteMessage;
            // console.log('when app is opem',);
            if (data && Object.keys(data).length !== 0) {
                dispatch(setUserNotifications('1'));
            } else {
                null
            }
        });

    const userToken = useSelector(state => state.user.userToken);
    const userInfo = useSelector(state => state.user.userInfo)
    // const resetIndexGoToWelcome = CommonActions.reset({
    //     index: 1,
    //     routes: [{ name: ScreenNames.WELCOME }],
    // });
    //function : navigation function
    const openDrawer = () => navigation.dispatch(DrawerActions.openDrawer());
    const goBack = () => {
        console.log("shouldNavigateToModuleScreen..",shouldNavigateToModuleScreen);
        Keyboard.dismiss();
        // navigation.canGoBack() ? navigation.goBack() : console.log("can't go back");
        if (shouldNavigateToModuleScreen) {
            navigation.navigate('ModuleListing', toNavigParams); // Replace 'ModuleScreen' with the actual name of your module screen
        } else {
            console.log("goBack-elsepart",navigation.canGoBack());
            if (navigation.canGoBack()) {
                navigation.goBack();
            } else {
                console.log("can't go back");
            }
        }
    };
    // const gotoNotification = () => navigation.navigate(ScreenNames.NOTIFICATIONS);
    const gotoCart = () => navigation.navigate('Saved');
    //UI
    return (
        <Animated.View
            style={[
                styles.container,
                style,
                // {
                //     borderBottomLeftRadius: isBorderRadius ? 30 : 0,
                //     paddingBottom: isBackButton ? 73 : 63,
                //     borderBottomRightRadius: isBorderRadius ? 30 : 0,
                // },
                headerStyle,
                { borderBottomStartRadius: 30, borderBottomEndRadius: 30, }
            ]}>
            {/* section first drawer and back icon  */}
            <TouchableOpacity onPress={isBackButton ? goBack : openDrawer}>
                {isBackButton ? (

                    // <Image source={require('assets/images/arrow-left-white.png')} />
                    <ArrowLeft />

                ) : (
                    <View style={styles.leftContainer}>

                        <DrawerIcon></DrawerIcon>

                    </View>
                )}
            </TouchableOpacity>
            {/* title section  */}
            {isBackButton ? (
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginRight: !IsCartIcon && !IsNotificationIcon ? 40 : 0,

                    }}>

                    <MyText
                        text={Title}
                        fontFamily="regular"
                        fontSize={16}
                        marginHorizontal={10}
                        textColor="white"
                        letterSpacing={-0.2}
                    />
                </View>
            ) : <>
                <View style={{ flexDirection: 'row', width: dimensions.SCREEN_WIDTH * 0.60 }}>
                    <Image
                        resizeMode="contain"
                        source={
                            userInfo?.profile_image
                                ? { uri: userInfo?.profile_image }
                                : require('../../Global/Images/user-default.png')
                        }

                        style={styles.personImg}
                    />
                    <View style={{ marginLeft: 10 }}>
                        <MyText
                            // text={'Good Afternoon,'}
                            text={greetingMsg}
                            fontFamily="Roboto"
                            fontSize={12}
                            textColor="white"
                            letterSpacing={-0.12}
                            fontWeight={'normal'}
                        />
                        <MyText
                            text={`${userInfo?.first_name} ${userInfo?.last_name}`}

                            fontFamily="Roboto"
                            fontSize={20}
                            textColor={Color.PRIMARY}
                            letterSpacing={-0.2}
                            numberOfLines={1}
                            fontWeight={'normal'}
                            style={{ marginTop: Platform.OS === 'android' ? -5 : 5, width: responsiveWidth(60) }}
                        />
                    </View>
                </View>
            </>}
            {/* notification or cart icon  */}
            {!isBackButton ? (
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',


                    }}>
                    {IsCartIcon ? (
                        <TouchableOpacity onPress={() => { gotoCart() }


                        }



                            style={{ marginRight: 10 }}
                        >

                            <Cart></Cart>
                            {favCount !== 0 ? (
                                <View style={[styles.numNotiView, { backgroundColor: Color.PRIMARY, borderRadius: 50, height: 12, width: 12 }]}>
                                    {/* <MyText
                  text={userNotifications}
                  fontSize={10}
                  textColor="white"
                /> */}
                                </View>
                            ) : null}

                        </TouchableOpacity>
                    ) : null}
                    {IsNotificationIcon ? (
                        <TouchableOpacity
                            // onPress={gotoNotification}
                            onPress={() => { navigation.navigate('Notification') }}
                        >
                            <Notfication></Notfication>
                            {userNotifications !== 0 ? (
                                <View style={[styles.numNotiView, { backgroundColor: Color.PRIMARY, borderRadius: 50, height: 12, width: 12 }]}>
                                    {/* <MyText
                  text={userNotifications}
                  fontSize={10}
                  textColor="white"
                /> */}
                                </View>
                            ) : null}
                        </TouchableOpacity>
                    ) : null}

                </View>) : <View>
            </View>}
        </Animated.View>
    );
};

export default MyHeader;



// import React, { useEffect, useState } from 'react';
// import {
//     View,
//     TouchableOpacity,
//     Image,
//     Keyboard,
//     Platform,
// } from 'react-native';
// import {
//     DrawerActions,
//     useNavigation,
// } from '@react-navigation/native';
// import { useSelector } from 'react-redux';
// import Animated, { useDerivedValue, withSpring } from 'react-native-reanimated';
// import { responsiveWidth } from 'react-native-responsive-dimensions';
// import MyText from '../MyText/MyText';
// import Color, { dimensions } from '../../Global/Color';
// import { styles } from './MyHeaderStyle';
// import Profile from '../../Global/Images/profile.svg';
// import Notfication from '../../Global/Images/notification.svg';
// import Cart from '../../Global/Images/frame.svg';
// import DrawerIcon from '../../Global/Images/drawer.svg';
// import ArrowLeft from '../../Global/Images/arrowLeft.svg';

// const personImg = `https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60`;

// const MyHeader = ({
//     Title = '',
//     isBackButton = false,
//     isBorderRadius = true,
//     IsCartIcon = true,
//     IsNotificationIcon = true,
//     style = {},
//     scrolling,
//     scrollY = { value: 0 },
//     toNavigParams = null,
//     shouldNavigateToModuleScreen = false, // New prop to decide the navigation behavior
// }) => {
//     const navigation = useNavigation();
//     const [greetingMsg, setGreetingMsg] = useState('');
//     const userToken = useSelector(state => state.user.userToken);
//     const userInfo = useSelector(state => state.user.userInfo);

//     useEffect(() => {
//         getGreetingMessage();
//     }, []);

//     const getGreetingMessage = () => {
//         const now = new Date();
//         const hrs = now.getHours();
//         let msg = '';

//         if (hrs >= 0 && hrs < 12) msg = 'Good Morning,';
//         else if (hrs >= 12 && hrs < 16) msg = 'Good Afternoon,';
//         else if (hrs >= 16 && hrs <= 23) msg = 'Good Evening,';

//         setGreetingMsg(msg);
//     };

//     const headerRadius = useDerivedValue(() => withSpring(scrollY.value === 0 ? 30 : 0));
//     const headerPaddingBottom = useDerivedValue(() => withSpring(scrollY.value === 0 ? 63 : 20));

//     const headerStyle = {
//         borderBottomLeftRadius: headerRadius.value,
//         borderBottomRightRadius: headerRadius.value,
//         paddingBottom: headerPaddingBottom.value,
//     };

//     const openDrawer = () => navigation.dispatch(DrawerActions.openDrawer());

//     const goBack = () => {
//         { console.log(toNavigParams, 'toNavigParams'); }
//         Keyboard.dismiss();
//         if (shouldNavigateToModuleScreen) {
//             navigation.navigate('ModuleListing', toNavigParams); // Replace 'ModuleScreen' with the actual name of your module screen
//         } else {
//             if (navigation.canGoBack()) {
//                 navigation.goBack();
//             } else {
//                 console.log("can't go back");
//             }
//         }
//     };

//     const gotoCart = () => navigation.navigate('Saved');

//     return (
//         <Animated.View
//             style={[
//                 styles.container,
//                 style,
//                 headerStyle,
//                 { borderBottomStartRadius: 30, borderBottomEndRadius: 30 }
//             ]}
//         >
//             <TouchableOpacity onPress={isBackButton ? goBack : openDrawer}>
//                 {isBackButton ? <ArrowLeft /> : <DrawerIcon />}
//             </TouchableOpacity>

//             {isBackButton ? (
//                 <View style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     marginRight: !IsCartIcon && !IsNotificationIcon ? 40 : 0,
//                 }}>
//                     <MyText
//                         text={Title}
//                         fontFamily="regular"
//                         fontSize={16}
//                         marginHorizontal={10}
//                         textColor="white"
//                         letterSpacing={-0.2}
//                     />
//                 </View>
//             ) : (
//                 <View style={{ flexDirection: 'row', width: dimensions.SCREEN_WIDTH * 0.60 }}>
//                     <Image
//                         resizeMode="contain"
//                         source={userInfo?.profile_image
//                             ? { uri: userInfo?.profile_image }
//                             : require('../../Global/Images/user-default.png')
//                         }
//                         style={styles.personImg}
//                     />
//                     <View style={{ marginLeft: 10 }}>
//                         <MyText
//                             text={greetingMsg}
//                             fontFamily="Roboto"
//                             fontSize={12}
//                             textColor="white"
//                             letterSpacing={-0.12}
//                             fontWeight="normal"
//                         />
//                         <MyText
//                             text={`${userInfo?.first_name} ${userInfo?.last_name}`}
//                             fontFamily="Roboto"
//                             fontSize={20}
//                             textColor={Color.PRIMARY}
//                             letterSpacing={-0.2}
//                             numberOfLines={1}
//                             fontWeight="normal"
//                             style={{ marginTop: Platform.OS === 'android' ? -5 : 5, width: responsiveWidth(60) }}
//                         />
//                     </View>
//                 </View>
//             )}

//             {!isBackButton && (
//                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                     {IsCartIcon && (
//                         <TouchableOpacity onPress={gotoCart} style={{ marginRight: 10 }}>
//                             <Cart />
//                         </TouchableOpacity>
//                     )}
//                     {IsNotificationIcon && (
//                         <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
//                             <Notfication />
//                         </TouchableOpacity>
//                     )}
//                 </View>
//             )}
//         </Animated.View>
//     );
// };

// export default MyHeader;

