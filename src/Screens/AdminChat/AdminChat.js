import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {
  postApiWithToken,
  CHAT_RECORD,
  getApiWithToken,
  CHAT_READ,
  CHAT_DOC_UPLOAD,
} from '../../Global/Service';
import Toast from 'react-native-toast-message';
// import MyHeader from "../../Components/MyHeader/MyHeader"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import MyHeader from '../../Components/MyHeader/MyHeader';
import DocumentPicker from 'react-native-document-picker';
import ChatSection from '../../Components/Chat/ChatSection';
import Color, {dimensions} from '../../Global/Color';

import {connect, useSelector, useDispatch} from 'react-redux';
import Share from '../../Global/Images/share.svg';
import Direction from '../../Global/Images/direction.svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Loader from '../../Components/Loader';
import Attachment from '../../Components/Attachment/Attachment';
//firebase
import firestore, {firebase} from '@react-native-firebase/firestore';

const timeHandler = timestamp => {
  if (timestamp) {
    const milliseconds =
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
    const date = new Date(milliseconds);
    const _temp = date.toLocaleString()?.split(',')[1]?.trim()?.split(':');
    const time = `${_temp[0]}:${_temp[1]} ${_temp[2].split(' ')[1]}`;
    return time;
  }
  return '';
};

const AdminChat = () => {
  const adminId = 1;
  const pdfImageUrl = `https://play-lh.googleusercontent.com/3tLaTWjP9kz56OwkbnbAnZoNp4HL28zcDMt5DEjt-kfuVhraWJBYC5XQRuMBf084JQ`;
  // const {params} = useRoute<ChatRouteParams>();
  const userToken = useSelector(state => state.user.userToken);
  const userData = useSelector(state => state.user.userInfo);
  console.log('userData--->>>', userData.id);
  const flatlistRef = React.useRef(null);
  const [chat, setChat] = React.useState('');
  const [file, setFile] = React.useState(undefined);
  const [ok, setOk] = React.useState(false);
  const [chatArray, setChatArray] = React.useState([]);
  const [ChatDocument, setChatDocument] = useState('');
  const [ChatImage, setChatImage] = useState('');
  const [showAttachment, setShowAttachment] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setOk(true);
    getCartCount();
  }, []);

  React.useEffect(() => {
    if (chatArray?.length > 0 && ok) {
      flatlistRef?.current?.scrollToIndex({
        animated: false,
        index: chatArray?.length - 1,
      });
    }
  }, [ok, chatArray]);

  React.useEffect(() => {
    chatSnapshot();
    // let unsubscribe;
    // const fetchData = async () => {
    //   unsubscribe = await chatSnapshot();
    // };
    // fetchData();
    // return () => {
    //   unsubscribe && unsubscribe();
    // };
  }, [userData.id]);

  const chatSnapshot = async () => {
    try {
      const unsubscribe = firebase
        ?.firestore()
        .collection('jwj_chats')
        .doc(`1-${userData?.id}`)
        .collection('messages')
        ?.orderBy('createdAt', 'desc')
        ?.onSnapshot(snapshot => {
          console.log('snapshot', snapshot?._docs[0]?._data);
          if (!ok) {
            getChatData(snapshot?._docs);
          } else {
            setChatArray(preData => [
              {
                createdAt: snapshot?._docs[0]?._data?.createdAt.toDate(),
                senderId: snapshot?._docs[0]?._data?.sendBy,
                text: snapshot?._docs[0]?._data?.text,
                _id: snapshot?._docs[0]?._data?._id,
                image:snapshot?._docs[0]?._data?.image,
                image_url:snapshot?._docs[0]?._data?.image_url
              },
              ...preData,
            ]);
            setChat('');
            flatlistRef?.current?.scrollToEnd();
          }
        });
      return unsubscribe;
    } catch (err) {
      console.log('err in chat snapshot', err?.message);
    }
  };

  const getChatData = async data => {
    if (data?.length === 0) {
      return;
    }
    try {
      const arr = data?.map(item => {
        console.log("chat array----------------",item);
        const time = item?._data?.createdAt.toDate();
        return {
          text: item?._data?.text,
          createdAt: time,
          senderId: item?._data?.sendBy,
          _id: item?._data?._id,
          image:item?._data?.image,
          image_url:item?._data?.image_url
        };
      });
      if (arr?.length > 0) {
        console.log('my array for chattt--->>>', arr);
        setChatArray(arr);
      }
    } catch (err) {
      console.log('err in getting chat', err);
    }
  };
  // {
  //   console.log('userData in chat--->>', userData);
  // }
  // const sendMessage = async () => {
  //     const msg = chat
  //     // const messageId = uuid.v4()
  //     try {
  //         setChat("")
  //         await firebase
  //             ?.firestore()
  //             .collection("jwj_chats")
  //             .doc(`1-${userData?.id}`)
  //             ?.collection("messages")
  //             .add({
  //                 text: msg,
  //                 // image: image,
  //                 sendBy: userData?.id,
  //                 sendto: 1,
  //                 adminName: "JourneyWithJournals",
  //                 userName: userData?.first_name,
  //                 image_url: userData?.profile_image,
  //                 user: {
  //                     _id: userData?.id
  //                 },
  //                 // _id: messageId,
  //                 createdAt: new Date()
  //             })
  //         { console.log('my chat--->>', chat) }
  //         chat && (

  //             // await postApiWithToken
  //             //     (
  //             //         userToken,
  //             //         CHAT_RECORD, { msg: chat }

  //             //     ))
  //             onMessageChat())
  //         // console.log('message-->>', message)

  //     } catch (err) {
  //         console.log("err in sending text", err?.message)
  //     }
  // }
  const sendMessage = async () => {
    if (chat == '' && ChatImage == '' && ChatDocument == '') {
    } else {
      if (ChatImage == '' && ChatDocument == '') {
        try {
          await firebase
            ?.firestore()
            .collection('jwj_chats')
            .doc(`1-${userData?.id}`)
            ?.collection('messages')
            .add({
              text: chat,
              image: '',
              sendBy: userData?.id,
              sendto: 1,
              adminName: 'JourneyWithJournals',
              userName: userData?.first_name,
              image_url: userData?.profile_image,
              user: {
                _id: userData?.id,
              },
              // _id: messageId,
              createdAt: new Date(),
            });
            const TempMsg = chat;
            setChat('');
          
          try {
            const data = {
              msg: TempMsg,
            };
            await postApiWithToken(userToken, CHAT_RECORD, data);
          } catch (error) {
            console.log('error while api call', error);
          }
        } catch (err) {
          console.log('err in sending text', err?.message);
        }
      } else {
        setLoading(true);
        const formData = new FormData();
        if (ChatDocument == '') {
          const imageName = ChatImage.path.slice(
            ChatImage.path.lastIndexOf('/'),
            ChatImage.path.length,
          );
          formData.append('image', {
            name: imageName,
            type: ChatImage.mime,
            uri: ChatImage.path,
          });
        } else {
 
          let documentPath = ChatDocument[0].uri;
          const docsName = ChatDocument[0].name;
          formData.append('image', {
            name: docsName,
            type: ChatDocument[0].type,
            uri: documentPath,
          });
        }
        // formData.append('receiver_id', adminId);
        // formData.append('msg', chat);
        try {
          const resp = await postApiWithToken(
            userToken,
            CHAT_DOC_UPLOAD,
            formData,
          );
          console.log('api CHAT_DOC_UPLOAD resp------', resp.data);
          if (resp.data.status) {
           
            const Data = {
              text: chat,
              image: resp.data.url,
              // image: image,
              sendBy: userData?.id,
              sendto: 1,
              adminName: 'JourneyWithJournals',
              userName: userData?.first_name,
              image_url: userData?.profile_image,
              user: {
                _id: userData?.id,
              },
              // _id: messageId,
              createdAt: new Date(),
            };
            console.log("send data with document----<",Data);
            firestore()
              .collection('jwj_chats')
              // .doc(adminId.toString() + userInfo?.id?.toString())
              .doc(`1-${userData?.id?.toString()}`)
              .collection('messages')
              .add({
                ...Data,
                createdAt: firestore.FieldValue.serverTimestamp(),
                 
              });
            console.log('doc uploadedddddddddddddddd!!11');
            setChat('');
            setChatImage('');
            setChatDocument('');
            setLoading(false);
          }
        } catch (error) {
          console.log('error while uploading images ', error);
          setLoading(false);
        }
      }
    }
  };

  const chatHandler = chat => {
    setChat(chat);
  };
  const openModal = () => {
    Keyboard.dismiss();
    setShowAttachment(true);
  };

  // const documentPicker = async () => {
  //   try {
  //     const resp = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.allFiles],
  //     });
  //     setChatDocument(resp);
  //     console.log('result', resp);
  //   } catch (err) {
  //     console.log('document picker err', err.message);
  //   }
  // };
 
  const renderChat = ({item, index}) => {
    console.log('my item--->>', userData);
    return (
      <ChatSection
        key={index}
        userName={
          item?.senderId == userData?.id
            ? userData?.first_name
              ? userData?.first_name
              : 'You'
            : 'Admin'
        }
        image={item?.image}
        chat={item?.text}
        profile={userData?.profile_image}
        adminProfile={userData?.admin_profile_image}
        own={item?.senderId == userData?.id ? true : false}
        time={item?.createdAt}
      />
    );
  };

  const onMessageChat = async () => {
    console.log('does it coe to his function');
    // setLoading(true);
    try {
      var data = {
        msg: chat,
      };
      const resp = await postApiWithToken(userToken, CHAT_RECORD, data);
      console.log('my response from tha chat---->>>', resp);
      if (resp?.data?.status) {
        // Toast.show({ text1: resp?.data?.message || resp?.data?.Message });
      } else {
        Toast.show({text1: resp?.data?.message || resp?.data?.Message});
      }
    } catch (error) {
      console.log('error in submitReview', error);
    }

    setLoading(false);
  };

  //chat Read
  ///get deatils

  const getCartCount = async () => {
    console.log('does it coe to his function');
    // setLoading(true);

    const resp = await postApiWithToken(userToken, CHAT_READ, '');
    console.log('my response of read chattt-7777-->>>', resp?.data);
    if (resp?.data?.status) {
      // Toast.show({ text1: resp?.data?.message || resp?.data?.Message });
    } else {
      Toast.show({text1: resp?.data?.message || resp?.data?.Message});
    }

    setLoading(false);
  };
  return (
    <SafeAreaView style={styles.conatiner}>
      <View style={styles.conatiner}>
        {/* <View style={styles.headerContainer}> */}
        {/* <ImageBackground
                    source={require("../../assets/Icons/maskGroup-2.png")}
                    resizeMode="cover"
                    style={styles.chatImage}
                /> */}
        {/* <Header title="Chats" notificationButton={false} /> */}
        <MyHeader Title={`You need help? Let’s chat.`} isBackButton />
        {/* <Text style={styles.text}>You need help? Let’s chat.</Text> */}
        {/* </View> */}

        {/* chats */}

        <KeyboardAwareScrollView extraHeight={150} style={styles.conatiner}>
          <View
            style={{
              height: dimensions.SCREEN_HEIGHT - 200,
              width: dimensions.SCREEN_WIDTH * 0.94,
              alignSelf: 'center',
              marginVertical: 12,
            }}>
            {/* <View style={styles.chatContainer}>
                        {chatArray?.length > 0 ?  */}

            <FlatList
              keyboardShouldPersistTaps="always"
              inverted={true}
              showsHorizontalScrollIndicator={false}
              ref={flatlistRef}
              data={chatArray}
              renderItem={renderChat}
              keyExtractor={(_, index) => index.toString()}
              bounces={false}
              contentContainerStyle={styles.flatlist}
              getItemLayout={(data, index) => ({
                length: 0,
                offset: 0 * index,
                index,
              })}
            />
            {/* : (
                            <View style={styles.noChatContainer}></View>
                        )}
                    </View> */}
          </View>
          <Attachment
            visible={showAttachment}
            setVisibility={setShowAttachment}
            setImage={setChatImage}
            setDocument={setChatDocument}
          />
          {/* message send section */}
          <View style={styles.sendMessageContainer}>
            <View style={styles.textInputContainer}>
              <TextInput
                value={chat}
                style={[styles.textInput, {color: '#000'}]}
                onChangeText={chatHandler}
                placeholderTextColor={'black'}
                multiline={true}
                placeholder="Type a message"
              />
              <TouchableOpacity style={styles.touch} onPress={openModal}>
                {ChatImage || ChatDocument ? (
                  <Image
                    source={{
                      uri: ChatImage == '' ? pdfImageUrl : ChatImage.path,
                    }}
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: 'grey',
                    }}
                  />
                ) : (
                  <Share></Share>
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.sendButtonContainer}>
              {/* {console.log('my chat lenght---->>', chat.length)} */}
              <TouchableOpacity
                onPress={sendMessage}
                style={{
                  ...styles.sendButtonTouch,
                  backgroundColor:
                    chat.length > 0 ? Color.PRIMARY : Color.PRIMARY,
                }}
                // disabled={chat.length === 0}
              >
                {/* <Image
                                    source={require("../../assets/Icons/send.png")}
                                    resizeMode="contain"
                                    style={styles.sendIcon}
                                /> */}
                <Direction></Direction>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
      {loading ? <Loader /> : null}
    </SafeAreaView>
  );
};

