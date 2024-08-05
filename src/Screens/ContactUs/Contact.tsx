import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  RefreshControl,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React from 'react';

// import {globalStyles} from '../../utils/constant';
import CustomCalendar from './CustomCalendar';
import {useNavigation} from '@react-navigation/native';
// import ScreenNames from '../../utils/ScreenNames';
import SkeletonContainer from './SkeletonContainer';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
// import {GetApiWithToken, endPoint} from '../../services/Service';
import {useAppSelector} from '../../redux/Store';
import Toast from 'react-native-toast-message';
import ContactMainTab from './ContactMainTab';
import moment from 'moment';
// import Header from '../../components/Header/Header';
import BorderLessBtn from './BorderLessBtn';
import Nodata from '../../Global/Images/lock-circle.svg';
import Color from '../../Global/Color';
import Calendar from '../../Global/Images/calendarWhite.svg';
import MyHeader from '../../Components/MyHeader/MyHeader';
import {getApiWithToken, QUERY_LIST} from '../../Global/Service';
import {useSelector} from 'react-redux';
import BorderBtn from './BorderBtn';
let pagination = {
  currentPage: 1,
  lastPage: 1,
  loader: false,
};

const Contact = () => {
  const navigation = useNavigation();
  // const reload = useAppSelector(state => state.reload.Contact);
  // const token = useAppSelector(state => state.auth.token);
  const userToken = useSelector(state => state.user.userToken);
  const [modal, setModal] = React.useState<boolean>(false);
  const [date, setDate] = React.useState<string>(moment().format('YYYY-MM-DD'));
  const [showSkeleton, setShowSkeleton] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any[]>([]);
  // const [data, setData] = React.useState<any[]>([
  //   {
  //     id: '1',
  //     status_name: 'Pending',
  //     // "admin_reply":true,
  //     name: 'Amit kumar',
  //     profile:
  //       'https://www.niletechinnovations.com/projects/leadphysician/public/upload/profile-image/rn_image_picker_lib_temp_b01e6674-0085-452d-a002-f35fba557be9.jpg',
  //     message: 'I want you help',
  //     query_date: '2024-07-23T06:10:30.000000Z',
  //     type_name: 'Plan Related',
  //     admin_profile:
  //       'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fadmin-profile&psig=AOvVaw1gPWmgMf3dOn9UHGWtUtyJ&ust=1722586762133000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPDL-POt04cDFQAAAAAdAAAAABAE',
  //     admin_name: 'admin_name',
  //     admin_reply: 'i help you sir',
  //     admin_reply_date: '2024-08-01T06:10:30.000000Z',
  //   },
  //   {
  //     id: '2',
  //     status_name: 'Pending',
  //     name: 'Amit kumar',
  //     profile:
  //       'https://www.niletechinnovations.com/projects/leadphysician/public/upload/profile-image/rn_image_picker_lib_temp_b01e6674-0085-452d-a002-f35fba557be9.jpg',
  //     message: 'I want you help',
  //     query_date: '2024-07-23T06:10:30.000000Z',
  //     type_name: 'Plan Related',
  //     admin_profile:
  //       'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fadmin-profile&psig=AOvVaw1gPWmgMf3dOn9UHGWtUtyJ&ust=1722586762133000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPDL-POt04cDFQAAAAAdAAAAABAE',
  //     admin_name: 'admin_name',
  //     admin_reply: 'i help you sir',
  //     admin_reply_date: '2024-08-01T06:10:30.000000Z',
  //   },
  // ]);
  const [paginatonLoader, setPaginationLoader] = React.useState<boolean>(false);
  const [shouldRefresh, setshouldRefresh] = React.useState<boolean>(false);

  const dateHandler = (date: any) => {
    setDate(`${date}`);
    setModal(value => !value);
    getQueryList(`?date=${date}`);
  };

  React.useEffect(() => {
    pagination = {
      currentPage: 1,
      lastPage: 1,
      loader: false,
    };
    setDate(moment().format('YYYY-MM-DD'));
    // getQueryList('');
    getQueryList(`?date=${moment(new Date()).format('YYYY-MM-DD')}`);
  }, []);

  const getQueryList = async (param: string | {}) => {
    setShowSkeleton(true);
    try {
      const response = await getApiWithToken(
        userToken,
        `${QUERY_LIST}${param}`,
      );
      console.log('QUERY_LIST GET-----', response?.data);

      if (response?.data?.status) {
        setData(response?.data?.queries);
        // pagination.currentPage = 1 + 1;
        // pagination.lastPage = 1;
        // pagination.loader = false;
      } else if (response?.data?.status == false) {
        Toast.show({
          type: 'error',
          text1: response?.data?.message,
        });
      }
    } catch (err: any) {
      console.log('error in query list', err?.message);
    } finally {
      setShowSkeleton(false);
      setPaginationLoader(false);
      setshouldRefresh(false);
    }
  };

  const addQueryHandler = () => {
    navigation.navigate('ContactForQuery');
  };

  const calendarhandler = () => {
    setModal(true);
  };

  const clearFilter = async () => {
    setshouldRefresh(true);
    // pagination.currentPage = 1;
    // pagination.lastPage = 1;
    // pagination.loader = false;
    setDate('');
    getQueryList('');
  };

  const upperSection = (
    <View style={styles.add}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: responsiveWidth(2),
          // ...globalStyles.shadowStyle,
          borderWidth: responsiveWidth(0.23),
          borderColor: Color.GREY,
        }}>
        <TouchableOpacity style={styles.touch} onPress={calendarhandler}>
          <View
            style={{
              backgroundColor: Color.PRIMARY,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              width: 50,
              left: -12,
              borderRadius: 8,
            }}>
            <Calendar />
          </View>

          {/* <Text style={styles.addText}>{date?.split('-').reverse().join('-')}</Text> */}
          <Text style={styles.addText}>
            {date ? moment(date)?.format('MM-DD-YYYY') : 'MM-DD-YYYY'}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            width: '25%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <BorderLessBtn
            buttonText="Clear filter"
            onClick={clearFilter}
            containerStyle={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </View>
      </View>

      <BorderBtn
        buttonText="+"
        onClick={addQueryHandler}
        containerStyle={styles.buttonStyle}
        buttonTextStyle={styles.buttonText}
      />
    </View>
  );

  const noDataFound = (
    <View style={{alignItems: 'center',justifyContent:'center'}}>
      <Nodata style={{alignSelf: 'center'}} height={119} width={119}></Nodata>
      <Text style={styles.noDataText}>No Data Found</Text>
    </View>
  );

  const renderData = ({item}: {item: any}) => <ContactMainTab data={item} />;

  const handlePagination = () => {
    if (
      date &&
      pagination.currentPage <= pagination.lastPage &&
      !pagination.loader &&
      data?.length % 10 === 0
    ) {
      pagination.loader = true;
      setPaginationLoader(true);
      getQueryList(`?date=${date}&page=${pagination.currentPage}`);
    }
    if (
      pagination.currentPage <= pagination.lastPage &&
      !pagination.loader &&
      data?.length % 10 === 0
    ) {
      pagination.loader = true;
      setPaginationLoader(true);
      getQueryList(`?page=${pagination.currentPage}`);
    }
  };

  const onRefresh = async () => {
    setshouldRefresh(true);
    // pagination.currentPage = 1;
    // pagination.lastPage = 1;
    // pagination.loader = false;
    setDate(`${moment(new Date()).format('YYYY-MM-DD')}`);
    getQueryList('');
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <MyHeader Title={`Contact us`} isBackButton />
      </View>
      {showSkeleton ? (
        <SkeletonContainer />
      ) : (
        <FlatList
          ListHeaderComponent={
            <>
              {upperSection}
              {data?.length === 0 ? noDataFound : null}
            </>
          }
          style={{paddingBottom:30}}
          data={data}
          renderItem={renderData}
          keyExtractor={(_, index) => index?.toString()}
          // onEndReachedThreshold={0.5}
          // onEndReached={handlePagination}
          // ListFooterComponent={
          //   paginatonLoader ? (
          //     <ActivityIndicator
          //       size="large"
          //       color={Color.LIGHT_GREEN}
          //       style={{marginTop:2}}
          //     />
          //   ) : null
          // }
          refreshControl={
            <RefreshControl refreshing={shouldRefresh} onRefresh={onRefresh} />
          }
        />
      )}
    
    
      {modal && (
        <View style={styles.calendarContainer}>
          <CustomCalendar
            containerStyle={styles.calendar}
            dateHandler={dateHandler}
          />
        </View>
      )}
    </>
  );
};

export default Contact;

const styles = StyleSheet.create({
  headerContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    marginBottom: responsiveHeight(0.5),
    paddingBottom: responsiveHeight(2),
    // backgroundColor: Color.PRIMARY,
  },
  add: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: responsiveWidth(95),
    alignSelf: 'center',
  },
  icon: {
    height: responsiveHeight(2),
    width: responsiveHeight(2),
  },
  touch: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: responsiveWidth(1.5),
    paddingHorizontal: responsiveWidth(3),
    width: '57%',
  },
  addText: {
    marginLeft: responsiveWidth(2),
    color: Color.GREY,
  },
  buttonStyle: {
    width: '15%',
  },
  buttonText: {
    fontSize: responsiveFontSize(3),
  },
  scrollView: {
    flex: 1,
    marginTop: responsiveHeight(1.2),
  },
  calendarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  calendar: {
    width: responsiveWidth(85),
    borderRadius: responsiveWidth(2),
    paddingVertical: responsiveHeight(1),
  },
  noDataText: {
    marginTop: responsiveHeight(1),
    textAlign: 'center',
    fontSize: responsiveFontSize(3),
    color: 'black',
  },
});
