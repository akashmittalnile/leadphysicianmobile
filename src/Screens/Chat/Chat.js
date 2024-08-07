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
import {useIsFocused} from '@react-navigation/native';
import {styles} from './ChatStyle';
import MyHeader from '../../Components/MyHeader/MyHeader';
import {
  GET_PROFILE,
  postApiWithToken,
  LOGOUT,
  getApiWithToken,
  GET_GROUPS,
  READ_CHATADMIN,
} from '../../Global/Service';
import {connect, useSelector, useDispatch} from 'react-redux';
import Ongoing from '../../Global/Images/clock.svg';
import GroupChat from '../../Global/Images/chatGrp.svg';
import Indivijual from '../../Global/Images/chatPersonal.svg';
import Toast from 'react-native-toast-message';
import KeySvg from '../../Global/Images/logo.svg';
import Nodata from '../../Global/Images/lock-circle.svg';
import {Svg, SvgUri} from 'react-native-svg';
const Chat = ({navigation}) => {
  const userToken = useSelector(state => state.user.userToken);
  const [animating, setAnimating] = useState(true);
  const [scrolling, setscrolling] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState('');
  const [activeTab, setActiveTab] = useState('1'); // State to track the active tab
  const scrollY = useSharedValue(0);
  const isFocus = useIsFocused();
  const RenderTabsTitle = [
    {
      id: '1',
      title: 'Group Chats',
    },
    {
      id: '2',
      title: 'Admin Message',
    },
  ];
  const groupChat = [
    {
      id: '1',
      title: 'Physician Alumni',
      time: '12 Mar, 09:30 Am',
      members: '459 Members',
    },
    {
      id: '2',
      title: 'Physician Alumni',
      time: '12 Mar, 09:30 Am',
      members: '459 Members',
    },
    {
      id: '3',
      title: 'Physician Alumni',
      time: '12 Mar, 09:30 Am',
      members: '459 Members',
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
  const onRefresh = React.useCallback(() => {
    // checkcon();
    // wait(2000).then(() => {
    //     setRefreshing(false);
    // });
  }, []);

  const RenderTabs = ({item, activeTab, setActiveTab}) => {
    return (
      <TouchableOpacity
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: dimensions.SCREEN_WIDTH * 0.48,
            marginVertical: 18,
          },
          item.id === activeTab && {}, // Change background color if this tab is active
        ]}
        onPress={() => setActiveTab(item.id)}>
        <View
          style={[
            styles.tabView,
            item.id === activeTab && {backgroundColor: Color.PRIMARY},
          ]}>
          <Text
            style={[styles.txtTab, item.id === activeTab && {color: 'white'}]}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const RenderChat = ({item}) => {
    // console.log('item ');
    return (
      <TouchableOpacity
        style={styles.chatView}
        onPress={() => {
          navigation.navigate('ChatDetail', {id: item.id});
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            paddingHorizontal: 12,
          }}>
          <View style={{flexDirection: 'row'}}>
            {/* <GroupChat></GroupChat> */}
            {/* <Image style={{height:45,width:45,borderRadius:100/2}} source={{uri:`${item?.image}`}}/> */}
            <View style={{backgroundColor: Color.GREY, borderRadius: 100 / 2}}>
              <SvgUri width={50} height={50} uri={`${item?.image}`} />
            </View>

            <View>
              <MyText
                text={item?.name}
                fontWeight="600"
                fontSize={16}
                textColor={Color.BLACK}
                fontFamily="Roboto"
                style={{textAlign: 'center', marginHorizontal: 16}}
              />
              {/* <MyText
                text={item.users?.length +` Members`}
                fontWeight="400"
                fontSize={12}
                textColor={'#959FA6'}
                fontFamily="Roboto"
                style={{marginHorizontal: 17, marginVertical: 5}}
              /> */}
            </View>
          </View>
          {/* <Ongoing></Ongoing>
          <MyText
            text={item.time}
            fontWeight="400"
            fontSize={12}
            textColor={Color.LIGHT_BLACK}
            fontFamily="Roboto"
            style={{}}
          /> */}
        </View>
        <View style={styles.bottomChat}>
          <View style={styles.rowIndivi}>
            {/* <Indivijual style={{marginLeft: 22}}></Indivijual> */}
            <Image
              style={{
                height: 30,
                width: 30,
                borderRadius: 100 / 2,
                marginLeft: 22,
              }}
              source={{uri: `${item?.lastUserTakeMembership?.profile_image}`}}
            />
            <MyText
              text={`${item?.users?.length} members`}
              fontWeight="bold"
              fontSize={14}
              textColor={Color.BLACK}
              fontFamily="Roboto"
              style={{marginHorizontal: 12, marginVertical: 5}}
            />
          </View>
          <MyText
            text={'Please connect and respond here…'}
            fontWeight="400"
            fontSize={14}
            textColor={'#959FA6'}
            fontFamily="Roboto"
            style={{marginHorizontal: 24, marginVertical: 8}}
          />
        </View>
      </TouchableOpacity>
    );
  };

  ////get data
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // setLoading(true);
      getCartCount();

      // setLoading(false);
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [isFocus]);

  //get data for list
  const getCartCount = async () => {
    setLoading(true);
    try {
      const resp = await getApiWithToken(userToken, GET_GROUPS);
      console.log('get profile2222----->>>>', resp?.data);
      if (resp?.data?.status) {
        // setProfile(resp?.data?.data)
        setGroups(resp?.data?.data);
      } else {
        Toast.show({text1: resp.data.message});
      }
    } catch (error) {
      console.log('error in getCartCount', error);
    }
    setLoading(false);
  };

  //read messages
  const readMessage = async () => {
    console.log('read message calleddd');
    setLoading(true);
    try {
      const resp = await postApiWithToken(userToken, READ_CHATADMIN, '');
      console.log('post chat detailssss----', resp?.data);
      if (resp?.data?.status) {
        // setProfile(resp?.data?.data)
        // setGroups(resp?.data?.data)
      } else {
        Toast.show({text1: resp.data.message});
      }
    } catch (error) {
      console.log('error in getCartCount', error);
    }
    setLoading(false);
  };

  return (
    <>
      <StatusBar backgroundColor={Color.LIGHT_BLACK} />
      <View
        style={{
          flex: 1,
          backgroundColor: Color.SCREEN_BG,
        }}>
        <MyHeader
          title={'My Services'}
          onPress={() => {
            props.navigation.goBack();
          }}
          onPress2={() => {
            props.navigation.navigate('Notification');
          }}
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
            // <FlatList
            //     horizontal={true}
            //     data={RenderTabsTitle}
            //     showsVerticalScrollIndicator={false}
            //     showsHorizontalScrollIndicator={false}
            //     keyExtractor={(item, index) => index.toString()}
            //     renderItem={({ item }) => (
            //         <RenderTabs
            //             item={item}
            //             activeTab={activeTab}
            //             setActiveTab={setActiveTab}
            //         />
            //     )}
            //     ListEmptyComponent={() => (
            //         <View
            //             style={{
            //                 height: dimensions.SCREEN_HEIGHT * 0.58,
            //                 width: dimensions.SCREEN_WIDTH * 0.9,
            //                 backgroundColor: '#F3F3F3',
            //                 justifyContent: 'center',
            //                 alignItems: 'center',
            //                 alignSelf: 'center',
            //                 marginTop: 20,
            //             }}>

            //             <MyText
            //                 text={'Sorry !! We Couldn’t Find Any Fundraiser'}
            //                 fontWeight="black"
            //                 fontSize={12}
            //                 textColor={Color.BLACK}
            //                 fontFamily="Inter"
            //                 style={{
            //                     fontWeight: '500',
            //                     alignSelf: 'center',
            //                     width: '55%',
            //                     justifyContent: 'center',
            //                     textAlign: 'center',
            //                 }}
            //             />
            //         </View>
            //     )}
            // />
            <View style={{height: 50}}></View>
          ) : null}
          {/* {console.log('klkll chat--->.', groups)} */}
          {activeTab === '1' ? (
            <FlatList
              horizontal={false}
              data={groups}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => <RenderChat item={item} />}
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
          ) : null}
        </ScrollView>
      </View>
    </>
  );
};

export default Chat;
