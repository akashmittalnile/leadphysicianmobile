import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  tyleSheet,
  Button,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  ImageBackground,
  Platform,
  Keyboard,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Loader from '../../Components/Loader';
import MyText from '../../Components/MyText/MyText';
import MyAlert from '../../Global/MyAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButtonBlue from '../../Components/CustomButtonBlue';
import CustomTextBox from '../../Components/CustomTextBox';
import Color from '../../Global/Color';
import {dimensions} from '../../Global/Color';
import {
  requestPostApi,
  LOGIN,
  VERIFY_OTP_AUTH,
  FORGOT_PASSWORD,
} from '../../Global/Service';
import {CommonActions} from '@react-navigation/native';
// svg image
import {useDispatch} from 'react-redux';
import Lock from '../../Global/Images/lock.svg';
import Profile from '../../Global/Images/profileCircle.svg';
import EmailSvg from '../../Global/Images/sms.svg';
import eye from '../../Global/Images/eye.svg';
import Call from '../../Global/Images/call.svg';
import CustomHeader from '../../Components/CustomHeader';
import {setUser, setUserToken} from '../../reduxToolkit/reducer/user';
import messaging from '@react-native-firebase/messaging';

import Logo from '../../Global/Images/logo.svg';
import {Fonts} from '../../Global/Index';

