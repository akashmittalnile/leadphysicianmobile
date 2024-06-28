//import : react components
import React, { useRef, useState } from 'react';
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
import { dimensions } from '../../Global/Color';
import * as Progress from 'react-native-progress';
import { useIsFocused } from "@react-navigation/native";
//import : custom components
import MyHeader from '../../Components/MyHeader/MyHeader';
import MyText from '../../Components/MyText/MyText';
import Star from '../../Global/Images/star.svg'
import Nodata from '../../Global/Images/lock-circle.svg'
import { styles } from './MyCourseStyle';
// import CustomLoader from 'components/CustomLoader/CustomLoader';
//import : third parties

import Toast from 'react-native-toast-message';
//import : global
import Color from '../../Global/Color';
//import : styles

//import : modal
import Loader from '../../Components/Loader';
import SearchWithIcon from '../../Components/SearchWithIcon/SearchWithIcon';
//import : redux
import { connect, useSelector, useDispatch } from 'react-redux';
//import api
import { GET_PROFILE, postApiWithToken, LOGOUT, getApiWithToken, GET_MYCOURSES } from '../../Global/Service';
import { CommonActions } from '@react-navigation/core';
import SkeletonContainer from '../../Components/Skelton/SkeltonContainer';
const physicianCourse = [{
    id: '1',
    title: 'Module 01',
    status: 'Completed'
},
{
    id: '2',
    title: 'Module 02',
    status: 'Ongoing'
},
{
    id: '3',
    title: 'Module 03',
    status: 'Pending'
},
{
    id: '4',
    title: 'Module 03',
    status: 'Pending'
},
{
    id: '5',
    title: 'Module 03',
    status: 'Pending'
},
]


// import {WebView} from 'react-native-webview';

