import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import Container from './Container';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import BorderBtn from './BorderBtn';
// import {globalStyles} from '../../utils/constant';
import CustomTextInput from '../../Components/CustomTextInput';
import {Formik} from 'formik';
import * as yup from 'yup';
// import PhoneInput from 'react-native-phone-number-input';
// import CustomTextBox from '../../components/CustomTextBox';
// import userIcon from '../../Global/Images/user-2.png';
import tickGreenIcon from '../../Global/Images/tick-green.png';
import tickIcon from '../../Global/Images/tick-circle-gray.png';
import Profile from '../../Global/Images/profileCircle.svg';
import EmailSvg from '../../Global/Images/sms.svg';
import Call from '../../Global/Images/call.svg';
import {useNavigation} from '@react-navigation/native';
 
// import {useAppDispatch,} from '../../redux/Store';
import {useSelector, useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';
// import {reloadHandler} from '../../redux/ReloadScreen';
// import ScreenNames from '../../utils/ScreenNames';
// const userIconPath = Image.resolveAssetSource(userIcon).uri;
const tickBlueIconPath = Image.resolveAssetSource(tickGreenIcon).uri;
const tickIconPath = Image.resolveAssetSource(tickIcon).uri;
// import PhoneInput from '../../components/PhoneInput/PhoneInput';
// import {USMobileNumberFormatHandler} from '../../utils/Method';
import Color from '../../Global/Color';
import CustomTextBox from '../../Components/CustomTextBox';
import {CONTACT_US, postApiWithToken} from '../../Global/Service';
import CommunityModal from './CommunityModal';
import { height } from '../../Global/Constants';

const tempData = [
  {text: 'Plan Related', value: 1},
  {text: 'Billing Related', value: 2},
  {text: 'General Inquiry', value: 3},
  {text: 'Community Related', value: 4},
  {text: 'Journals Related', value: 5},
  {text: 'Others', value: 6},
];
const ContactForQuery = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const token = useSelector(state => state.auth.token);
  const token = useSelector(state => state.user.userToken);
  // const userData = useSelector(state => state.userDetails);
  const userData = useSelector(state => state.user.userInfo);
  console.log('USerDATA--->', userData);

  // const contact = useSelector(state => state.reload.Contact);
  const formikRef = React.useRef<Formik>();
  const [selectedButton, setSelectedButton] = React.useState<number>(1);
  const [modal, setModal] = React.useState<boolean>(false);
  const [loader, setLoader] = React.useState<boolean>(false);
  const [username, setUserName] = React.useState<string>(userData?.first_name !=undefined ? userData?.first_name : '');
  const [emailid, setEmailid] = React.useState<String>(userData?.email != undefined ?userData?.email : '');
  const [phoneno, setPhoneno] = React.useState<string>(userData?.phone != undefined ? userData?.phone :'');
  const[description,setDescription]=React.useState<string>('');
  React.useEffect(() => {
 
  }, []);

  const validationSchema = yup?.object()?.shape({
    user: yup.string().required('Name is Required'),
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email address is required'),
    description: yup.string().required('Description is required'),
    // phone: yup.string().required('Phone number is required'),
  });
  const Validation = () => {
   
    var EmailReg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

    if (String(username).trim().length == 0) {
      Toast.show({type: 'error', text1: 'Please enter USer Name'});
      return false;
    }   else if (emailid == '') {
      Toast.show({type: 'error', text1: 'Please enter Email Address'});
      return false;
    } else if (!EmailReg.test(emailid)) {
      Toast.show({type: 'error', text1: 'Plase enter Valid Email Address'});
      return false;
    } else if (phoneno == '') {
      Toast.show({type: 'error', text1: 'Please enter Phone Number'});
      return false;
    } else if (phoneno.length != 14) {
      Toast.show({type: 'error', text1: 'Please enter valid Phone Number'});
      return false;
    } else if (description.length == '') {
      Toast.show({type: 'error', text1: 'Please enter description'});
      return false;
    }   
    return true;
  };

  const submitHandler = async () => {
    if (!Validation()) {
      return;
    }
    try {
      setLoader(true);
      const data = {
        user_name: username,
        email: emailid,
        phone: phoneno,
        description: description,
        inquiry_type: selectedButton,
      };
      const response = await postApiWithToken(token, CONTACT_US, data);
      console.log('CONTACT_US-->resp', response?.data);

      if (response?.data?.status) {
        // navigation.goBack();
       
        setModal(true);
      }
      Toast.show({
        type: response?.data?.status ? 'success' : 'error',
        text1: response?.data?.message,
      });
    } catch (err) {
      console.log('error in signUpUser ioioi---->>>', err);
    }
  };
  const formatPhoneNumber = (number: any) => {
    // Remove any non-numeric characters
    const cleanedNumber = number.replace(/[^\d]/g, '');

    // Apply US phone number format
    const formattedNumber = cleanedNumber.replace(
      /(\d{3})(\d{3})(\d{4})/,
      '($1) $2-$3',
    );

    return formattedNumber;
  };
  const handleChanged = (value: any) => {
    console.log('my handel name---->>>', value);
    setPhoneno(formatPhoneNumber(value));
  };
  const modalHandler = () => {
    setModal(false);
    navigation.goBack();
  };

  const inquiryHandler = (number: number) => {
    setSelectedButton(number);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Container
        headerText="Contact us"
        reloadOnScroll={false}
        scrollViewContentContainerStyle={{height: '75%'}}>
         
            <View style={{paddingTop: 1}}>
             
              <View style={{ marginTop: 0 }}>
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
                            paddingRight: 40,
                            backgroundColor:'#D4D4D4'
                        }}>
                            <Profile width={24} height={24} />
                            <Text style={{ width: '90%', color: 'black' }}>{username}</Text>
                        </View>
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
                            paddingRight: 40,
                            backgroundColor:'#D4D4D4'
                        }}>
                            <EmailSvg width={24} height={24} />
                            <Text style={{ width: '90%', color: 'black' }}>{emailid}</Text>
                        </View>
                    </View>
              
              <View style={{marginTop: 12}}>
                <CustomTextBox
                  imageComponent={<Call width={24} height={24} />}
                  placeholder="Phone number"
                  value={phoneno}
                  onChangeText={handleChanged}
                  maxLength={14}
                  // onChangeText={handleChanged('phone')}
                  keyboardType="number-pad"
                  placeholder={'Phone'}>

                  </CustomTextBox>
              </View>
             
              <ScrollView
                horizontal
                style={{marginTop: responsiveHeight(2)}}
                showsHorizontalScrollIndicator={false}>
                {tempData.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      inquiryHandler(item?.value);
                    }}
                    key={index}
                    style={{
                      ...styles.touch,
                      borderColor:
                        selectedButton === item?.value
                          ? Color.PRIMARY
                          : 'gray',
                    }}>
                    <Text
                      style={{
                        color:
                          selectedButton === item?.value
                            ? Color.PRIMARY
                            : 'gray',
                      }}>
                      {item?.text}
                    </Text>
                    <Image
                      source={{
                        uri:
                          selectedButton === item?.value
                            ? tickBlueIconPath
                            : tickIconPath,
                      }}
                      resizeMode="contain"
                      style={{
                        marginLeft: responsiveWidth(2),
                        height: responsiveHeight(2),
                        width: responsiveHeight(2),
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <View style={{height: 12}}></View>
              <CustomTextBox
                value={description}
                onChangeText={(text)=>{setDescription(text)}}
                contanerStyle={{height:120}}
                placeholder="Type Your Description Here…"
                textAlignVertical={'top'}
                textinputStyle={{height:120,}}
                multiline={true}
              />
              <View style={{height: 20}}></View>
              <BorderBtn
                loader={loader}
                onClick={submitHandler}
                buttonText="Submit"
                containerStyle={styles.button}
              />
              <View style={{height: 800}}></View>
            </View>
          
      </Container>
      {modal && (
        <CommunityModal
          heading="Thank You For Submitting
Your Inquiry! 🌟"
          text="Your Question Has Been Successfully Received. Our Team Is Diligently Working To Provide You With A Detailed And Helpful Response.
Please Note That We Aim To Address All Inquiries Within The Next 24-48 Hours. Your Patience Is Appreciated As We Strive To Ensure The Best Possible Support For Our Valued Users."
          buttonText="Close"
          modalHandler={modalHandler}
        />
      )}
    </SafeAreaView>
  );
};

