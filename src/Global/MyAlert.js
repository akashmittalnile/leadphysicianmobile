import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import Color from './Color';
const dimensions = {
    SCREEN_WIDTH: Dimensions.get('window').width,
    SCREEN_HEIGHT: Dimensions.get('window').height
};
const MyAlert = (props) => {

    return (
        <View style={{ width: '100%', height: dimensions.SCREEN_HEIGHT, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignSelf: 'center', position: 'absolute' }}>
            <View style={{ alignSelf: 'center', width: '70%', padding: '5%', backgroundColor: Color.BG_COLOR, borderRadius: 15 }}>
                {props.sms2 ?
                    <Text style={{ textAlign: 'center', color: Color.TEXT_COLOR, fontSize: 14, fontWeight: 'bold' }}>{props.sms2}</Text>
                    :
                    null
                }
                <Text style={{ textAlign: 'center', color: Color.TEXT_COLOR, fontSize: 14, fontWeight: 'bold' }}>{props.sms}</Text>

                <View style={{ width: '90%', height: 35, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 20, alignSelf: 'center' }}>
                    {props.canclePress ?
                        <TouchableOpacity style={{ width: '45%', height: '100%', backgroundColor: props.backgroundColor ? props.backgroundColor : 'red', justifyContent: 'center', borderRadius: 10 }}
                            onPress={() => { props.canclePress() }}>
                            <Text style={{ textAlign: 'center', color: 'black' }}>{props.btn1name ? props.btn1name : 'Cancel'}</Text>
                        </TouchableOpacity>
                        :
                        null
                    }
                    <TouchableOpacity style={{ width: '45%', height: '100%', backgroundColor: props.backgroundColor ? props.backgroundColor : Color.ORANGE, justifyContent: 'center', borderRadius: 10 }}
                        onPress={() => { props.okPress() }}>
                        <Text style={{ textAlign: 'center', color: 'black' }}>{props.btn2name ? props.btn2name : 'Ok'}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}
export default MyAlert
