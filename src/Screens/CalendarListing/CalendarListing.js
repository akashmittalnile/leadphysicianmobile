//import : react components
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Switch,
  TouchableOpacity,
  Dimensions,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  RefreshControl,
  Platform,
} from 'react-native';
import {dimensions} from '../../Global/Color';
import * as Progress from 'react-native-progress';
import {useIsFocused} from '@react-navigation/native';
//import : custom components
import MyHeader from '../../Components/MyHeader/MyHeader';
import MyText from '../../Components/MyText/MyText';

// svg
import Plainum from '../../Global/Images/PlataniumMembership.png';
import Monitor from '../../Global/Images/monitor.svg';
import Clock from '../../Global/Images/clockHome.svg';
import Calendar from '../../Global/Images/calendarHome.svg';
import Target from '../../Global/Images/Target.svg';
import ProfileImg from '../../Global/Images/ProfileImg.svg';
import SavedBook from '../../Global/Images/savedBook.svg';
import Zoom from '../../Global/Images/Zoom.svg';
import WeekleCalendar from '../../Global/Images/WeeklyCalendar.svg';
import Star from '../../Global/Images/star.svg';
import Nodata from '../../Global/Images/lock-circle.svg';
import {styles} from './CalendarListingStyle';
import Modal from 'react-native-modal';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

// import CustomLoader from 'components/CustomLoader/CustomLoader';
//import : third parties
import Hyperlinks from 'react-native-hyperlinks';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';
//import : global
import Color from '../../Global/Color';
//import : styles
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
//import : modal
import Loader from '../../Components/Loader';
import SearchWithIcon from '../../Components/SearchWithIcon/SearchWithIcon';
//import : redux
import {connect, useSelector, useDispatch} from 'react-redux';
//import api
import {
  GET_PROFILE,
  postApiWithToken,
  LOGOUT,
  getApiWithToken,
  GET_MYCOURSES,
  GET_CALENDARLISTING,
  GOAL_DETAIL,
  GET_SHDULEDETAIL,
} from '../../Global/Service';
import {CommonActions} from '@react-navigation/core';
import Saved from '../Saved/Saved';
import {height} from '../../Global/Constants';
import SkeletonContainer from '../../Components/Skelton/SkeltonContainer';
import WebView from 'react-native-webview';
const physicianCourse = [
  {
    id: '1',
    title: 'Module 01',
    status: 'Completed',
  },
  {
    id: '2',
    title: 'Module 02',
    status: 'Ongoing',
  },
  {
    id: '3',
    title: 'Module 03',
    status: 'Pending',
  },
  {
    id: '4',
    title: 'Module 03',
    status: 'Pending',
  },
  {
    id: '5',
    title: 'Module 03',
    status: 'Pending',
  },
];

