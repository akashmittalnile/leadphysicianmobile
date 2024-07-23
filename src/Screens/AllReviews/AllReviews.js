//import : react components
import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    ScrollView,
    Switch,
    TouchableOpacity,
    Dimensions,
    Text,
    Image,
    FlatList,
    ActivityIndicator,
    Alert,
    ImageBackground,
    SafeAreaView,
    StatusBar,
    RefreshControl
} from 'react-native';
//import : custom components
// import MyHeader from 'components/MyHeader/MyHeader';
import MyText from '../../Components/MyText/MyText';
// import CustomLoader from 'components/CustomLoader/CustomLoader';
import Loader from '../../Components/Loader';
//import : third parties
 
import Toast from 'react-native-toast-message';
//import : global
import Color from '../../Global/Color';
import MyHeader from '../../Components/MyHeader/MyHeader';
//import : styles
import { styles } from './AllReviewsStyle';
//import : modal
//import : redux
import { connect, useSelector } from 'react-redux';
import { width, height } from 'global/Constant';
// import Divider from 'components/Divider/Divider';
// import {WebView} from 'react-native-webview';
import MyButton from '../../Modals/MyButton/MyButton';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    Easing,
} from 'react-native-reanimated';

import FAB_Button from '../FAB_Button/FAB_Button';

import { GET_PROFILE, postApiWithToken, LOGOUT, getApiWithToken, GET_MYCOURSES, GET_COURSEDETAIL, POST_REVIEW, ALL_REVIE } from '../../Global/Service';

