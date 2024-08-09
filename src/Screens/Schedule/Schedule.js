// import {
//   View,
//   Text,
//   ImageBackground,
//   StyleSheet,
//   Image,
//   ScrollView,
//   FlatList,
//   Linking,
//   TouchableOpacity,
//   SafeAreaView,
//   Alert,
//   TextInput,
//   Platform,
//   Modal,
//   RefreshControl,
// } from 'react-native';
// import React, {useState, useRef, useEffect} from 'react';
// import {dimensions} from '../../Global/Color';
// import moment from 'moment';
// // import { Mycolors, dimensions } from '../../utility/Mycolors';
// import MyText from '../../Components/MyText/MyText';
// import {styles} from './ScheduleStyle';
// import {setLoading, saveUserResult} from '../../redux/actions/user_action';
// import Loader from '../../Components/Loader';
// import WebView from 'react-native-webview';
// import Color from '../../Global/Color';
// import MyHeader from '../../Components/MyHeader/MyHeader';
// //Import :third parties
// import {
//   useSharedValue,
//   useDerivedValue,
//   withSpring,
// } from 'react-native-reanimated';
// // import DateTimePicker from '@react-native-community/datetimepicker';
// import DatePicker from 'react-native-date-picker';
// import EventCalendar from 'react-native-events-calendar';
// import {getApiWithToken, GET_SCHDULE} from '../../Global/Service';
// import {connect, useSelector} from 'react-redux';
// import {useIsFocused} from '@react-navigation/native';
// import Toast from 'react-native-toast-message';
// //svg image
// import Nodata from '../../Global/Images/lock-circle.svg';
// import Pending from '../../Global/Images/timer.svg';
// import SavedBook from '../../Global/Images/savedBook.svg';
// import OnGoing from '../../Global/Images/clock.svg';
// import Zoom from '../../Global/Images/Zoom.svg';
// import Calendar from '../../Global/Images/calendarWhite.svg';
// import MyAlert from '../../Global/MyAlert';
// // const axios = require('axios');
// const Schedule = ({navigation}) => {
//   const userToken = useSelector(state => state.user.userToken);
//   const user = useSelector(state => state.user.userInfo);

//   const [selected, setselected] = useState(true);
//   const [click1, setclick1] = useState('Mon');
//   const [webViewVisible, setWebViewVisible] = React.useState(false);
//   // const dispatch = useDispatch();
//   // const user = useSelector(state => state.user.user_details)
//   const [DATA, setDATA] = useState(null);
//   // const isKeyboardOpen = useKeyboard();
//   const [My_Alert, setMy_Alert] = useState(false);
//   const [alert_sms, setalert_sms] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [opendateModal, setopenDateModal] = useState(false);
//   const [showda, setshowda] = useState(false);
//   const [title, setTitle] = useState('');
//   const [lode, setlode] = useState(true);
//   const [open, setOpen] = useState(false);
//   const [date, setDate] = useState(new Date());
//   const [refreshing, setRefreshing] = useState(false);
//   const [scrolling, setscrolling] = useState(false);
//   const [displaydate, setdisplaydate] = useState('Choose Date');
//   const [apiDate, setapiDate] = useState(
//     moment(new Date()).format('MM-DD-YYYY'),
//   );
//   // const [events, setEvents] = useState([
//   //   {"created_at": "2024-07-19T12:34:35.000000Z", "end": "2024-07-20 20:04:00", "id": 91, "meeting_title": "meet", "meeting_type": "Bi-Monthly", "note": "moto", "schedule_end_time": "20:04:00", "schedule_start_date": "07-20-2024", "schedule_start_time": "06:04:00", "start": "2024-07-20 06:04:00", "updated_at": "2024-07-19T12:34:35.000000Z", "user_id": "9", "zoom_link": "https://meet.google.com/mfn-jofd-qfm"}
//   // ]);
//   const [events, setEvents] = useState([
//     {
//       created_at: '2024-05-03T07:30:32.000000Z',
//       end: '2024-07-22 16:30:00',
//       id: 1,
//       meeting_title: 'fdf',
//       meeting_type: 'Bi-Montly',
//       note: 'dffdsf',
//       schedule_end_date: '2024-05-10',
//       schedule_end_time: '15:30:00',
//       schedule_start_date: '2024-05-10',
//       schedule_start_time: '15:00:00',
//       start: '2024-07-22 15:00:00',
//       updated_at: '2024-05-10T06:26:09.000000Z',
//       user_id: '3',
//       zoom_link: 'fdf',
//     },
//   ]);
//   const scrollY = useSharedValue(0);
//   const isFocus = useIsFocused();
//   // React.useEffect(() => {
//   //     const unsubscribe = navigation.addListener('focus', () => {
//   //         setLoading(true);
//   //         getCartCount()
//   //         setLoading(false);
//   //     });
//   //     // Return the function to unsubscribe from the event so it gets removed on unmount
//   //     return unsubscribe;
//   // }, [isFocus]);
//   // useEffect(() => {
//   //   setLoading(true);
//   //   // getDetails()
//   //   setLoading(false);
//   // }, []);

//   // useEffect(() => {
//   //   //  getdates()
//   //   getHome();
//   // }, []);
//   React.useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       setDate(new Date());
//       // setshowda(false);
//       getHome(new Date());
//     });
//     // Return the function to unsubscribe from the event so it gets removed on unmount
//     return unsubscribe;
//   }, [isFocus, date]);
//   const handleScroll = event => {
//     const yOffset = event.nativeEvent.contentOffset.y;
//     scrollY.value = event.nativeEvent.contentOffset.y;
//     if (yOffset === 0) {
//       // Your code to handle reaching the top of the scroll view
//       setscrolling(false);
//     } else {
//       setscrolling(true);
//     }
//   };

