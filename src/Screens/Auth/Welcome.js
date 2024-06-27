import React, { useState, useEffect } from 'react';
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
    KeyboardAvoidingView,
    SafeAreaView,
    ImageBackground,
} from 'react-native';
import Color from '../../Global/Color';
import { dimensions } from '../../Global/Color';
import Toast from 'react-native-toast-message';
import Loader from '../../Components/Loader';
import MyAlert from '../../Global/MyAlert';
import MyText from '../../Components/MyText/MyText';
import KeySvg from '../../Global/Images/logo.svg';
import CustomButtonBlue from '../../Components/CustomButtonBlue';
import CustomButtonGrey from '../../Components/CustomButtonGrey';
const Welcome = ({ navigation }) => {
    const H = Dimensions.get('screen').height;
    const W = Dimensions.get('screen').width;
    const [loading, setLoading] = useState('');
    const [My_Alert, setMy_Alert] = useState(false);
    const [alert_sms, setalert_sms] = useState('');
    // const resetIndexGoToBottomTab = CommonActions.reset({
    //     index: 1,
    //     routes: [{ name: 'MainContainer' }],
    // });
    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={{
                backgroundColor: 'white', flex: 1,
            }}>
                {/* <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                > */}
                <ImageBackground source={require('../../Global/Images/background.png')} style={{ height: '100%', width: '100%' }}>
                    <KeySvg width={dimensions.SCREEN_WIDTH * 0.70} height={dimensions.SCREEN_HEIGHT * 0.40} style={{ alignSelf: 'center', marginTop: 30 }} />
                    <MyText
                        text="Elsie Koh, MD MHL"
                        fontWeight="normal"
                        fontSize={16}
                        textColor={'#000000'}
                        fontFamily="Roboto"
                        style={{ marginTop: '7%', alignSelf: 'center' }}
                    />
                    <MyText
                        text={`LEAD PHYSICIAN® Leadership\nProgram`}
                        fontWeight="500"
                        fontSize={24}
                        textColor={Color.PRIMARY}
                        fontFamily="
                        Roboto"
                        style={{ textAlign: 'center', alignSelf: 'center', marginTop: 5 }}
                    />
                    <MyText
                        text={`"Giving Physicians the Power to Pursue Their Passion and Potential."`}
                        fontWeight="normal"
                        fontSize={16}
                        textColor={Color.LIGHT_BLACK}
                        fontFamily="
                        Roboto"
                        style={{ textAlign: 'center', alignSelf: 'center', marginTop: 5, width: dimensions.SCREEN_WIDTH * 0.87 }}
                    />
                    <View style={styles.button}>
                        <TouchableOpacity onPress={() => { navigation.navigate('SignIn') }}>
                            <CustomButtonBlue name="Sign In"></CustomButtonBlue>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginVertical: 12 }} onPress={() => { navigation.navigate('Signup') }}>
                            <CustomButtonGrey name="Sign Up"></CustomButtonGrey>
                        </TouchableOpacity>

                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                        <MyText
                            text={`Terms of Use `}
                            fontWeight="normal"
                            fontSize={16}
                            textColor={Color.PRIMARY}
                            fontFamily="
                        Roboto"
                            style={{ textAlign: 'center', alignSelf: 'center', marginTop: 5, }}
                        />
                        <MyText
                            text={` & `}
                            fontWeight="normal"
                            fontSize={16}
                            textColor={Color.LIGHT_BLACK}
                            fontFamily="
                        Roboto"
                            style={{ marginTop: 5, }}
                        />
                        <MyText
                            text={`Privacy Policy`}
                            fontWeight="normal"
                            fontSize={16}
                            textColor={Color.PRIMARY}
                            fontFamily="
                        Roboto"
                            style={{ marginTop: 5, }}
                        />
                    </View>
                </ImageBackground>
                {/* </ScrollView> */}
            </View>

            {loading ? <Loader /> : null}
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        // padding: 16,
        marginTop: 15,
    },
    button: {
        width: dimensions.SCREEN_WIDTH * 0.85,
        alignSelf: 'center',
        marginTop: 40
    }

});
export default Welcome;
