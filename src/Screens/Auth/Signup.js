
import React, { useState, useEffect } from 'react';
import { Text, View, Image, ActivityIndicator, tyleSheet, Button, TouchableOpacity, StyleSheet, Dimensions, TextInput, ScrollView, SafeAreaView, KeyboardAvoidingView, ImageBackground, PermissionsAndroid, } from 'react-native'
import { requestPostApi, REGISTER, postAPI } from '../../Global/Service'
import { useDispatch } from 'react-redux';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser, setUserToken } from '../../reduxToolkit/reducer/user';
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
import Google from '../../Global/Images/googleIcon.svg';
import Facebook from '../../Global/Images/facebookLogo.svg'
import Logo from '../../Global/Images/logo.svg'
import messaging from '@react-native-firebase/messaging';

const Signup = ({ navigation }) => {
    const H = Dimensions.get('screen').height;
    const W = Dimensions.get('screen').width;
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
    const [My_Alert, setMy_Alert] = useState(false)
    const [alert_sms, setalert_sms] = useState('')
    const [filePath, setFilePath] = useState('');
    const [fcmToken, setFcmToken] = useState('');
    const [showImageSourceModal, setShowImageSourceModal] = useState(false);
    const resetIndexGoToBottomTab = CommonActions.reset({
        index: 1,
        routes: [{ name: 'BottomTab' }],
    });
    const formatPhoneNumber = (number) => {
        // Remove any non-numeric characters
        const cleanedNumber = number.replace(/[^\d]/g, '');

        // Apply US phone number format
        const formattedNumber = cleanedNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');

        return formattedNumber;
    };

    const handleChange = (value) => {
        console.log('my handel name---->>>', value);
        setPhoneno(formatPhoneNumber(value));
    };
    const Validation = () => {
        var EmailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

        if (String(fullname).trim().length == 0) {
            Toast.show({ type: 'error', text1: 'Please enter First Name' });
            return false;
        } else if (lastName == '') {
            Toast.show({ type: 'error', text1: 'Please enter Last Name' });
            return false;
        }
        else if (emailid == '') {
            Toast.show({ type: 'error', text1: 'Please enter Email Address' });
            return false;
        }
        else if (!EmailReg.test(emailid)) {
            Toast.show({ type: 'error', text1: 'Plase enter Valid Emailid' })
            return false;
        }
        else if (phoneno == '') {
            Toast.show({ type: 'error', text1: 'Please enter Phone Number' });
            return false;
        }

        else if (phoneno.length != 14) {
            Toast.show({ type: 'error', text1: 'Please enter valid Phone Number' });
            return false;
        }
        else if (password == '') {
            Toast.show({ type: 'error', text1: 'Please enter Password' });
            return false;
        } else if (!regex.test(password)) {
            Toast.show({ type: 'error', text1: 'Password must has at least eight characters that include 1 lowercase character, 1 uppercase character, 1 number, and at least one special character.', })
        } else if (filePath == '') {
            Toast.show({ type: 'error', text1: 'Please upload Profile Image', });
            return false;
        }
        return true;
    };


    //device tokrnn
    const checkToken = async () => {
        try {
            const token = await messaging().getToken();
            if (token) {
                console.log('fcm token', token);
                setFcmToken(token);
            } else {
                console.log('could not get fcm token');
            }
        } catch (error) {
            console.log('error in getting fcm token', error);
        }
    };
    //useEffect
    useEffect(() => {
        checkToken();
    }, []);
    //function : imp function
    const openCamera = () => {
        const options = {
            width: 1080,
            height: 1080,
            cropping: true,
            mediaType: 'photo',
            compressImageQuality: 1,
            compressImageMaxHeight: 1080 / 2,
            compressImageMaxWidth: 1080 / 2,
        };
        launchCamera(options, response => {
            if (response.didCancel) {
                // Toast.show({ text1: 'User cancelled picking image' });
                setShowImageSourceModal(false);
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                // Toast.show({ text1: 'Camera not available on device' });
                setShowImageSourceModal(false);
                return;
            } else if (response.errorCode == 'permission') {
                // Toast.show({ text1: 'Permission not satisfied' });
                setShowImageSourceModal(false);
                return;
            } else if (response.errorCode == 'others') {
                // Toast.show({ text1: response.errorMessage });
                setShowImageSourceModal(false);
                return;
            }
            console.log('Response = ', response.assets[0]);
            setFilePath(response.assets[0]);
            setShowImageSourceModal(false);
        });
    };
    //function : imp function
    const checkCameraPermission = async () => {
        if (Platform.OS === 'ios') {
            openCamera();
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Storage Permission Required',
                        message:
                            'Application needs access to your storage to access camera',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    openCamera();
                    console.log('Storage Permission Granted.');
                } else {
                    Toast.show({ type: 'error', text1: `Storage Permission Not Granted` });
                    // Alert.alert('Error', 'Storage Permission Not Granted');
                }
            } catch (err) {
                // To handle permission related exception
                console.log('ERROR' + err);
            }
        }
    };
    //function : imp function
    const openLibrary = () => {
        let options = {
            title: 'Select Image',
            customButtons: [
                {
                    name: 'customOptionKey',
                    title: 'Choose Photo from Custom Option',
                },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchImageLibrary(options, response => {
            if (response.didCancel) {
                // Alert.alert('User cancelled camera picker');
                setShowImageSourceModal(false);
                // Toast.show({ text1: 'User cancelled image picker' });
                // Alert.alert('User cancelled image picker');
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                setShowImageSourceModal(false);
                Toast.show({ text1: 'Camera not available on device' });
                // Alert.alert('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                setShowImageSourceModal(false);
                Toast.show({ text1: 'Permission not satisfied' });
                // Alert.alert('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                setShowImageSourceModal(false);
                Toast.show({ text1: response.errorMessage });
                // Alert.alert(response.errorMessage);
                return;
            } else {
                setFilePath(response.assets[0]);
                setShowImageSourceModal(false);
            }
            setShowImageSourceModal(false);
        });
    };
    const signUpUser = async () => {
        if (!Validation()) {
            return;
        }



        try {
            const formaData = new FormData();
            const imageName = filePath?.uri?.slice(
                filePath?.uri?.lastIndexOf('/'),
                filePath?.uri?.length,
            );
            formaData.append('profile_image', {
                name: imageName,
                type: filePath?.type,
                uri: filePath?.uri,
            });
            formaData.append('first_name', fullname);
            formaData.append('last_name', lastName);
            formaData.append('email', emailid);
            formaData.append('phone', phoneno);
            formaData.append('password', password);
            formaData.append('device_id', fcmToken);
            setLoading(true);

            setLoading(true);
            console.log('my uiuiui--->>', formaData)

            const resp = await postAPI(REGISTER, formaData);
            console.log('my respinseee--->>', resp?.response);
            if (resp.status === true) {
                // Handle successful response

                console.log('sign in jsonValue', resp?.response?.user);
                await AsyncStorage.setItem('userToken', resp?.response?.authorization?.token);
                const jsonValue = JSON.stringify(resp?.response?.user);
                console.log('sign in jsonValue', jsonValue);
                await AsyncStorage.setItem('userInfo', jsonValue);
                console.log('sign in --------nValue', resp?.response?.authorization?.token);
                dispatch(setUserToken(resp?.response?.authorization?.token));
                console.log('after dispath');
                dispatch(setUser(resp?.response?.user));
                setLoading(false)
                navigation.dispatch(resetIndexGoToBottomTab);
            } else {
                console.log('my response for signup?????--->>', resp)
                Toast.show({ type: 'error', text1: resp.response.message });
                // Handle error response
            }
        } catch (err) {

            console.log('error in signUpUser ioioi---->>>', err);
        }
        setLoading(false);
    };
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            {/* <ScrollView
                contentContainerStyle={{ flexGrow: 1, }}
                keyboardShouldPersistTaps="always" bounces={false}
            > */}
            <ImageBackground source={require('../../Global/Images/BackgroundAuth.png')} style={styles.backgroundImg}>
                <CustomHeader navigation={navigation} text="Sign Up" />
                <Logo width={300} height={80} style={{ alignSelf: 'center', alignSelf: 'center', marginVertical: 30 }} ></Logo>

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1, }}
                >

                    <ScrollView keyboardShouldPersistTaps="always" bounces={false}>
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                marginTop: 38
                            }}
                            onPress={() => {
                                setShowImageSourceModal(true);
                            }}
                        >
                            {filePath == '' ? (
                                <Image source={require('../../Global/Images/userDefault.png')} style={{ height: 150, width: 150, borderRadius: 100 }} />
                            ) : (
                                <Image
                                    resizeMode="cover"
                                    borderRadius={1000}
                                    source={{ uri: filePath.uri }}
                                    style={{ height: 150, width: 150, borderRadius: 100 }}
                                />
                            )}
                            <Image source={require('../../Global/Images/camera.png')} style={{ height: 20, width: 20, position: 'absolute', bottom: 12, right: 130 }} />
                        </TouchableOpacity>
                        <View style={{
                            backgroundColor: 'white', width: '90%',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}>

                            <View style={{ marginTop: 20 }}>
                                <CustomTextBox
                                    imageComponent={<Profile width={24} height={24} />}
                                    value={fullname}
                                    // secureTextEntry={secureTextEntry}
                                    onChangeText={(text) => {
                                        setFullname(text)
                                    }}
                                    placeholder={'First Name'}
                                    style={{ marginHorizontal: 12 }}
                                />

                            </View>
                            <View style={{ marginTop: 12 }}>
                                <CustomTextBox
                                    imageComponent={<Profile width={24} height={24} />}
                                    value={lastName}
                                    // secureTextEntry={secureTextEntry}
                                    onChangeText={(text) => {
                                        setLastName(text)
                                    }}
                                    placeholder={'Last Name'}
                                    style={{ marginHorizontal: 12 }}
                                />

                            </View>
                            <View style={{ marginTop: 12 }}>
                                <CustomTextBox
                                    imageComponent={<EmailSvg width={24} height={24} />}
                                    //  placeholder='Email address'
                                    value={emailid}
                                    onChangeText={(text) => {
                                        setEmailid(text)
                                    }}
                                    placeholder={'Email Address'}
                                >
                                </CustomTextBox></View>
                            <View style={{ marginTop: 12 }}>
                                <CustomTextBox
                                    imageComponent={<Call width={24} height={24} />}
                                    //  placeholder='Email address'
                                    value={phoneno}
                                    // onChangeText={(text) => {
                                    //     setPhoneno(text)
                                    // }}
                                    onChangeText={handleChange}
                                    keyboardType='number-pad'
                                    placeholder={'Phone'}
                                >
                                </CustomTextBox></View>
                            <View style={{ marginTop: 12 }}>
                                <CustomTextBox
                                    imageComponent={< Lock
                                        width={24} height={24} />}
                                    placeholder='Password'
                                    value={password}
                                    onChangeText={(text) => {
                                        setPassword(text)
                                    }}
                                    secureTextEntry={true}
                                    style={{ color: 'black', }}
                                    placeholderTextColor='black'

                                >
                                </CustomTextBox></View>
                            <TouchableOpacity onPress={() => {
                                // navigation.navigate('Subscription')

                                signUpUser()
                            }} style={{ marginTop: 20 }}>
                                <CustomButtonBlue name="Sign Up"></CustomButtonBlue>
                            </TouchableOpacity>
                            <View style={{ alignSelf: 'center', marginTop: 10, flexDirection: 'row' }}>
                                <Text style={styles.myText}>Already have an account?
                                </Text>
                                <TouchableOpacity style={{ marginLeft: 3, marginBottom: 40 }} onPress={() => { navigation.navigate('SignIn') }}>
                                    <Text style={styles.textunderline}>Sign In</Text>
                                </TouchableOpacity>
                            </View>

                            {/* <View style={{ flexDirection: 'row', marginTop: 16, alignSelf: 'center' }}>
                        <View style={styles.line}>
                        </View>
                        <Text style={styles.txt}>OR</Text>
                        <View style={styles.line}>
                        </View>

                    </View>
                    <View style={{ marginBottom: 90, alignSelf: 'center', marginTop: 30, width: dimensions.SCREEN_WIDTH * 0.80 }}>
                        <View style={styles.socialView}>
                            <Google> </Google>
                            <Text style={styles.socialTxt}>Signup With Google</Text>
                        </View>
                        <View style={[styles.socialView, { marginTop: 12 }]}>
                            <Facebook> </Facebook>
                            <Text style={styles.socialTxt}>Signup With Google</Text>
                        </View>

                    </View> */}
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ImageBackground>



            {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
            {/* </ScrollView> */}


            {loading ? <Loader /> : null}
            <SelectImageSource
                visible={showImageSourceModal}
                setVisibility={setShowImageSourceModal}
                openLibrary={openLibrary}
                openCamera={checkCameraPermission}
            />
        </SafeAreaView >


    )
}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        flexDirection: 'row',
        width: '90%'
    },
    text: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 14,
        color: '#000000'
    },
    myText: { fontFamily: 'Inter', fontWeight: '500', fontSize: 12, color: Color.BLACK },
    textunderline: { fontFamily: 'Inter', fontWeight: '500', fontSize: 12, color: Color.PRIMARY, },
    ////styles const name = new type(arguments);
    body: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#132A3A',
        padding: 8,
        position: 'relative',
        overflow: 'hidden',
    },
    shape: {
        position: 'absolute',
        backgroundColor: '#fff',
        width: 1000,
        height: 1000,
        flexDirection: 'row',
        bottom: 0,
        transform: [{ rotate: '45deg' }],
        bottom: -450,
        left: -302,
        right: 0,
        borderRadius: 80,
        marginLeft: 'auto',
        marginRight: 'auto',

    },
    content: {
        position: 'relative',
        zIndex: 9,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    txt: {
        fontWeight: '400',
        fontSize: 13,
        color: '#132A3A',
        fontFamily: 'Roboto', paddingHorizontal: 12
    },
    line: { width: dimensions.SCREEN_WIDTH * 0.40, height: 1, backgroundColor: Color.BLACK, top: 8, },
    socialTxt: {
        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: '500',
        color: Color.LIGHT_BLACK, marginHorizontal: 10
    },
    socialView: {
        flexDirection: 'row',
        width: dimensions.SCREEN_WIDTH * 0.90,
        height: 60,
        borderRadius: 5,
        backgroundColor: Color.WHITE,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.13,
        shadowRadius: 13,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(247, 250, 235, 1)',
        elevation: 10
    },
    backgroundImg: { height: 553, width: dimensions.SCREEN_WIDTH, flex: 1, }
});
export default Signup;