//   const checkcon = () => {
//     setDate(new Date());
//     // setshowda(false);
//     getHome(new Date());
//   };
//   const wait = timeout => {
//     return new Promise(resolve => setTimeout(resolve, timeout));
//   };
//   const onRefresh = React.useCallback(() => {
//     checkcon();
//     wait(2000).then(() => {
//       setRefreshing(false);
//     });
//   }, []);

//   const handlePress = () => {
//     setWebViewVisible(true);
//   };

//   const handleCloseWebView = () => {
//     setWebViewVisible(false);
//   };
//   // const getdates = async () => {
//   //   setLoading(true);
//   //   // let formdata = new FormData();
//   //   // formdata.append("fullname", name);
//   //   const {responseJson, err} = await requestGetApi(
//   //     DateOfWeek,
//   //     '',
//   //     'GET',
//   //     user.token,
//   //   );
//   //   setLoading(false);
//   //   console.log('the 2023-12-08==>>', responseJson);
//   //   if (err == null) {
//   //     if (responseJson.status) {
//   //       let df = responseJson.data[0].substring(0, 10);
//   //       //  setapiDate(df)
//   //       setDATA2(responseJson.data);
//   //       setlode(!lode);
//   //     } else {
//   //       setalert_sms(responseJson.message);
//   //       setMy_Alert(true);
//   //     }
//   //   } else {
//   //     setalert_sms(err);
//   //     setMy_Alert(true);
//   //   }
//   // };
//   // const getdateformate = dat => {
//   //   var mm = dat.toString().substring(4, 7);
//   //   var dd = dat.toString().substring(8, 10);
//   //   var yy = dat.toString().substring(11, 15);
//   //   var mydate2 = dateformates2(mm, dd, yy);
//   //   var mydate = dateformates(mm, dd, yy);
//   //   return mydate;
//   // };

//   const getHome = async (dat) => {

//     console.log("dat--------",dat);
//     setLoading(true);
//     const SelectedDate = moment(dat).format(`YYYY-MM-DD`);
//     console.log('first time getHome date check-----', SelectedDate)
//     var url = GET_SCHDULE;
//     var dates = `?start_date=` + SelectedDate;
//     url = url + dates;
//     if (dates != '' || dates != undefined) {
//       url = url;
//     }
//     console.log('gethome URL checked--', url);
//     try {
//       const resp = await getApiWithToken(userToken, url);
//       console.log('GET_SCHDULE---->', resp?.data);
//       if (resp?.data?.status) {
//         console.log('my events-----???', resp?.data?.data);
//         setEvents(resp?.data?.data);
//          setLoading(false);
//       } else {
//         Toast.show({text1: resp.data.message});
//         setLoading(false);
//         ;
//       }
//     } catch (error) {
//       setLoading(false);
//       console.log('error in GET_SCHDULE', error);
//     }
//   };
//   const dateformates2 = (month, day, year) => {
//     if (month == 'Jan') {
//       return year + '-01-' + day;
//     } else if (month == 'Feb') {
//       return year + '-02-' + day;
//     } else if (month == 'Mar') {
//       return year + '-03-' + day;
//     } else if (month == 'Apr') {
//       return year + '-04-' + day;
//     } else if (month == 'May') {
//       return year + '-05-' + day;
//     } else if (month == 'Jun') {
//       return year + '-06-' + day;
//     } else if (month == 'Jul') {
//       return year + '-07-' + day;
//     } else if (month == 'Aug') {
//       return year + '-08-' + day;
//     } else if (month == 'Sep') {
//       return year + '-09-' + day;
//     } else if (month == 'Oct') {
//       return year + '-10-' + day;
//     } else if (month == 'Nov') {
//       return year + '-11-' + day;
//     } else if (month == 'Dec') {
//       return year + '-12-' + day;
//     }
//   };
//   const dateformates = (month, day, year) => {
//     console.log('my dates--->>', month, day, year);
//     if (month == 'Jan') {
//       return '01-' + day + '-' + year;
//     } else if (month == 'Feb') {
//       return '02-' + day + '-' + year;
//     } else if (month == 'Mar') {
//       return '03-' + day + '-' + year;
//     } else if (month == 'Apr') {
//       return '04-' + day + '-' + year;
//     } else if (month == 'May') {
//       return '05-' + day + '-' + year;
//     } else if (month == 'Jun') {
//       return '06-' + day + '-' + year;
//     } else if (month == 'Jul') {
//       return '07-' + day + '-' + year;
//     } else if (month == 'Aug') {
//       return '08-' + day + '-' + year;
//     } else if (month == 'Sep') {
//       return '09-' + day + '-' + year;
//     } else if (month == 'Oct') {
//       return '10-' + day + '-' + year;
//     } else if (month == 'Nov') {
//       return '11-' + day + '-' + year;
//     } else if (month == 'Dec') {
//       return '12-' + day + '-' + year;
//     }
//   };

//   // const onChange = (event, selectedDate) => {
//   //   console.log('my selected date--->>', selectedDate);
//   //   const currentDate = selectedDate || date;

//   //   setopenDateModal(Platform.OS === 'ios');

//   //   var mm = currentDate.toString().substring(4, 7);
//   //   var dd = currentDate.toString().substring(8, 10);
//   //   var yy = currentDate.toString().substring(11, 15);
//   //   var mydate = dateformates(mm, dd, yy);
//   //   var mydate2 = dateformates2(mm, dd, yy);
//   //   setdisplaydate(mydate);
//   //   setapiDate(mydate2);

//   //   setDate(currentDate);
//   //   setopenDateModal(false);
//   //   setlode(!lode);

//   //   if (Platform.OS == 'android') {
//   //     // getHome(currentDate, 'date');
//   //     getHomeDateSearch(currentDate, 'date');
//   //   }
//   // };