import { createThumbnail } from 'react-native-create-thumbnail';
import Review from '../../Modals/Review/Review';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const reviewsData = [
    {
        id: '1',
        name: 'Annete Black',
        img: `https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60`,
        msg: `Perfectly packed all products received as said...but when connected with power supply it doesn't work, After some adjustments it worked perfectly felt very happy with the product. Thank you`,
    },
    {
        id: '2',
        name: 'Annete Black',
        img: `https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60`,
        msg: `Perfectly packed all products received as said...but when connected with power supply it doesn't work, After some adjustments it worked perfectly felt very happy with the product. Thank you`,
    },
];
const AllReviews = ({ navigation, dispatch, route }) => {
    //variables
    const LINE_HEIGTH = 25;
    //variables : redux
    const userToken = useSelector(state => state.user.userToken);
    const userInfo = useSelector(state => state.user.userInfo);
    const [showLoader, setShowLoader] = useState(false);
    const [reviewList, setReviewList] = useState([]);
    const [loading, setLoading] = useState('')
    const [review, setReview] = useState('');
    const [starRating, setStarRating] = useState(1);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [scrolling, setscrolling] = useState(false);
    const scrollY = useSharedValue(0);
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        getReviewList();
    }, []);
    const checkcon = () => {
        getReviewList();
    };
    const wait = timeout => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    };
    const onRefresh = React.useCallback(() => {
        checkcon();
        wait(2000).then(() => {
            setRefreshing(false);
        });
    }, []);
    // const getReviewList = async () => {
    //     const postData = new FormData();
    //     postData.append('type', route?.params?.type);
    //     postData.append('id', route?.params?.id);
    //     console.log('getReviewList postData', postData);
    //     setShowLoader(true);
    //     try {
    //         const resp = await Service.postApiWithToken(
    //             userToken,
    //             Service.REVIEW_LIST,
    //             postData,
    //         );
    //         console.log('getReviewList resp', resp?.data);
    //         if (resp?.data?.status) {
    //             setReviewList(resp?.data);
    //             // Toast.show({text1: resp?.data?.message})
    //         } else {
    //             Toast.show({ text1: resp?.data?.message });
    //         }
    //     } catch (error) {
    //         console.log('error in getReviewList', error);
    //     }
    //     setShowLoader(false);
    // };

    const submitReview = async () => {
        if (review?.trim()?.length === 0) {
            Toast.show({ text1: 'Please enter review' });
            return;
        }
        const postData = new FormData();
        postData.append('id', route?.params?.id);
        postData.append('type', route?.params?.type);
        postData.append('comment', review);
        postData.append('rating', starRating);
        setShowLoader(true);
        try {
            const resp = await Service.postApiWithToken(
                userToken,
                Service.SUBMIT_REVIEW,
                postData,
            );

            if (resp?.data?.status) {
                Toast.show({ text1: resp?.data?.message || resp?.data?.Message });
                setStarRating(1);
                setReview('');
                getReviewList();
            } else {
                Toast.show({ text1: resp?.data?.message || resp?.data?.Message });
            }
        } catch (error) {
            console.log('error in submitReview', error);
        }
        setShowReviewModal(false);
        setShowLoader(false);
    };
    const openReviewModal = () => {
        setShowReviewModal(true);
    };
    console.log("shiav", reviewList[0])

    ///all review
    const getReviewList = async () => {
        var url = ALL_REVIE
        var murl = `/` + route?.params?.id
        url = url + murl
        console.log('mu murl===>', url);
        try {
            setLoading(true);
            const resp = await getApiWithToken(userToken, url);

            if (resp?.data?.status) {
                // setProfile(resp?.data?.data)
                setReviews(resp?.data?.data)

            } else {
                Toast.show({ text1: resp.data.message });
            }
        } catch (error) {
            console.log('error in getCartCount', error);
        }
        setLoading(false);
    };
    const handleScroll = event => {
        const yOffset = event.nativeEvent.contentOffset.y;
        scrollY.value = event.nativeEvent.contentOffset.y;
        if (yOffset === 0) {
            // Your code to handle reaching the top of the scroll view
            console.log('Reached the top');
            setscrolling(false);
        } else {
            setscrolling(true);
        }
    };

    //UI
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={Color.THEME_BROWN} />
            <View style={styles.container}>
                {/* <MyHeader Title="All Reviews" isBackButton /> */}
                {/* <MyHeader Title="Home" isBackButton /> */}
                <MyHeader Title="Course Details" isBackButton
                    scrolling={scrolling}
                    scrollY={scrollY}
                    style={scrolling ? { zIndex: 99 } : null}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: '20%', height: '100%' }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    style={styles.mainView}>
                    <View style={{ height: 37 }}></View>
                    {reviews?.reviews?.length > 0 ? (

                        <ViewAllSub
                            text="Ratings & Reviews"
                            rating={reviews?.avg_review ? reviews?.avg_review : 0}
                            reviews={reviews?.review_count ? reviews?.review_count : reviews?.review_count}
                            showButton={false}
                            style={{ marginBottom: 17, }}
                        />

                    ) : null}

                    {reviews?.reviews.length > 0 ? (
                        reviews?.reviews.map(item => (

                            <View key={item.id} style={styles.reviewContainer}>
                                <View style={styles.reviewTopRow}>
                                    <View style={styles.reviewTopLeftRow}>

                                        <Image
                                            source={
                                                item?.profile_image
                                                    ? { uri: item?.profile_image }
                                                    : require('../../Global/Images/userDefault.png')
                                            }
                                            style={styles.reviewImg}
                                        />
                                        <MyText
                                            text={`${item?.user?.first_name} ${item?.user?.last_name}`}
                                            fontFamily="medium"
                                            fontSize={13}
                                            textColor={'#6A6A6A'}
                                            style={{ marginLeft: 10 }}
                                        />
                                    </View>
                                    {/* <Image source={require('../../../assets/images/message-text.png')} style={{ tintColor: 'white' }} /> */}
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image source={require('../../Global/Images/filledGreenStart.png')} style={{ height: 22, width: 22 }}></Image>
                                        <MyText
                                            text={item.rating}
                                            fontFamily="medium"
                                            fontSize={13}
                                            textColor={'#6A6A6A'}
                                            style={{ top: 3, marginLeft: 5 }}
                                        />
                                    </View>

                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>

                                    {/* <Image
                                        source={require('assets/images/star.png')
                                        }
                                        resizeMode='cover'
                                        style={{ height: responsiveHeight(2), width: responsiveHeight(2) }}
                                    /> */}
                                </View>
                                <MyText
                                    text={item.review}
                                    fontFamily="medium"
                                    fontSize={13}
                                    textColor={'#6A6A6A'}
                                    style={{ marginTop: 0, marginLeft: 8 }}
                                />
                            </View>
                        ))
                    ) : (
                        <MyText
                            text={`No Reviews found`}
                            fontFamily="medium"
                            fontSize={18}
                            textColor={'#455A64'}
                            style={{ textAlign: 'center', marginTop: 20 }}
                        />
                    )}
                    {/* {route?.params?.isPurchased ? (
                        <FAB_Button onPress={openReviewModal} />
                    ) : null} */}
                </ScrollView>
                {loading ? <Loader /> : null}
                {/* <CustomLoader showLoader={showLoader} /> */}
                <Review
                    visible={showReviewModal}
                    setVisibility={setShowReviewModal}
                    starRating={starRating}
                    setStarRating={setStarRating}
                    review={review}
                    setReview={setReview}
                    submitReview={submitReview}
                />
            </View>
        </SafeAreaView>
    );
};
const mapDispatchToProps = dispatch => ({
    dispatch,
});
export default connect(null, mapDispatchToProps)(AllReviews);

const ViewAllSub = ({
    text,
    rating,
    reviews,
    onPress,
    style = {},
    buttonText = 'See All',
    showButton = true,
}) => {
    return (
        <View style={[styles.viewAllContainer, style]}>
            <View>
                <MyText
                    text={text}
                    fontFamily="medium"
                    fontSize={18}
                    textColor={'#455A64'}
                />
                <View style={styles.ratingView}>
                    <Image
                        source={require('../../Global/Images/filledGreenStart.png')}
                        style={{ height: 10, width: 10 }}
                    />
                    <MyText
                        text={rating}
                        fontSize={13}
                        fontFamily="regular"
                        textColor={'#6A6A6A'}
                        style={{ marginLeft: 5 }}
                    />
                    <MyText
                        text={'(' + reviews + ')'}
                        fontSize={13}
                        fontFamily="regular"
                        textColor={'#6A6A6A'}
                        style={{}}
                    />
                </View>
            </View>
            {showButton ? (
                <TouchableOpacity onPress={onPress} style={styles.viewAll}>
                    <MyText
                        text={buttonText}
                        fontFamily="regular"
                        fontSize={13}
                        textColor={Color.THEME_GOLD}
                    />
                </TouchableOpacity>
            ) : null}
        </View>
    );
};