const VerifyCode = ({navigation, route}) => {
  //variables : useRef
  const firstCodeRef = useRef();
  const secondCodeRef = useRef();
  const thirdCodeRef = useRef();
  const forthCodeRef = useRef();

  //states
  const [firstCode, setfirstCode] = useState('');
  const [secondCode, setsecondCode] = useState('');
  const [thirdCode, setthirdCode] = useState('');
  const [forthCode, setforthCode] = useState('');
  const [otp, setOTP] = useState(route?.params?.otp);

  const H = Dimensions.get('screen').height;
  const W = Dimensions.get('screen').width;
  const dispatch = useDispatch();
  const countryCodes = [
    {code: '+1', label: 'United States'},
    {code: '+44', label: 'United Kingdom'},
    {code: '+91', label: 'India'},
    // Add more country codes as needed
  ];
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    countryCodes[0].code,
  );
  const [emailid, setEmailid] = useState(route?.params?.email);
  //   const [password, setPassword] = useState('Ssuser@123');
  const [loading, setLoading] = useState('');
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');

  //useEffect
  useEffect(() => {
    // console.log("params.---data ata verifycode screen",route?.params);
  }, []);

  const clearText = () => {
    setfirstCode('');
    setsecondCode('');
    setthirdCode('');
    setforthCode('');
  };
  const Validation = () => {
    const code = firstCode + secondCode + thirdCode + forthCode;
    if (code.length != 4) {
      Toast.show({type: 'error', text1: 'Please enter OTP'});
      // Alert.alert('Please enter valid OTP number');
    } else if (code != otp) {
      Toast.show({type: 'error', text1: 'Please enter valid OTP number'});
    } else return true;
  };

  const VerifyCode = async () => {
    if (!Validation()) {
      return false;
    }
    try {
      const code = firstCode + secondCode + thirdCode + forthCode;
      const data = {
        email: route?.params?.email,
        otp: code,
      };
      console.log('VerifyCode----->>>', data);
      setLoading(true);
      const {responseJson, err} = await requestPostApi(
        VERIFY_OTP_AUTH,
        data,
        'POST',
        '',
      );
      // console.log('login?????????', responseJson.authorization.token);
      if (responseJson.status == true) {
        // console.log("true");
        setLoading(false);
        navigation.navigate('UpdatePassword', {
          email: route?.params?.email,
          otp: route?.params?.otp,
        });
        clearText();
        // Toast.show({type: 'success', text1: 'Loggedin successfull'});
      } else {
        setLoading(false);
        console.log('login????????? come in catch block', responseJson.message);
        console.log('the err==>>', responseJson.message);
        setalert_sms(responseJson.message);
        setMy_Alert(true);
      }
    } catch (error) {
      setLoading(false);
      console.error('API call error:', error);
      Toast.show({
        type: 'error',
        text1: 'An error occurred. Please try again later.',
      });
    }
  };
  const Validations = () => {
    var EmailReg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
    if (emailid == '') {
      Toast.show({type: 'error', text1: 'Please enter Email Address'});
      return false;
    } else if (!EmailReg.test(emailid)) {
      Toast.show({type: 'error', text1: 'Plase enter Valid Emailid'});
      return false;
    }

    return true;
  };

  const ResendOtp = async () => {
    if (!Validations()) {
      return false;
    }
    try {
      var data = {
        email: route?.params?.email,
      };
      console.log('ResendOtp- forgot data---->>>', data);
      setLoading(true);
      const {responseJson, err} = await requestPostApi(
        FORGOT_PASSWORD,
        data,
        'POST',
        '',
      );
      console.log('ResendOtp?????????', responseJson);
      if (responseJson.status == true) {
        // console.log("true");
        setLoading(false);
        setOTP(responseJson?.otp);
        // navigation.navigate('VerifyCode',{email:emailid,otp:responseJson?.otp});
        Toast.show({type: 'success', text1: 'Resend OTP successfull'});
      } else {
        setLoading(false);
        console.log('login????????? come in catch block', responseJson.message);
        console.log('the err==>>', responseJson.message);
        setalert_sms(responseJson.message);
        setMy_Alert(true);
      }
    } catch (error) {
      setLoading(false);
      console.error('API call error:', error);
      Toast.show({
        type: 'error',
        text1: 'An error occurred. Please try again later.',
      });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          bounces={false}
          contentContainerStyle={{flexGrow: 1}}>
          <ImageBackground
            source={require('../../Global/Images/BackgroundAuth.png')}
            style={styles.backgroundImg}>
            <CustomHeader navigation={navigation} text="Verification Code" />
            <Logo
              width={300}
              height={80}
              style={{alignSelf: 'center', marginVertical: 30}}></Logo>
            <View
              style={{
                backgroundColor: 'white',
                width: '90%',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 90,
              }}>
              {/* <Logo width={300} height={100} style={{ alignSelf: 'center', marginVertical: 30 }} ></Logo> */}

              <View
                style={{
                  marginTop: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '94%',
                  marginHorizontal: 10,
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.BOLD,
                    fontWeight: '700',
                    fontSize: 24,
                    color: Color.BLACK,
                    lineHeight: 30,
                  }}>
                  Enter Verification Code
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.BOLD,
                    fontWeight: '400',
                    fontSize: 13,
                    color: Color.GREY,
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  Please enter verification code received in your registered
                  email {otp}
                </Text>
              </View>
              <View style={styles.TextInputView}>
                <TextInput
                  ref={firstCodeRef}
                  style={styles.textInput}
                  value={firstCode}
                  onChangeText={text => {
                    if (text.length == 1) {
                      secondCodeRef.current.focus();
                    } else {
                      firstCodeRef.current.focus();
                    }
                    setfirstCode(text);
                  }}
                  allowFontScaling={false}
                  maxLength={1}
                  onSubmitEditing={() => secondCodeRef.current.focus()}
                  keyboardType="number-pad"
                />
                <TextInput
                  ref={secondCodeRef}
                  style={styles.textInput}
                  value={secondCode}
                  onChangeText={text => {
                    if (text.length == 1) {
                      thirdCodeRef.current.focus();
                    } else {
                      firstCodeRef.current.focus();
                    }
                    setsecondCode(text);
                  }}
                  allowFontScaling={false}
                  maxLength={1}
                  onSubmitEditing={() => thirdCodeRef.current.focus()}
                  keyboardType="number-pad"
                />
                <TextInput
                  ref={thirdCodeRef}
                  style={styles.textInput}
                  value={thirdCode}
                  onChangeText={text => {
                    if (text.length == 1) {
                      forthCodeRef.current.focus();
                    } else {
                      secondCodeRef.current.focus();
                    }
                    setthirdCode(text);
                  }}
                  allowFontScaling={false}
                  maxLength={1}
                  onSubmitEditing={() => forthCodeRef.current.focus()}
                  keyboardType="number-pad"
                />
                <TextInput
                  ref={forthCodeRef}
                  style={styles.textInput}
                  value={forthCode}
                  onChangeText={text => {
                    if (text.length == 1) {
                      Keyboard.dismiss();
                    } else {
                      thirdCodeRef.current.focus();
                    }
                    setforthCode(text);
                  }}
                  allowFontScaling={false}
                  maxLength={1}
                  onSubmitEditing={() => forthCodeRef.current.focus()}
                  keyboardType="number-pad"
                />
              </View>

              <TouchableOpacity
                onPress={() => {
                  VerifyCode();
                }}
                style={{marginTop: 20}}>
                <CustomButtonBlue name="Verify"></CustomButtonBlue>
              </TouchableOpacity>
              <View
                style={{
                  alignSelf: 'center',
                  marginTop: '14%',
                  flexDirection: 'row',
                }}>
                <Text style={styles.myText}>Didn’t you receive the OTP?</Text>
                <TouchableOpacity
                  onPress={() => {
                    ResendOtp();
                  }}>
                  <Text style={[styles.myText, {color: Color.PRIMARY}]}>
                    {' '}
                    Resend OTP
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
          <View style={{height: 210}} />
        </ScrollView>
      </KeyboardAvoidingView>
      {My_Alert ? (
        <MyAlert
          sms={alert_sms}
          okPress={() => {
            setMy_Alert(false);
          }}
        />
      ) : null}
      {loading ? <Loader /> : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    flexDirection: 'row',
    width: '90%',
  },
  text: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 14,
    color: '#000000',
  },
  myText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 13,
    color: Color.LIGHT_BLACK,
  },
  textunderline: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 12,
    color: Color.PRIMARY,
  },
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
    transform: [{rotate: '45deg'}],
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
    fontFamily: 'Roboto',
    paddingHorizontal: 12,
  },
  line: {
    width: dimensions.SCREEN_WIDTH * 0.4,
    height: 1,
    backgroundColor: Color.BLACK,
    top: 8,
  },
  socialTxt: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '500',
    color: Color.LIGHT_BLACK,
    marginHorizontal: 10,
  },
  socialView: {
    flexDirection: 'row',
    width: dimensions.SCREEN_WIDTH * 0.9,
    height: 60,
    borderRadius: 5,
    backgroundColor: Color.WHITE,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.13,
    shadowRadius: 13,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(247, 250, 235, 1)',
    elevation: 10,
  },
  logoStyle: {
    width: 200,
    height: 100,
    marginTop: 30,
    alignSelf: 'center',
  },
  backgroundImg: {
    height: 550,
    width: dimensions.SCREEN_WIDTH,
    alignSelf: 'center',
  },
  TextInputView: {
    borderRadius: 5,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    marginTop: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Color.PRIMARY,
    textAlign: 'center',
    width: '15%',
    margin: 5,
    height: 50,
    color: Color.BLACK,
  },
});
export default VerifyCode;