//   // const getHomeDateSearch = async () => {
//   //   // setEvents([]);
//   //   setLoading(true);
//   //   const SelectedDate = moment(date).format(`MM-DD-YYYY`);
//   //   console.log(
//   //     '=============getHomeDateSearch========dat===============',
//   //     SelectedDate,
//   //   );
//   //   var url = GET_SCHDULE;
//   //   var dates = `?start_date=` + SelectedDate;
//   //   url = url + dates;
//   //   // if (dates != '' || dates != undefined) {
//   //   //   url = url;
//   //   // }
//   //   console.log('my url after adding the datte----->>>', url);
//   //   try {
//   //     const resp = await getApiWithToken(userToken, url);
//   //     if (resp?.data?.status == true) {
//   //       setEvents(resp?.data?.data);
//   //       setLoading(false);
//   //     } else {
//   //       // Toast.show({text1: resp.data.message});
//   //       setLoading(false);
//   //     }
//   //   } catch (error) {
//   //     setLoading(false);
//   //     console.log('error in GET_SCHDULEsearch', error);
//   //   }
//   //   setLoading(false);
//   // };
//   const eventClicked = event => {
//     //On Click of event showing alert from here
//     Alert.alert(JSON.stringify(event));
//   };

//   //get data
//   // const getDetails = async () => {
//   //     setLoading(true);
//   //     try {
//   //         const resp = await getApiWithToken(userToken, GET_SCHDULE);
//   //         console.log('get profile2222----->>>>', resp?.data?.data);
//   //         if (resp?.data?.success) {
//   //             // setProfile(resp?.data?.data)
//   //             setEvents(resp?.data?.data)
//   //         } else {
//   //             // Toast.show({ text1: resp.data.message });
//   //         }
//   //     } catch (error) {
//   //         console.log('error in getCartCount', error);
//   //     }
//   //     setLoading(false);
//   // };
//   return (
//     <SafeAreaView style={{backgroundColor: '#E8ECF2', flex: 1}}>
//       <MyHeader
//         title={'My Services'}
//         onPress={() => {
//           props.navigation.goBack();
//         }}
//         onPress2={() => {
//           props.navigation.navigate('Notification');
//         }}
//         scrolling={scrolling}
//         scrollY={scrollY}
//         style={scrolling ? {zIndex: 99} : null}
//         isBorderRadius={true}
//       />
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           width: '95%',
//           alignSelf: 'center',
//         }}>
//         <View
//           style={{
//             width: '82%',
//             height: 50,
//             backgroundColor: '#fff',
//             borderRadius: 10,
//             marginTop: 15,
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             paddingHorizontal: 10,
//           }}>
//           <Text
//             style={{
//               color: '#000',
//               fontSize: 13,
//               textAlign: 'center',
//               fontWeight: '300',
//             }}>
//             {moment(date).format('MM-DD-YYYY')}
//           </Text>
//         </View>
//         <TouchableOpacity
//           style={{
//             width: 60,
//             height: 50,
//             backgroundColor: Color.PRIMARY,
//             justifyContent: 'center',
//             borderRadius: 10,
//             marginTop: 15,
//           }}
//           onPress={() => {
//             // setshowda(true)
//             setOpen(true);
//             // setopenDateModal(true);

//             // getHome(new Date(), 'date');
//             // setclick1(DATA2[0])
//             // setdisplaydate('Choose Date')
//           }}>
//           {/* <Text style={{ color: '#fff', fontSize: 13, textAlign: 'center', fontWeight: '700' }}>Clear</Text> */}
//           <Calendar style={{alignSelf: 'center'}}></Calendar>
//         </TouchableOpacity>
//       </View>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         // contentContainerStyle={{paddingBottom: '20%'}}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//         onScroll={handleScroll}
//         scrollEventThrottle={16}
//         style={styles.mainView}>
//         <View
//           style={{
//             alignItems: 'center',
//             justifyContent: 'center',
//             flex: 1,
//           }}>
//           <View
//             style={{
//               width: '100%',
//               height: 45,
//               position: 'absolute',
//               backgroundColor: events.length !== 0 ? '#fff' : '#E8ECF2',
//               zIndex: 999,
//               top: 4,
//             }}
//           />
//           {console.log('events length check-----', events.length)}
//           {events.length > 0 ? (
//             <View>
//             <EventCalendar
//               width={dimensions.SCREEN_WIDTH}
//               size={60}
//               events={events}
//               initDate={apiDate}
//               scrollToFirst
//               eventTapped={eventClicked}
//               renderEvent={item => {
//                 console.error("itemitemitemitemitemitem---->",item);
//                 const startDate = new Date(`${item.start}`);
//                 const endDate = new Date(`${item.end}`);
//                 const diffInMilliseconds = endDate - startDate;
//                 // Convert the difference from milliseconds to hours
//                 const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
//                 const roundoff = Math.abs(Math.round(diffInHours));

