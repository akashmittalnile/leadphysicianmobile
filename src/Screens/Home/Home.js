// import React, { useState, useEffect } from 'react';
// import { Text, View, Image, ActivityIndicator, Button, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, StatusBar, ScrollView, RefreshControl, ImageBackground, FlatList, } from 'react-native'
// import moment from 'moment';
// import Toast from 'react-native-toast-message';
// import Color, { dimensions } from '../../Global/Color';
// import MyText from '../../Components/MyText/MyText';
// import { useSharedValue, useDerivedValue, withSpring } from 'react-native-reanimated';
// import Loader from '../../Components/Loader';
// import { styles } from './HomeStyle';
// import MyHeader from '../../Components/MyHeader/MyHeader';
// import AppIntroSlider from 'react-native-app-intro-slider';
// import { Calendar } from 'react-native-calendars';
// import { getApiWithToken, GET_HOME } from '../../Global/Service';
// import { useSelector, useDispatch } from 'react-redux';
// import { useIsFocused } from "@react-navigation/native";
// import * as Progress from 'react-native-progress';

// /////svgs
// import Arrow from '../../Global/Images/arrowRight.svg'
// import Star from '../../Global/Images/star.svg'
// import Ongoing from '../../Global/Images/clock.svg'
// import Nodata from '../../Global/Images/lock-circle.svg'
// import Clock from '../../Global/Images/clockHome.svg'
// import SkeletonContainer from '../../Components/Skelton/SkeltonContainer';
// import IconClendar from '../../Global/Images/calendarHome.svg'
// import VideoChat from '../../Global/Images/videoChat.svg'
// import Zoom from '../../Global/Images/Zoom.svg'
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
// import Modal from 'react-native-modal';
// import ArrowLeft from '../../Global/Images/arrowLeft.svg'
// const Home = ({ navigation }) => {
//     const dispatch = useDispatch();
//     const isFocus = useIsFocused()
//     const userToken = useSelector(state => state.user.userToken);
//     console.log('my user token--->>', userToken);
//     const [loading, setLoading] = useState('')
//     const [scrolling, setscrolling] = useState(false);
//     const [selectedDate, setSelectedDate] = useState(null);
//     const [refreshing, setRefreshing] = useState(false);
//     const [showSkeleton, setShowSkeleton] = React.useState(false)
//     const [home, setHome] = useState('')
//     const [editModal, setEditModal] = useState(false)
//     const [dataModal, setDataModal] = useState('')
//     const [dateData, setDateData] = useState({})
//     const [colorData, setColorData] = useState({})
//     const [markedDates, setMarkedDates] = useState({});
//     const scrollY = useSharedValue(0);
//     const renderNextButton = () => null;
//     const renderDoneButton = () => null;

//     const banner = [
//         {
//             id: '1',
//             text: 'Announcements',
//             title: 'Welcome to LEAD Physician®, the online leadership training program for Physicians By Physicians.'
//         },
//         {
//             id: '2',
//             text: 'Announcements',
//             title: 'Welcome to LEAD Physician®, the online leadership training program for Physicians By Physicians.'
//         },
//         {
//             id: '3',
//             text: 'Announcements',
//             title: 'Welcome to LEAD Physician®, the online leadership training program for Physicians By Physicians.',

//         }
//     ]

//     React.useEffect(() => {
//         const unsubscribe = navigation.addListener('focus', () => {

//             getCartCount()

//         });
//         // Return the function to unsubscribe from the event so it gets removed on unmount
//         return unsubscribe;
//     }, [isFocus]);

//     const handleScroll = event => {
//         const yOffset = event.nativeEvent.contentOffset.y;
//         scrollY.value = event.nativeEvent.contentOffset.y;
//         if (yOffset === 0) {
//             // Your code to handle reaching the top of the scroll view

//             setscrolling(false);
//         } else {
//             setscrolling(true);
//         }
//     };
//     const checkcon = () => {

//         getCartCount()
//     };
//     const wait = timeout => {
//         return new Promise(resolve => setTimeout(resolve, timeout));
//     };
//     const onRefresh = React.useCallback(() => {
//         checkcon();
//         wait(2000).then(() => {
//             setRefreshing(false);
//         });
//     }, []);

//     //get data for list
//     const getCartCount = async () => {
//         setLoading(true);
//         try {
//             const resp = await getApiWithToken(userToken, GET_HOME);

//             if (resp?.data?.status) {
//                 setLoading(false)
//                 setHome(resp?.data?.data)
//                 setDateData(resp?.data?.data?.calendarData)
//                 setColorData(resp?.data?.data?.callenderColorData)
//                 setMarkedDates(getMarkedDates(resp?.data?.data?.calendarData, resp?.data?.data?.callenderColorData)); // Set initial marked dates
//                 // getMarkedDates(resp?.data?.data?.calendarData)
//             } else {
//                 Toast.show({ text1: resp.data.message });
//             }
//         } catch (error) {
//             setLoading(false)
//             console.log('error in getCartCount', resp);
//         }
//         setLoading(false);
//     };
//     const RenderItem = ({ item }) => {

//         return (
//             <>
//                 <View
//                     style={styles.appView}>

//                     <View>
//                         <ImageBackground source={require('../../Global/Images/MaskBackground.png')} style={{ overflow: 'hidden', width: dimensions.SCREEN_WIDTH, marginTop: 19 }}>

//                             <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 20, paddingHorizontal: 28, justifyContent: 'space-between', marginHorizontal: 12 }}>
//                                 <View style={{ flexDirection: 'column', width: dimensions.SCREEN_WIDTH * 0.50 }}>
//                                     <MyText text={item.title} fontWeight='700' fontSize={16} textColor={Color.WHITE} fontFamily='Roboto' style={{}} />
//                                     <MyText text=
//                                         {`${item?.description === undefined ? '' : item.description.length > 50 ? `${item?.description.substring(0, 50)}.....` : `${item?.description.substring(0, 50)}`}`
//                                         } fontWeight='500' fontSize={12} textColor={Color.WHITE} fontFamily='Roboto' style={{ marginTop: 8, lineHeight: 24, }} />
//                                     <TouchableOpacity style={{ height: 36, width: 99, borderRadius: 5, backgroundColor: 'white', marginTop: 8, marginBottom: 30 }} onPress={() => { setEditModal(true), setDataModal(item) }}>
//                                         <MyText text={'Read More'} fontWeight='500' fontSize={12} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' style={{ marginTop: 8, alignSelf: 'center' }} />
//                                     </TouchableOpacity>
//                                 </View>
//                                 {/* <Book width={150} height={150} ></Book> */}

