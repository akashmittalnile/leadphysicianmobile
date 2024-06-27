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
    Platform
} from "react-native"
import React, { useCallback, useState } from "react"
import { postApiWithToken, CHAT_RECORD, getApiWithToken, CHAT_READ } from '../../Global/Service';
import Toast from 'react-native-toast-message';
// import MyHeader from "../../Components/MyHeader/MyHeader"
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth
} from "react-native-responsive-dimensions"
import MyHeader from "../../Components/MyHeader/MyHeader"
import DocumentPicker from "react-native-document-picker"
import ChatSection from "../../Components/Chat/ChatSection"
import Color, { dimensions } from '../../Global/Color';
import { firebase } from "@react-native-firebase/firestore"
import { connect, useSelector, useDispatch } from 'react-redux';
import Share from '../../Global/Images/share.svg'
import Direction from '../../Global/Images/direction.svg'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loader from "../../Components/Loader";
const timeHandler = timestamp => {
    if (timestamp) {
        const milliseconds =
            timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
        const date = new Date(milliseconds)
        const _temp = date
            .toLocaleString()
            ?.split(",")[1]
            ?.trim()
            ?.split(":")
        const time = `${_temp[0]}:${_temp[1]} ${_temp[2].split(" ")[1]}`
        return time
    }
    return ""
}

const AdminChat = () => {
    // const {params} = useRoute<ChatRouteParams>();
    const userToken = useSelector(state => state.user.userToken);
    const userData = useSelector(state => state.user.userInfo)
    console.log('userData--->>>', userData.id);
    const flatlistRef = React.useRef(null)
    const [chat, setChat] = React.useState("")
    const [file, setFile] = React.useState(undefined)
    const [ok, setOk] = React.useState(false)
    const [chatArray, setChatArray] = React.useState([])
    const [loading, setLoading] = useState('')
    React.useEffect(() => {
        setOk(true)
        getCartCount()
    }, [])

    React.useEffect(() => {
        if (chatArray?.length > 0 && ok) {
            flatlistRef?.current?.scrollToIndex({
                animated: false,
                index: chatArray?.length - 1
            })
        }
    }, [ok, chatArray])

    React.useEffect(() => {
        let unsubscribe
        const fetchData = async () => {
            unsubscribe = await chatSnapshot()
        }
        fetchData()
        return () => {
            unsubscribe && unsubscribe()
        }
    }, [])

    const chatSnapshot = async () => {
        try {
            const unsubscribe = firebase
                ?.firestore()
                .collection("jwj_chats")
                .doc(`1-${userData?.id}`)
                .collection("messages")
                ?.orderBy("createdAt", "desc")
                ?.onSnapshot(snapshot => {
                    console.log("snapshot", snapshot?._docs[0]?._data)
                    if (!ok) {
                        getChatData(snapshot?._docs)
                    } else {
                        setChatArray(preData => [
                            {
                                createdAt: timeHandler(snapshot?._docs[0]?._data?.createdAt),
                                senderId: snapshot?._docs[0]?._data?.sendBy,
                                text: snapshot?._docs[0]?._data?.text,
                                _id: snapshot?._docs[0]?._data?._id
                            },
                            ...preData
                        ])
                        setChat("")
                        flatlistRef?.current?.scrollToEnd()
                    }
                })
            return unsubscribe
        } catch (err) {
            console.log("err in chat snapshot", err?.message)
        }
    }

    const getChatData = async data => {
        if (data?.length === 0) {
            return
        }
        try {
            const arr = data?.map(item => {
                const time = timeHandler(item?._data?.createdAt)
                return {
                    text: item?._data?.text,
                    createdAt: time,
                    senderId: item?._data?.sendBy,
                    _id: item?._data?._id
                }
            })
            if (arr?.length > 0) {
                console.log('my array for chattt--->>>', arr);
                setChatArray(arr)
            }
        } catch (err) {
            console.log("err in getting chat", err)
        }
    }
    { console.log('userData in chat--->>', userData); }
    const sendChatHandler = async () => {
        const msg = chat
        // const messageId = uuid.v4()
        try {
            setChat("")
            await firebase
                ?.firestore()
                .collection("jwj_chats")
                .doc(`1-${userData?.id}`)
                ?.collection("messages")
                .add({
                    text: msg,
                    // image: image,
                    sendBy: userData?.id,
                    sendto: 1,
                    adminName: "JourneyWithJournals",
                    userName: userData?.first_name,
                    image_url: userData?.profile_image,
                    user: {
                        _id: userData?.id
                    },
                    // _id: messageId,
                    createdAt: new Date()
                })
            { console.log('my chat--->>', chat) }
            chat && (

                // await postApiWithToken
                //     (
                //         userToken,
                //         CHAT_RECORD, { msg: chat }

                //     ))
                onMessageChat())
            // console.log('message-->>', message)

        } catch (err) {
            console.log("err in sending text", err?.message)
        }
    }

    const chatHandler = chat => {
        setChat(chat)
    }

    const documentPicker = useCallback(async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles]
            })
            console.log("result", result)
        } catch (err) {
            console.log("document picker err", err.message)
        }
    }, [])

    const renderChat = ({ item, index }) => {
        console.log('my item--->>', userData);
        return (

            <ChatSection
                key={index}
                userName={
                    item?.senderId == userData?.id
                        ? userData?.first_name
                            ? userData?.first_name
                            : "You"
                        : "Admin"
                }
                chat={item?.text}
                profile={userData?.profile_image}
                own={item?.senderId == userData?.id ? true : false}
                time={item?.createdAt}
            />
        )
    }

    const onMessageChat = async () => {

        console.log('does it coe to his function');
        // setLoading(true);
        try {
            var data = {
                msg: chat,

            };
            const resp = await postApiWithToken(
                userToken,
                CHAT_RECORD,
                data,
            );
            console.log('my response from tha chat---->>>', resp)
            if (resp?.data?.status) {
                Toast.show({ text1: resp?.data?.message || resp?.data?.Message });

            } else {
                Toast.show({ text1: resp?.data?.message || resp?.data?.Message });
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

        const resp = await postApiWithToken(
            userToken,
            CHAT_READ,
            '',
        );
        console.log('my response of read chattt-7777-->>>', resp?.data)
        if (resp?.data?.status) {
            Toast.show({ text1: resp?.data?.message || resp?.data?.Message });

        } else {
            Toast.show({ text1: resp?.data?.message || resp?.data?.Message });
        }


        setLoading(false);
    };
    return (
        <View style={styles.conatiner}>
            <View style={styles.headerContainer}>
                {/* <ImageBackground
                    source={require("../../assets/Icons/maskGroup-2.png")}
                    resizeMode="cover"
                    style={styles.chatImage}
                /> */}
                {/* <Header title="Chats" notificationButton={false} /> */}
                <MyHeader
                    Title={`You need help? Let’s chat.`}
                    isBackButton
                />
                {/* <Text style={styles.text}>You need help? Let’s chat.</Text> */}
            </View>

            {/* chats */}
            {/* <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            > */}
            <KeyboardAwareScrollView extraHeight={150} style={{ flex: 1, }}>
                <View style={{ height: dimensions.SCREEN_HEIGHT - 200, width: dimensions.SCREEN_WIDTH * 0.94, alignSelf: 'center', marginVertical: 12 }}>
                    <View style={styles.chatContainer}>
                        {chatArray?.length > 0 ? (
                            <FlatList
                                keyboardShouldPersistTaps="always"
                                inverted={true}
                                ref={flatlistRef}
                                data={chatArray}
                                renderItem={renderChat}
                                keyExtractor={(_, index) => index.toString()}
                                bounces={false}
                                contentContainerStyle={styles.flatlist}
                                getItemLayout={(data, index) => ({
                                    length: 0,
                                    offset: 0 * index,
                                    index
                                })}
                            />
                        ) : (
                            <View style={styles.noChatContainer}></View>
                        )}
                    </View>

                    {/* message send section */}
                    <View style={styles.sendMessageContainer}>
                        <View style={styles.textInputContainer}>
                            <TextInput
                                value={chat}
                                style={[styles.textInput, { color: 'black' }]}
                                onChangeText={chatHandler}
                                multiline={true}
                                placeholder="Type a message"
                            />
                            <TouchableOpacity style={styles.touch} onPress={documentPicker}>
                                {/* <Image
                                    source={require("../../Global/Images/share.svg")}
                                    resizeMode="contain"
                                    style={styles.attachedFiles}
                                /> */}
                                <Share></Share>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.sendButtonContainer}>
                            {console.log('my chat lenght---->>', chat.length)}
                            <TouchableOpacity
                                onPress={sendChatHandler}
                                style={{
                                    ...styles.sendButtonTouch,
                                    backgroundColor:
                                        chat.length > 0
                                            ? Color.PRIMARY
                                            : Color.PRIMARY
                                }}

                                disabled={chat.length === 0}
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
                </View>
            </KeyboardAwareScrollView>
        </View>

    )
}