//                 if (roundoff >= 2) {
//                   console.log('if hsould be correct', roundoff > 2);
//                   return (
//                     <TouchableOpacity
//                       style={{
//                         width: '98%',
//                         borderRadius: 4,
//                         alignSelf: 'center',
//                         backgroundColor: '#fff',
//                         shadowColor: '#000',
//                         shadowRadius: 2,
//                         shadowOpacity: 0.2,
//                         elevation: 3,
//                         paddingVertical: 10,
//                         marginTop: 9,
//                       }}
//                       onPress={() => {
//                         navigation.navigate('SchduleDetails', {id: item?.id});
//                       }}>
//                       <View
//                         style={{
//                           width: '100%',
//                           alignSelf: 'center',
//                           height: 'auto',
//                         }}
//                         onPress={() => {}}>
//                         <View
//                           style={{
//                             flexDirection: 'row',
//                             justifyContent: 'space-between',
//                             width: dimensions.SCREEN_WIDTH * 0.72,
//                             alignSelf: 'center',
//                           }}>
//                           <View style={styles.circleView}>
//                             <MyText
//                               text={'LP'}
//                               fontFamily="Roboto"
//                               fontWeight="500"
//                               fontSize={14}
//                               textColor={Color.PRIMARY}
//                               style={{alignSelf: 'center'}}
//                             />
//                           </View>
//                           <MyText
//                             text={'Dr. Elsie Koh, MD MHL'}
//                             fontFamily="Roboto"
//                             fontWeight="bold"
//                             fontSize={14}
//                             textColor={Color.LIGHT_BLACK}
//                             style={{alignSelf: 'center'}}
//                           />
//                           <View style={styles.buttonBi}>
//                             <MyText
//                               text={item.meeting_type}
//                               fontFamily="Roboto"
//                               fontWeight="700"
//                               fontSize={12}
//                               textColor={Color.WHITE}
//                               style={{alignSelf: 'center'}}
//                             />
//                           </View>
//                         </View>

//                         <View
//                           style={{
//                             width: dimensions.SCREEN_WIDTH,
//                             height: 1,
//                             backgroundColor: '#E7EAF1',
//                             marginVertical: 5,
//                           }}></View>
//                         <View style={{marginHorizontal: 14}}>
//                           <MyText
//                             text={item.meeting_title}
//                             fontFamily="Roboto"
//                             fontWeight="700"
//                             fontSize={14}
//                             textColor={Color.LIGHT_BLACK}
//                             style={{}}
//                           />

//                           <View style={{flexDirection: 'row'}}>
//                             <OnGoing></OnGoing>
//                             <MyText
//                               text={`${item?.schedule_start_date}, ${moment(
//                                 item?.schedule_start_time,
//                                 'HH:mm:ss',
//                               ).format('hh:mm A')}`}
//                               fontFamily="Roboto"
//                               fontWeight="400"
//                               fontSize={13}
//                               textColor={Color.LIGHT_BLACK}
//                               style={{marginHorizontal: 6}}
//                             />
//                           </View>
//                         </View>
//                         <View
//                           style={{
//                             width: dimensions.SCREEN_WIDTH,
//                             height: 1,
//                             backgroundColor: '#E7EAF1',
//                             marginVertical: 7,
//                           }}></View>
//                         <View
//                           style={{marginHorizontal: 10, flexDirection: 'row'}}>
//                           <Zoom height={22}></Zoom>
//                           <MyText
//                             text={'Join Zoom Meeting'}
//                             fontFamily="Roboto"
//                             fontWeight="400"
//                             fontSize={13}
//                             textColor={'#3DA1E3'}
//                             style={{}}
//                           />
//                         </View>
//                       </View>
//                     </TouchableOpacity>
//                   );
//                 } else {
//                   return (
//                     <TouchableOpacity
//                       style={{
//                         flexDirection: 'row',
//                         justifyContent: 'space-between',
//                         width: dimensions.SCREEN_WIDTH * 0.75,
//                       }}
//                       onPress={() => {
//                         navigation.navigate('SchduleDetails', {id: item?.id});
//                       }}>
//                       <MyText
//                         text={item.meeting_title}
//                         fontFamily="Roboto"
//                         fontWeight="700"
//                         fontSize={14}
//                         textColor={Color.LIGHT_BLACK}
//                         style={{}}
//                       />
//                       <Text>
//                         {moment(item.schedule_start_time, 'HH:mm:ss').format(
//                           'hh:mm A',
//                         )}
//                       </Text>
//                     </TouchableOpacity>
//                   );
//                 }
//               }}
//             />
//             </View>
//           ) : (
//             <View
//               style={{
//                 alignSelf: 'center',
//                 justifyContent: 'center',
//                 width: dimensions.SCREEN_WIDTH * 0.9,
//                 flex: 1,
//                 alignItems: 'center',
//                 height: dimensions.SCREEN_HEIGHT * 0.6,
//               }}>
//               <Nodata
//                 style={{alignSelf: 'center'}}
//                 height={119}
//                 width={119}></Nodata>
//               <MyText
//                 text={'No data found !'}
//                 fontWeight="500"
//                 fontSize={24}
//                 textColor={Color.LIGHT_BLACK}
//                 fontFamily="Roboto"
//                 style={{alignSelf: 'center', top: 4}}
//               />
//               {/* <MyText
//           text={
//             'Oops! this information is not available for a moment'
//           }
//           fontWeight="400"
//           fontSize={16}
//           textColor={'#959FA6'}
//           fontFamily="Roboto"
//           style={{
//             alignSelf: 'center',
//             textAlign: 'center',
//             width: dimensions.SCREEN_WIDTH * 0.6,
//             top: 4,
//           }}
//         /> */}
//             </View>
//           )}
//         </View>
//       </ScrollView>
//       <DatePicker
//         modal
//         open={open}
//         date={date}
//         mode="date"
//         onConfirm={date => {
//           setDate(date);
//           setOpen(false);
//           getHome(date);
//         }}
//         onCancel={() => {
//           setOpen(false);
//         }}
//       />
//       {/* <View style={{width:100,height:800}} /> */}
//       {/* </ScrollView> */}

//       {/* {opendateModal ? ( */}
//       {/* <View
//           style={{
//             backgroundColor: '#fff',
//             position: 'absolute',
//             alignSelf: 'center',
//             bottom: 0,
//             width: '98%',
//           }}>

