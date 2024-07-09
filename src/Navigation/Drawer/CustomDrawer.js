//import : react components
import React, { useEffect, useState } from 'react';
import {
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert,
    Text,
} from 'react-native';
import { CommonActions } from '@react-navigation/core';
//import : custom components
import MyText from '../../Components/MyText/MyText';
// import CustomLoaderLogout from 'components/CustomLoader/CustomLoaderLogout';
//import : global
import Color, { dimensions } from '../../Global/Color';
//import : styles
import { styles } from './CustomDrawerStyle';
//import : modal
//import : third parties
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
//import : redux
import { useSelector, useDispatch } from 'react-redux';
// import { logOutUser, setUser } from 'src/reduxToolkit/reducer/user';
import { useDrawerStatus } from '@react-navigation/drawer';
// import CustomLoader from '../../components/CustomLoader/CustomLoader';
///svg image
import Logo from '../../Global/Images/logo.svg'
import Profile from '../../Global/Images/profile.svg'
import Home from '../../Global/Images/homeWhite.svg';
import Like from '../../Global/Images/like.svg'
import Couser from '../../Global/Images/navbarBook.svg'
import Subscription from '../../Global/Images/dollarSquare.svg'
import About from '../../Global/Images/info.svg'
import Help from '../../Global/Images/headphone.svg'
import Terms from '../../Global/Images/book.svg'
import Logout from '../../Global/Images/logout.svg'
import Facebook from '../../Global/Images/facebook.svg'
import Insta from '../../Global/Images/instagram.svg'
import Youtube from '../../Global/Images/youtube.svg'
import Headphone from '../../Global/Images/headphone.svg'
import Sticky from '../../Global/Images/stickynote.svg'
import Privacy from '../../Global/Images/PrivacySticky.svg'
import Loader from '../../Components/Loader';
import { logOutUser } from '../../reduxToolkit/reducer/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GET_PROFILE, postApiWithToken, LOGOUT, getApiWithToken } from '../../Global/Service';

