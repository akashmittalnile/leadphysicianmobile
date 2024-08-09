//import : react components
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MyText from '../../Components/MyText/MyText';
//import : third parties
import DocumentPicker from 'react-native-document-picker';
import firestore from '@react-native-firebase/firestore';
//import : utils
import Color, {dimensions} from '../../Global/Color';
//import : styles
import {styles} from './chatDetailStyle';
//import : redux
import {useSelector} from 'react-redux';
import moment from 'moment';
import MyHeader from '../../Components/MyHeader/MyHeader';
// import ChatHeader from './ChatHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Share from '../../Global/Images/share.svg';
import Direction from '../../Global/Images/direction.svg';
import Loader from '../../Components/Loader';
import Attachment from '../../Components/Attachment/Attachment';
import {CHAT_DOC_UPLOAD, postApiWithToken} from '../../Global/Service';
import {
    DrawerActions,
    useNavigation,
    useFocusEffect,
    CommonActions,
  } from '@react-navigation/native';
import { Text } from 'react-native-svg';

const ChatDetail = ({navigation, route}) => {
  //variables : redux
  console.log('my clun ->>', route?.params); // Logs: my clun ->> {"id": 1}
  const adminId = 1;
  const pdfImageUrl = `https://play-lh.googleusercontent.com/3tLaTWjP9kz56OwkbnbAnZoNp4HL28zcDMt5DEjt-kfuVhraWJBYC5XQRuMBf084JQ`;
  // Destructure the id from route.params
  const {id} = route?.params;

  // Create a new club object with the id
  const club = {id};

  // Log the club object to verify its structure
  console.log('my club id--?', club); // Logs: my club id--? { id: 1 }

  // Now you can use the club object as needed
  console.log(club.id.toString()); // Logs: 1
  const userToken = useSelector(state => state.user.userToken);
  const userInfo = useSelector(state => state.user.userInfo);
  console.log('my user info-0000>>', userInfo);
  const image1 =
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80';
  const image2 =
    'https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80';

  //hook : states
  const [ChatImage, setChatImage] = useState('');
  const [ChatDocument, setChatDocument] = useState('');
  const [showAttachment, setShowAttachment] = useState(false);

  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const [myInfo, setMyInfo] = useState({});

  const [showLoader, setShowLoader] = useState(false);
  console.log('m infooo--->>', myInfo);

  const openModal = () => {
    Keyboard.dismiss();
    setShowAttachment(true);
  };
  //function : service function
  const resetMyUnreadCount = () => {
    firestore()
      .collection('groups')
      .doc(club.id.toString())
      .collection('users')
      .doc(String(userInfo?.id))
      .update({
        unread_count: 0,
      });
  };

  const getMyUserInfo = async () => {
    console.log('get user inforr-->>', userInfo.id);
    const data = await firestore()
      .collection('groups')
      .doc(club.id.toString())
      .collection('users')
      .doc(String(userInfo?.id))
      .get()
      .then(res => res.data());
    console.log('res---->>,', res);
    setMyInfo(data);
  };
  const sendMessage = async () => {
    if (msg == '' && ChatImage == '' && ChatDocument == '') {
    } else {
      if (ChatImage == '' && ChatDocument == '') {
        try {
          const message = {
            userId: userInfo?.id,
            image_url: userInfo?.profile_image,
            message: msg,
            createdAt: new Date(),
            image: '',
            userName: `${userInfo.first_name} ${userInfo.last_name}`,
            createdAt: firestore.FieldValue.serverTimestamp(),
          };
          const groupRef = firestore()
            .collection('groups')
            .doc(club.id.toString());
          const membersRef = groupRef.collection('users');
          const batch = firestore().batch();
          const messageRef = groupRef.collection('Messages').doc();
          batch.set(messageRef, message);
          membersRef
            .get()
            .then(querySnapShot => {
              querySnapShot.forEach(doc => {
                const memberId = doc.id;
                if (memberId != message.userId) {
                  const memberRef = membersRef.doc(doc.id);
                  batch.update(memberRef, {
                    unread_count: doc.data().unread_count + 1,
                  });
                }
              });
              console.log('my messages are sent succesfully');
              return batch.commit();
            })
            .catch(error => {
              console.error(error);
            });
          setMsg('');
        } catch (error) {
          console.log('error in sendMessage', error);
        }
      } else {
        setShowLoader(true);
        const formData = new FormData();
        if (ChatDocument == '') {
          // const imageName = ChatImage.path.slice(
          //   ChatImage.path.lastIndexOf('/'),
          //   ChatImage.path.length,
          // );
          // formData.append('image', {
          //   name: imageName,
          //   type: ChatImage.mime,
          //   uri: ChatImage.path,
          // });
          const imageName = ChatImage?.uri?.slice(
            ChatImage?.uri?.lastIndexOf('/'),
            ChatImage?.uri?.length,
          );
          formData.append('image', {
            name: imageName,
            type: ChatImage?.type,
            uri: ChatImage?.uri,
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
        // formData.append('msg', msg);
        try {
          const resp = await postApiWithToken(
            userToken,
            CHAT_DOC_UPLOAD,
            formData,
          );
          console.log('api CHAT_DOC_UPLOAD resp------', resp.data);
          if (resp.data.status) {
            const Data = {
              userId: userInfo?.id,
              message: msg,
              createdAt: new Date(),
              image: resp.data.url,
              image_url: userInfo?.profile_image,
              userName: `${userInfo.first_name} ${userInfo.last_name}`,
            };
            firestore()
              //   .collection('Chat')
              //   .doc(adminId.toString() + userInfo?.id?.toString())
              //   .collection('Messages')
              .collection('groups')
              .doc(club.id.toString())
              .collection('Messages')
              .add({
                ...Data,
                createdAt: firestore.FieldValue.serverTimestamp(),
              });
            setMsg('');
            setChatImage('');
            setChatDocument('');
            setShowLoader(false);
          }
        } catch (error) {
          console.log('error while uploading images ', error);
          setShowLoader(false);
        }
      }
    }
  };
  //hook : useEffect
  useEffect(() => {
    getMyUserInfo();
    const MessageRef = firestore()
      .collection('groups')
      .doc(club.id.toString())
      .collection('Messages')
      .orderBy('createdAt', 'desc');
    const unSubscribe = MessageRef.onSnapshot(querySnap => {
      if (querySnap != null) {
        const AllMsg = querySnap.docs.map(docSnap => {
          const data = docSnap.data();
          if (data.createdAt) {
            return {
              ...docSnap.data(),
              createdAt: docSnap.data().createdAt.toDate(),
            };
          } else {
            return {
              ...docSnap.data(),
              createdAt: new Date(),
            };
          }
        });
        setMessages(AllMsg);
      } else {
        setMessages([]);
      }
    });
    return () => unSubscribe();
  }, [club.id]);
  useEffect(() => {
    resetMyUnreadCount();
    return () => {
      Keyboard.dismiss();
    };
  }, []);

  // const documentPicker = useCallback(async () => {
  //   try {
  //     const resp = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.allFiles],
  //     });
  //     setChatDocument(resp);
  //     console.log('result', resp);
  //   } catch (err) {
  //     console.log('document picker err', err.message);
  //   }
  // }, []);

  // const openDocument = async () => {
  //     try {
  //       const resp = await DocumentPicker.pick({
  //         type: [DocumentPicker.types.pdf],
  //       });
  //       setImage('');
  //       setDocument(resp);
  //       closeModal();
  //     } catch (error) {
  //       console.error('error in openDocument', error);
  //     }
  //   };

  //UI
  return (
    <View style={styles.container}>
      {/* <ChatHeader title={club.name} /> */}
      {/* <MySimpleHeader text={club.name} backgroundColor={Colors.THEME_BLACK} /> */}
      <MyHeader Title={`You need help? Let’s chat.`} isBackButton />
      <KeyboardAwareScrollView extraHeight={150} style={styles.container}>
        <View
          style={{
            height: dimensions.SCREEN_HEIGHT - 200,
            width: dimensions.SCREEN_WIDTH * 0.94,
            alignSelf: 'center',
            marginVertical: 12,
          }}>
          <FlatList
            inverted
            data={messages}
            showsHorizontalScrollIndicator={false}
            numColumns={1}
            renderItem={({item, index}) => {
              return (
                <>
                  {item.userId == userInfo.id ? (
                    <Sender
                      key={index.toString()}
                      item={item}
                      myInfo={myInfo}
                      userInfo={userInfo}
                    />
                  ) : (
                    <Reciever
                      key={index.toString()}
                      item={item}
                      userInfo={userInfo}
                    />
                  )}
                </>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        {/* <View style={styles.textInputView}>
                    <TextInput
                        value={msg}
                        placeholder="Type a message"
                        placeholderTextColor={'black'}
                        onChangeText={text => setMsg(text)}
                        style={styles.messageInput}
                        multiline={true}
                    />
                    <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                        
                        <Direction></Direction>
                    </TouchableOpacity>
                </View> */}
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
              value={msg}
              style={[styles.textInput, {color: '#000'}]}
              // onChangeText={chatHandler}
              onChangeText={text => setMsg(text)}
              placeholderTextColor={'black'}
              multiline={true}
              placeholder="Type a message"
            />
            <TouchableOpacity style={styles.touch} onPress={openModal}>
              {ChatImage || ChatDocument ? (
                <Image
                  source={{
                    uri: ChatImage == '' ? pdfImageUrl : ChatImage.uri,
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
                backgroundColor: Color.PRIMARY,
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
      {showLoader ? <Loader /> : null}
    </View>
  );
};

export default ChatDetail;

export const Sender = ({item, userInfo, myInfo}) => {
    console.log('my sender item--->>', item);
  const pdfImageUrl = `https://play-lh.googleusercontent.com/3tLaTWjP9kz56OwkbnbAnZoNp4HL28zcDMt5DEjt-kfuVhraWJBYC5XQRuMBf084JQ`;
  const navigation = useNavigation();
  const gotoFullImageView = image => {
    console.log('gotoFullImageView------', image);
    navigation.navigate('FullImageView', {image: image});
  };

  const gotoPdfView = image =>
    navigation.navigate('ViewPdf', {
      pdfUrl: image,
      pdfTitle: 'Open PDF',
      type: 'PDF',
    });
  return (
    <View
      style={{
        alignSelf: 'flex-end',
        marginVertical: 5,
      }}>
      <View style={{flexDirection: 'row', width: '70%'}}>
        <View
          style={{
            backgroundColor: Color.LIGHT_BLACK,
            width: 'auto',
            borderTopLeftRadius: item.userId == userInfo.id ? 10 : 0,
            borderBottomLeftRadius: item.userId == userInfo.id ? 10 : 0,
            borderBottomRightRadius: item.userId == userInfo.id ? 10 : 0,
            borderTopRightRadius: item.userId == userInfo.id ? 0 : 10,
            marginRight: 10,
          }}>
        
          <MyText
            text={item.userName}
            textColor={Color.PRIMARY}
            textAlign="right"
            marginHorizontal={10}
            marginTop={5}
          />
           
          {item.image ? (
            <TouchableOpacity
              style={{
                height: 100,
                width: 100,
                paddingTop: 10,

                alignSelf: 'center',
              }}
              onPress={() =>
                item?.image?.includes('pdf')
                  ? gotoPdfView(item?.image)
                  : gotoFullImageView(item?.image)
              }>
              <Image
                source={{
                  uri: item?.image?.includes('pdf') ? pdfImageUrl : item?.image,
                }}
                style={{
                  height: 120,
                  width: 100,
                  borderRadius: 10,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
          ) : null}
          <MyText
            text={item.message}
            fontSize={16}
            textColor="white"
            marginHorizontal={10}
            marginVertical={10}
            marginTop={item.image ? 25:0}
            textAlign="right"
          />
          <MyText
            text={moment(item.createdAt).format('H:mm a')}
            fontSize={10}
            textColor="#a3a0a0"
            textAlign="left"
            marginHorizontal={10}
            marginBottom={5}
            style={{alignSelf: 'flex-end'}}
          />
         
          <View
            style={{
              position: 'absolute',
              right: -10,
              width: 0,
              height: 0,
              backgroundColor: 'transparent',
              borderStyle: 'solid',
              borderRightWidth: 10,
              borderTopWidth: 10,
              borderRightColor: 'transparent',
              borderTopColor: Color.LIGHT_BLACK,
            }}
          />
        </View>

        <Image
          source={{
            uri: item.image_url,
          }}
          style={{
            height: 50,
            width: 50,
            borderRadius: 100,
          }}
        />
      </View>
    </View>
  );
};
export const Reciever = ({item, userInfo}) => {
    const pdfImageUrl = `https://play-lh.googleusercontent.com/3tLaTWjP9kz56OwkbnbAnZoNp4HL28zcDMt5DEjt-kfuVhraWJBYC5XQRuMBf084JQ`;
    const navigation = useNavigation();
  const gotoFullImageView = image => {
    console.log('gotoFullImageView------', image);
    navigation.navigate('FullImageView', {image: image});
  };

  const gotoPdfView = image =>
    navigation.navigate('ViewPdf', {
      pdfUrl: image,
      pdfTitle: 'Open PDF',
      type: 'PDF',
    });
  function getRandomColor() {
    // var letters = '0123456789ABCDEF';
    // var color = '#';
    // for (var i = 0; i < 6; i++) {
    //     color += letters[Math.floor(Math.random() * 16)];
    // }
    // return color;
  }

  var randomColor = getRandomColor();
  return (
    <View
      style={{
        alignSelf: item.userId == userInfo.id ? 'flex-end' : 'flex-start',
        marginVertical: 5,
      }}>
      <View style={{flexDirection: 'row', width: '70%'}}>
        {console.log('my uerrr->>', item)}
        <Image
          source={{
            uri: item?.image_url,
          }}
          style={{
            height: 50,
            width: 50,
            borderRadius: 100,
          }}
        />
        <View
          style={{
            backgroundColor: Color.LIGHT_BLACK,
            width: 'auto',
            borderTopLeftRadius: item.userId == userInfo.id ? 10 : 0,
            borderBottomLeftRadius: item.userId == userInfo.id ? 0 : 10,
            borderBottomRightRadius: item.userId == userInfo.id ? 0 : 10,
            borderTopRightRadius: item.userId == userInfo.id ? 0 : 10,
            marginLeft: 10,
          }}>
          <MyText
            text={item.userName}
            textColor={Color.PRIMARY}
            textAlign={item.userId == userInfo.id ? 'right' : 'left'}
            marginHorizontal={10}
            marginTop={5}
          />
          {item.image ? (
            <TouchableOpacity
              style={{
                height: 100,
                width: 100,
                paddingTop: 10,

                alignSelf: 'center',
              }}
              onPress={() =>
                item?.image?.includes('pdf')
                  ? gotoPdfView(item?.image)
                  : gotoFullImageView(item?.image)
              }>
              <Image
                source={{
                  uri: item?.image?.includes('pdf') ? pdfImageUrl : item?.image,
                }}
                style={{
                  height: 120,
                  width: 100,
                  borderRadius: 10,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
          ) : null}
          <MyText
            text={item.message}
            fontSize={16}
            textColor="white"
            textAlign={item.userId == userInfo.id ? 'right' : 'left'}
            marginHorizontal={10}
            marginVertical={10}
          />
          <MyText
            text={moment(item.createdAt).format('H:mm a')}
            fontSize={10}
            textColor="#a3a0a0"
            textAlign="left"
            marginHorizontal={10}
            marginBottom={5}
            style={{alignSelf: 'flex-end'}}
          />
          <View
            style={{
              position: 'absolute',
              left: -10,
              width: 0,
              height: 0,
              transform: [{rotate: '90deg'}],
              backgroundColor: 'transparent',
              borderStyle: 'solid',
              borderRightWidth: 10,
              borderTopWidth: 10,
              borderRightColor: 'transparent',
              borderTopColor: Color.LIGHT_BLACK,
            }}
          />
        </View>
      </View>
    </View>
  );
};
