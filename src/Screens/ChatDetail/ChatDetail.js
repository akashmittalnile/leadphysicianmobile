
//import : react components
import React, { useState, useEffect } from 'react';
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
import firestore from '@react-native-firebase/firestore';
//import : utils
import Color, { dimensions } from '../../Global/Color';
//import : styles
import { styles } from './chatDetailStyle';
//import : redux
import { useSelector } from 'react-redux';
import moment from 'moment';
import MyHeader from "../../Components/MyHeader/MyHeader"
// import ChatHeader from './ChatHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Share from '../../Global/Images/share.svg'
import Direction from '../../Global/Images/direction.svg'
const ChatDetail = ({ navigation, route }) => {
    //variables : redux
    console.log('my clun ->>', route?.params); // Logs: my clun ->> {"id": 1}

    // Destructure the id from route.params
    const { id } = route?.params;

    // Create a new club object with the id
    const club = { id };

    // Log the club object to verify its structure
    console.log('my club id--?', club); // Logs: my club id--? { id: 1 }

    // Now you can use the club object as needed
    console.log(club.id.toString()); // Logs: 1
    const userToken = useSelector(state => state.user.userToken);
    const userInfo = useSelector(state => state.user.userInfo);
    console.log('my user info-0000>>', userInfo)
    const image1 =
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80';
    const image2 =
        'https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80';

    //hook : states
    const [msg, setMsg] = useState('');
    const [messages, setMessages] = useState([]);
    const [myInfo, setMyInfo] = useState({});
    console.log('m infooo--->>', myInfo)
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
    const sendMessage = () => {
        if (msg.trim().length > 0) {
            const message = {
                userId: userInfo?.id,
                image_url: userInfo?.profile_image,
                message: msg,
                createdAt: new Date(),
                userName: `${userInfo.first_name} ${userInfo.last_name}`,
                createdAt: firestore.FieldValue.serverTimestamp(),
            };
            const groupRef = firestore().collection('groups').doc(club.id.toString());
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

    //UI
    return (
        <View style={styles.container}>
            {/* <ChatHeader title={club.name} /> */}
            {/* <MySimpleHeader text={club.name} backgroundColor={Colors.THEME_BLACK} /> */}
            <MyHeader
                Title={`You need help? Let’s chat.`}
                isBackButton
            />
            <KeyboardAwareScrollView extraHeight={150} style={styles.container}>
                <View style={{ height: dimensions.SCREEN_HEIGHT - 200, width: dimensions.SCREEN_WIDTH * 0.94, alignSelf: 'center', marginVertical: 12 }}>
                    <FlatList
                        inverted
                        data={messages}
                        showsHorizontalScrollIndicator={false}
                        numColumns={1}
                        renderItem={({ item, index }) => {
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

                <View style={styles.textInputView}>
                    <TextInput
                        value={msg}
                        placeholder="Type a message"
                        placeholderTextColor={'black'}
                        onChangeText={text => setMsg(text)}
                        style={styles.messageInput}
                        multiline={true}
                    />
                    <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                        {/* <MyIcon.Feather name="send" size={30} color={'white'} /> */}
                        <Direction></Direction>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default ChatDetail;

export const Sender = ({ item, userInfo, myInfo }) => {
    console.log('my sender item--->>', item);
    return (
        <View
            style={{
                alignSelf: 'flex-end',
                marginVertical: 5,
            }}>
            <View style={{ flexDirection: 'row', width: '70%' }}>
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
                    <MyText
                        text={item.message}
                        fontSize={16}
                        textColor="white"
                        marginHorizontal={10}
                        marginVertical={10}
                        textAlign="right"
                    />
                    <MyText
                        text={moment(item.createdAt).format('H:mm a')}
                        fontSize={10}
                        textColor="#a3a0a0"
                        textAlign="left"
                        marginHorizontal={10}
                        marginBottom={5}
                        style={{ alignSelf: 'flex-end' }}
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
export const Reciever = ({ item, userInfo }) => {
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
            <View style={{ flexDirection: 'row', width: '70%' }}>
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
                        style={{ alignSelf: 'flex-end' }}
                    />
                    <View
                        style={{
                            position: 'absolute',
                            left: -10,
                            width: 0,
                            height: 0,
                            transform: [{ rotate: '90deg' }],
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