//       {showda ? (
//             <View>
//               <DateTimePicker
//                 testID="dateTimePicker"
//                 value={new Date()}
//                 mode="date"
//                 is24Hour={true}
//                 display="spinner"
//                 // onChange={onChange}
//                 onChange={(event, sTime) => {
//                   setshowda(false);
//                   console.log('SelectDATE.....', sTime.toDateString());
//                   // setOrderDate(sTime);
//                   setDate(sTime);
//                   // getHome();
//                   console.log(event);
//                 }}
//                 onTouchCancel={()=> setshowda(false)}
//               />
//             </View>
//           ) : null}
//       </View> */}
//       {/* ) : null} */}
//       <Modal visible={webViewVisible} animationType="slide" transparent={false}>
//         <View style={{flex: 1}}>
//           <WebView
//             source={{
//               uri:
//                 // 'https://www.google.com/'
//                 JSON.stringify(title),
//             }}
//             // Other WebView props...
//           />
//           <TouchableOpacity
//             onPress={handleCloseWebView}
//             style={{
//               backgroundColor: Color.PRIMARY,
//               height: 60,
//               justifyContent: 'center',
//             }}>
//             {/* Close button or any UI to close the WebView */}
//             <Text
//               style={{
//                 fontFamily: 'Inter',
//                 fontSize: 16,
//                 color: 'white',
//                 fontWeight: '600',
//                 alignSelf: 'center',
//               }}>
//               Close WebView
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//       {/* </View>*/}
//       {My_Alert ? (
//         <MyAlert
//           sms={alert_sms}
//           okPress={() => {
//             setMy_Alert(false);
//           }}
//         />
//       ) : null}
//       {loading ? <Loader /> : null}
//     </SafeAreaView>
//   );
// };

// export default Schedule;

import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  Linking,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  TextInput,
  Platform,
  Modal,
  RefreshControl,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {dimensions} from '../../Global/Color';
