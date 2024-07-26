//import : react components
import React, {useRef, useState} from 'react';
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
} from 'react-native';
import {dimensions} from '../../Global/Color';
import * as Progress from 'react-native-progress';
import {useIsFocused} from '@react-navigation/native';
//import : custom components
import MyHeader from '../../Components/MyHeader/MyHeader';
import MyText from '../../Components/MyText/MyText';
import Star from '../../Global/Images/star.svg';
import Nodata from '../../Global/Images/lock-circle.svg';
import {styles} from './MyCourseStyle';
// import CustomLoader from 'components/CustomLoader/CustomLoader';
//import : third parties
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
// import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';
//import : global
import Color from '../../Global/Color';
 

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
} from '../../Global/Service';
import {CommonActions} from '@react-navigation/core';
import SkeletonContainer from '../../Components/Skelton/SkeltonContainer';
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

// import {WebView} from 'react-native-webview';

const MyCourse = ({navigation}) => {
  const dispatch = useDispatch();
  //variables
  const LINE_HEIGTH = 25;
  //variables : redux
  const userToken = useSelector(state => state.user.userToken);
  console.log('my--->>>', userToken);
  const [showLoader, setShowLoader] = useState(false);
  const [searchValue, setsearchValue] = useState('');
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
    const unsubscribe = navigation.addListener('focus', () => {
      getCartCount('');
      setdisplaydate('');
      setsearchValue('');
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
    var url = GET_MYCOURSES;
    var murl = `?title=` + item;
    if (item != '' || item != undefined) {
      url = url + murl;
    }
    try {
      setLoading(true);
      const resp = await getApiWithToken(userToken, url);
      console.log('get coursesss---->', resp?.data?.data);
      if (resp?.data?.status) {
        // setProfile(resp?.data?.data)
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

  const getCartCountDateSearch = async (dat) => {
    setIsTrue(true);
    setMyCourses([]);
    const SelectedDate = moment(dat).format(`YYYY-MM-DD`);
    // console.log("getCartCountDateSearch--parms",dat);
    var url = GET_MYCOURSES;
    var dates = `?date=` + SelectedDate;
    url = url + dates;
    if (dates != '' || dates != undefined) {
      url = url;
    }
    console.log('my url after getCartCountDateSearch>>>', url);
    try {
      setLoading(true);
      const resp = await getApiWithToken(userToken, url);
      console.log('get getCartCountDateSearch--->>>', resp?.data?.data.length);
      if (resp?.data?.status) {
        setMyCourses(resp?.data?.data);
        // const schedulesLength = resp?.data?.data?.length || 0;
        // const coursesLength = resp?.data?.data?.length || 0;

        // if (schedulesLength === 0 && coursesLength === 0) {
        //     // console.log('schedulesLength111', schedulesLength === 0 && coursesLength === 0, schedulesLength, coursesLength);
        //     setNoData(true);
        // } else {
        //     setNoData(false);
        // }

        setLoading(false);
        
      } else {
        Toast.show({text1: resp.data.message});
      }
    } catch (error) {
      setLoading(false);
      console.log('error in getCartCount', error);
    }
    setLoading(false);
  };

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
    // console.log('thumbnail--->>', item.thumbnail);
    return (
      <TouchableOpacity
        style={styles.teamView}
        onPress={() => {
          navigation.navigate('CourseDetail', {id: item.id});
        }}>
        {/* <Bat style={{ alignSelf: 'center' }}></Bat> */}
        <Image
          source={{uri: item?.thumbnail}}
          style={{
            height: 207,
            width: dimensions.SCREEN_WIDTH,
            resizeMode: 'cover',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: 10,
            width: dimensions.SCREEN_WIDTH * 0.9,
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
          <View style={{flexDirection: 'row', top: 2}}>
            <Star height={20} width={20}></Star>
            <MyText
              text={item?.avg_review}
              fontWeight="500"
              fontSize={14}
              textColor={Color.LIGHT_BLACK}
              fontFamily="Inter"
              style={{}}
            />
          </View>
        </View>
        <MyText
          text={`${
            item?.description === null
              ? ''
              : item.title.length > 45
              ? `${item?.description.substring(0, 45)}..`
              : `${item?.description.substring(0, 45)}`
          }`}
          fontWeight="bold"
          fontSize={14}
          textColor={Color.PRIMARY}
          fontFamily="Inter"
          style={{
            marginHorizontal: 5,
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
            text={`${item?.module_count} Modules`}
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
        <View style={{alignSelf: 'center', marginVertical: 12}}>
          <Progress.Bar
            progress={parseFloat(item?.course_complete_percentage || '0') / 100}
            width={dimensions.SCREEN_WIDTH * 0.84}
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
        {/* course_complete_percentage */}
      </TouchableOpacity>
    );
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
        <MyHeader Title={`All Courses`} isBackButton />
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
              // setdisplaydate('');
              console.log('my e', e);
              if (e.text === '') {
                console.log('my empyt text');
              }
              setsearchValue(e);
              getCartCount(e);
              if (e.text === '') {
                getCartCount('');
              } else {
                //  ArtSearch(e.text);
                getCartCount(e, false);
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
                marginLeft:10
              }}>
              {displaydate != '' ? (
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    borderRadius: 5,
                    height: 30,
                    paddingHorizontal: 7,
                    // borderColor: '#DBDBDB',
                    // borderWidth: 0.6,
                  }}
                  >
                  {/* <ScrollView
                    showsVerticalScrollIndicator={true}
                    nestedScrollEnabled={true}> */}
                    <View
                      style={{
                        width: '100%',
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        marginTop: 10,
                        height: '95%',
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
                  {/* </ScrollView> */}
                  {/* <View style={{height: 7}} /> */}
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
          <View style={{marginTop: 20, alignSelf: 'center'}}>
            {console.log("courses--length",courses.length)}
            <FlatList
              horizontal={false}
              data={courses}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              // numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              renderItem={RenderItemLead}
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
        <DatePicker
        modal
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
        {/* <CustomLoader showLoader={showLoader} /> */}
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
                  setIsTrue(true);
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
export default MyCourse;