const CustomDrawer = ({ navigation }) => {
    //variables
    const userToken = useSelector(state => state.user.userToken);
    const dispatch = useDispatch();
    const user = useSelector(state => state?.user?.userInfo);
    console.log('my userToken from the drawer', user);
    // const dispatch = useDispatch();
    //hook : states
    const [showLoader, setShowLoader] = useState(false);
    //function : imp function
    // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    //function : navigation function
    // const closeDrawer = () => navigation.closeDrawer();

    // const resetIndexGoToSignup = CommonActions.reset({
    //     index: 1,
    //     routes: [{ name: ScreenNames.SIGN_UP_1 }],
    // });
    const gotoSignUp = () => {
        // closeDrawer();
        // navigation.dispatch(resetIndexGoToSignup);
    };
    const gotoHome = () => {
        navigation.navigate('BottomTab');
    };
    const gotoSuperAdminCourses = () => {
        // navigation.navigate(ScreenNames.SUPER_ADMIN_COURSES);
    };
    const goToChat = () => {
        navigation.navigate('AdminChat')
    }
    const gotoabutUs = () => {
        console.log('my terms and codition');
        navigation.navigate('TermsCondition', { params: 'About' })
    }
    const gotoPrivacy = () => {
        navigation.navigate('TermsCondition', { params: 'Privacy' })
    }
    const gotoPolicy = () => {
        navigation.navigate('TermsCondition', { params: 'Policy' })
    }
    const gotoAllProducts = () => {
        // navigation.navigate(ScreenNames.ALL_PRODUCTS);
    };
    const gotoMyWhishlist = () => {
        navigation.navigate('Favorites');
    };
    const gotoMyCourses = () => {
        navigation.navigate('MyCourse')
    }
    const gotoMyOrders = () => {
        navigation.navigate('GoalsList');
    };
    const gotoFacebook = () => {
        navigation.navigate('TermsCondition', { params: 'Facebook' })
    }
    const gotoYoutube = () => {
        navigation.navigate('TermsCondition', { params: 'Youtube' })
    }

    const gotoInsta = () => {
        navigation.navigate('TermsCondition', { params: 'Instagram' })
    }

    const gotoLinkedin = () => {
        navigation.navigate('TermsCondition', { params: 'Linkdin' })
    }
    const gotoTwitter = () => {
        navigation.navigate('TermsCondition', { params: 'Twitter' })
    }
    const gotoSubscription = () => {
        navigation.navigate('Subscription')
    }
    const gotoWelcome = () =>
        CommonActions.reset({
            index: 1,
            routes: [{ name: 'SignIn' }],
        });
    const logout = async () => {

        
        setShowLoader(true);
        try {
            const resp = await postApiWithToken(
                userToken,
                LOGOUT,
                {},
            );
            console.log('logout resp', resp?.data);
            if (resp?.data?.status) {
                // closeDrawer();
                navigation.dispatch(gotoWelcome);
                Toast.show({ text1: resp?.data?.message });
                dispatch(logOutUser());
                navigation?.closeDrawer()
                await AsyncStorage.clear();
            }
        } catch (error) {
            console.log('error in logout', error);
        }
        setShowLoader(false);
    };


    //UI
    return (<>
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: '20%' }}>
                <View style={styles.mainView}>
                    {/* <Image
                        resizeMode="contain"
                        style={styles.image}
                        source={require('../../assets/images/logo.png')}
                    /> */}
                    <Logo height={56} width={226} ></Logo>
                    {/* <TouchableOpacity
                        style={styles.crossImage}
                    onPress={() => {
                        closeDrawer();
                    }}
                    >
                        <Image
                            resizeMode="contain"
                            // style={styles.image}
                            source={require('../../assets/images/close-circle.png')}
                        />
                    </TouchableOpacity> */}
                </View>
                <View style={styles.overflowView}>
                    {/* <Profile style={{ marginLeft: 10 }}></Profile> */}
                    <Image
                        source={
                            user?.profile_image
                                ? { uri: user?.profile_image }
                                : require('../../Global/Images/user-default.png')
                        }
                        style={{ height: 43, width: 43, borderRadius: 50, marginHorizontal: 6,backgroundColor:'#fff' }}
                    />
                    <View style={{ flexDirection: 'column',width:'45%' }}>
                        <MyText
                            text={user?.first_name}
                            fontWeight={600}
                            fontSize={16}
                            textColor="white"
                            fontFamily="Roboto"
                            style={{}}
                        />
                        <MyText
                            text={user?.email}
                            fontWeight={400}
                            fontSize={14}
                            numberOfLines={2}
                            textColor="white"
                            fontFamily="Roboto"
                            style={{}}
                        />
                    </View>
                    <TouchableOpacity style={styles.viewProfile} onPress={() => { navigation.navigate('Profile') }}>
                        <MyText
                            text={'View Profile'}
                            fontWeight={500}
                            fontSize={10}
                            textColor="#070F14"
                            fontFamily="Roboto"
                            style={{ alignSelf: 'center' }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 20, paddingLeft: 28, paddingRight: 24, marginTop: 60 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Home></Home>
                        <DrawerItemList
                            Title="Home"
                            icon={() => <Like width={34} height={45}></Like>}
                            // image={require('assets/images/home-sb.png')}
                            onPress={gotoHome}
                        />
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Like></Like>
                        <DrawerItemList
                            Title="My Favorites Chapters"
                            icon={() => <Like width={34} height={45} />}
                            onPress={gotoMyWhishlist}
                        />
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Couser ></Couser>
                        <DrawerItemList
                            Title="My Courses"
                            // image={require('assets/images/my-courses-sb.png')}
                            onPress={gotoMyCourses}
                        /></View>
                    <View style={{ flexDirection: 'row' }}>
                        <Couser ></Couser>
                        <DrawerItemList
                            Title="My Goals"
                            // image={require('assets/images/my-courses-sb.png')}
                            onPress={gotoMyOrders}
                        /></View>
                    <View style={{ flexDirection: 'row' }}>
                        <Subscription></Subscription>
                        <DrawerItemList
                            Title="Subscription Plans"
                            // image={require('assets/images/my-courses-sb.png')}
                            onPress={gotoSubscription}
                        />
                    </View>

                    {/* <DrawerItemList
            Title="Products"
            image={require('assets/images/products-img.png')}
            onPress={gotoAllProducts}
          /> */}
                    <View style={{ flexDirection: 'row' }}>
                        <About></About>
                        <DrawerItemList
                            Title="About Us"
                            // image={require('assets/images/about-us-sb.png')}
                            // onPress={() => { }}
                            onPress={gotoabutUs}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }} >
                        <Headphone></Headphone>
                        <DrawerItemList
                            Title="Chat Support"
                            onPress={goToChat}
                        // image={require('assets/images/help-and-support-sb.png')}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Sticky></Sticky>
                        <DrawerItemList
                            Title="Terms & Conditions"
                            onPress={gotoPrivacy}
                        // image={require('assets/images/terms-sb.png')}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Privacy></Privacy>
                        <DrawerItemList
                            Title="Privacy Policy"
                            // image={require('assets/images/privacy-sb.png')}
                            onPress={gotoPolicy}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Logout></Logout>
                        <DrawerItemList
                            Title="Logout"
                        // image={require('assets/images/logout-sb.png')}
                        onPress={logout}
                        />
                    </View>

                </View>
                <View style={styles.socialMediaContainer}>
                    <MyText
                        text={'Follow Us!'}
                        fontSize={12}
                        textColor="white"
                        fontFamily="regular"
                        style={{ marginBottom: 15 }}
                    />
                    <View style={[styles.socialRow, {}]}>
                        <TouchableOpacity onPress={gotoFacebook}>
                            <Facebook style={{ marginHorizontal: 4 }}></Facebook>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={gotoYoutube}>
                            <Youtube>
                            </Youtube>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={gotoInsta}>
                            <Insta style={{ marginHorizontal: 4 }}></Insta>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={gotoLinkedin}>
                            <Image source={require('../../Global/Images/linkedin.png')} style={{ height: 20, width: 20 }}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={gotoTwitter}>
                            <Image source={require('../../Global/Images/twitter.png')} style={{ height: 20, width: 20, marginLeft: 7 }}></Image>
                        </TouchableOpacity>
                        {/* <Image
                            source={require('assets/images/fb.png')}
                            style={{ height: 18, width: 18 }}
                        />
                        <Image
                            source={require('assets/images/youtube.png')}
                            style={{ marginLeft: 5 }}
                        />
                        <Image
                            source={require('assets/images/instagram.png')}
                            style={{ marginLeft: 5 }}
                        />
                        <Image
                            source={require('assets/images/twitter.png')}
                            style={{ marginLeft: 5 }}
                        /> */}
                    </View>
                </View>

                <MyText
                    text={'App Version: V1.0.0.12'}
                    fontSize={14}
                    textColor="#C0C0C0"
                    fontFamily="regular"
                    style={{ marginLeft: 26, marginTop: 36 }}
                />

                {/* <Text style={styles.versionText}>App Version: V1.0.0.12</Text> */}
            </ScrollView >
            {/* <CustomLoader text="Logging Out...." showLoader={showLoader} /> */}
        </View >

        {showLoader && <Loader/>}
        </>
    );
};

export default CustomDrawer;

export const DrawerItemList = ({ Title = '', image, onPress = () => { } }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                // width: '90%',
                paddingBottom: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* <Image source={image} /> */}
                <MyText
                    text={Title}
                    fontSize={14}
                    textColor="white"
                    fontFamily="medium"
                    style={{ marginLeft: 14 }}
                />
            </View>
            {/* <Image source={require('assets/images/white-right.png')} /> */}
        </TouchableOpacity>
    );
};