export default AdminChat

const styles = StyleSheet.create({
    conatiner: {
        flex: 1
    },
    headerContainer: {
        position: "relative",
        height: responsiveHeight(18),
        // backgroundColor: Color.PRIMARY,
        // borderWidth: 1
    },
    chatImage: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%"
    },
    text: {
        marginTop: responsiveHeight(5),
        width: "100%",
        color: "white",
        textAlign: "center",
        fontSize: responsiveFontSize(2),
        fontWeight: "400",
        opacity: 0.7
    },
    chatContainer: {
        height: responsiveHeight(67),

    },
    flatlist: {
        paddingBottom: responsiveHeight(2)
    },
    sendMessageContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: "3%",
        // height: responsiveHeight(15)
    },
    textInputContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: responsiveHeight(6.5),
        width: responsiveWidth(77),
        borderRadius: responsiveHeight(5),
        elevation: 2,
        shadowColor: "rgba(137, 137, 137, .25)",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        backgroundColor: "white"
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
        height: "100%",
        width: "80%",
        paddingHorizontal: "5%",
        fontSize: responsiveFontSize(1.8),
        letterSpacing: 0.8
    },
    touch: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        paddingRight: responsiveWidth(4)
    },
    attachedFiles: {
        height: responsiveHeight(3),
        width: responsiveWidth(6)
    },
    sendButtonContainer: {
        height: responsiveHeight(5),
        width: responsiveHeight(5),
        borderRadius: responsiveHeight(2.5),
        overflow: "hidden"
    },
    sendButtonTouch: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%"
    },
    sendIcon: {
        height: responsiveHeight(2),
        width: responsiveWidth(5)
    },
    noChatContainer: {
        flex: 1
    }
})


