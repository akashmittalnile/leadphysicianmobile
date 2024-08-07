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
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import moment from 'moment';
import {dimensions} from '../../Global/Color';
import SearchWithIcon from '../../Components/SearchWithIcon/SearchWithIcon';
import {connect, useSelector} from 'react-redux';
//import : custom components
import MyHeader from '../../Components/MyHeader/MyHeader';
import MyText from '../../Components/MyText/MyText';
import Bat from '../../Global/Images/bat.svg';
import Ongoing from '../../Global/Images/clock.svg';
import Pending from '../../Global/Images/timer.svg';
import Completed from '../../Global/Images/completedCourse.svg';
import {styles} from './GoalsListStyle';

import {
  getApiWithToken,
  GET_GOAL,
  postApiWithToken,
  DELETE_GOAL,
  requestPostApi,
} from '../../Global/Service';
import Loader from '../../Components/Loader';
// import CustomLoader from 'components/CustomLoader/CustomLoader';
//import : third parties
import Nodata from '../../Global/Images/lock-circle.svg';
import Toast from 'react-native-toast-message';
//import : global
import Color from '../../Global/Color';
//import : styles

//import : modal
//import : redux
//import svg
import Mycourse from '../../Global/Images/courses.svg';
import MyGoals from '../../Global/Images/MyGoals.svg';
import Resume from '../../Global/Images/playCircle.svg';
import Delte from '../../Global/Images/trash.svg';
import Editbtn from '../../Global/Images/edit_button.svg';

const physicianCourse = [
  {
    id: '1',
    title: 'Leg joints',
    status: 'Completed',
  },
  {
    id: '2',
    title: 'Muscle repture',
    status: 'Ongoing',
  },
  {
    id: '3',
    title: 'Knee aligment',
    status: 'Pending',
  },
  {
    id: '4',
    title: 'Disloacted bones',
    status: 'Pending',
  },
];

// import {WebView} from 'react-native-webview';

const GoalsList = ({navigation}) => {
  //variables
  const LINE_HEIGTH = 25;
  const isFocus = useIsFocused();
  //variables : redux
  const userToken = useSelector(state => state.user.userToken);

  const [loading, setLoading] = useState('');
  const [goal, SetGoal] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
     getCartCount();
      
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [isFocus]);
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

  const CheckGoaltypefun = data => {
    if (data == 'A-Type Goal') {
      return 0;
    } else if (data == 'B-Type Goal') {
      return 1;
    } else if (data == 'C-Type Goal') {
      return 2;
    } else {
      return 0;
    }
  };
  //ui for flaList
  const RenderItemLead = ({item}) => {
    return (
      <View style={[styles.viewContainer, {backgroundColor: 'white'}]}>
        <View style={{flexDirection: 'row',width:'90%', }}>
          <View style={styles.roundView}>
            <MyGoals
              width={27}
              height={27}
              style={{alignSelf: 'center'}}></MyGoals>
          </View>
          <MyText
            text={item.goal_statement}
            fontWeight="bold"
            fontSize={14}
            textColor={Color.LIGHT_BLACK}
            fontFamily="Roboto"
            marginHorizontal={12}
            style={{
              alignSelf: 'center',
            }}
          />
        </View>
        <View style={styles.subHeadView}>
          <MyText
            text={`Goal Type: ${item.goal_type}`}
            fontWeight="bold"
            fontSize={14}
            textColor={Color.LIGHT_BLACK}
            fontFamily="Roboto"
            style={{}}
          />
          <MyText
            text={
              // moment(item?.achieve_date).format('MM-DD-YYYY')
              item?.formatted_date?.slice(0, 11)
            }
            fontWeight="400"
            fontSize={14}
            textColor={Color.LIGHT_BLACK}
            fontFamily="Roboto"
            marginHorizontal={12}
            style={{
              alignSelf: 'center',
            }}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={[styles.actionButtonView]}
            onPress={() => {
              ondelte(item?.id);
            }}>
            <Delte></Delte>
            {/* Remove */}
            <MyText
              text={'Delete'}
              fontWeight="500"
              fontSize={14}
              textColor={Color.WHITE}
              fontFamily="Roboto"
              marginHorizontal={12}
              style={{
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButtonView,
              {backgroundColor: Color.PRIMARY, marginLeft: -5},
            ]}
            onPress={() => {
              navigation.navigate('EditGoal', {
                id: item.id,
                goaltype: CheckGoaltypefun(item.goal_type),
              });
            }}>
            <Editbtn/>
            <MyText
              text={'Edit'}
              fontWeight="500"
              fontSize={14}
              textColor={Color.WHITE}
              fontFamily="Roboto"
              marginHorizontal={12}
              style={{
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  //get data for list
  const getCartCount = async () => {
    setLoading(true);
    try {
      const resp = await getApiWithToken(userToken, GET_GOAL);
      console.log('getCartCount resp -my goal', resp?.data);
      if (resp?.data?.status) {
        SetGoal(resp?.data?.data);
        setLoading(false);
      } else {
        SetGoal([]);
        setLoading(false);
        // Toast.show({text1: resp.data.message});
      }
    } catch (error) {
      setLoading(false);
      console.log('error in getCartCount', error);
    }
    setLoading(false);
  };

  //delete goals
  const ondelte = async id => {
   
    var endPoint = DELETE_GOAL;
    if (id != '') {
      var id = `/` + id;
    }
    endPoint = endPoint + id;
    console.log('ondelte endPoint', endPoint);
    try {
      setLoading(true);
      const resp = await requestPostApi(endPoint, '', 'DELETE', userToken);
      console.log('ondelte resp', resp?.responseJson);
      if (resp?.responseJson?.status == true) {
        getCartCount();
        setLoading(false);
        Toast.show({text1: resp?.responseJson?.message});
       } else {
        setLoading(false);
        Toast.show({text1: resp?.responseJson?.message});
      }
    } catch (error) {
      setLoading(false);
      console.log('error in onLike', error);
    }
    
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
        <MyHeader Title={`My Goals`} isBackButton />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: '20%'}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{}}>
          <View style={{marginTop: 10}}>
            <FlatList
              horizontal={false}
              data={goal}
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
        {/* <CustomLoader showLoader={showLoader} /> */}
      </View>
      {loading ? <Loader /> : null}
    </SafeAreaView>
  );
};
export default GoalsList;