//                                 <Image
//                                     source={
//                                         item?.image
//                                             ? { uri: item?.image }
//                                             : require('../../Global/Images/user-default.png')
//                                     }
//                                     style={{ height: 125, width: 125, borderRadius: 20 }}
//                                 />
//                             </View>
//                         </ImageBackground>
//                     </View>
//                 </View>
//             </>
//         );
//     };
//     const RenderItemLead = ({ item }) => {
//         console.log('item renderItem Lead---->>>', item.id);
//         return (
//             <TouchableOpacity style={styles.teamView}
//                 onPress={() => {
//                     navigation.navigate('CourseDetail', { id: item.id })
//                 }}
//             >
//                 {/* <Bat style={{ alignSelf: 'center' }}></Bat> */}
//                 < Image source={{ uri: item?.thumbnail }} style={{ height: 207, width: dimensions.SCREEN_WIDTH, resizeMode: 'cover', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 10, width: dimensions.SCREEN_WIDTH * 0.80, borderTopRightRadius: 10, overflow: 'hidden' }}></Image >
//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, marginVertical: 10 }}>

//                     <MyText
//                         text={`${item?.title === null ? '' : item?.title?.length > 38 ? `${item?.title?.substring(0, 38)}..` : `${item?.title?.substring(0, 38)}`}`}
//                         fontWeight="bold"
//                         fontSize={14}
//                         textColor={Color.LIGHT_BLACK}
//                         fontFamily="Inter"
//                         style={{
//                         }}
//                     />
//                     <View style={{ flexDirection: 'row', top: 2 }}>
//                         {/* course_complete_percentag */}
//                         <Star height={20} width={20}></Star>
//                         <MyText
//                             text={Number(
//                                 !isNaN(parseFloat(item?.avg_review))
//                                     ? parseFloat(item?.avg_review).toFixed(1)
//                                     : 0 // Default value if avg_rating is not a number or undefined
//                             )}
//                         />
//                     </View>
//                 </View>
//                 <MyText
//                     text={`${item?.description === null ? '' : item?.description.length > 43 ? `${item?.description.substring(0, 43)}..` : `${item?.description.substring(0, 43)}`}`}
//                     fontWeight="bold"
//                     fontSize={14}
//                     textColor={Color.PRIMARY}
//                     fontFamily="Inter"
//                     style={{
//                         marginHorizontal: 5,

//                         width: dimensions.SCREEN_WIDTH * 0.80
//                     }}
//                 />
//                 <View style={{
//                     height: 40, borderRadius: 4, borderColor: Color.PRIMARY, borderWidth: 1, marginVertical: 12, marginHorizontal: 5,
//                     width: dimensions.SCREEN_WIDTH * 0.20,
//                     justifyContent: 'center'
//                 }}>
//                     <MyText
//                         text={`${item?.module_count ? item?.module_count : '0'} Modules`}
//                         fontWeight="bold"
//                         fontSize={12}
//                         textColor={Color.PRIMARY}
//                         fontFamily="Inter"
//                         style={{
//                             marginHorizontal: 5,
//                             textAlign: 'left',

//                         }}
//                     />

//                 </View>

//                 <View style={{ marginVertical: 12, marginHorizontal: 10 }}>
//                     <Progress.Bar progress={
//                         parseFloat(item?.course_complete_percentage || '0') / 100
//                     } width={dimensions.SCREEN_WIDTH * 0.75} thickness={34}
//                         height={20}
//                         borderRadius={5}
//                         color={Color.PRIMARY}
//                         unfilledColor={
//                             Color.LIGHT_BLACK
//                         }
//                         borderWidth={0}
//                         showsText={true} />
//                     <Text style={{
//                         position: 'absolute',
//                         alignSelf: 'center',
//                         color: 'white', // or any color that contrasts with the progress bar
//                         fontWeight: 'bold',
//                     }}>{`${item?.course_complete_percentage}% Completed`}</Text>
//                 </View>
//             </TouchableOpacity >
//         )
//     }
//     //ui for schdule
//     const RenderSchdule = ({ item }) => {
//         return (
//             <TouchableOpacity style={[styles.scduleView,]} onPress={() => { navigation.navigate('SchduleDetails', { id: item?.id }) }}>
//                 <View style={{ flexDirection: 'row', marginBottom: 8, justifyContent: 'space-between', }}>
//                     <View style={{ flexDirection: 'row' }}>
//                         <View style={{ width: 41, height: 41, backgroundColor: '#F7FAEB', justifyContent: 'center', borderRadius: 20 }}>
//                             <MyText text={'LP'} fontWeight='500' fontSize={14} textColor={Color.PRIMARY} fontFamily='Roboto' style={{ textAlign: 'center', }} />
//                         </View>
//                         <MyText text={'Dr. Elsie Koh, MD MHL'} fontWeight='bold' fontSize={14} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' style={{ textAlign: 'center', marginTop: 12, marginHorizontal: 12 }} />
//                     </View>
//                     <View style={{ width: 68, height: 32, borderRadius: 5, backgroundColor: Color.PRIMARY, marginTop: 2, justifyContent: 'center' }}>
//                         <MyText text={item?.meeting_type} fontWeight='500' fontSize={12} textColor={Color.WHITE} fontFamily='Roboto' style={{ textAlign: 'center', }} />
//                     </View>

//                 </View>
//                 <View style={{ width: dimensions.SCREEN_WIDTH * 0.93, height: 1, backgroundColor: '#E7EAF1', alignSelf: 'center' }}>

//                 </View>
//                 <MyText text={item?.meeting_title} fontWeight='bold' fontSize={14} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' style={{ marginHorizontal: 2, marginTop: 10, marginBottom: 12 }} />
//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//                     <View style={{ flexDirection: 'column' }}>

//                         <View style={{ flexDirection: 'row', marginVertical: 6 }}>
//                             <Clock>
//                             </Clock>
//                             <MyText text={`${moment(item.schedule_start_date).format('MM-DD-YYYY')}`} fontWeight='400' fontSize={13} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' style={{ marginHorizontal: 5, }} />
//                         </View>
//                         <View style={{ flexDirection: 'row', marginTop: 4 }}>
//                             <IconClendar></IconClendar>
//                             <MyText
//                                 text={`${moment(item.schedule_start_time, "HH:mm:ss").format("hh:mm A")}-${moment(item.schedule_end_time, "HH:mm:ss").format("hh:mm A")}` !== undefined ? `${moment(item.schedule_start_time, "HH:mm:ss").format("hh:mm A")}-${moment(item.schedule_end_time, "HH:mm:ss").format("hh:mm A")}` : ''}
//                                 fontFamily="Roboto"
//                                 fontWeight='400'
//                                 fontSize={13}
//                                 textColor={'#132A3A'}
//                                 style={{ marginLeft: 4 }}
//                             />
//                         </View>
//                     </View>
//                     <VideoChat></VideoChat>
//                 </View>
//                 <View style={{ width: dimensions.SCREEN_WIDTH * 0.93, height: 1, backgroundColor: '#E7EAF1', alignSelf: 'center', marginVertical: 12 }}></View>
//                 <View style={{ flexDirection: 'row' }}>
//                     <Zoom></Zoom>
//                     <MyText text={'Join Meeting'} fontWeight='400' fontSize={13} textColor={'#3DA1E3'} fontFamily='Roboto' style={{ marginHorizontal: 5, marginVertical: 10 }} />
//                 </View>
//             </TouchableOpacity>
//         )
//     }
//     useEffect(() => {
//         if (dateData) {
//             setMarkedDates(getMarkedDates(dateData, colorData));
//             // / Set initial marked dates
//         }
//     }, [dateData]);

