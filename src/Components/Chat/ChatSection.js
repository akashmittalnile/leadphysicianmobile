import { View, Text, StyleSheet, Image } from "react-native"
import React from "react"
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth
} from "react-native-responsive-dimensions"
import moment from "moment"
import Color from "../../Global/Color"
import MyText from "../MyText/MyText"
const ChatSection = ({ userName = "", own = true, chat = "", time = "", profile = "" }) => {
    { console.log('my profile image---->>>', profile) }
    const _username = [...userName]
    _username[0] = _username[0]?.toUpperCase()
    return (
        // <View
        //     style={{
        //         ...styles.container,
        //         alignSelf: own ? "flex-end" : "flex-start",
        //     }}
        // >
        //     <View
        //         style={{
        //             ...styles.chatContainer,
        //             borderBottomRightRadius: own ? 0 : responsiveWidth(5),
        //             borderBottomLeftRadius: own ? responsiveWidth(5) : 0,

        //         }}
        //     >
        //         <Text
        //             style={{
        //                 ...styles.userName,
        //                 color: own ? Color.PRIMARY : Color.PRIMARY,
        //                 opacity: own ? 0.7 : 1
        //             }}
        //         >
        //             {_username}
        //         </Text>
        //         <Text style={styles.chat}>{chat}</Text>
        //     </View>
        //     <Image
        //         source={
        //             profile
        //                 ? { uri: profile }
        //                 : require('../../Global/Images/user-default.png')
        //         }
        //         style={{ height: 64, width: 64, borderRadius: 50 }}
        //     />
        //     {time && (
        //         <Text style={{ ...styles.time, textAlign: own ? "right" : "left" }}>
        //             {time}
        //         </Text>
        //     )}
        // </View>
        <>
            {!own ?
                <View
                    style={{
                        alignSelf: own ? "flex-end" : "flex-start",
                        marginVertical: 5,
                    }}>
                    <View style={{ flexDirection: 'row', width: '70%' }}>

                        <Image
                            source={{
                                uri: profile,
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
                                borderTopLeftRadius: own ? 10 : 0,
                                borderBottomLeftRadius: own ? 0 : 10,
                                borderBottomRightRadius: own ? 0 : 10,
                                borderTopRightRadius: own ? 0 : 10,

                            }}>
                            <MyText
                                text={_username}
                                textColor={Color.PRIMARY}
                                textAlign={own ? 'right' : 'left'}
                                marginHorizontal={10}
                                marginTop={5}
                            />
                            <MyText
                                text={chat}
                                fontSize={16}
                                textColor="white"
                                textAlign={own ? 'right' : 'left'}
                                marginHorizontal={10}
                                marginVertical={10}
                            />
                            <MyText
                                text={moment(time).format('H:mm a')}
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
                : <View
                    style={{
                        alignSelf: 'flex-end',
                        marginVertical: 5,
                    }}>
                    <View style={{ flexDirection: 'row', width: '70%' }}>
                        <View
                            style={{
                                backgroundColor: Color.LIGHT_BLACK,
                                width: 'auto',
                                borderTopLeftRadius: own ? 10 : 0,
                                borderBottomLeftRadius: own ? 10 : 0,
                                borderBottomRightRadius: own ? 10 : 0,
                                borderTopRightRadius: own ? 0 : 10,
                                marginRight: 10,
                            }}>

                            <MyText
                                text={_username}
                                textColor={Color.PRIMARY}
                                textAlign="right"
                                marginHorizontal={10}
                                marginTop={5}
                            />
                            <MyText
                                text={chat}
                                fontSize={16}
                                textColor="white"
                                marginHorizontal={10}
                                marginVertical={10}
                                textAlign="right"
                            />
                            <MyText
                                text={moment(time).format('H:mm a')}
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
                                uri: profile,
                            }}
                            style={{
                                height: 50,
                                width: 50,
                                borderRadius: 100,
                            }}
                        />
                    </View>
                </View>}
        </>
    )
}

export default ChatSection

const styles = StyleSheet.create({
    container: {
        marginBottom: responsiveHeight(1.5),
        marginHorizontal: responsiveWidth(5),
        width: 'auto'
    },
    chatContainer: {
        paddingVertical: responsiveHeight(1.5),
        paddingHorizontal: responsiveWidth(5),
        backgroundColor: Color.LIGHT_BLACK,
        elevation: 2,
        shadowColor: "rgba(137, 137, 137, .25)",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        borderTopRightRadius: responsiveWidth(5),
        borderTopLeftRadius: responsiveWidth(5),

    },
    userName: {
        marginBottom: responsiveHeight(0.7),
        fontSize: responsiveFontSize(1.6),
        fontWeight: "700",
        color: 'pink'
    },
    chat: {
        color: Color.WHITE,
        opacity: 0.7,
        lineHeight: responsiveHeight(2.3),
        letterSpacing: 0.7
    },
    time: {
        marginTop: responsiveHeight(1),
        fontSize: responsiveFontSize(1.4),
        color: "black",
        opacity: 0.6
    }
})