const CalendarListing = ({navigation, route}) => {
  // console.log('my route for the page--->>', route?.params?.date);
  const dispatch = useDispatch();
  //variables
  const LINE_HEIGTH = 25;
  //variables : redux
  const userToken = useSelector(state => state.user.userToken);
  const user = useSelector(state => state.user.userInfo);
  // console.log('my--->>>', user);
  const [showLoader, setShowLoader] = useState(false);
  const [searchValue, setsearchValue] = useState('');
  const [meetingModal, setMeetingModal] = useState(false);
  const [goalModal, setGoalModal] = useState(false);
  const [meetingModalData, setMeetingModalData] = useState([]);
  const [goalModalData, SetGoalModalData] = useState([]);
  const [noData, setNoData] = useState(false);
  // const[searchValue,setsearchValue]=useState('')
  const [categoriesData, setCategoriesData] = useState([]);
  const [filteredcategoryData, setFilteredcategoryData] = useState([]);
  const [loading, setLoading] = useState('');
  const isFocus = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [courses, setMyCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [opendateModal, setopenDateModal] = useState(false);
  const [isture, setIsTrue] = useState(false);
  const [lode, setlode] = useState(true);
  const [displaydate, setdisplaydate] = useState('');

  React.useEffect(() => {
    // console.log("0000000000",route?.params?.date);
    const unsubscribe = navigation.addListener('focus', () => {
      getCartCount('');
      setdisplaydate('');
      setsearchValue('');
      setMeetingModal(false);
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [isFocus, searchValue]);
  const checkcon = () => {
    getCartCount('');
    setsearchValue('');
    setdisplaydate('');
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

  //get data for myCourses
  //get data for list

  const getCartCount = async item => {
    var url = GET_CALENDARLISTING;
    var murl = `&search=` + item;
    var date = `?date=` + route?.params?.date;
    url = url + date;
    if (item != '' || item != undefined) {
      url = url + murl;
    }
    console.log('my url aftergetCartCount adding the datte----->>>', url);
    try {
      setLoading(true);
      const resp = await getApiWithToken(userToken, url);
      console.log('get GET_CALENDARLISTING listingg--->>>', resp?.data?.data);
      if (resp?.data?.status) {
        // setProfile(resp?.data?.data)
        setLoading(false);
        // setNoData(false);
        setMyCourses(resp?.data?.data);
      } else {
        Toast.show({text1: resp.data.message});
      }
    } catch (error) {
      setLoading(false);
      console.log('error in getCartCount', error);
    }
    setLoading(false);
  };
  const getCartCountSearch = async item => {
    var url = GET_CALENDARLISTING;
    var murl = `&search=` + item;
    var date = `?date=` + route?.params?.date;
    url = url + date;
    if (item != '' || item != undefined) {
      url = url + murl;
    }
    console.log('my url after addinggetCartCountSearch the datte----->>>', url);
    try {
      setLoading(true);
      const resp = await getApiWithToken(userToken, url);
      // console.log('get calendar listingg for the searchhh--->>>', resp?.data?.data?.goals?.length !== 0 && resp?.data?.data?.schedules?.length !== 0);
      if (resp?.data?.status) {
        const schedulesLength = resp?.data?.data?.schedules?.length || 0;
        const coursesLength = resp?.data?.data?.goals?.length || 0;

        if (schedulesLength === 0 && coursesLength === 0) {
          // console.log('schedulesLength111', schedulesLength === 0 && coursesLength === 0, schedulesLength, coursesLength);
          setNoData(true);
        } else {
          setNoData(false);
        }

        setLoading(false);
        setMyCourses(resp?.data?.data);
      } else {
        Toast.show({text1: resp.data.message});
      }
    } catch (error) {
      setLoading(false);
      console.log('error in getCartCount', error);
    }
    setLoading(false);
  };

  const getCartCountDateSearch = async dat => {
    setIsTrue(true);
    setMyCourses([]);
    const SelectedDate = moment(dat).format(`YYYY-MM-DD`);
    var url = GET_CALENDARLISTING;
    // var murl = `&search=` + item
    var dates = `?date=` + SelectedDate;
    url = url + dates;
    if (dates != '' || dates != undefined) {
      url = url;
    }
    console.log('my url after adding the datte----->>>', url);
    try {
      setLoading(true);
      const resp = await getApiWithToken(userToken, url);
      // console.log('get calendar listingg for the searchhh--->>>', resp?.data?.data?.goals?.length !== 0 && resp?.data?.data?.schedules?.length !== 0);
      if (resp?.data?.status) {
        // const schedulesLength = resp?.data?.data?.schedules?.length || 0;
        // const coursesLength = resp?.data?.data?.goals?.length || 0;

        // if (schedulesLength === 0 && coursesLength === 0) {
        //   // console.log('schedulesLength111', schedulesLength === 0 && coursesLength === 0, schedulesLength, coursesLength);
        //   setNoData(true);
        // } else {
        //   setNoData(false);
        // }

        setLoading(false);
        setMyCourses(resp?.data?.data);
      } else {
        Toast.show({text1: resp.data.message});
      }
    } catch (error) {
      setLoading(false);
      console.log('error in getCartCount', error);
    }
    setLoading(false);
  };

  ///get goal modal data
  const fetchGoalData = async id => {
    setLoading(true);
    var url = GOAL_DETAIL;
    var id = `/` + id;
    url = url + id;
    try {
      const resp = await getApiWithToken(userToken, url);
      // console.log('my new goals details-->>', resp?.data?.data);

      if (resp?.data?.status) {
        SetGoalModalData(resp?.data?.data);
      } else {
        Toast.show({text1: resp.data.message});
      }
    } catch (error) {
      console.log('error in getCartCount', error);
    }
    setLoading(false);
  };

  ///get meeting modal data
  const fetchMeetingData = async id => {
    var url = GET_SHDULEDETAIL;
    var murl = `/` + id;
    url = url + murl;
    try {
      setLoading(true);
      const resp = await getApiWithToken(userToken, url);

      if (resp?.data?.status === true) {
        console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiii----', resp?.data?.data);
        setMeetingModalData(resp?.data?.data);
      } else {
        Toast.show({text1: resp.data.message});
      }
    } catch (error) {
      console.log('error in getCartCount', error);
    }
    setLoading(false);
  };
  const dateformates2 = (month, day, year) => {
    if (month == 'Jan') {
      return year + '-01-' + day;
    } else if (month == 'Feb') {
      return year + '-02-' + day;
    } else if (month == 'Mar') {
      return year + '-03-' + day;
    } else if (month == 'Apr') {
      return year + '-04-' + day;
    } else if (month == 'May') {
      return year + '-05-' + day;
    } else if (month == 'Jun') {
      return year + '-06-' + day;
    } else if (month == 'Jul') {
      return year + '-07-' + day;
    } else if (month == 'Aug') {
      return year + '-08-' + day;
    } else if (month == 'Sep') {
      return year + '-09-' + day;
    } else if (month == 'Oct') {
      return year + '-10-' + day;
    } else if (month == 'Nov') {
      return year + '-11-' + day;
    } else if (month == 'Dec') {
      return year + '-12-' + day;
    }
  };
  const dateformates = (month, day, year) => {
    console.log('my dates--->>', month, day, year);
    if (month == 'Jan') {
      return '01-' + day + '-' + year;
    } else if (month == 'Feb') {
      return '02-' + day + '-' + year;
    } else if (month == 'Mar') {
      return '03-' + day + '-' + year;
    } else if (month == 'Apr') {
      return '04-' + day + '-' + year;
    } else if (month == 'May') {
      return '05-' + day + '-' + year;
    } else if (month == 'Jun') {
      return '06-' + day + '-' + year;
    } else if (month == 'Jul') {
      return '07-' + day + '-' + year;
    } else if (month == 'Aug') {
      return '08-' + day + '-' + year;
    } else if (month == 'Sep') {
      return '09-' + day + '-' + year;
    } else if (month == 'Oct') {
      return '10-' + day + '-' + year;
    } else if (month == 'Nov') {
      return '11-' + day + '-' + year;
    } else if (month == 'Dec') {
      return '12-' + day + '-' + year;
    }
  };

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
  //   // setapiDate(mydate2)

  //   // setDate(currentDate)
  //   setopenDateModal(false);
  //   setlode(!lode);

  //   if (Platform.OS == 'android') {
  //     getCartCountDateSearch(currentDate, 'date');
  //     setIsTrue(true);
  //   }
  // };

  const isFilterApplied = () => {
    // if (showSelectedCategories()) {
    //   return true;
    // } else if (selectedPriceFilter !== '') {
    //   return true;
    // } else if (selectedRatingValues?.length > 0) {
    //   return true;
    // }
    // return false;
    return false;
  };

  const RenderItemLead = ({item}) => {
    return (
      <View
        style={[styles.teamView, {paddingHorizontal: 5}]}
        onPress={() => {
          navigation.navigate('CourseDetail', {id: item.id});
        }}>
        <View
          style={{
            marginVertical: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 5,
            alignItems: 'center',
            marginHorizontal: 5,
          }}>
          <MyText
            text={`Schedule`}
            fontWeight="bold"
            fontSize={14}
            textColor={Color.LIGHT_BLACK}
            fontFamily="Inter"
            style={{}}
          />
          <TouchableOpacity
            style={{
              width: 'auto',
              height: 34,
              backgroundColor: Color.PRIMARY,
              paddingHorizontal: 12,
              borderRadius: 5,
              justifyContent: 'center',
            }}
            onPress={async () => {
              await fetchMeetingData(item.id);
              setMeetingModal(true);
            }}>
            <MyText
              text={`View`}
              fontWeight="500"
              fontSize={14}
              textColor={Color.WHITE}
              fontFamily="Inter"
              style={{}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 1,
            width: dimensions.SCREEN_WIDTH * 0.9,
            backgroundColor: '#E7EAF1',
            alignSelf: 'center',
          }}></View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 5,
            marginVertical: 15,
          }}>
          <MyText
            text={`${
              item?.meeting_title === null
                ? 'None'
                : item.meeting_title.length > 38
                ? `${item?.meeting_title.substring(0, 38)}..`
                : `${item?.meeting_title.substring(0, 38)}`
            }`}
            fontWeight="bold"
            fontSize={14}
            textColor={Color.LIGHT_BLACK}
            fontFamily="Inter"
            style={{}}
          />
          <MyText
            text={item?.schedule_start_date}
            fontWeight="500"
            fontSize={14}
            textColor={Color.PRIMARY}
            fontFamily="Inter"
            style={{}}
          />
        </View>
        <MyText
          text={`${
            item?.note === null
              ? 'None'
              : item.note.length > 100
              ? `${item?.note.substring(0, 100)}..`
              : `${item?.note.substring(0, 100)}`
          }`}
          fontWeight="bold"
          fontSize={14}
          textColor={Color.PRIMARY}
          fontFamily="Inter"
          style={{
            marginHorizontal: 5,
          }}
        />
        <View style={{width: dimensions.SCREEN_WIDTH * 0.3}}>
          <View
            style={{
              width: 'auto',
              height: 'auto',
              backgroundColor: Color.PRIMARY,
              paddingHorizontal: 12,
              paddingVertical: 5,
              borderRadius: 5,
              marginVertical: 17,
              marginHorizontal: 5,
            }}>
            <MyText
              text={`Join Meeting`}
              fontWeight="500"
              fontSize={14}
              textColor={Color.WHITE}
              fontFamily="Inter"
              style={{
                textAlign: 'center',
              }}
            />
          </View>
        </View>
        {/* course_complete_percentage */}
      </View>
    );
  };
  const RenderItemGoal = ({item}) => {
    // console.log('thumbnail for goal--->>', item);
    return (
      <View
        style={[styles.teamView, {paddingHorizontal: 5}]}
        onPress={() => {
          navigation.navigate('CourseDetail', {id: item.id});
        }}>
        <View
          style={{
            marginVertical: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 5,
            alignItems: 'center',
            marginHorizontal: 5,
          }}>
          <MyText
            text={`Goals`}
            fontWeight="bold"
            fontSize={14}
            textColor={Color.LIGHT_BLACK}
            fontFamily="Inter"
            style={{}}
          />
          <TouchableOpacity
            style={{
              width: 'auto',
              height: 34,
              backgroundColor: Color.PRIMARY,
              paddingHorizontal: 12,
              borderRadius: 5,
              justifyContent: 'center',
            }}
            onPress={async () => {
              await fetchGoalData(item.id);
              setGoalModal(true);
            }}>
            <MyText
              text={`View`}
              fontWeight="500"
              fontSize={14}
              textColor={Color.WHITE}
              fontFamily="Inter"
              style={{}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 1,
            width: dimensions.SCREEN_WIDTH * 0.9,
            backgroundColor: '#E7EAF1',
            alignSelf: 'center',
          }}></View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 5,
            marginVertical: 15,
          }}>
          <MyText
            text={`${
              item?.goal_statement === null
                ? ''
                : item.goal_statement.length > 38
                ? `${item?.goal_statement.substring(0, 38)}..`
                : `${item?.goal_statement.substring(0, 38)}`
            }`}
            fontWeight="bold"
            fontSize={14}
            textColor={Color.LIGHT_BLACK}
            fontFamily="Inter"
            style={{}}
          />
          <MyText
            text={item?.achieve_date}
            fontWeight="500"
            fontSize={14}
            textColor={Color.PRIMARY}
            fontFamily="Inter"
            style={{}}
          />
        </View>
        <MyText
          text={`${
            item?.goal_for_me === null
              ? ''
              : item.goal_for_me.length > 100
              ? `${item?.goal_for_me.substring(0, 100)}..`
              : `${item?.goal_for_me.substring(0, 100)}`
          }`}
          fontWeight="bold"
          fontSize={14}
          textColor={Color.PRIMARY}
          fontFamily="Inter"
          style={{
            marginHorizontal: 5,
          }}
        />
        <View style={{width: dimensions.SCREEN_WIDTH * 0.3}}>
          <View
            style={{
              width: 'auto',
              height: 'auto',
              backgroundColor: Color.PRIMARY,
              paddingHorizontal: 12,
              paddingVertical: 5,
              borderRadius: 5,
              marginVertical: 17,
              marginHorizontal: 5,
            }}>
            <MyText
              text={item?.goal_type}
              fontWeight="500"
              fontSize={14}
              textColor={Color.WHITE}
              fontFamily="Inter"
              style={{
                textAlign: 'center',
              }}
            />
          </View>
        </View>
        {/* course_complete_percentage */}
      </View>
    );
  };
  const RenderItemGoals = ({item}) => {
    return (
      <TouchableOpacity
        style={[styles.teamView, {paddingHorizontal: 5}]}
        onPress={() => {
          navigation.navigate('CourseDetail', {id: item.id});
        }}>
        <View
          style={{
            marginVertical: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 5,
            alignItems: 'center',
            marginHorizontal: 5,
          }}>
          <MyText
            text={`Schedule`}
            fontWeight="bold"
            fontSize={14}
            textColor={Color.LIGHT_BLACK}
            fontFamily="Inter"
            style={{}}
          />
          <View
            style={{
              width: 'auto',
              height: 34,
              backgroundColor: Color.PRIMARY,
              paddingHorizontal: 12,
              borderRadius: 5,
              justifyContent: 'center',
            }}>
            <MyText
              text={`View`}
              fontWeight="500"
              fontSize={14}
              textColor={Color.WHITE}
              fontFamily="Inter"
              style={{}}
            />
          </View>
        </View>
        <View
          style={{
            height: 1,
            width: dimensions.SCREEN_WIDTH * 0.9,
            backgroundColor: '#E7EAF1',
            alignSelf: 'center',
          }}></View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 5,
            marginVertical: 15,
          }}>
          <MyText
            text={`${
              item?.title === null
                ? ''
                : item.title.length > 38
                ? `${item?.title.substring(0, 38)}..`
                : `${item?.title.substring(0, 38)}`
            }`}
            fontWeight="bold"
            fontSize={14}
            textColor={Color.LIGHT_BLACK}
            fontFamily="Inter"
            style={{}}
          />
          <MyText
            text={'07-07-2024'}
            fontWeight="500"
            fontSize={14}
            textColor={Color.PRIMARY}
            fontFamily="Inter"
            style={{}}
          />
        </View>
        <MyText
          text={`${
            item?.description === null
              ? ''
              : item.title.length > 100
              ? `${item?.description.substring(0, 100)}..`
              : `${item?.description.substring(0, 100)}`
          }`}
          fontWeight="bold"
          fontSize={14}
          textColor={Color.PRIMARY}
          fontFamily="Inter"
          style={{
            marginHorizontal: 5,
          }}
        />
        <View style={{width: dimensions.SCREEN_WIDTH * 0.3}}>
          <View
            style={{
              width: 'auto',
              height: 'auto',
              backgroundColor: Color.PRIMARY,
              paddingHorizontal: 12,
              paddingVertical: 5,
              borderRadius: 5,
              marginVertical: 17,
              marginHorizontal: 5,
            }}>
            <MyText
              text={`A-Type Goals`}
              fontWeight="500"
              fontSize={14}
              textColor={Color.WHITE}
              fontFamily="Inter"
              style={{
                textAlign: 'center',
              }}
            />
          </View>
        </View>
        {/* course_complete_percentage */}
      </TouchableOpacity>
    );
  };

  const handleOnLinkPress = id => {
    console.log('ONLCIKCK meeting link------');
    navigation.navigate('SchduleDetails', {id: id});
    // return (
    //   <View
    //     style={{
    //       flexDirection: 'row',
    //       paddingBottom: 10,
    //       width: dimensions.SCREEN_WIDTH,
    //       alignSelf: 'center',
    //       justifyContent: 'center',
    //     }}>
    //     <Hyperlinks
    //       text={url != undefined ? url : ''}
    //       style={{
    //         fontSize: 15,
    //         width: dimensions.SCREEN_WIDTH * 0.78,
    //         alignSelf: 'center',
    //         justifyContent: 'center',
    //       }}
    //       hyperlinkStyle={{color: '#3DA1E3'}}
    //       onPress={() => handleOnLinkPress1(profile?.zoom_link)}
    //       // onLinkPress={handleOnLinkPress}
    //       // onMentionPress={handleOnMentionPress}
    //       // onHashtagPress={handleOnHashtagPress}
    //     />
    //   </View>
    // );

    // Open the link using a web browser or a WebView
    // <View style={{flex: 1}}>
    //       {console.log('my webview url---?>>', JSON.stringify(url))}
    //       <WebView
    //         source={{uri:`${url}`}}
    //         // Other WebView props...
    //       />

    //     </View>
  };
  //UI
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={Color.LIGHT_BLACK} />
      <View
        style={{
          flex: 1,
          backgroundColor: '#F7FAEB',
        }}>
        <MyHeader Title={`Schedule Calendar`} isBackButton />
        {/* <SearchWithIcon
                    placeholder="Search by Title"
                    value={searchValue}
                    onChangeText={e => {
                        // console.log('SearchWithIcon', e);
                        setSearchValue(e);
                        applyFilters2(e);
                    }}
                    // onPress={openFilterModal}
                    // icon={<Image source={require('../../Global/Images/camera.png')} />}
                    style={{ marginTop: 10 }}
                    showDot={isFilterApplied}
                /> */}
        <View
          style={{
            alignSelf: 'center',
            width: dimensions.SCREEN_WIDTH,
            paddingTop: 0,
            marginTop: -20,
          }}>
          <SearchWithIcon
            placeholder="Search by Title"
            value={searchValue}
            onChangeText={e => {
              setdisplaydate('');
              // console.log('my e', e);
              if (e.text === '') {
                // console.log('my empyt text',)
              }
              setsearchValue(e);
              getCartCountSearch(e);
              if (e.text === '') {
                getCartCount('');
              } else {
                //  ArtSearch(e.text);
                getCartCountSearch(e, false);
              }
            }}
            onPress={() => {
              setsearchValue('');
              setOpen(true);
              // setopenDateModal(true);
            }}
            // icon={<Image source={require('../../Global/Images/documentfilter.png')} />}
            style={{marginTop: 10}}
            showDot={isFilterApplied}
          />
        </View>
        {isture == true ? (
          <>
            <View
              style={{
                width: '97%',
                marginTop: 0,
                alignSelf: 'center',
                marginLeft: 10,
              }}>
              {displaydate != '' ? (
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    borderRadius: 5,
                    height: 30,
                    paddingHorizontal: 7,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      marginTop: 10,
                      height: '90%',
                      paddingBottom: 10,
                    }}>
                    {displaydate != '' ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          backgroundColor: '#cde188',
                          padding: 10,
                          borderRadius: 10,
                          margin: 4,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{fontSize: 15, color: '#000000'}}>
                          {moment(displaydate).format(`MM-DD-YYYY`)}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            getCartCount('');
                            setsearchValue('');
                            setdisplaydate('');
                          }}
                          style={styles.showMeImageView}>
                          <Image
                            source={require('../../Global/Images/delete.png')}
                            style={styles.showMeImage}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                      </View>
                    ) : null}
                  </View>
                </View>
              ) : null}
            </View>
          </>
        ) : null}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: '20%'}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={styles.mainView}>
          {courses?.schedules?.length !== 0 ? (
            <MyText
              text={'Scheduled Meetings'}
              fontWeight="500"
              fontSize={20}
              textColor={Color.LIGHT_BLACK}
              fontFamily="Roboto"
              style={[{marginHorizontal: 17, marginTop: 28}]}
            />
          ) : null}
          <View style={{alignSelf: 'center', flex: 1}}>
            {courses?.schedules?.length === 0 &&
            courses?.goals?.length === 0 ? (
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 180,
                }}>
                <Nodata
                  style={{alignSelf: 'center'}}
                  height={119}
                  width={119}
                />
                <MyText
                  text={'No data found !'}
                  fontWeight="500"
                  fontSize={24}
                  textColor={Color.LIGHT_BLACK}
                  fontFamily="Roboto"
                  style={[styles.noDataText, {alignSelf: 'center'}]}
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
            ) : null}
            {courses?.schedules?.length === 0 ? (
              <View style={styles.noDataContainer}>
                {!noData ? (
                  <></>
                ) : (null
                  //   <View
                  //       style={{
                  //         width: '100%',
                  //         alignItems: 'center',
                  //         justifyContent: 'center',
                  //         marginTop: 180,
                  //       }}>
                  //       <Nodata
                  //         style={{alignSelf: 'center'}}
                  //         height={119}
                  //         width={119}
                  //       />
                  //       <MyText
                  //         text={'No data found !'}
                  //         fontWeight="500"
                  //         fontSize={24}
                  //         textColor={Color.LIGHT_BLACK}
                  //         fontFamily="Roboto"
                  //         style={[styles.noDataText, {alignSelf: 'center'}]}
                  //       />
                  //       <MyText
                  //         text={'Oops! this information is not available for a moment'}
                  //         fontWeight="400"
                  //         fontSize={16}
                  //         textColor={'#959FA6'}
                  //         fontFamily="Roboto"
                  //         style={styles.noDataSubText}
                  //       />
                  //     </View>
                  // <Text style={styles.noDataText}>No result found</Text>
                )}
              </View>
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{}}>
                <View style={{marginTop: 0}}>
                  {courses?.schedules?.map((item, index) => (
                    <RenderItemLead key={index.toString()} item={item} />
                  ))}
                </View>
              </ScrollView>
            )}
            <View style={{marginTop: 15}}>
              {courses?.goals?.length !== 0 ? (
                <MyText
                  text={'Goals'}
                  fontWeight="500"
                  fontSize={20}
                  textColor={Color.LIGHT_BLACK}
                  fontFamily="Roboto"
                  style={{marginHorizontal: 0}}
                />
              ) : null}
            </View>
            {courses?.goals?.length === 0 ? (
              <></>
            ) : (
              //   <View
              //     style={{
              //       width: '90%',
              //       alignItems: 'center',
              //       justifyContent: 'center',
              //       marginTop: 180,
              //     }}>
              //     <Nodata
              //       style={{alignSelf: 'center'}}
              //       height={119}
              //       width={119}
              //     />
              //     <MyText
              //       text={'No data found !'}
              //       fontWeight="500"
              //       fontSize={24}
              //       textColor={Color.LIGHT_BLACK}
              //       fontFamily="Roboto"
              //       style={[styles.noDataText, {alignSelf: 'center'}]}
              //     />
              //     <MyText
              //       text={'Oops! this information is not available for a moment'}
              //       fontWeight="400"
              //       fontSize={16}
              //       textColor={'#959FA6'}
              //       fontFamily="Roboto"
              //       style={styles.noDataSubText}
              //     />
              //   </View>
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                {courses?.goals?.map((item, index) => (
                  <RenderItemGoal key={index.toString()} item={item} />
                ))}
              </ScrollView>
            )}
          </View>
        </ScrollView>
        <DatePicker
          modal
          minimumDate={new Date()}
          open={open}
          date={date}
          mode="date"
          onConfirm={date => {
            console.log(date);
            setDate(date);
            setOpen(false);
            setdisplaydate(date);
            getCartCountDateSearch(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        {/* {loading ? <Loader /> : null} */}
        {loading && <SkeletonContainer />}
        <View
          style={{
            flex: 1,
            position: 'absolute',
            top: 200,
            alignSelf: 'center',
          }}>
          {/* {console.log('result found---->>', noData)} */}
          {noData
            ? null
            : // <View
              //   style={{
              //     alignSelf: 'center',
              //     justifyContent: 'center',
              //     width: dimensions.SCREEN_WIDTH * 0.9,
              //     flex: 1,
              //     alignItems: 'center',
              //     height: dimensions.SCREEN_HEIGHT * 0.6,
              //     marginTop:80
              //   }}>
              //   <Nodata
              //     style={{alignSelf: 'center'}}
              //     height={119}
              //     width={119}></Nodata>
              //   <MyText
              //     text={'No data found !'}
              //     fontWeight="500"
              //     fontSize={24}
              //     textColor={Color.LIGHT_BLACK}
              //     fontFamily="Roboto"
              //     style={{alignSelf: 'center', top: 4}}
              //   />
              //   <MyText
              //     text={'Oops! this information is not available for a moment'}
              //     fontWeight="400"
              //     fontSize={16}
              //     textColor={'#959FA6'}
              //     fontFamily="Roboto"
              //     style={{
              //       alignSelf: 'center',
              //       textAlign: 'center',
              //       width: dimensions.SCREEN_WIDTH * 0.6,
              //       top: 4,
              //     }}
              //   />
              // </View>
              null}
        </View>
        {/* <CustomLoader showLoader={showLoader} /> */}

        {/* my statement modal */}
        {/* {console.log('my data foe the meeting modal--->>>', meetingModalData)} */}
        <Modal
          isVisible={meetingModal}
          swipeDirection="down"
          onBackdropPress={() => setMeetingModal(false)}
          onSwipeComplete={e => {
            setMeetingModal(false);
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
              height: 'auto',
              backgroundColor: 'white',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              padding: 20,
            }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}>
              <View style={{height: 'auto', paddingVerticalVertical: 60}}>
                <View style={styles.mainUpperView}>
                  <View style={styles.circleView}>
                    <MyText
                      text={'LP'}
                      fontWeight="500"
                      fontSize={14}
                      textColor={Color.PRIMARY}
                      fontFamily="Roboto"
                      style={[{alignSelf: 'center'}]}
                    />
                  </View>
                  <View style={styles.mainMidView}>
                    <MyText
                      text={'Dr. Elsie Koh, MD MH'}
                      fontWeight="bold"
                      fontSize={16}
                      textColor={Color.LIGHT_BLACK}
                      fontFamily="Roboto"
                      style={[{marginHorizontal: 12}]}
                    />
                    <View style={{flexDirection: 'row'}}>
                      {/* <Image source={require('../../Global/Images/PlataniumMembership.png')} style={styles.membershipImg}></Image>
                                            <MyText
                                                text={'Silver Membership Member'}
                                                fontWeight='500'
                                                fontSize={11}
                                                textColor={'#959FA6'}
                                                fontFamily='Roboto'
                                                style={[{ alignSelf: 'center', marginHorizontal: 5 }]}
                                            /> */}
                    </View>
                  </View>
                </View>
                <View style={styles.divideLine}></View>
                {/* {console.log('my meeting details---->>', meetingModalData)} */}
                <View style={{marginHorizontal: 12}}>
                  <MyText
                    text={meetingModalData?.meeting_title != null ?meetingModalData?.meeting_title : 'None'}
                    fontWeight="500"
                    fontSize={14}
                    textColor={Color.LIGHT_BLACK}
                    fontFamily="Roboto"
                    style={[{alignSelf: 'left'}]}
                  />
                </View>
                <View style={[styles.bottomViewNew, {alignItems: 'center'}]}>
                  <View style={styles.rowView}>
                    <View style={{flexDirection: 'row'}}>
                      <WeekleCalendar></WeekleCalendar>
                      <MyText
                        text={meetingModalData?.meeting_type}
                        fontWeight="400"
                        fontSize={13}
                        textColor={Color.LIGHT_BLACK}
                        fontFamily="Roboto"
                        style={{marginHorizontal: 5, top: 3}}
                      />
                    </View>
                    <View style={styles.rowChildView}>
                      <Clock></Clock>
                      <MyText
                        text={` Start Time: ${moment(
                          meetingModalData.schedule_start_time,
                          'HH:mm:ss',
                        ).format('hh:mm A')}`}
                        fontFamily="Roboto"
                        fontWeight="400"
                        fontSize={13}
                        textColor={'#132A3A'}
                        style={{marginLeft: 4, top: 3}}
                      />
                    </View>
                    <View style={styles.rowChildView}>
                      <Clock></Clock>
                      <MyText
                        text={`End Time: ${moment(
                          meetingModalData.schedule_end_time,
                          'HH:mm:ss',
                        ).format('hh:mm A')}`}
                        fontFamily="Roboto"
                        fontWeight="400"
                        fontSize={13}
                        textColor={'#132A3A'}
                        style={{marginLeft: 11, top: 3}}
                      />
                    </View>
                  </View>

                  <Monitor></Monitor>
                </View>
                {meetingModalData?.note != null ? (
                  <View style={[styles.rowChildView, {marginHorizontal: 12}]}>
                    <SavedBook></SavedBook>
                    <MyText
                      text={` Notes:${meetingModalData?.note}`}
                      fontFamily="Roboto"
                      fontWeight="400"
                      fontSize={13}
                      textColor={'#132A3A'}
                      style={{marginLeft: 4, top: 1}}
                    />
                  </View>
                ) : null}
                <View style={styles.divideLine}></View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: 12,
                    justifyContent: 'space-between',
                  }}>
                  {console.log(meetingModalData)}
                  <TouchableOpacity
                    onPress={() => {
                      handleOnLinkPress(meetingModalData?.id);
                    }}
                    style={{flexDirection: 'row'}}>
                    <Zoom></Zoom>
                    <MyText
                      text={'Join Meeting'}
                      fontWeight="400"
                      fontSize={13}
                      textColor={'#3DA1E3'}
                      fontFamily="Roboto"
                      style={{marginHorizontal: 5, marginVertical: 10}}
                    />
                  </TouchableOpacity>

                  <View style={{flexDirection: 'row', marginTop: 6}}>
                    <Calendar></Calendar>
                    <MyText
                      text={`${meetingModalData?.schedule_start_date}  ${moment(
                        meetingModalData.schedule_start_time,
                        'HH:mm:ss',
                      ).format('hh:mm A')}`}
                      fontWeight="400"
                      fontSize={13}
                      textColor={Color.LIGHT_BLACK}
                      fontFamily="Roboto"
                      style={{top: 3, marginHorizontal: 3}}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </Modal>

        {/* my goal modal */}
        <Modal
          isVisible={goalModal}
          swipeDirection="down"
          onBackdropPress={() => setGoalModal(false)}
          onSwipeComplete={e => {
            setGoalModal(false);
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
              height: '80%',
              backgroundColor: 'white',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              padding: 20,
            }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}>
              <View style={{height: 'auto', paddingVerticalVertical: 60}}>
                {user?.profile_image !== '' ? (
                  <Image
                    source={{uri: user?.profile_image}}
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: 50,
                      alignSelf: 'center',
                    }}></Image>
                ) : (
                  <ProfileImg style={{alignSelf: 'center'}}></ProfileImg>
                )}
                <MyText
                  text={`${user?.first_name} ${user?.last_name}`}
                  fontWeight="bold"
                  fontSize={16}
                  textColor={Color.PRIMARY}
                  fontFamily="Roboto"
                  style={[
                    styles.noDataText,
                    {alignSelf: 'center', marginTop: 4},
                  ]}
                />
                <View style={[styles.containerView, {shadowColor: '#000000',
                      shadowOffset: {
                        width: 3,
                        height: 3,
                      },
                      shadowRadius: 10,
                      shadowOpacity: 1,
                      margin: 4,
                      elevation: 5,
                      marginTop:10
                      }]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      
                    }}>
                    <Calendar
                      style={{marginRight: 4}}
                      height={34}
                      width={34}></Calendar>
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}>
                      <MyText
                        text={'Date'}
                        fontWeight="500"
                        fontSize={14}
                        textColor={Color.LIGHT_BLACK}
                        fontFamily="Roboto"
                        style={[styles.noDataText, {}]}
                      />
                      <MyText
                        text={`${moment(goalModalData.achieve_date).format(
                          'MM-DD-YYYY',
                        )}`}
                        fontWeight="400"
                        fontSize={13}
                        textColor={'#959FA6'}
                        fontFamily="Roboto"
                        style={[styles.noDataText, {}]}
                      />
                    </View>
                  </View>
                </View>

                <View style={[styles.containerView,{shadowColor: '#000000',
                      shadowOffset: {
                        width: 3,
                        height: 3,
                      },
                      shadowRadius: 10,
                      shadowOpacity: 1,
                      margin: 4,
                      elevation: 5,
                      marginBottom:20
                      }]}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Target
                      style={{marginRight: 4}}
                      height={34}
                      width={34}></Target>
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}>
                      <MyText
                        text={'Type'}
                        fontWeight="500"
                        fontSize={14}
                        textColor={Color.LIGHT_BLACK}
                        fontFamily="Roboto"
                        style={[styles.noDataText, {}]}
                      />

                      <MyText
                        text={goalModalData?.goal_type}
                        fontWeight="400"
                        fontSize={13}
                        textColor={'#959FA6'}
                        fontFamily="Roboto"
                        style={[styles.noDataText, {marginHorizontal: 4}]}
                      />
                    </View>
                  </View>
                </View>

                <View style={[styles.containerBottomView, {shadowColor: '#000000',
                      shadowOffset: {
                        width: 3,
                        height: 3,
                      },
                      shadowRadius: 10,
                      shadowOpacity: 1,
                      margin: 5,
                      elevation: 5,}]}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        paddingHorizontal: 14,
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}>
                      <MyText
                        text={'My Statement'}
                        fontWeight="700"
                        fontSize={14}
                        textColor={Color.LIGHT_BLACK}
                        fontFamily="Roboto"
                        style={[styles.noDataText, {}]}
                      />
                      <MyText
                        text={goalModalData?.goal_statement}
                        fontWeight="400"
                        fontSize={13}
                        textColor={'#959FA6'}
                        fontFamily="Roboto"
                        lineHeight={24}
                        style={[styles.noDataText, {lineHeight: 24}]}
                      />
                    </View>
                  </View>
                </View>
                <View style={[styles.containerBottomView, {shadowColor: '#000000',
                      shadowOffset: {
                        width: 3,
                        height: 3,
                      },
                      shadowRadius: 10,
                      shadowOpacity: 1,
                      margin: 5,
                      elevation: 5,}]}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{paddingHorizontal: 14}}>
                      <MyText
                        text={'What will it take for me to get this done?'}
                        fontWeight="bold"
                        fontSize={14}
                        textColor={Color.LIGHT_BLACK}
                        fontFamily="Roboto"
                        style={[styles.noDataText, {}]}
                      />
                      <MyText
                        text={goalModalData?.goal_for_me}
                        fontWeight="400"
                        fontSize={14}
                        textColor={'#959FA6'}
                        fontFamily="Roboto"
                        style={[styles.noDataText, {lineHeight: 24}]}
                      />
                    </View>
                  </View>
                </View>
                {goalModalData?.goal_type !== 'A-Type Goal' ? (
                  <View style={[styles.containerBottomView, {shadowColor: '#000000',
                    shadowOffset: {
                      width: 3,
                      height: 3,
                    },
                    shadowRadius: 10,
                    shadowOpacity: 1,
                    margin: 5,
                    elevation: 5,}]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={{paddingHorizontal: 14}}>
                        <MyText
                          text={
                            goalModalData?.goal_type === 'B-Type Goal'
                              ? 'In One Week, I will Accomplish'
                              : 'In Six month, I will Accomplish'
                          }
                          fontWeight="bold"
                          fontSize={14}
                          textColor={Color.LIGHT_BLACK}
                          fontFamily="Roboto"
                          style={[styles.noDataText, {}]}
                        />
                        <MyText
                          text={
                            goalModalData?.goal_type === 'B-Type Goal'
                              ? goalModalData?.one_week_milestones
                              : goalModalData?.six_month_milestones
                          }
                          fontWeight="400"
                          fontSize={14}
                          textColor={'#959FA6'}
                          fontFamily="Roboto"
                          style={[styles.noDataText, {lineHeight: 24}]}
                        />
                      </View>
                    </View>
                  </View>
                ) : null}
                {goalModalData?.goal_type !== 'A-Type Goal' ? (
                  <View style={[styles.containerBottomView, {shadowColor: '#000000',
                    shadowOffset: {
                      width: 3,
                      height: 3,
                    },
                    shadowRadius: 10,
                    shadowOpacity: 1,
                    margin: 5,
                    elevation: 5,}]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={{paddingHorizontal: 14}}>
                        <MyText
                          text={
                            goalModalData?.goal_type === 'B-Type Goal'
                              ? 'In One Month, I will Accomplish'
                              : 'In One Year, I will Accomplish'
                          }
                          fontWeight="bold"
                          fontSize={14}
                          textColor={Color.LIGHT_BLACK}
                          fontFamily="Roboto"
                          style={[styles.noDataText, {}]}
                        />
                        <MyText
                          text={
                            goalModalData?.goal_type === 'B-Type Goal'
                              ? goalModalData?.one_month_milestones
                              : goalModalData?.one_year_goal
                          }
                          fontWeight="400"
                          fontSize={14}
                          textColor={'#959FA6'}
                          fontFamily="Roboto"
                          style={[styles.noDataText, {lineHeight: 24}]}
                        />
                      </View>
                    </View>
                  </View>
                ) : null}
                <View style={[styles.containerBottomView, {shadowColor: '#000000',
                      shadowOffset: {
                        width: 3,
                        height: 3,
                      },
                      shadowRadius: 10,
                      shadowOpacity: 1,
                      margin: 5,
                      elevation: 5,}]}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{paddingHorizontal: 14}}>
                      <MyText
                        text={'My Accountability Partner Is:'}
                        fontWeight="bold"
                        fontSize={14}
                        textColor={Color.LIGHT_BLACK}
                        fontFamily="Roboto"
                        style={[styles.noDataText, {}]}
                      />
                      <MyText
                        text={goalModalData?.accountability_partner}
                        fontWeight="400"
                        fontSize={14}
                        textColor={'#959FA6'}
                        fontFamily="Roboto"
                        style={[styles.noDataText, {lineHeight: 24}]}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </Modal>

        {/* Filter modal */}
        {/* {opendateModal ? (
          <View
            style={{
              backgroundColor: '#fff',
              position: 'absolute',
              alignSelf: 'center',
              bottom: 0,
              width: '98%',
            }}>
            <View
              style={{
                width: '85%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignSelf: 'center',
                marginTop: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setopenDateModal(false);
                }}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  getCartCountDateSearch(date, 'date');
                  setopenDateModal(false);
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
        ) : null} */}
      </View>
    </SafeAreaView>
  );
};
export default CalendarListing;