//     useEffect(() => {
//         if (selectedDate) {
//             console.log('my color data--->>>', JSON.stringify(setColorData));
//             setMarkedDates((prev) => ({
//                 ...prev,
//                 [selectedDate]: {
//                     selected: true,
//                     disableTouchEvent: false,
//                     customStyles: {
//                         container: {
//                             backgroundColor: 'red',
//                             borderRadius: 6,
//                             cursor: 'pointer',
//                         },
//                         text: {
//                             color: 'white',
//                         },
//                     },
//                 },
//             }));
//         }
//     }, [selectedDate]);

//     const handleDayPress = (day) => {
//         const { dateString } = day;
//         if (markedDates[dateString]) {
//             // Navigate to the desired page
//             console.log('my date stringg---->>>', dateString)
//             navigation.navigate('CalendarListing', { date: dateString });
//         }
//     };

//     const convertDate = (date) => {
//         const [month, year, day] = date.split('-');
//         return `${year}-${month}-${day}`;
//     };
//     const getMarkedDates = (data, myColor) => {
//         const markedDates = {};
//         for (const monthYear in data) {
//             const days = data[monthYear].days;
//             for (const day in days) {
//                 const color = myColor[monthYear]?.days[day]?.color;
//                 if (color && color.length > 0) {
//                     const formattedDate = convertDate(`${monthYear}-${String(day).padStart(2, '0')}`);
//                     markedDates[formattedDate] = {
//                         selected: true,
//                         disableTouchEvent: false,
//                         customStyles: {
//                             container: {
//                                 backgroundColor: color,
//                                 borderRadius: 6,
//                                 cursor: 'pointer',
//                             },
//                             text: {
//                                 color: 'white',
//                             },
//                         },
//                     };
//                 }
//             }
//         }
//         console.log(JSON.stringify(markedDates)); // Check markedDates in console
//         return markedDates;
//     };

//     // const getMarkedDates = (data, myColor) => {
//     //     console.log('my colors--->>>', JSON.stringify(myColor));
//     //     const markedDates = {};
//     //     for (const monthYear in data) {
//     //         const days = data[monthYear].days;
//     //         console.log('my daysss----->>>', JSON.stringify(days));
//     //         for (const day in days) {

//     //             const color = myColor[monthYear]?.days[day]?.color; // Access color from myColor
//     //             console.log('color for the dataaaaa33333uuuu--->>>', JSON.stringify(color));
//     //             if (color && color.length > 0) { // Check if color is defined and has a length greater than 0
//     //                 console.log('my color in new fun--->>', color)
//     //                 const formattedDate = convertDate(`${monthYear}-${String(day).padStart(2, '0')}`); // Ensure day is two digits
//     //                 markedDates[formattedDate] = {
//     //                     selected: true,
//     //                     disableTouchEvent: false,
//     //                     customStyles: {
//     //                         container: {
//     //                             backgroundColor: 'red', // Use the color from myColor
//     //                             borderRadius: 6,
//     //                             cursor: 'pointer',
//     //                         },
//     //                         text: {
//     //                             color: 'white',
//     //                         },
//     //                     },
//     //                 };
//     //             }
//     //         }
//     //     }
//     //     console.log(JSON.stringify(markedDates), 'markedDates')
//     //     return markedDates;
//     // };

//     // const getMarkedDates = (data) => {
//     //     const markedDates = {};
//     //     for (const monthYear in data) {
//     //         const days = data[monthYear].days;
//     //         for (const day in days) {
//     //             if (days[day].length > 0) { // Check if the array length is greater than 0
//     //                 const formattedDate = convertDate(`${monthYear}-${String(day).padStart(2, '0')}`); // Ensure day is two digits
//     //                 markedDates[formattedDate] = {
//     //                     selected: true,
//     //                     disableTouchEvent: false,
//     //                     customStyles: {
//     //                         container: {
//     //                             backgroundColor: 'red',
//     //                             borderRadius: 6,
//     //                             cursor: 'pointer',
//     //                         },
//     //                         text: {
//     //                             color: 'white',
//     //                         },
//     //                     },
//     //                 };
//     //             }
//     //         }
//     //     }

//     //     return markedDates;
//     // };

//     return (

//         <SafeAreaView style={{ flex: 1, }}>
//             <StatusBar backgroundColor={Color.LIGHT_BLACK} />
//             <View style={{
//                 flex: 1,
//                 backgroundColor: Color.SCREEN_BG,

//             }}>
//                 <MyHeader
//                     Title="Home"
//                     scrolling={scrolling}
//                     scrollY={scrollY}
//                     style={scrolling ? { zIndex: 99 } : null}
//                     isBorderRadius={true}
//                 />

//                 <ScrollView
//                     showsVerticalScrollIndicator={false}
//                     contentContainerStyle={{ paddingBottom: '20%' }}
//                     refreshControl={
//                         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//                     }

//                     onScroll={handleScroll}
//                     scrollEventThrottle={16}
//                     style={styles.mainView}>

//                     {!scrolling ? (
//                         <View style={{ width: dimensions.SCREEN_WIDTH }}>
//                             <AppIntroSlider
//                                 data={home?.announcements != undefined ? home?.announcements : banner}
//                                 renderNextButton={renderNextButton}
//                                 renderDoneButton={renderDoneButton}
//                                 dotStyle={styles.dotStyle}
//                                 renderItem={RenderItem}
//                                 activeDotStyle={styles.activeStyle}
//                             />
//                         </View>

//                     ) : null}
//                     <View style={styles.leadView}>
//                         <MyText text='LEAD Physician Courses' fontWeight='bold' fontSize={16} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' style={{ textAlign: 'right', }} />
//                         <TouchableOpacity style={styles.viewAll} onPress={() => { navigation.navigate('MyCourse') }}>
//                             <Text style={{ fontSize: 13, fontWeight: '400', color: 'white', alignSelf: 'center' }}>See all</Text>
//                         </TouchableOpacity>
//                     </View>
//                     <View>