import moment from 'moment';
// import { Mycolors, dimensions } from '../../utility/Mycolors';
import MyText from '../../Components/MyText/MyText';
import {styles} from './ScheduleStyle';
import {setLoading, saveUserResult} from '../../redux/actions/user_action';
import Loader from '../../Components/Loader';
import WebView from 'react-native-webview';
import Color from '../../Global/Color';
import MyHeader from '../../Components/MyHeader/MyHeader';
import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import EventCalendar from 'react-native-events-calendar';
import {getApiWithToken, GET_SCHDULE} from '../../Global/Service';
import {connect, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {
  useSharedValue,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
//svg image
import Nodata from '../../Global/Images/lock-circle.svg';
import Pending from '../../Global/Images/timer.svg';
import SavedBook from '../../Global/Images/savedBook.svg';
import OnGoing from '../../Global/Images/clock.svg';
import Zoom from '../../Global/Images/Zoom.svg';
import Calendar from '../../Global/Images/calendarWhite.svg';
// const axios = require('axios');
const Schedule = ({navigation}) => {
  const [DATA2, setDATA2] = useState([
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
  ]);
  const [selected, setselected] = useState(true);
  const [click1, setclick1] = useState('Mon');
  const [webViewVisible, setWebViewVisible] = React.useState(false);
  // const dispatch = useDispatch();
  // const user = useSelector(state => state.user.user_details)
  const [DATA, setDATA] = useState(null);
  // const isKeyboardOpen = useKeyboard();
  const [scrolling, setscrolling] = useState(false);
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [loading, setLoading] = useState(false);
  const [opendateModal, setopenDateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [lode, setlode] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [displaydate, setdisplaydate] = useState('Choose Date');
  const selectedDate = moment(date).format('YYYY-MM-DD')
  const [apiDate, setapiDate] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );
  const [events, setEvents] = useState([]);
  // const [events, setEvents] = useState([
  //   {
  //     created_at: '2024-05-03T07:30:32.000000Z',
  //     end: '2024-05-10 15:30:00',
  //     id: 1,
  //     meeting_title: 'fdf',
  //     meeting_type: 'Bi-Montly',
  //     note: 'dffdsf',
  //     schedule_end_date: '2024-05-10',
  //     schedule_end_time: '15:30:00',
  //     schedule_start_date: '2024-05-10',
  //     schedule_start_time: '15:00:00',
  //     start: '2024-05-10 15:00:00',
  //     updated_at: '2024-05-10T06:26:09.000000Z',
  //     user_id: '3',
  //     zoom_link: 'fdf',
  //   },
  // ]);
  const scrollY = useSharedValue(0);
  const isFocus = useIsFocused();
  // React.useEffect(() => {
  //     const unsubscribe = navigation.addListener('focus', () => {
  //         setLoading(true);
  //         getCartCount()
  //         setLoading(false);
  //     });
  //     // Return the function to unsubscribe from the event so it gets removed on unmount
  //     return unsubscribe;
  // }, [isFocus]);

  const userToken = useSelector(state => state.user.userToken);
  const user = useSelector(state => state.user.userInfo);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setDate(new Date());
      // setshowda(false);
      getHome(new Date());
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [isFocus, date]);

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
    setDate(new Date());
    // setshowda(false);
    getHome(new Date());
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

  const handlePress = () => {
    setWebViewVisible(true);
  };

  const handleCloseWebView = () => {
    setWebViewVisible(false);
  };
  // const getdates = async () => {
  //   setLoading(true);
  //   // let formdata = new FormData();
  //   // formdata.append("fullname", name);
  //   const {responseJson, err} = await requestGetApi(
  //     DateOfWeek,
  //     '',
  //     'GET',
  //     user.token,
  //   );
  //   setLoading(false);
  //   console.log('the 2023-12-08==>>', responseJson);
  //   if (err == null) {
  //     if (responseJson.status) {
  //       let df = responseJson.data[0].substring(0, 10);
  //       //  setapiDate(df)
  //       setDATA2(responseJson.data);
  //       setlode(!lode);
  //     } else {
  //       setalert_sms(responseJson.message);
  //       setMy_Alert(true);
  //     }
  //   } else {
  //     setalert_sms(err);
  //     setMy_Alert(true);
  //   }
  // };
  // const getdateformate = dat => {
  //   var mm = dat.toString().substring(4, 7);
  //   var dd = dat.toString().substring(8, 10);
  //   var yy = dat.toString().substring(11, 15);
  //   var mydate2 = dateformates2(mm, dd, yy);
  //   var mydate = dateformates(mm, dd, yy);
  //   return mydate;
  // };

  const getHome = async dat => {
    console.log('dat--------', dat);
    setLoading(true);
    const SelectedDate = moment(dat).format(`MM-DD-YYYY`);
    console.log('first time getHome date check-----', SelectedDate);
    var url = GET_SCHDULE;
    var dates = `?start_date=` + SelectedDate;
    url = url + dates;
    if (dates != '' || dates != undefined) {
      url = url;
    }
    console.log('gethome URL checked--', url);
    try {
      const resp = await getApiWithToken(userToken, url);
      console.log('GET_SCHDULE---->', resp?.data);
      if (resp?.data?.status) {
        console.log('my events-----???', resp?.data?.data);
        setEvents(resp?.data?.data);
        setLoading(false);
      } else {
        Toast.show({text1: resp.data.message});
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log('error in GET_SCHDULE', error);
    }
  };
  // const dateformates2 = (month, day, year) => {
  //   if (month == 'Jan') {
  //     return year + '-01-' + day;
  //   } else if (month == 'Feb') {
  //     return year + '-02-' + day;
  //   } else if (month == 'Mar') {
  //     return year + '-03-' + day;
  //   } else if (month == 'Apr') {
  //     return year + '-04-' + day;
  //   } else if (month == 'May') {
  //     return year + '-05-' + day;
  //   } else if (month == 'Jun') {
  //     return year + '-06-' + day;
  //   } else if (month == 'Jul') {
  //     return year + '-07-' + day;
  //   } else if (month == 'Aug') {
  //     return year + '-08-' + day;
  //   } else if (month == 'Sep') {
  //     return year + '-09-' + day;
  //   } else if (month == 'Oct') {
  //     return year + '-10-' + day;
  //   } else if (month == 'Nov') {
  //     return year + '-11-' + day;
  //   } else if (month == 'Dec') {
  //     return year + '-12-' + day;
  //   }
  // };
  // const dateformates = (month, day, year) => {
  //   console.log('my dates--->>', month, day, year);
  //   if (month == 'Jan') {
  //     return '01-' + day + '-' + year;
  //   } else if (month == 'Feb') {
  //     return '02-' + day + '-' + year;
  //   } else if (month == 'Mar') {
  //     return '03-' + day + '-' + year;
  //   } else if (month == 'Apr') {
  //     return '04-' + day + '-' + year;
  //   } else if (month == 'May') {
  //     return '05-' + day + '-' + year;
  //   } else if (month == 'Jun') {
  //     return '06-' + day + '-' + year;
  //   } else if (month == 'Jul') {
  //     return '07-' + day + '-' + year;
  //   } else if (month == 'Aug') {
  //     return '08-' + day + '-' + year;
  //   } else if (month == 'Sep') {
  //     return '09-' + day + '-' + year;
  //   } else if (month == 'Oct') {
  //     return '10-' + day + '-' + year;
  //   } else if (month == 'Nov') {
  //     return '11-' + day + '-' + year;
  //   } else if (month == 'Dec') {
  //     return '12-' + day + '-' + year;
  //   }
  // };

  // const onChange = (event, selectedDate) => {
  //   console.log('my selected date--->>', selectedDate);
  //   const currentDate = selectedDate || date;

  //   setopenDateModal(Platform.OS === 'ios');

  //   var mm = currentDate.toString().substring(4, 7);
  //   var dd = currentDate.toString().substring(8, 10);
  //   var yy = currentDate.toString().substring(11, 15);
  //   var mydate = dateformates(mm, dd, yy);
  //   var mydate2 = dateformates2(mm, dd, yy);
  //   setdisplaydate(mydate);
  //   setapiDate(mydate2);

  //   setDate(currentDate);
  //   setopenDateModal(false);
  //   setlode(!lode);

  //   if (Platform.OS == 'android') {
  //     getHome(currentDate, 'date');
  //   }
  // };

  const eventClicked = event => {
    //On Click of event showing alert from here
    Alert.alert(JSON.stringify(event));
  };

  //get data
  // const getDetails = async () => {
  //     setLoading(true);
  //     try {
  //         const resp = await getApiWithToken(userToken, GET_SCHDULE);
  //         console.log('get profile2222----->>>>', resp?.data?.data);
  //         if (resp?.data?.success) {
  //             // setProfile(resp?.data?.data)
  //             setEvents(resp?.data?.data)
  //         } else {
  //             // Toast.show({ text1: resp.data.message });
  //         }
  //     } catch (error) {
  //         console.log('error in getCartCount', error);
  //     }
  //     setLoading(false);
  // };
  return (
    <SafeAreaView style={{backgroundColor: '#E8ECF2', flex: 1}}>
      <MyHeader
        title={'My Services'}
        onPress={() => {
          props.navigation.goBack();
        }}
        onPress2={() => {
          props.navigation.navigate('Notification');
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '95%',
          alignSelf: 'center',
        }}>
        <View
          style={{
            width: '82%',
            height: 50,
            backgroundColor: '#fff',
            borderRadius: 10,
            marginTop: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: 13,
              textAlign: 'center',
              fontWeight: '300',
            }}>
            {moment(date).format('MM-DD-YYYY')}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            width: 60,
            height: 50,
            backgroundColor: Color.PRIMARY,
            justifyContent: 'center',
            borderRadius: 10,
            marginTop: 15,
          }}
          onPress={() => {
            setOpen(true);
            // setopenDateModal(true);
            // getHome(new Date(), 'date');
            // setclick1(DATA2[0])
            // setdisplaydate('Choose Date')
          }}>
          {/* <Text style={{ color: '#fff', fontSize: 13, textAlign: 'center', fontWeight: '700' }}>Clear</Text> */}
          <Calendar style={{alignSelf: 'center'}}></Calendar>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{paddingBottom: '20%'}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.mainView}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <View
            style={{
              width: '100%',
              height: 45,
              position: 'absolute',
              backgroundColor: events.length !== 0 ? '#fff' : '#E8ECF2',
              zIndex: 999,
              top: 4,
            }}
          />
          {events.length !== 0 ? (
            <EventCalendar
              width={dimensions.SCREEN_WIDTH}
              initDate={selectedDate}
              size={60}
              events={events}
              eventTapped={eventClicked}
              // events={events}
              // width={dimensions.SCREEN_WIDTH}
              // size={60}

              renderEvent={item => {
                // const startTime = new Date(`${item.start}`);
                // const endTime = new Date(`${item.end}`);
                // const timeDifference = endTime - startTime;
                // var diff = (endTime.getTime() - startTime.getTime()) / 1000
                // diff /= (60 * 60)
                // console.log(Math.abs(Math.round(diff)))
                // console.log('timediiidd1111', Math.abs(Math.round(diff)));
                const startDate = new Date(`${item.start}`);
                const endDate = new Date(`${item.end}`);

                // Calculate the difference in milliseconds
                const diffInMilliseconds = endDate - startDate;

                // Convert the difference from milliseconds to hours
                const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
                console.log(
                  Math.abs(Math.round(diffInHours)),
                  'round off data',
                );
                const roundoff = Math.abs(Math.round(diffInHours));
                // Log the result
                console.log(diffInHours, 'diif in hourssss');
                // if (roundoff >= 2) {
                  if (true) {
                  // console.log('if hsould be correct', roundoff > 2);
                  return (
                    <TouchableOpacity
                      style={{
                        width: '98%',
                        borderRadius: 4,
                        alignSelf: 'center',
                        backgroundColor: '#fff',
                        shadowColor: '#000',
                        shadowRadius: 2,
                        shadowOpacity: 0.2,
                        elevation: 3,
                        paddingVertical: 10,
                        marginTop: 9,
                      }}
                      onPress={() => {
                        navigation.navigate('SchduleDetails', {id: item?.id});
                      }}>
                      <View
                        style={{
                          width: '100%',
                          alignSelf: 'center',
                          height: 'auto',
                        }}
                        onPress={() => {}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: dimensions.SCREEN_WIDTH * 0.72,
                            alignSelf: 'center',
                          }}>
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
                            style={{alignSelf: 'center'}}
                          />
                          <View style={styles.buttonBi}>
                            <MyText
                              text={item.meeting_type}
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
                            marginVertical: 5,
                          }}></View>
                        <View style={{marginHorizontal: 14}}>
                          <MyText
                            text={item?.meeting_title}
                            fontFamily="Roboto"
                            fontWeight="700"
                            fontSize={14}
                            textColor={Color.LIGHT_BLACK}
                            style={{}}
                          />

                          <View style={{flexDirection: 'row'}}>
                            <OnGoing></OnGoing>
                            <MyText
                              text={`${item?.schedule_start_date}, ${moment(
                                item?.schedule_start_time,
                                'HH:mm:ss',
                              ).format('hh:mm A')}`}
                              fontFamily="Roboto"
                              fontWeight="400"
                              fontSize={13}
                              textColor={Color.LIGHT_BLACK}
                              style={{marginHorizontal: 6}}
                            />
                          </View>
                        </View>
                        <View
                          style={{
                            width: dimensions.SCREEN_WIDTH,
                            height: 1,
                            backgroundColor: '#E7EAF1',
                            marginVertical: 7,
                          }}></View>
                        <View
                          style={{
                            marginHorizontal: 10,
                            flexDirection: 'row',
                          }}>
                          <Zoom height={22}></Zoom>
                          <MyText
                            text={'Join Zoom Meeting'}
                            fontFamily="Roboto"
                            fontWeight="400"
                            fontSize={13}
                            textColor={'#3DA1E3'}
                            style={{}}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: dimensions.SCREEN_WIDTH * 0.75,
                      }}
                      onPress={() => {
                        navigation.navigate('SchduleDetails', {id: item?.id});
                      }}>
                      <MyText
                        text={item.meeting_title}
                        fontFamily="Roboto"
                        fontWeight="700"
                        fontSize={14}
                        textColor={Color.LIGHT_BLACK}
                        style={{}}
                      />
                      <Text>
                        {moment(item.schedule_start_time, 'HH:mm:ss').format(
                          'hh:mm A',
                        )}
                      </Text>
                    </TouchableOpacity>
                  );
                }
              }}
              
              scrollToFirst
            />
          //   <EventCalendar

          //   // initDate={'2024-05-03'}
          //   // initDate={selectedDate}
          //   initDate={selectedDate}
          //   eventTapped={eventClicked}
          //   // Function on event press
          //   events={events}
          //   // Passing the Array of event
          //   width={dimensions.SCREEN_WIDTH}
          //   // Container width
          //   size={60}
          //   renderEvent={(item) => {

          //     // const startTime = new Date(`${item.start}`);
          //     // const endTime = new Date(`${item.end}`);
          //     // const timeDifference = endTime - startTime;
          //     // var diff = (endTime.getTime() - startTime.getTime()) / 1000
          //     // diff /= (60 * 60)
          //     // console.log(Math.abs(Math.round(diff)))
          //     // console.log('timediiidd1111', Math.abs(Math.round(diff)));
          //     const startDate = new Date(`${item.start}`);
          //     const endDate = new Date(`${item.end}`);

          //     // Calculate the difference in milliseconds
          //     const diffInMilliseconds = endDate - startDate;

          //     // Convert the difference from milliseconds to hours
          //     const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
          //     console.log(Math.abs(Math.round(diffInHours)), 'round off data')
          //     const roundoff = Math.abs(Math.round(diffInHours))
          //     // Log the result
          //     console.log(diffInHours, 'diif in hourssss');

          //     const dateTime = `${moment(item.schedule_start_date).format('MM/DD/YYYY')}, ${moment(item.schedule_start_time, "HH:mm:ss").format("hh:mm A")}`

          //     // if (roundoff >= 2)
          //     if (true) {
          //       // console.log('if hsould be correct', roundoff > 2);
          //       return (
          //         <TouchableOpacity style={{
          //           width: '98%', borderRadius: 4,
          //           backgroundColor: 'white',
          //           shadowColor: '#000',
          //           shadowRadius: 2,
          //           shadowOpacity: 0.2,
          //           elevation: 3,
          //           zIndex: 999,
          //           // paddingVertical: 10,


          //         }}
          //           onPress={() => {
          //             // navigation.navigate('SchduleDetails', { id: item?.id }) 
          //           }}
          //         >
          //           <View style={{ width: '100%', height: 20, borderBottomColor: 'grey', borderBottomWidth: 0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>

          //             <View style={{ width: 50, alignItems: 'center', }}>
          //               <Text style={{ fontSize: 10, color: 'black', }}>{item?.meeting_title}</Text>
          //             </View>

          //             {/* <View style={{ width: 50 }}>
          //               <Text style={{ fontSize: 10, color: 'black', }}>Goals</Text>
          //             </View> */}

          //             {/* <TouchableOpacity style={{ width: 30, height: '100%', backgroundColor: "#B357C3", borderRadius: 7,  justifyContent: "center" }}>
          //               <Text style={{ fontSize: 10, color: "#fff", textAlign: "center", fontWeight: "400" }}>View</Text>
          //             </TouchableOpacity> */}

          //           </View>
          //           <View style={{ width: '100%', flexDirection: 'row', padding: 3 }}>
          //             {/* <Image source={OnGoing} /> */}
          //             <Text style={{ fontSize: 12, color: 'black', }}>{item.note}</Text>
          //           </View>
          //           <View style={{ width: '100%', flexDirection: 'row', padding: 3 }}>
          //             <Image source={OnGoing} />
          //             <Text style={{ fontSize: 12, color: 'black', marginLeft: 5 }}>{dateTime}</Text>
          //           </View>
          //           <View style={{ height: 0.5, backgroundColor: "grey" }} />
          //           <View style={{ width: '100%', flexDirection: 'row', padding: 5 }}>
          //             <Image style={{ width: 18, height: 18 }} width={18} height={18} source={Zoom} />
          //             <Text style={{ fontSize: 12, color: '#47AFF0', marginLeft: 5, }}>{"Join Zoom Meeting"}</Text>
          //           </View>


          //         </TouchableOpacity>

          //       )
          //     }
          //     else {
          //       return (
          //         <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', width: dimensions.SCREEN_WIDTH * 0.75, }} onPress={() => { navigation.navigate('SchduleDetails', { id: item?.id }) }}>
          //           <Text
          //             text={item.meeting_title}
          //             fontFamily="Roboto"
          //             fontWeight='700'
          //             fontSize={14}
          //             color={Color.LIGHT_BLACK}
          //             style={{}}

          //           >{item.meeting_title}</Text>
          //           <Text>{moment(item.schedule_start_time, "HH:mm:ss").format("hh:mm A")}</Text>

          //         </TouchableOpacity>
          //       )

          //     }
          //   }}

          //   scrollToFirst
          // />
          ) : (
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
                text={'Oops! this information is not available for a moment'}
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
        </View>
      </ScrollView>
      {/* <View style={{width:100,height:800}} /> */}
      {/* </ScrollView> */}
      <DatePicker
        modal
        minimumDate={new Date()}
        open={open}
        date={date}
        mode="date"
        onConfirm={date => {
          setDate(date);
          setOpen(false);
          setEvents([]);
          getHome(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      {/* {opendateModal ?
              <View style={{ backgroundColor: '#fff', position: 'absolute', alignSelf: 'center', bottom: 0, width: '98%' }}>
                  <View style={{ width: '85%', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', marginTop: 10 }}>
                      <TouchableOpacity onPress={() => { setopenDateModal(false) }}>
                          <Text>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => {
                          getHome(date, 'date')
                          setopenDateModal(false)
                      }}>
                          <Text>Confirm</Text>
                      </TouchableOpacity>
                  </View>
                  <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode="date"
                      is24Hour={true}
                      display="spinner"
                      onChange={onChange}
                  />
              </View>

              : null} */}
      <Modal visible={webViewVisible} animationType="slide" transparent={false}>
        <View style={{flex: 1}}>
          <WebView
            source={{
              uri:
                // 'https://www.google.com/'
                JSON.stringify(title),
            }}
            // Other WebView props...
          />
          <TouchableOpacity
            onPress={handleCloseWebView}
            style={{
              backgroundColor: Color.PRIMARY,
              height: 60,
              justifyContent: 'center',
            }}>
            {/* Close button or any UI to close the WebView */}
            <Text
              style={{
                fontFamily: 'Inter',
                fontSize: 16,
                color: 'white',
                fontWeight: '600',
                alignSelf: 'center',
              }}>
              Close WebView
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* </View>*/}
      {My_Alert ? (
        <MyAlert
          sms={alert_sms}
          okPress={() => {
            setMy_Alert(false);
          }}
        />
      ) : null}
      {loading ? <Loader /> : null}
    </SafeAreaView>
  );
};

export default Schedule;