export default ContactForQuery;

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  textInput: {
    width: '100%',
    marginTop: 0,
    // marginBottom: responsiveHeight(0.5),
    marginBottom: 5,
  },
  button: {
    width: '100%',
    backgroundColor: Color.PRIMARY,
  },
  phoneInput: {
    // marginTop: responsiveHeight(0.2),
    marginTop: 10,
    width: '100%',
    backgroundColor: 'rgba(137, 137, 137, .2)',
    // borderRadius: responsiveWidth(2),
    overflow: 'hidden',
    borderRadius: 10,
  },
  textContainerStyle: {
    padding: 0,
    backgroundColor: 'rgba(137, 137, 137, .05)',
    borderLeftWidth: 1,
    borderLeftColor: Color.LITE_GREY,
  },
  textInputStyle: {
    // fontSize: responsiveFontSize(1.7),
    // marginLeft: responsiveWidth(-2),
    fontSize: 14,
    marginLeft: -5,
  },
  textInputWithoutIcon: {
    // marginTop: responsiveHeight(2),
    marginTop: 10,
    marginBottom: 0,
    // height: responsiveHeight(17),
    height: 20,
    width: '100%',
  },
  iconButtonStyle: {
    // marginRight: responsiveWidth(2),
    marginRight: 10,
    backgroundColor: 'white',
    // borderWidth: responsiveWidth(0.23),
    borderWidth: 0.5,
  },
  touch: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.13,
    shadowRadius: 10,
    // marginRight: responsiveWidth(2),
    // paddingVertical: responsiveHeight(1.5),
    // paddingHorizontal: responsiveWidth(3),
    // borderWidth: responsiveWidth(0.23),
    // borderRadius: responsiveWidth(2),
    // ...globalStyles.shadowStyle,
  },
});