//                         <FlatList
//                             horizontal={true}
//                             data={home?.courses}
//                             showsVerticalScrollIndicator={false}
//                             showsHorizontalScrollIndicator={false}
//                             keyExtractor={(item, index) => index.toString()}
//                             renderItem={RenderItemLead}
//                             ListEmptyComponent={() => (
//                                 <View style={{ alignSelf: 'center', justifyContent: 'center', width: dimensions.SCREEN_WIDTH * 0.90, marginVertical: 20 }}>
//                                     <Nodata style={{ alignSelf: 'center' }} height={90} width={90}></Nodata>
//                                     <MyText text={'No data found !'} fontWeight='500' fontSize={13} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' style={{ alignSelf: 'center' }} />
//                                 </View>
//                             )}
//                         />
//                     </View>

//                     <TouchableOpacity style={[styles.goalBar, { justifyContent: 'space-between', paddingHorizontal: 20 }]} onPress={() => { navigation.navigate('SetGoal') }}>
//                         <MyText
//                             text={'Set Your Goal'}
//                             fontWeight="bold"
//                             fontSize={16}
//                             textColor={Color.WHITE}
//                             fontFamily="Inter"
//                             style={{ alignSelf: 'center', justifyContent: 'center', textAlign: 'center' }}
//                         />
//                         <TouchableOpacity style={{
//                             width: 44, height: 44,
//                             borderRadius: 5, backgroundColor: Color.PRIMARY, justifyContent: 'center', alignItems: 'center', marginTop: 12,
//                         }} onPress={() => { navigation.navigate('SetGoal') }}>
//                             <Arrow></Arrow>
//                         </TouchableOpacity>
//                     </TouchableOpacity>

//                     {/* <Calendar
//                         style={{
//                             borderWidth: 1,
//                             borderColor: 'gray',
//                             height: 390,
//                         }}
//                         markingType="custom"
//                         theme={{
//                             backgroundColor: '#ffffff',
//                             calendarBackground: '#ffffff',
//                             textSectionTitleColor: Color.LIGHT_BLACK,
//                             selectedDayBackgroundColor: Color.PRIMARY,
//                             selectedDayTextColor: '#ffffff',
//                             todayTextColor: Color.PRIMARY,
//                             dayTextColor: Color.LIGHT_BLACK,
//                             textDisabledColor: 'grey',
//                         }}
//                         onDayPress={handleDayPress}
//                         // onDayPress={handleDayPress}
//                         markedDates={markedDates}
//                     /> */}
//                     <Calendar
//                         style={{
//                             borderWidth: 1,
//                             borderColor: 'gray',
//                             height: 390,
//                         }}
//                         markingType="custom"
//                         theme={{
//                             backgroundColor: '#ffffff',
//                             calendarBackground: '#ffffff',
//                             textSectionTitleColor: Color.LIGHT_BLACK,
//                             selectedDayBackgroundColor: Color.PRIMARY,
//                             selectedDayTextColor: '#ffffff',
//                             todayTextColor: Color.PRIMARY,
//                             dayTextColor: Color.LIGHT_BLACK,
//                             textDisabledColor: 'grey',
//                         }}
//                         onDayPress={handleDayPress}
//                         markedDates={markedDates}
//                     />
//                     {/* my selected date calendar */}
//                     <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
//                         <View style={{ flexDirection: 'column' }}>
//                             <MyText
//                                 text={'Schedule'}
//                                 fontWeight="bold"
//                                 fontSize={16}
//                                 textColor={Color.BLACK}
//                                 fontFamily="Inter"
//                             />
//                             <MyText
//                                 text={'Upcoming Bi-Monthly or Weekly Meetings'}
//                                 fontWeight="black"
//                                 fontSize={13}
//                                 textColor={'#959FA6'}
//                                 fontFamily="Inter"
//                                 style={{
//                                     fontWeight: '300',

//                                 }}
//                             />
//                         </View>
//                         <TouchableOpacity style={{ height: 31, width: 59, borderRadius: 5, backgroundColor: Color.LIGHT_BLACK, justifyContent: 'center' }} onPress={() => { navigation.navigate('Schedule') }}>
//                             <MyText
//                                 text={'See all'}
//                                 fontWeight="400"
//                                 fontSize={13}
//                                 textColor={Color.WHITE}
//                                 fontFamily="Inter"
//                                 style={{
//                                     fontWeight: '300',
//                                     alignSelf: 'center'
//                                 }}
//                             />
//                         </TouchableOpacity>

//                     </View>
//                     <View>

//                         <FlatList
//                             horizontal={true}
//                             data={home?.schedules}
//                             showsVerticalScrollIndicator={false}
//                             showsHorizontalScrollIndicator={false}
//                             keyExtractor={(item, index) => index.toString()}
//                             renderItem={RenderSchdule}
//                             ListEmptyComponent={() => (
//                                 <View style={{ alignSelf: 'center', justifyContent: 'center', width: dimensions.SCREEN_WIDTH * 0.90, marginVertical: 20 }}>
//                                     <Nodata style={{ alignSelf: 'center' }} height={90} width={90}></Nodata>
//                                     <MyText text={'No meetings found !'} fontWeight='500' fontSize={13} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' style={{ alignSelf: 'center' }} />
//                                 </View>
//                             )}
//                         />
//                     </View>
//                 </ScrollView>

//                 <Modal
//                     isVisible={editModal}
//                     swipeDirection="down"
//                     onBackdropPress={() => setEditModal(false)}
//                     onSwipeComplete={(e) => {
//                         setEditModal(false)
//                     }}
//                     scrollTo={() => { }}
//                     scrollOffset={1}
//                     propagateSwipe={true}
//                     coverScreen={false}
//                     backdropColor='transparent'
//                     style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
//                 >

//                     <View style={{ height: '70%', backgroundColor: '#fff5f7', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20, }}>
//                         <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
//                             <View style={{ height: 'auto', paddingVerticalVertical: 60, marginBottom: 70 }}>
//                                 <MyText text={'Announcements'} fontWeight='500' fontSize={24} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' style={{ alignSelf: 'center' }} />
//                                 <Image
//                                     source={
//                                         dataModal?.image
//                                             ? { uri: dataModal?.image }
//                                             : require('../../Global/Images/user-default.png')
//                                     }
//                                     style={{ height: 125, width: 125, borderRadius: 20, alignSelf: 'center', marginVertical: 15 }}
//                                 />
//                                 <MyText text={dataModal?.description} fontWeight='400' fontSize={14} textColor={'#66757F'} fontFamily='Roboto' style={{
//                                     alignSelf: 'center', textAlign: 'center',
//                                 }} />

//                             </View>
//                             <TouchableOpacity style={styles.buttonView} onPress={() => { setEditModal(false) }}>
//                                 <ArrowLeft></ArrowLeft>
//                                 <MyText text={'Back to home'} fontWeight='500' fontSize={14} textColor={Color.WHITE} fontFamily='Roboto' style={{ alignSelf: 'center', marginHorizontal: 6 }} />
//                             </TouchableOpacity>
//                         </ScrollView>
//                     </View>
//                 </Modal>
//             </View>
//             {loading ? <Loader /> : null}
//         </SafeAreaView>
//     )
// }

