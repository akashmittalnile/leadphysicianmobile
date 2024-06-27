
import React, { useState, useEffect } from 'react';
import { Text, View, Image, ActivityIndicator, tyleSheet, Button, TouchableOpacity, StyleSheet, Dimensions, TextInput, ScrollView, SafeAreaView, KeyboardAvoidingView, ImageBackground } from 'react-native'
import Toast from 'react-native-toast-message';
import { styles } from './SubscriptionCardStyle';
import Loader from '../../Components/Loader';
import MyText from '../../Components/MyText/MyText';
import MyAlert from '../../Global/MyAlert';
import CustomButtonBlue from '../../Components/CustomButtonBlue';
import CustomTextBox from '../../Components/CustomTextBox';
import Color from '../../Global/Color';
import { dimensions } from '../../Global/Color';
import AppIntroSlider from 'react-native-app-intro-slider';
import CustomHeader from '../../Components/CustomHeader';
// svg image
import Tick from '../../Global/Images/subscriptionTick.svg'
import Paypal from '../../Global/Images/paypal.svg';
import Cards from '../../Global/Images/cards.svg'

const SubscriptionCard = ({ navigation }) => {
    const H = Dimensions.get('screen').height;
    const W = Dimensions.get('screen').width;
    const countryCodes = [
        { code: '+1', label: 'United States' },
        { code: '+44', label: 'United Kingdom' },
        { code: '+91', label: 'India' },
        // Add more country codes as needed
    ];
    const banner = [
        {
            id: '1',
            img: require('../../Global/Images/silverMembership.png'),
            price: '$9.99',
            type: `Silver Membership`,
            list: [{
                id: '1',
                title: 'Course with all modules '
            },

            { id: '2', title: 'All Worksheets' },
            ]
        },
        {
            id: '2',
            img: require('../../Global/Images/goldMembership.png'),
            price: '$20.10',
            type: `Gold Membership`,
            list: [{
                id: '1',
                title: 'Course with all modules ',
                title: 'All Worksheets'
            },
            { id: '3', title: 'Scheduler' },
            { id: '4', title: 'Group Chat' },
            { id: '5', title: 'Chat Module' },
            ]
        },
        {
            id: '3',
            img: require('../../Global/Images/PlataniumMembership.png'),
            price: '$15.99',
            type: 'Platinum Membership',
            list: [{
                id: '1',
                title: 'Course with all modules ',
                title: 'All Worksheets'
            },
            { id: '3', title: 'Scheduler' },

            ]
        }
    ]
    const renderNextButton = () => null
    const renderDoneButton = () => null;


    const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes[0].code);
    const [fullname, setFullname] = useState('')
    const [emailid, setEmailid] = useState('')
    const [phoneno, setPhoneno] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState('')
    const [My_Alert, setMy_Alert] = useState(false)
    const [alert_sms, setalert_sms] = useState('')

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: Color.WHITE }}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}

            >
                <CustomHeader navigation={navigation} text="Subsiption" type={'subscription'} />

                <View style={{
                    backgroundColor: 'white', width: '95%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: dimensions.SCREEN_WIDTH * 0.93, marginTop: 60, alignSelf: 'center' }}>
                        <View style={[styles.optionView, { borderRadius: 10, flexDirection: 'row', alignItems: 'center' }]}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 55 }}>
                                <Paypal />
                                <MyText
                                    text='PayPal'
                                    fontWeight='bold'
                                    fontSize={14}
                                    textColor={Color.LIGHT_BLACK}
                                    fontFamily='Roboto'
                                    style={{ marginLeft: 8 }}
                                />
                            </View>
                            <Tick style={{ position: 'absolute', right: 10, top: 10 }} />
                        </View>

                        <View style={[styles.optionView, { borderRadius: 10, flexDirection: 'row', alignItems: 'center' }]}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 55 }}>
                                <Cards />
                                <MyText
                                    text='Card'
                                    fontWeight='bold'
                                    fontSize={14}
                                    textColor={Color.LIGHT_BLACK}
                                    fontFamily='Roboto'
                                    style={{ marginLeft: 8 }}
                                />
                            </View>
                            <Tick style={{ position: 'absolute', right: 10, top: 10 }} />
                        </View>
                    </View>

                    <TouchableOpacity style={{ width: dimensions.SCREEN_WIDTH * 0.90, height: 50, backgroundColor: Color.PRIMARY, alignSelf: 'center', borderRadius: 6, marginVertical: 60, justifyContent: 'center' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 14, color: Color.WHITE }}>Pay</Text>
                    </TouchableOpacity>


                </View>

                {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
            </ScrollView>


            {loading ? <Loader /> : null}
        </SafeAreaView >


    )
}

export default SubscriptionCard;
