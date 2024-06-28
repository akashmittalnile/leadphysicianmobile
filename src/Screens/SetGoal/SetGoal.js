
import React, { useState, useEffect } from 'react';
import {
    Text, View, Image, ActivityIndicator, tyleSheet, Button, TouchableOpacity, StyleSheet, Dimensions, TextInput, ScrollView, SafeAreaView, KeyboardAvoidingView, ImageBackground, PermissionsAndroid, FlatList

} from 'react-native'
import moment from 'moment';
import { styles } from './SetGoalStyle';
import { requestPostApi, REGISTER, postAPI, SET_GOAL, postApiWithToken } from '../../Global/Service'
import { useDispatch } from 'react-redux';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import MyText from '../../Components/MyText/MyText';
import Toast from 'react-native-toast-message';
import Loader from '../../Components/Loader';
import axios from 'axios';
import MyAlert from '../../Global/MyAlert';
import CustomButtonBlue from '../../Components/CustomButtonBlue';
import CustomTextBox from '../../Components/CustomTextBox';
import Color from '../../Global/Color';
import { dimensions } from '../../Global/Color';
import SelectImageSource from '../../Modals/SelectImageSource';
import { CommonActions } from '@react-navigation/native';
// svg image
import Lock from '../../Global/Images/lock.svg';
import Profile from '../../Global/Images/profileCircle.svg';
import EmailSvg from '../../Global/Images/sms.svg';
import eye from '../../Global/Images/eye.svg';
import Call from '../../Global/Images/call.svg'
import CustomHeader from '../../Components/CustomHeader';
import MyHeader from '../../Components/MyHeader/MyHeader';
import CalendarImg from '../../Global/Images/calendarWhite.svg'
import Nodata from '../../Global/Images/lock-circle.svg'
import Google from '../../Global/Images/googleIcon.svg';
import Facebook from '../../Global/Images/facebookLogo.svg'
import { Calendar } from 'react-native-calendars';
import { connect, useSelector } from 'react-redux';
const SetGoal = ({ navigation }) => {
    const H = Dimensions.get('screen').height;
    const W = Dimensions.get('screen').width;
    const [multiLineText, setMultiLineText] = useState('');
    const userToken = useSelector(state => state.user.userToken);
    console.log('my iser token--->>', userToken);
    const userInfo = useSelector(state => state.user.userInfo);
    const dispatch = useDispatch();
    const countryCodes = [
        { code: '+1', label: 'United States' },
        { code: '+44', label: 'United Kingdom' },
        { code: '+91', label: 'India' },
        // Add more country codes as needed
    ];
    const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes[0].code);
    const [fullname, setFullname] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailid, setEmailid] = useState('')
    const [phoneno, setPhoneno] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState('')
    const [activeItem, setActiveItem] = useState('A-Type Goal')
    const [My_Alert, setMy_Alert] = useState(false)
    const [alert_sms, setalert_sms] = useState('')
    const [filePath, setFilePath] = useState('');
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [task, setTask] = useState('')
    const [goal, setGoal] = useState('')
    const [activeIndex, setActiveIndex] = useState(null); // State to track active item index
    const [goalSix, setGoalSix] = useState('')
    const [goalOneYear, setGoalOneYear] = useState('')
    const [goalWeek, setGoalWeek] = useState('')
    const [accountabilityPartner, setAccountabilityPartner] = useState('')
    const [showImageSourceModal, setShowImageSourceModal] = useState(false);
    const resetIndexGoToBottomTab = CommonActions.reset({
        index: 1,
        routes: [{ name: 'SignIn' }],
    });
    const physicianCourse = [{
        id:
            '1',
        title: 'A-Type Goal'
    },
    {
        id:
            '2',
        title: 'B-Type Goal'
    },
    {
        id:
            '3',
        title: 'C-Type Goal'
    }]
    useEffect(() => {
      
        setActiveIndex(0)
    
      return () => {
        
      }
    }, [])
    
    // Function to handle item press
    const handleItemPress = (index, item) => {
        { console.log('my seletcted item---->>', item) }
        setActiveIndex(index); // Set active item index
        setActiveItem(item)
    };
    const RenderSchdule = ({ item, index }) => {
        const backgroundColor = index === activeIndex ? Color.PRIMARY : 'white';
        const text = index === activeIndex ? 'white' : Color.PRIMARY;

        return (
            <TouchableOpacity style={[styles.groupView, { backgroundColor }]}
                onPress={() => handleItemPress(index, item.title)} // Call handleItemPress on press
            >
                <MyText text={item.title} fontWeight='600' fontSize={15} textColor={text} fontFamily='Roboto' style={{}} />
            </TouchableOpacity >
        )
    }
    const Validation = () => {
        { console.log('m goal----????', activeIndex !== 0 && (goalOneYear == '' || goal == '')); }
        { console.log('my selected dte>>>>>---->.', activeItem) }
        if (String(multiLineText).trim().length === 0) {
            Toast.show({ type: 'error', text1: 'Please enter C-Type goal statement' });
            return false;

        } else if (selectedDate === null) {
            Toast.show({ type: 'error', text1: 'Please enter the date when you will achieve this goal' });
            return false;
        }
        else if (task === '') {
            Toast.show({ type: 'error', text1: 'Please enter the details you will be needing to reach this goal' });
            return false;
        } else if (activeItem === '') {
            Toast.show({ type: 'error', text1: 'Please enter the steps to achieve the goal' });
            return false;
        }
        else if (activeIndex !== 0 && goal == '') {
            Toast.show({ type: 'error', text1: activeIndex === 1 ? 'Please enter what wil you accomplish in one week' : 'Please enter what wil you accomplish in six month' });
            return false;
        }

        // else if (activeIndex !== 0 && (goalOneYear === '' || goal === '')) {
        //     Toast.show({ type: 'error', text1: activeIndex === 1 ? 'Please enter what wil you accomplish in one month' : 'Please enter what wil you accomplish in one year' });
        //     return false;
        // }
        // else if (goalOneYear == '') {
        //     Toast.show({ text1: 'Please enter what wil you accomplish in one year' });
        //     return false;
        // }
        else if (accountabilityPartner == '') {
            Toast.show({ type: 'error', text1: 'Please enter your accountability partner' });
            return false;
        }
        return true;
    };

    const signUpUser = async () => {
        if (!Validation()) {
            return;
        }
        try {
            // const formaData = new FormData();
            // formaData.append('goal_statement', multiLineText);
            // formaData.append('achieve_date', selectedDate);
            // formaData.append('goal_for_me', task);
            // formaData.append('goal_type', activeItem);
            // formaData.append('one_month_milestones', goal);
            // formaData.append('one_year_goal', goalOneYear);
            // formaData.append('accountability_partner', accountabilityPartner);
            const data = {

                goal_statement: multiLineText,
                achieve_date: selectedDate,
                goal_for_me: task,
                goal_type: activeItem,
                six_month_milestones: goalSix,
                one_month_milestones: goal,
                one_year_goal: goalOneYear,
                accountability_partner: accountabilityPartner,
                one_week_milestones: goalWeek

            }
            console.log('my data for set goal--->>>', data)
            setLoading(true);
            const resp = await postApiWithToken(userToken, SET_GOAL, data);
            console.log('my respinseee--->>', resp.data.status);
            if (resp.data.status === true) {
                // Handle successful response
                Toast.show({ text1: resp.data.message });
                navigation.goBack()
                // navigation.dispatch(resetIndexGoToBottomTab);
            } else {
                console.log('my response for signup?????--->>', resp)
                Toast.show({ text1: resp.data.message });
                // Handle error response
            }
        } catch (err) {

            console.log('error in signUpUser ioioi---->>>', err);
        }
        setLoading(false);
    };
    const toggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };
    const handleDayPress = day => {
        setSelectedDate(day.dateString);
        toggleCalendar(); // Close calendar after selecting a date
    };
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <MyHeader
                    Title={`Set Your Goal`}
                    isBackButton
                />


                <View style={{
                    backgroundColor: 'white', width: '90%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}>

                    <View style={{ marginTop: 26 }}>
                        <MyText text='What steps Will I Take To Get There Now?' fontWeight='700' fontSize={14} textColor={'#000000'} fontFamily='Roboto' style={{ marginBottom: 15 }} />
                        <FlatList
                            horizontal={true}
                            data={physicianCourse}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={RenderSchdule}
                            ListEmptyComponent={() => (
                                <View style={{
                                    alignSelf: 'center', justifyContent: 'center', width: dimensions.SCREEN_WIDTH * 0.90, flex: 1,
                                    alignItems: 'center', height: dimensions.SCREEN_HEIGHT * 0.60
                                }}>
                                    <Nodata style={{ alignSelf: 'center' }} height={119} width={119}></Nodata>
                                    <MyText text={'No data found !'} fontWeight='500' fontSize={24} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' style={{ alignSelf: 'center', top: 4 }} />
                                    <MyText text={'Oops! this information is not available for a moment'} fontWeight='400' fontSize={16} textColor={'#959FA6'} fontFamily='Roboto' style={{ alignSelf: 'center', textAlign: 'center', width: dimensions.SCREEN_WIDTH * 0.60, top: 4 }} />

                                </View>
                            )}
                        />
                    </View>
                    {console.log('my active item-->', activeItem)}
                    <View style={{ marginTop: 22 }}>
                        <MyText text={`My ${activeItem} Statement`} fontWeight='bold' fontSize={16} textColor={'#000000'} fontFamily='Roboto' style={{ marginBottom: 15 }} />

                        <TextInput
                            style={styles.input}
                            multiline={true}
                            numberOfLines={4} // You can ad <Text style={styles.placeholder}>Type here...</Text>
                            placeholder="Type here..."
                            value={multiLineText}
                            onChangeText={text => setMultiLineText(text)}
                            textAlignVertical="top"
                        />
                    </View>


                    <View style={{ marginTop: 26 }}>
                        <MyText text='When will I Achieve This?' fontWeight='700' fontSize={14} textColor={'#000000'} fontFamily='Roboto' style={{ marginBottom: 15 }} />
                        <TouchableOpacity style={styles.calendarView} onPress={toggleCalendar}>
                            <Text
                                style={{


                                    marginHorizontal: 14,
                                    color: Color.BLACK,
                                }}>
                                {selectedDate === null ? 'Select Date' : moment(selectedDate).format('MM/DD/YYYY')}
                            </Text>
                            <View style={styles.calendarImg}>

                                <CalendarImg style={{ alignSelf: 'center' }}></CalendarImg>
                            </View>
                        </TouchableOpacity>
                    </View>


                    {console.log('my time calendar----->>>>', isCalendarOpen)}
                    {isCalendarOpen && (
                        <Calendar
                            style={{
                                borderWidth: 1,
                                borderColor: 'gray',
                                height: 350,
                            }}
                            markingType="custom"
                            minDate={new Date()}
                            theme={{
                                backgroundColor: '#ffffff',
                                calendarBackground: '#ffffff',
                                textSectionTitleColor: Color.LIGHT_BLACK,
                                selectedDayBackgroundColor: Color.PRIMARY,
                                selectedDayTextColor: '#ffffff',
                                todayTextColor: Color.PRIMARY,
                                dayTextColor: Color.LIGHT_BLACK,
                                textDisabledColor: 'grey',
                            }}
                            onDayPress={handleDayPress}
                            markedDates={{
                                [selectedDate]: {
                                    selected: true,
                                    disableTouchEvent: true,
                                    customStyles: {
                                        container: {
                                            backgroundColor: Color.PRIMARY,
                                            borderRadius: 6, // Adjust the border radius for a square shape
                                            cursor: 'pointer', // Change cursor shape to pointer
                                        },
                                        text: {
                                            color: 'white',
                                        },
                                    },
                                },
                            }}
                        />
                    )}
                    <View style={{ marginTop: 22 }}>
                        <MyText text={`What will it Take For Me To Get This Done? `} fontWeight='bold' fontSize={16} textColor={'#000000'} fontFamily='Roboto' style={{ marginBottom: 15 }} />

                        <TextInput
                            style={styles.input}
                            multiline={true}
                            numberOfLines={4} // You can ad <Text style={styles.placeholder}>Type here...</Text>
                            placeholder="Type here..."
                            value={task}
                            onChangeText={text => setTask(text)}
                            textAlignVertical="top"
                        />
                    </View>
                    {console.log('my active index--->>', activeIndex)}
                    {activeIndex === 0 ?
                        null : <View style={{ marginTop: 26 }}>

                            <MyText text={activeIndex === 1 ? `In One Week , I Will Accomplish` : `In Six Month , I Will Accomplish`} fontWeight='700' fontSize={14} textColor={'#000000'} fontFamily='Roboto' style={{ marginBottom: 15 }} />
                            {activeIndex === 1 ? <TextInput
                                style={styles.input}
                                multiline={true}
                                numberOfLines={4} // You can ad <Text style={styles.placeholder}>Type here...</Text>
                                placeholder="Type here..."
                                value={goalWeek}
                                onChangeText={text => setGoalWeek(text)}
                                textAlignVertical="top"
                            /> :
                                <TextInput
                                    style={styles.input}
                                    multiline={true}
                                    numberOfLines={4} // You can ad <Text style={styles.placeholder}>Type here...</Text>
                                    placeholder="Type here..."
                                    value={goalSix}
                                    onChangeText={text => setGoalSix(text)}
                                    textAlignVertical="top"
                                />}
                        </View>}
                    {activeIndex === 0 ?
                        null : <View style={{ marginTop: 26 }}>
                            <MyText text={activeIndex === 1 ? 'In One Month , I Will Accomplish' : 'In One Year , I Will Accomplish'} fontWeight='700' fontSize={14} textColor={'#000000'} fontFamily='Roboto' style={{ marginBottom: 15 }} />
                            {activeIndex === 1 ? <TextInput
                                style={styles.input}
                                multiline={true}
                                numberOfLines={4} // You can ad <Text style={styles.placeholder}>Type here...</Text>
                                placeholder="Type here..."
                                value={goal}
                                onChangeText={text => setGoal(text)}
                                textAlignVertical="top"
                            /> : <TextInput
                                style={styles.input}
                                multiline={true}
                                numberOfLines={4} // You can ad <Text style={styles.placeholder}>Type here...</Text>
                                placeholder="Type here..."
                                value={goalOneYear}
                                onChangeText={text => setGoalOneYear(text)}
                                textAlignVertical="top"
                            />}
                        </View>}
                    {/* {activeIndex === 3 ?
                        <View style={{ marginTop: 26 }}>
                            <MyText text='In One Year , I Will Accomplish' fontWeight='700' fontSize={14} textColor={'#000000'} fontFamily='Roboto' style={{ marginBottom: 15 }} />
                            <TextInput
                                style={styles.input}
                                multiline={true}
                                numberOfLines={4} // You can ad <Text style={styles.placeholder}>Type here...</Text>
                                placeholder="Type here..."
                                value={goalOneYear}
                                onChangeText={text => setGoalOneYear(text)}
                                textAlignVertical="top"
                            />
                        </View> : null} */}
                    <View style={{ marginTop: 26 }}>
                        <MyText text='My Accountability Partner Is:' fontWeight='700' fontSize={14} textColor={'#000000'} fontFamily='Roboto' style={{ marginBottom: 15 }} />
                        <TextInput
                            style={styles.input}
                            multiline={true}
                            numberOfLines={4} // You can ad <Text style={styles.placeholder}>Type here...</Text>
                            placeholder="Type here..."
                            value={accountabilityPartner}
                            onChangeText={text => setAccountabilityPartner(text)}
                            textAlignVertical="top"
                        />
                    </View>
                    <View style={{ marginTop: 26 }}>

                    </View>

                </View>

                {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
            </ScrollView>
            <View style={{ height: 100, width: '100%', backgroundColor: '#F7FAEB', borderTopRightRadius: 20, borderTopLeftRadius: 20, borderWidth: 1, borderColor: Color.PRIMARY, justifyContent: 'center' }}>
                <TouchableOpacity style={{ width: dimensions.SCREEN_WIDTH * 0.80, height: 50, backgroundColor: Color.PRIMARY, alignSelf: 'center', borderRadius: 10, justifyContent: 'center' }} onPress={() => { signUpUser() }}>
                    <MyText text='Save & Set Your Goal' fontWeight='700' fontSize={14} textColor={Color.WHITE} fontFamily='Roboto' style={{ alignSelf: 'center' }} />
                </TouchableOpacity>
                {/* Content for the bottom view */}
            </View>

            {loading ? <Loader /> : null}

        </SafeAreaView >


    )
}

export default SetGoal;