// export default Home;

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
  Modal,
} from 'react-native';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import Color, {dimensions} from '../../Global/Color';
import MyText from '../../Components/MyText/MyText';
import {
  useSharedValue,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import Loader from '../../Components/Loader';
import {styles} from './HomeStyle';
import MyHeader from '../../Components/MyHeader/MyHeader';
import AppIntroSlider from 'react-native-app-intro-slider';
import {Calendar} from 'react-native-calendars';
import {
  getApiWithToken,
  GET_HOME,
  CHECK_SUBSCRIPTION,
} from '../../Global/Service';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

/////svgs
import Arrow from '../../Global/Images/arrowRight.svg';
import Star from '../../Global/Images/star.svg';
import Ongoing from '../../Global/Images/clock.svg';
import Nodata from '../../Global/Images/lock-circle.svg';
import Clock from '../../Global/Images/clockHome.svg';
import SkeletonContainer from '../../Components/Skelton/SkeltonContainer';
import messaging from '@react-native-firebase/messaging';
import IconClendar from '../../Global/Images/calendarHome.svg';
import VideoChat from '../../Global/Images/videoChat.svg';
import Zoom from '../../Global/Images/Zoom.svg';
import BorderBtn from '../ContactUs/BorderBtn';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import _Modal from 'react-native-modal';
import ArrowLeft from '../../Global/Images/arrowLeft.svg';
import {
  setUser,
  userisSubscribedHandler,
} from '../../reduxToolkit/reducer/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReviewModal from '../../Components/Modal/ReviewModal';
const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const userToken = useSelector(state => state.user.userToken);
  console.log('my user token--->>', userToken);
  const [loading, setLoading] = useState(false);
  const [scrolling, setscrolling] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showSkeleton, setShowSkeleton] = React.useState(false);
  const [home, setHome] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [dataModal, setDataModal] = useState('');
  const [dateData, setDateData] = useState({});
  const [colorData, setColorData] = useState({});
  const [showReviewModal, setShowReviewModal] = React.useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const scrollY = useSharedValue(0);
  const renderNextButton = () => null;
  const renderDoneButton = () => null;

  const banner = [
    {
      id: '1',
      text: 'Announcements',
      title:
        'Welcome to LEAD Physician®, the online leadership training program for Physicians By Physicians.',
    },
    {
      id: '2',
      text: 'Announcements',
      title:
        'Welcome to LEAD Physician®, the online leadership training program for Physicians By Physicians.',
    },
    {
      id: '3',
      text: 'Announcements',
      title:
        'Welcome to LEAD Physician®, the online leadership training program for Physicians By Physicians.',
    },
  ];

  React.useEffect(() => {
    setShowSkeleton(true);
    const unsubscribe = navigation.addListener('focus', () => {
      getSubscription();
      getCartCount();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [isFocus]);

  const getSubscription = async () => {
    setLoading(true);
    try {
      const resp = await getApiWithToken(userToken, CHECK_SUBSCRIPTION);
      console.log('HOME-screen-getSubscription', resp.data);
      if (resp.data) {
        if (resp.data?.plan_status != true) {
          setLoading(false);
          dispatch(
            userisSubscribedHandler({
              isSubscribed: false,
            }),
          );
          const jsonValue = JSON.stringify(resp.data.data);
          await AsyncStorage.setItem('userInfo', jsonValue);
          dispatch(setUser(resp.data.data));
          navigation.navigate('Subscription');
        } else {
          console.error('getSubscription-else part', resp.data);
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
      console.error('error in getCount', error);
    }
  };

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

  //get data for list
  const getCartCount = async () => {
    loading && !showSkeleton && setShowSkeleton(true);
    setLoading(true);
    try {
      const resp = await getApiWithToken(userToken, GET_HOME);

      if (resp?.data?.status) {
        setLoading(false);
        setHome(resp?.data?.data);
        setDateData(resp?.data?.data?.calendarData);
        setColorData(resp?.data?.data?.calendarColorData);
        setMarkedDates(
          getMarkedDates(
            resp?.data?.data?.calendarData,
            resp?.data?.data?.calendarColorData,
          ),
        ); // Set initial marked dates
        // getMarkedDates(resp?.data?.data?.calendarData)
      } else {
        Toast.show({text1: resp.data.message});
      }
    } catch (error) {
      setLoading(false);
      console.log('error in getCartCount', resp);
    } finally {
      setShowSkeleton(false);
      setLoading(false);
    }
  };

  const RenderItem = ({item}) => {
    return (
      <>
        <View style={styles.appView}>
          <View>
            <ImageBackground
              source={require('../../Global/Images/MaskBackground.png')}
              style={{
                overflow: 'hidden',
                width: dimensions.SCREEN_WIDTH,
                marginTop: 19,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  marginTop: 20,
                  paddingHorizontal: 28,
                  justifyContent: 'space-between',
                  marginHorizontal: 12,
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    width: dimensions.SCREEN_WIDTH * 0.5,
                  }}>
                  <MyText
                    text={item.title}
                    numberOfLines={2}
                    fontWeight="700"
                    fontSize={16}
                    textColor={Color.WHITE}
                    fontFamily="Roboto"
                    style={{}}
                  />
                  <MyText
                    text={`${
                      item?.description === undefined
                        ? ''
                        : item.description.length > 50
                        ? `${item?.description.substring(0, 50)}.....`
                        : `${item?.description.substring(0, 50)}`
                    }`}
                    fontWeight="500"
                    fontSize={12}
                    textColor={Color.WHITE}
                    fontFamily="Roboto"
                    style={{marginTop: 8, lineHeight: 24}}
                  />
                  <TouchableOpacity
                    style={{
                      height: 36,
                      width: 99,
                      borderRadius: 5,
                      backgroundColor: 'white',
                      marginTop: 8,
                      marginBottom: 30,
                    }}
                    onPress={() => {
                      setEditModal(true), setDataModal(item);
                    }}>
                    <MyText
                      text={'Read More'}
                      fontWeight="500"
                      fontSize={12}
                      textColor={Color.LIGHT_BLACK}
                      fontFamily="Roboto"
                      style={{marginTop: 8, alignSelf: 'center'}}
                    />
                  </TouchableOpacity>
                </View>

                <Image
                  source={
                    item?.image
                      ? {uri: item?.image}
                      : require('../../Global/Images/user-default.png')
                  }
                  style={{height: 125, width: 125, borderRadius: 20}}
                />
              </View>
            </ImageBackground>
          </View>
        </View>
      </>
    );
  };
  const RenderItemLead = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.teamView}
        onPress={() => {
          navigation.navigate('CourseDetail', {id: item.id});
        }}>
        <Image
          source={{uri: item?.thumbnail}}
          style={{
            height: 207,
            width: dimensions.SCREEN_WIDTH,
            resizeMode: 'cover',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: 10,
            width: dimensions.SCREEN_WIDTH * 0.8,
            borderTopRightRadius: 10,
            overflow: 'hidden',
          }}></Image>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 5,
            marginVertical: 10,
          }}>
          <Text
            style={{
              flex: 1,
              fontWeight: 'bold',
              fontSize: 14,
              textColor: Color.LIGHT_BLACK,
              fontFamily: 'Inter',
            }}
            numberOfLines={1}>
            {item?.title === null ? '' : item?.title}
          </Text>
          {/* <MyText
            text={`${
              item?.title === null
                ? ''
                : item?.title?.length > 38
                ? `${item?.title?.substring(0, 38)}..`
                : `${item?.title?.substring(0, 38)}`
            }`}
            fontWeight="bold"
            fontSize={14}
            textColor={Color.LIGHT_BLACK}
            fontFamily="Inter"
            style={{}}
          /> */}
          <View style={{flexDirection: 'row', top: 2}}>
            {/* course_complete_percentag */}
            <Star height={20} width={20}></Star>
            <MyText
              text={Number(
                !isNaN(parseFloat(item?.avg_review))
                  ? parseFloat(item?.avg_review).toFixed(1)
                  : 0, // Default value if avg_rating is not a number or undefined
              )}
              style={{width: 'auto'}}
            />
          </View>
        </View>
        <MyText
          text={`${
            item?.description === null
              ? ''
              : item?.description.length > 43
              ? `${item?.description.substring(0, 43)}..`
              : `${item?.description.substring(0, 43)}`
          }`}
          fontWeight="bold"
          fontSize={14}
          textColor={Color.PRIMARY}
          fontFamily="Inter"
          style={{
            marginHorizontal: 5,

            width: dimensions.SCREEN_WIDTH * 0.8,
          }}
        />
        <View
          style={{
            height: 40,
            borderRadius: 4,
            borderColor: Color.PRIMARY,
            borderWidth: 1,
            marginVertical: 12,
            marginHorizontal: 5,
            width: dimensions.SCREEN_WIDTH * 0.2,
            justifyContent: 'center',
          }}>
          <MyText
            text={`${item?.module_count ? item?.module_count : '0'} Modules`}
            fontWeight="bold"
            fontSize={12}
            textColor={Color.PRIMARY}
            fontFamily="Inter"
            style={{
              marginHorizontal: 5,
              textAlign: 'left',
            }}
          />
        </View>

        <View style={{marginVertical: 12, marginHorizontal: 10}}>
          <Progress.Bar
            progress={parseFloat(item?.course_complete_percentage || '0') / 100}
            width={dimensions.SCREEN_WIDTH * 0.75}
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
            }}>{`${item?.course_complete_percentage}% Completed`}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  //ui for schdule
  const RenderSchdule = ({item}) => {
    return (
      <TouchableOpacity
        style={[styles.scduleView]}
        onPress={() => {
          navigation.navigate('SchduleDetails', {id: item?.id});
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 8,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                width: 41,
                height: 41,
                backgroundColor: '#F7FAEB',
                justifyContent: 'center',
                borderRadius: 20,
              }}>
              <MyText
                text={'LP'}
                fontWeight="500"
                fontSize={14}
                textColor={Color.PRIMARY}
                fontFamily="Roboto"
                style={{textAlign: 'center'}}
              />
            </View>
            <MyText
              text={'Dr. Elsie Koh, MD MHL'}
              fontWeight="bold"
              fontSize={14}
              textColor={Color.LIGHT_BLACK}
              fontFamily="Roboto"
              style={{textAlign: 'center', marginTop: 12, marginHorizontal: 12}}
            />
          </View>
          <View
            style={{
              width: 68,
              height: 32,
              borderRadius: 5,
              backgroundColor: Color.PRIMARY,
              marginTop: 2,
              justifyContent: 'center',
            }}>
            <MyText
              text={item?.meeting_type}
              fontWeight="500"
              fontSize={12}
              textColor={Color.WHITE}
              fontFamily="Roboto"
              style={{textAlign: 'center'}}
            />
          </View>
        </View>
        <View
          style={{
            width: dimensions.SCREEN_WIDTH * 0.93,
            height: 1,
            backgroundColor: '#E7EAF1',
            alignSelf: 'center',
          }}></View>
        <MyText
          text={item?.meeting_title}
          fontWeight="bold"
          fontSize={14}
          textColor={Color.LIGHT_BLACK}
          fontFamily="Roboto"
          style={{marginHorizontal: 2, marginTop: 10, marginBottom: 12}}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row', marginVertical: 6}}>
              <Clock></Clock>
              <MyText
                text={`${moment(item.schedule_start_date).format(
                  'MM-DD-YYYY',
                )}`}
                fontWeight="400"
                fontSize={13}
                textColor={Color.LIGHT_BLACK}
                fontFamily="Roboto"
                style={{marginHorizontal: 5}}
              />
            </View>
            <View style={{flexDirection: 'row', marginTop: 4}}>
              <IconClendar></IconClendar>
              <MyText
                text={
                  `${moment(item.schedule_start_time, 'HH:mm:ss').format(
                    'hh:mm A',
                  )}-${moment(item.schedule_end_time, 'HH:mm:ss').format(
                    'hh:mm A',
                  )}` !== undefined
                    ? `${moment(item.schedule_start_time, 'HH:mm:ss').format(
                        'hh:mm A',
                      )}-${moment(item.schedule_end_time, 'HH:mm:ss').format(
                        'hh:mm A',
                      )}`
                    : ''
                }
                fontFamily="Roboto"
                fontWeight="400"
                fontSize={13}
                textColor={'#132A3A'}
                style={{marginLeft: 4}}
              />
            </View>
          </View>
          <VideoChat></VideoChat>
        </View>
        <View
          style={{
            width: dimensions.SCREEN_WIDTH * 0.93,
            height: 1,
            backgroundColor: '#E7EAF1',
            alignSelf: 'center',
            marginVertical: 12,
          }}></View>
        <View style={{flexDirection: 'row'}}>
          <Zoom></Zoom>
          <MyText
            text={'Join Meeting'}
            fontWeight="400"
            fontSize={13}
            textColor={'#3DA1E3'}
            fontFamily="Roboto"
            style={{marginHorizontal: 5, marginVertical: 10}}
          />
        </View>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    if (dateData) {
      setMarkedDates(getMarkedDates(dateData, colorData));
      // / Set initial marked dates
    }
  }, [dateData]);

  useEffect(() => {
    if (selectedDate) {
      setMarkedDates(prev => ({
        ...prev,
        [selectedDate]: {
          selected: true,
          disableTouchEvent: false,
          customStyles: {
            container: {
              backgroundColor: 'red',
              borderRadius: 6,
              cursor: 'pointer',
            },
            text: {
              color: 'white',
            },
          },
        },
      }));
    }
  }, [selectedDate]);

  const handleDayPress = day => {
    const {dateString} = day;
    if (markedDates[dateString]) {
      // Navigate to the desired page
      navigation.navigate('CalendarListing', {date: dateString});
    }
  };

  const convertDate = date => {
    const [month, year, day] = date.split('-');
    return `${year}-${month}-${day}`;
  };

  const getMarkedDates = (data, myColor) => {
    const markedDates = {};

    for (const monthYear in data) {
      const days = data[monthYear].days;

      for (const day in days) {
        const colorObject = myColor[monthYear]?.days[day]; // Check for existence of myColor[monthYear]?.days[day]

        if (colorObject && colorObject.color && colorObject.color.length > 0) {
          const formattedDate = convertDate(
            `${monthYear}-${String(day).padStart(2, '0')}`,
          );

          markedDates[formattedDate] = {
            selected: true,
            disableTouchEvent: false,
            customStyles: {
              container: {
                backgroundColor: colorObject.color,
                borderRadius: 6,
                cursor: 'pointer',
              },
              text: {
                color: 'white', // Adjust text color if needed
              },
            },
          };
        }
      }
    }

    return markedDates;
  };

  // const getMarkedDates = (data, myColor) => {
  //     const markedDates = {};
  //     for (const monthYear in data) {
  //         const days = data[monthYear].days;
  //         for (const day in days) {
  //             console.log('myColor---->>', myColor);
  //             return
  //             const color = myColor[monthYear]?.days[day]?.color;
  //             if (color && color.length > 0) {
  //                 const formattedDate = convertDate(`${monthYear}-${String(day).padStart(2, '0')}`);
  //                 markedDates[formattedDate] = {
  //                     selected: true,
  //                     disableTouchEvent: false,
  //                     customStyles: {
  //                         container: {
  //                             backgroundColor: color,
  //                             borderRadius: 6,
  //                             cursor: 'pointer',
  //                         },
  //                         text: {
  //                             color: 'white',
  //                         },
  //                     },
  //                 };
  //             }
  //         }
  //     }
  //     // Check markedDates in console
  //     return markedDates;
  // };

  const reviewHandler = () => {
    setShowReviewModal(value => !value);
  };
  return (
    <>
      {/* <StatusBar backgroundColor={Color.LIGHT_BLACK} /> */}
      <View
        style={{
          flex: 1,
          backgroundColor: Color.SCREEN_BG,
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
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.mainView}>
          {!scrolling ? (
            <View style={{width: dimensions.SCREEN_WIDTH}}>
              <AppIntroSlider
                data={
                  home?.announcements != undefined
                    ? home?.announcements
                    : banner
                }
                renderNextButton={renderNextButton}
                renderDoneButton={renderDoneButton}
                dotStyle={styles.dotStyle}
                renderItem={RenderItem}
                activeDotStyle={styles.activeStyle}
              />
            </View>
          ) : null}
          <View style={styles.leadView}>
            <MyText
              text="LEAD Physician Courses"
              fontWeight="bold"
              fontSize={16}
              textColor={Color.LIGHT_BLACK}
              fontFamily="Roboto"
              style={{textAlign: 'right'}}
            />
            <TouchableOpacity
              style={styles.viewAll}
              onPress={() => {
                navigation.navigate('MyCourse');
              }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '400',
                  color: 'white',
                  alignSelf: 'center',
                }}>
                See all
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            {/* {showSkeleton ? (
                            <SkeletonContainer />
                        ) : ( */}
            <FlatList
              horizontal={true}
              data={home?.courses}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={RenderItemLead}
              ListEmptyComponent={() => (
                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    width: dimensions.SCREEN_WIDTH * 0.9,
                    marginVertical: 20,
                  }}>
                  <Nodata
                    style={{alignSelf: 'center'}}
                    height={90}
                    width={90}></Nodata>
                  <MyText
                    text={'No data found !'}
                    fontWeight="500"
                    fontSize={13}
                    textColor={Color.LIGHT_BLACK}
                    fontFamily="Roboto"
                    style={{alignSelf: 'center'}}
                  />
                </View>
              )}
            />
            {/* )} */}
          </View>

          <TouchableOpacity
            style={[
              styles.goalBar,
              {justifyContent: 'space-between', paddingHorizontal: 20},
            ]}
            onPress={() => {
              navigation.navigate('SetGoal');
            }}>
            <MyText
              text={'Set Your Goal'}
              fontWeight="bold"
              fontSize={16}
              textColor={Color.WHITE}
              fontFamily="Inter"
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            />
            <TouchableOpacity
              style={{
                width: 44,
                height: 44,
                borderRadius: 5,
                backgroundColor: Color.PRIMARY,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 12,
              }}
              onPress={() => {
                navigation.navigate('SetGoal');
              }}>
              <Arrow></Arrow>
            </TouchableOpacity>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 15,
              borderRadius: 10,
              overflow: 'hidden',
              backgroundColor: '#fff',
              padding: 10,
            }}>
            <Calendar
              style={
                {
                  //   borderWidth: 1,
                  //   borderColor: 'gray',
                  //   height: 390,
                }
              }
              markingType="custom"
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: Color.LIGHT_BLACK,
                selectedDayBackgroundColor: Color.PRIMARY,
                selectedDayTextColor: '#ffffff',
                todayTextColor: Color.PRIMARY,
                dayTextColor: Color.LIGHT_BLACK,
                textDisabledColor: 'grey',
              }}
              onDayPress={handleDayPress}
              markedDates={markedDates}
            />
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                marginTop: 25,
                flexWrap: 'wrap',
                gap: 6,
              }}>
              <View
                style={{
                  paddingVertical: 6,
                  borderRadius: 5,
                  justifyContent: 'center',
                  backgroundColor: '#EE82EE',
                  paddingHorizontal: 15,
                }}>
                <Text
                  style={{color: '#fff', textAlign: 'center', fontSize: 10}}>
                  Goals and Schedule
                </Text>
              </View>
              <View
                style={{
                  paddingVertical: 6,
                  borderRadius: 5,
                  justifyContent: 'center',
                  backgroundColor: '#008000',
                  paddingHorizontal: 15,
                  marginLeft: 0,
                }}>
                <Text
                  style={{color: '#fff', textAlign: 'center', fontSize: 10}}>
                  All Types Goals
                </Text>
              </View>
              <View
                style={{
                  paddingVertical: 6,
                  borderRadius: 5,
                  justifyContent: 'center',
                  backgroundColor: '#FFA500',
                  paddingHorizontal: 15,
                  marginLeft: 0,
                }}>
                <Text
                  style={{color: '#fff', textAlign: 'center', fontSize: 10}}>
                  Schedule
                </Text>
              </View>
              <View
                style={{
                  paddingVertical: 6,
                  borderRadius: 5,
                  justifyContent: 'center',
                  backgroundColor: '#FFFF00',
                  paddingHorizontal: 15,
                  marginLeft: 0,
                }}>
                <Text
                  style={{color: '#000', textAlign: 'center', fontSize: 10}}>
                  Only A-Type Goal
                </Text>
              </View>

              <View
                style={{
                  paddingVertical: 6,
                  borderRadius: 5,
                  justifyContent: 'center',
                  backgroundColor: '#0000FF',
                  paddingHorizontal: 15,
                  marginLeft: 0,
                }}>
                <Text
                  style={{color: '#fff', textAlign: 'center', fontSize: 10}}>
                  A-Type and B-Type Goals
                </Text>
              </View>
            </View>
          </View>
          {/* my selected date calendar  */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <View style={{flexDirection: 'column'}}>
              <MyText
                text={'Schedule'}
                fontWeight="bold"
                fontSize={16}
                textColor={Color.BLACK}
                fontFamily="Inter"
              />
              <MyText
                text={'Upcoming Bi-Monthly or Weekly Meetings'}
                fontWeight="black"
                fontSize={13}
                textColor={'#959FA6'}
                fontFamily="Inter"
                style={{
                  fontWeight: '300',
                }}
              />
            </View>
            <TouchableOpacity
              style={{
                height: 31,
                width: 59,
                borderRadius: 5,
                backgroundColor: Color.LIGHT_BLACK,
                justifyContent: 'center',
              }}
              onPress={() => {
                navigation.navigate('Schedule');
              }}>
              <MyText
                text={'See all'}
                fontWeight="400"
                fontSize={13}
                textColor={Color.WHITE}
                fontFamily="Inter"
                style={{
                  fontWeight: '300',
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              horizontal={true}
              data={home?.schedules}
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
                    marginVertical: 20,
                  }}>
                  <Nodata
                    style={{alignSelf: 'center'}}
                    height={90}
                    width={90}></Nodata>
                  <MyText
                    text={'No meetings found !'}
                    fontWeight="500"
                    fontSize={13}
                    textColor={Color.LIGHT_BLACK}
                    fontFamily="Roboto"
                    style={{alignSelf: 'center'}}
                  />
                </View>
              )}
            />
          </View>
          {home?.reviews?.review && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: responsiveHeight(2),
                borderRadius: responsiveWidth(2),
                backgroundColor: 'white',
                // width: responsiveWidth(95),
              }}>
              <View style={{flex: 3, paddingLeft: responsiveWidth(5)}}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: responsiveFontSize(2.5),
                  }}>
                  Rate Us
                </Text>
                <Text
                  style={{
                    // color: globalStyles.textGray,
                    fontSize: responsiveFontSize(1.6),
                  }}>
                  Your Valuable Feedback!!
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: responsiveHeight(1),
                  }}>
                  <Image
                    source={require('../../Global/Images/disable-star.png')}
                    resizeMode="contain"
                    style={_styles.starIcon}
                  />
                  <Image
                    source={require('../../Global/Images/disable-star.png')}
                    resizeMode="contain"
                    style={_styles.starIcon}
                  />
                  <Image
                    source={require('../../Global/Images/disable-star.png')}
                    resizeMode="contain"
                    style={_styles.starIcon}
                  />
                  <Image
                    source={require('../../Global/Images/disable-star.png')}
                    resizeMode="contain"
                    style={_styles.starIcon}
                  />
                  <Image
                    source={require('../../Global/Images/disable-star.png')}
                    resizeMode="contain"
                    style={_styles.starIcon}
                  />
                </View>
                <BorderBtn
                  onClick={reviewHandler}
                  buttonText="Submit Rating"
                  containerStyle={{
                    marginTop: responsiveHeight(1.2),
                    marginBottom: responsiveHeight(3),
                  }}
                  buttonTextStyle={{
                    fontSize: responsiveFontSize(1.6),
                    fontWeight: '600',
                    paddingHorizontal: responsiveWidth(5),
                  }}
                />
              </View>
              <View style={{flex: 2, justifyContent: 'center'}}>
                <Image
                  source={require('../../Global/Images/review.png')}
                  resizeMode="contain"
                  style={{
                    height: responsiveHeight(18),
                    width: responsiveWidth(25),
                  }}
                />
              </View>
            </View>
          )}
        </ScrollView>

        <_Modal
          isVisible={editModal}
          swipeDirection="down"
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
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              height: '70%',
              backgroundColor: '#fff5f7',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              padding: 20,
            }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}>
              <View
                style={{
                  height: 'auto',
                  paddingVerticalVertical: 60,
                  marginBottom: 70,
                }}>
                <MyText
                  text={'Announcements'}
                  fontWeight="500"
                  fontSize={24}
                  textColor={Color.LIGHT_BLACK}
                  fontFamily="Roboto"
                  style={{alignSelf: 'center'}}
                />
                <Image
                  source={
                    dataModal?.image
                      ? {uri: dataModal?.image}
                      : require('../../Global/Images/user-default.png')
                  }
                  style={{
                    height: 125,
                    width: 125,
                    borderRadius: 20,
                    alignSelf: 'center',
                    marginVertical: 15,
                  }}
                />
                <MyText
                  text={dataModal?.description}
                  fontWeight="400"
                  fontSize={14}
                  textColor={'#66757F'}
                  fontFamily="Roboto"
                  style={{
                    alignSelf: 'center',
                    textAlign: 'center',
                  }}
                />
              </View>
              <TouchableOpacity
                style={styles.buttonView}
                onPress={() => {
                  setEditModal(false);
                }}>
                <ArrowLeft></ArrowLeft>
                <MyText
                  text={'Back to home'}
                  fontWeight="500"
                  fontSize={14}
                  textColor={Color.WHITE}
                  fontFamily="Roboto"
                  style={{alignSelf: 'center', marginHorizontal: 6}}
                />
              </TouchableOpacity>
            </ScrollView>
          </View>
        </_Modal>
      </View>
      {loading ? <Loader /> : null}
      {true && (
        <Modal
          visible={showReviewModal}
          animationType="slide"
          transparent={true}>
          {<ReviewModal hideModal={reviewHandler} />}
        </Modal>
      )}
      {/* Rating */}
    </>
  );
};

export default Home;

const _styles = StyleSheet.create({
  starIcon: {
    marginRight: responsiveWidth(1.2),
    height: responsiveHeight(2),
    width: responsiveHeight(2),
  },
});
