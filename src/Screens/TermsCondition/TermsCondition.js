import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Image,
    ScrollView, FlatList, Linking,
    TouchableOpacity, SafeAreaView, Alert, TextInput, Platform, Modal
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react'
import { dimensions } from '../../Global/Color';
import moment from 'moment';
// import { Mycolors, dimensions } from '../../utility/Mycolors';
import MyText from '../../Components/MyText/MyText';
import { styles } from './ScheduleStyle';
import { setLoading, saveUserResult } from '../../redux/actions/user_action';
import WebView from 'react-native-webview';
import Color from '../../Global/Color';

import { connect, useSelector } from 'react-redux';
import { useIsFocused } from "@react-navigation/native";


// const axios = require('axios');
const TermsCondition = ({ navigation, route }) => {
    console.log(' my params fo the url', route.params);
    const [DATA2, setDATA2] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
    const [selected, setselected] = useState(true)
    const [click1, setclick1] = useState('Mon')
    const [webViewVisible, setWebViewVisible] = React.useState(false);
    // const dispatch = useDispatch();
    // const user = useSelector(state => state.user.user_details)
    const [DATA, setDATA] = useState(null)
    // const isKeyboardOpen = useKeyboard();
    const [My_Alert, setMy_Alert] = useState(false)
    const [alert_sms, setalert_sms] = useState('')
    const [loading, setLoading] = useState(false)
    const [opendateModal, setopenDateModal] = useState(false);
    const [title, setTitle] = useState('')
    const [lode, setlode] = useState(true)
    const [date, setDate] = useState(new Date());
    console.log('my new data---->>>', new Date());
    const [displaydate, setdisplaydate] = useState('Choose Date')
    const [apiDate, setapiDate] = useState('2024-01-01')
    const [events, setEvents] = useState([

    ]);
    const isFocus = useIsFocused()

    useEffect(() => {
        setLoading(true);
        // getDetails()
        setLoading(false);
    }, []);
    const userToken = useSelector(state => state.user.userToken);
    const user = useSelector(state => state.user.userInfo);
    console.log('my user Toeknnn--->>>', user);
    useEffect(() => {
        //  getdates()
        setWebViewVisible(true)
    }, [])
    const handlePress = () => {
        setWebViewVisible(true);
    };

    const handleCloseWebView = () => {
        setWebViewVisible(false);
        navigation.navigate('BottomTab')
    };



    return (
        <SafeAreaView style={{ backgroundColor: '#E8ECF2', flex: 1 }}>







            <Modal
                visible={webViewVisible}
                animationType="slide"
                transparent={false}
            >
                <View style={{ flex: 1 }}>
                    {console.log('my webview url---?>>', JSON.stringify(title))}
                    <WebView
                        source={
                            route?.params?.params === 'Privacy' ?
                                {
                                    uri:
                                        'https://www.leadphysician.org/pages/terms'
                                } : route?.params?.params === 'About' ?
                                    {
                                        uri:
                                            'https://www.leadphysician.org/about-us'
                                    } :

                                    route?.params?.params === 'Facebook' ?
                                        {
                                            uri:
                                                'http://facebook.com/groups/DrKoh/'
                                        } :
                                        route?.params?.params === 'Youtube' ?
                                            {
                                                uri:
                                                    'http://bit.ly/DrKohYouTube'
                                            } :
                                            route?.params?.params === 'Instagram' ?
                                                {
                                                    uri:
                                                        'http://instagram.com/dr.elsiekoh/?hl=en'
                                                }

                                                :
                                                route?.params?.params === 'Linkdin' ?
                                                    {
                                                        uri:
                                                            'http://linkedin.com/in/elsie-koh-md'
                                                    }
                                                    :
                                                    route?.params?.params === 'Twitter' ?
                                                        {
                                                            uri:
                                                                'http://www.twitter.com/DrElsieKoh'
                                                        }


                                                        :
                                                        {
                                                            uri:
                                                                'https://www.leadphysician.org/pages/privacy-policy'
                                                        }}
                    // Other WebView props...
                    />
                    <TouchableOpacity onPress={handleCloseWebView} style={{ backgroundColor: Color.PRIMARY, height: 60, justifyContent: 'center' }}>
                        {/* Close button or any UI to close the WebView */}
                        <Text style={{ fontFamily: 'Inter', fontSize: 16, color: 'white', fontWeight: '600', alignSelf: 'center' }}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            {/* </View>*/}
            {/* {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null} */}
            {/* {loading ? <Loader /> : null} */}
        </SafeAreaView>
    )
}

export default TermsCondition







