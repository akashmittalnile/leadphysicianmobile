import React, {useState, useEffect} from 'react';
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
import {requestPostApi, LOGIN, RESET_PASSWORD} from '../../Global/Service';
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

const UpdatePassword = ({navigation,route}) => {
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
  const [password, setPassword] = useState('');
  const [emailid, setEmailid] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
//   const [password, setPassword] = useState('Ssuser@123');
  const [loading, setLoading] = useState('');
  const [My_Alert, setMy_Alert] = useState(false);
  const [alert_sms, setalert_sms] = useState('');
  const [fcmToken, setFcmToken] = useState('');
  const resetIndexGoToBottomTab = CommonActions.reset({
    index: 1,
    routes: [{name: 'Welcome'}],
  });

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
  const Validation = () => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
 
    if (password?.trim()?.length === 0) {
        Toast.show({ type: 'error', text1: 'Please enter New Password' });
        return false;
    }
    else if (!regex.test(password)) {
        Toast.show({ type: 'error', text1: 'New Password must has at least eight characters that include 1 lowercase character, 1 uppercase character, 1 number, and at least one special character.', })
        return false;
    }
    else if (confirmPassword?.trim()?.length === 0) {
        Toast.show({ type: 'error', text1: 'Please enter Confirm Password' });
        return false;
    } else if (password !== confirmPassword) {
        Toast.show({ type: 'error', text1: 'Password and Confirm Password does not match' });
        return false;
    }
    return true

};

  const ChangePassword = async () => {
    if (!Validation()) {
      return false;
    }
    try {
      var data = {
        email: route?.params?.email,
        otp:route?.params?.otp,
        password: password,
        password_confirmation:confirmPassword
      };
      console.log('ChangePassword----->>>', data);
      setLoading(true);
      const {responseJson, err} = await requestPostApi(RESET_PASSWORD, data, 'POST', '');
      // console.log('login?????????', responseJson.authorization.token);
      if (responseJson.status == true) {
        Toast.show({ text1: responseJson.message });
        setLoading(false);
       
        
        navigation.dispatch(resetIndexGoToBottomTab);
        // Toast.show({type: 'success', text1: 'Loggedin successfull'});
      } else {
        Toast.show({ type: 'error', text1: responseJson.message });
        setLoading(false);
        // console.log('login????????? come in catch block', responseJson.message);
        // console.log('the err==>>', responseJson.message);
        // setalert_sms(responseJson.message);
        // setMy_Alert(true);
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
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
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
            <CustomHeader navigation={navigation} text="Change Password" />
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
 
              <View style={{marginTop: 40}}>
              <CustomTextBox
                  imageComponent={<Lock width={24} height={24} />}
                  placeholder="Password"
                  value={password}
                  onChangeText={text => {
                    setPassword(text);
                  }}
                  secureTextEntry={true}
                  style={{color: 'black', backgroundColor: 'red'}}
                  placeholderTextColor="black">
                  </CustomTextBox>
              </View>

              <View style={{marginTop: 12}}>
                <CustomTextBox
                  imageComponent={<Lock width={24} height={24} />}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChangeText={text => {
                    setConfirmPassword(text);
                  }}
                  secureTextEntry={true}
                  style={{color: 'black', backgroundColor: 'red'}}
                  placeholderTextColor="black">
                  </CustomTextBox>
              </View>
              

              <TouchableOpacity
                onPress={() => {
                
                  ChangePassword();
                }}
                style={{marginTop: 20}}>
                <CustomButtonBlue name="Save"></CustomButtonBlue>
              </TouchableOpacity>
              {/* <View
                style={{
                  alignSelf: 'center',
                  marginTop: '14%',
                  flexDirection: 'row',
                }}>
                <Text style={styles.myText}>Don’t have an account?</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Signup');
                  }}>
                  <Text style={[styles.myText, {color: Color.PRIMARY}]}>
                    {' '}
                    Signup
                  </Text>
                </TouchableOpacity>
              </View> */}
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
    </SafeAreaView>
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
});
export default UpdatePassword;