const MyCourse = ({ navigation }) => {
    const dispatch = useDispatch();
    //variables
    const LINE_HEIGTH = 25;
    //variables : redux
    const userToken = useSelector(state => state.user.userToken);
    console.log('my--->>>', userToken);
    const [showLoader, setShowLoader] = useState(false);
    const [searchValue, setsearchValue] = useState('');
    // const[searchValue,setsearchValue]=useState('')
    const [categoriesData, setCategoriesData] = useState([]);
    const [filteredcategoryData, setFilteredcategoryData] = useState([]);
    const [loading, setLoading] = useState('')
    const isFocus = useIsFocused()
    const [refreshing, setRefreshing] = useState(false);
    const [courses, setMyCourses] = useState([])
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getCartCount('')

        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [isFocus, searchValue]);
    const checkcon = () => {
        getCartCount('');
        setsearchValue('')
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


    //get data for myCourses
    //get data for list

    const getCartCount = async (item) => {
        var url = GET_MYCOURSES
        var murl = `?title=` + item
        if (item != '' || item != undefined) {
            url = url + murl
        }

        try {
            setLoading(true);
            const resp = await getApiWithToken(userToken, url);
            console.log('get coursesss---->', resp?.data?.data);
            if (resp?.data?.status) {
                // setProfile(resp?.data?.data)
                setLoading(false)
                setMyCourses(resp?.data?.data)


            } else {
                Toast.show({ text1: resp.data.message });
            }
        } catch (error) {
            setLoading(false)
            console.log('error in getCartCount', error);
        }
        setLoading(false);
    };

    const isFilterApplied = () => {
        // if (showSelectedCategories()) {
        //   return true;
        // } else if (selectedPriceFilter !== '') {
        //   return true;
        // } else if (selectedRatingValues?.length > 0) {
        //   return true;
        // }
        // return false;
        return false
    };

    const RenderItemLead = ({ item }) => {
        console.log('thumbnail--->>', item.thumbnail);
        return (
            <TouchableOpacity style={styles.teamView}
                onPress={() => {
                    navigation.navigate('CourseDetail', { id: item.id })
                }}
            >

                {/* <Bat style={{ alignSelf: 'center' }}></Bat> */}
                <Image source={{ uri: item?.thumbnail }} style={{ height: 207, width: dimensions.SCREEN_WIDTH, resizeMode: 'cover', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 10, width: dimensions.SCREEN_WIDTH * 0.90, borderTopRightRadius: 10, overflow: 'hidden' }}></Image>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, marginVertical: 10 }}>
                    <MyText
                        text={`${item?.title === null ? '' : item.title.length > 38 ? `${item?.title.substring(0, 38)}..` : `${item?.title.substring(0, 38)}`}`}
                        fontWeight="bold"
                        fontSize={14}
                        textColor={Color.LIGHT_BLACK}
                        fontFamily="Inter"
                        style={{
                        }}
                    />
                    <View style={{ flexDirection: 'row', top: 2 }}>
                        <Star height={20} width={20}></Star>
                        <MyText
                            text={item?.avg_review}
                            fontWeight="500"
                            fontSize={14}
                            textColor={Color.LIGHT_BLACK}
                            fontFamily="Inter"
                            style={{


                            }}
                        />
                    </View>
                </View>
                <MyText
                    text={`${item?.description === null ? '' : item.title.length > 45 ? `${item?.description.substring(0, 45)}..` : `${item?.description.substring(0, 45)}`}`}
                    fontWeight="bold"
                    fontSize={14}
                    textColor={Color.PRIMARY}
                    fontFamily="Inter"
                    style={{
                        marginHorizontal: 5,
                    }}
                />
                <View style={{
                    height: 40, borderRadius: 4, borderColor: Color.PRIMARY, borderWidth: 1, marginVertical: 12, marginHorizontal: 5,
                    width: dimensions.SCREEN_WIDTH * 0.20,
                    justifyContent: 'center'
                }}>
                    <MyText
                        text={`${item?.module_count} Modules`}
                        fontWeight="bold"
                        fontSize={12}
                        textColor={Color.PRIMARY}
                        fontFamily="Inter"
                        style={{
                            marginHorizontal: 5,
                            textAlign: 'left',

                        }}
                    />

                </View>
                <View style={{ alignSelf: 'center', marginVertical: 12, }}>
                    <Progress.Bar progress={
                        parseFloat(item?.course_complete_percentage || '0') / 100
                    } width={dimensions.SCREEN_WIDTH * 0.84} thickness={34}
                        height={20}
                        borderRadius={5}
                        color={Color.PRIMARY}
                        unfilledColor={
                            Color.LIGHT_BLACK
                        }
                        borderWidth={0}
                        showsText={true} />



                    <Text style={{
                        position: 'absolute',
                        alignSelf: 'center',
                        color: 'white', // or any color that contrasts with the progress bar
                        fontWeight: 'bold',
                    }}>{`${item?.course_complete_percentage}% Completed`}</Text>
                </View>
                {/* course_complete_percentage */}
            </TouchableOpacity >
        )
    }
    //UI
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={Color.LIGHT_BLACK} />
            <View style={{
                flex: 1,
                backgroundColor: '#F7FAEB',
            }}>
                <MyHeader
                    Title={`All Courses`}
                    isBackButton
                />
                {/* <SearchWithIcon
                    placeholder="Search by Title"
                    value={searchValue}
                    onChangeText={e => {
                        // console.log('SearchWithIcon', e);
                        setSearchValue(e);
                        applyFilters2(e);
                    }}
                    // onPress={openFilterModal}
                    // icon={<Image source={require('../../Global/Images/camera.png')} />}
                    style={{ marginTop: 10 }}
                    showDot={isFilterApplied}
                /> */}
                <View style={{
                    alignSelf: 'center', width: dimensions.SCREEN_WIDTH,
                    paddingTop: 0,
                    marginTop: -20,
                }}>
                    <SearchWithIcon
                        placeholder="Search by Title"
                        value={searchValue}
                        onChangeText={e => {
                            console.log('my e', e);
                            if (e.text === '') {
                                console.log('my empyt text',)
                            }
                            setsearchValue(e);
                            getCartCount(e);
                            if (e.text === '') {
                                getCartCount('');
                            } else {
                                //  ArtSearch(e.text);
                                getCartCount(e, false)

                            }
                        }}

                        // icon={<Image source={require('../../Global/Images/documentfilter.png')} />}
                        style={{ marginTop: 10 }}
                        showDot={isFilterApplied}
                    />
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: '20%' }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    style={styles.mainView}>
                    <View style={{ marginTop: 20, alignSelf: 'center' }}>
                        <FlatList
                            horizontal={false}
                            data={courses}

                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            // numColumns={2}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={RenderItemLead}
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

                </ScrollView>
                {/* {loading ? <Loader /> : null} */}
                {loading && <SkeletonContainer />}
                {/* <CustomLoader showLoader={showLoader} /> */}
            </View>
        </SafeAreaView>
    );
};
export default MyCourse

