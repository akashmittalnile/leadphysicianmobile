
import React, { useState, useEffect } from 'react';
import { Text, View, Image, ActivityIndicator, tyleSheet, Button, TouchableOpacity, StyleSheet, Dimensions, TextInput, ScrollView, SafeAreaView, KeyboardAvoidingView, ImageBackground, PermissionsAndroid, } from 'react-native'
import { requestPostApi, REGISTER, postAPI, getApiWithToken, GET_PROFILE, PROFILE } from '../../Global/Service'
import { useDispatch } from 'react-redux';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
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
import Google from '../../Global/Images/googleIcon.svg';
import { connect, useSelector } from 'react-redux';
import { setUser } from '../../reduxToolkit/reducer/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Facebook from '../../Global/Images/facebookLogo.svg'
import { useIsFocused } from "@react-navigation/native";
const EditProfile = ({ navigation }) => {
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
    const [profile, setProfile] = useState('')
    const [isimageChange, setisimageChange] = useState(false);
    const [showImageSourceModal, setShowImageSourceModal] = useState(false);
    const isFocus = useIsFocused()
    const resetIndexGoToBottomTab = CommonActions.reset({
        index: 1,
        routes: [{ name: 'Profile' }],
    });
    //variables : redux
    const userToken = useSelector(state => state.user.userToken);
    const user = useSelector(state => state.user.userInfo);
    console.log(user.id, 'mu user')
    //
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoading(true);
            getCartCount()
            setLoading(false);
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [isFocus]);
    const Validation = () => {
        if (String(fullname).trim().length == 0) {
            Toast.show({ type: 'error', text1: 'Please enter First Name' });
            return false;
        }
        else if (String(fullname).length > 11) {
            Toast.show({ type: 'error', text1: 'First name should not be more than 10 characters' });
            return false;


        } else if (lastName == '') {
            Toast.show({ type: 'error', text1: 'Please enter Last Name' });
            return false;
        }
        else if (String(lastName).length > 11) {
            Toast.show({ type: 'error', text1: 'Last name should not be more than 10 characters' });
            return false;


        }

        else if (phoneno == '') {
            console.log('my phoneo legth-->>', phoneno);
            Toast.show({ type: 'error', text1: 'Please enter Phone Number' });
            return false;
        }

        else if (phoneno.length != 14) {
            console.log('my phoneo legth-->>', phoneno.length);
            Toast.show({ type: 'error', text1: 'Please enter valid Phone Number' });
            return false;
        }
        // else if (filePath == '') {
        //     Toast.show({ type: 'error', text1: 'Please upload Profile Image', });
        //     return false;
        // }
        return true;
    };
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
                Toast.show({ text1: response.errorMessage });
                setShowImageSourceModal(false);
                return;
            }
            console.log('Response = ', response.assets[0]);
            setFilePath(response.assets[0]);
            setShowImageSourceModal(false);
            setisimageChange(true)
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
                    Toast.show({ text1: `Storage Permission Not Granted` });
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
                // Toast.show({ text1: 'Camera not available on device' });
                // Alert.alert('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                setShowImageSourceModal(false);
                // Toast.show({ text1: 'Permission not satisfied' });
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
                setisimageChange(true)
            }
            setShowImageSourceModal(false);
        });
    };

    const signUpUser = async () => {
        console.log('did it come into the functinnnn');
        if (!Validation()) {
            return;
        }
        var url = PROFILE
        var murl = `/` + user.id
        url = url + murl
        console.log('my url for the edit-->>', url);
        try {
            const formaData = new FormData();
            console.log('my filePAth--->>', filePath.length);
            if (filePath.length != 0) {
                const imageName = filePath?.uri?.slice(
                    filePath?.uri?.lastIndexOf('/'),
                    filePath?.uri?.length,
                );
                formaData.append('profile_image', {
                    name: imageName,
                    type: filePath?.type,
                    uri: filePath?.uri,
                });
            }
            formaData.append('first_name', fullname);
            formaData.append('last_name', lastName);
            formaData.append('email', emailid);
            formaData.append('phone', phoneno);
            // formaData.append('password', password);
            setLoading(true);

            setLoading(true);
            console.log('my uiuiui--->>', formaData)

            const resp = await postAPI(url
                , formaData, userToken);
            console.log('my respinseee--->>', resp.response);
            if (resp.status === true) {
                // Handle successful response
                Toast.show({ text1: resp.response.message });
                console.log('my response for signup?????--->>', resp)
                const jsonValue = JSON.stringify(resp.response.data);
                console.log('my repsonse value-->>,', jsonValue);
                AsyncStorage.setItem('userInfo', jsonValue);
                dispatch(setUser(resp?.response?.data));
                navigation.goBack()
            } else {
                console.log('my response for signup?????--->>', resp)
                Toast.show({ text1: resp.response.message });
                // Handle error response
            }
        } catch (err) {

            console.log('error in signUpUser ioioi---->>>', err);
        }
        setLoading(false);
    };
    //get profile data
    const getCartCount = async () => {

        try {
            setLoading(true);
            const resp = await getApiWithToken(userToken, GET_PROFILE);
            console.log('myprofile dataaa---->>', resp?.data?.data?.profile_image)

            if (resp?.data?.success) {
                setProfile(resp?.data?.data?.profile_image)
                setFullname(resp?.data?.data?.first_name)
                setLastName(resp?.data?.data?.last_name)
                setEmailid(resp?.data?.data?.email)
                setPhoneno(resp?.data?.data?.phone)
                setPassword(resp?.data?.data?.password)
                setLoading(false);
            } else {
                Toast.show({ text1: resp.data.message });
                setLoading(false);
            }
        } catch (error) {
            console.log('error in getCartCount', error);
        }
        setLoading(false);
    };
    //format phone number
    const formatPhoneNumber = (number) => {
        console.log('');
        // Remove any non-numeric characters
        const cleanedNumber = number.replace(/[^\d]/g, '');

        // Apply US phone number format
        const formattedNumber = cleanedNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');

        return formattedNumber;
    };
    // const formatPhoneNumber = (number) => {
    //     // Remove any non-numeric characters
    //     const cleanedNumber = number.replace(/[^\d]/g, '');

    //     // Take only the first 10 digits
    //     const truncatedNumber = cleanedNumber.slice(0, 10);

    //     // If the number is less than 10 digits, return empty string
    //     if (truncatedNumber.length < 10) {
    //         console.log('my length of truncated--->>', truncatedNumber.length
    //         );
    //         return '';
    //     }

    //     // Apply US phone number format
    //     const formattedNumber = truncatedNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');

    //     return formattedNumber;
    // };

    const handleChange = (value) => {
        console.log('my handel name---->>>', value);
        setPhoneno(formatPhoneNumber(value));
    };

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <MyHeader
                    Title={`Edit Profile`}
                    isBackButton
                />
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        marginTop: 40
                    }}
                    onPress={() => {
                        setShowImageSourceModal(true);
                    }}
                >
                    {/* {filePath == '' ? (
                        <Image source={require('../../Global/Images/userDefault.png')} style={{ height: 150, width: 150, borderRadius: 100 }} />
                    ) : (
                        <Image
                            resizeMode="cover"
                            borderRadius={1000}
                            source={{ uri: filePath.uri }}
                            style={{ height: 150, width: 150, borderRadius: 100 }}
                        />
                    )} */}
                    <Image source={
                        isimageChange ?
                            {
                                uri: filePath.uri,
                            } :
                            profile != null ? { uri: profile }
                                :
                                require('../../Global/Images/userDefault.png')
                    }


                        style={{ width: 150, height: 150, borderRadius: 100 }} />
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
                        <View style={{
                            height: 64,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            borderRadius: 5,

                            flexDirection: 'row',
                            justifyContent: "center",
                            alignItems: "center",
                            paddingHorizontal: 10,
                            alignSelf: 'center',
                            borderWidth: 1,
                            height: 64,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            borderRadius: 5,
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            paddingHorizontal: 10,
                            borderWidth: 1,
                            borderColor: '#959FA6',
                            paddingRight: 40
                        }}>
                            <EmailSvg width={24} height={24} />
                            <Text style={{ width: '90%', color: 'black' }}>{emailid}</Text>
                        </View>
                        {/* <CustomTextBox
                            imageComponent={<EmailSvg width={24} height={24} />}
                            //  placeholder='Email address'
                            value={emailid}
                            // onChangeText={(text) => {
                            //     setEmailid(text)
                            // }}
                            placeholder={'Email Address'}
                        >
                        </CustomTextBox> */}

                    </View>
                    <View style={{ marginTop: 12 }}>
                        <CustomTextBox
                            maxLength={10}
                            imageComponent={<Call width={24} height={24} />}
                            //  placeholder='Email address'
                            value={phoneno}
                            // onChangeText={(text) => {
                            //     setPhoneno(text)
                            // }}

                            onChangeText={handleChange}
                            placeholder={'Phone'}
                        >
                        </CustomTextBox></View>
                    {/* <View style={{ marginTop: 12 }}>
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
                        </CustomTextBox></View> */}
                    <TouchableOpacity onPress={() => {
                        // navigation.goBack('')

                        signUpUser()
                    }} style={{ marginTop: 20 }}>
                        <CustomButtonBlue name="Save"></CustomButtonBlue>
                    </TouchableOpacity>


                </View>

                {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}
            </ScrollView>


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
    backgroundImg: { height: 333, width: dimensions.SCREEN_WIDTH, }
});
export default EditProfile;