export default AdminChat;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  headerContainer: {
    position: 'relative',
    height: responsiveHeight(18),
    // backgroundColor: Color.PRIMARY,
    // borderWidth: 1
  },
  chatImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
  },
  text: {
    marginTop: responsiveHeight(5),
    width: '100%',
    color: 'white',
    textAlign: 'center',
    fontSize: responsiveFontSize(2),
    fontWeight: '400',
    opacity: 0.7,
  },
  chatContainer: {
    height: responsiveHeight(67),
  },
  flatlist: {
    paddingBottom: responsiveHeight(2),
  },
  sendMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: '3%',
    paddingBottom:20
    // height: responsiveHeight(15)
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(6.5),
    width: responsiveWidth(77),
    borderRadius: responsiveHeight(5),
    elevation: 2,
    shadowColor: 'rgba(137, 137, 137, .25)',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 3,
    backgroundColor: 'white',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: -2 },
    // shadowOpacity: 0.5,
    // shadowRadius: 2,
    // elevation: 2,
    // backgroundColor: Color.WHITE,
    // height: 50,
    // width: dimensions.SCREEN_WIDTH * 0.90,
    // alignSelf: 'center'
  },
  textInput: {
    flex: 1,
    height: '100%',
    width: '80%',
    paddingHorizontal: '5%',
    fontSize: responsiveFontSize(1.8),
    letterSpacing: 0.8,
  },
  touch: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingRight: responsiveWidth(4),
  },
  attachedFiles: {
    height: responsiveHeight(3),
    width: responsiveWidth(6),
  },
  sendButtonContainer: {
    height: responsiveHeight(5),
    width: responsiveHeight(5),
    borderRadius: responsiveHeight(2.5),
    overflow: 'hidden',
  },
  sendButtonTouch: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  sendIcon: {
    height: responsiveHeight(2),
    width: responsiveWidth(5),
  },
  noChatContainer: {
    flex: 1,
  },
});
