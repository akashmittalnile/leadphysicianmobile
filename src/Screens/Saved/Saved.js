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
import { dimensions } from '../../Global/Color';
import SearchWithIcon from '../../Components/SearchWithIcon/SearchWithIcon';

//import : custom components
import MyHeader from '../../Components/MyHeader/MyHeader';
import MyText from '../../Components/MyText/MyText';
import Loader from '../../Components/Loader';
import NoData from '../../Global/Images/lock-circle.svg'
import Bat from '../../Global/Images/bat.svg'
import Ongoing from '../../Global/Images/clock.svg'
import Pending from '../../Global/Images/timer.svg'
import Completed from '../../Global/Images/completedCourse.svg'
import { styles } from './SavedStyle';
import { useIsFocused } from "@react-navigation/native";
import { getApiWithToken, GET_SAVED, postApiWithToken, SAVE_LATER } from '../../Global/Service';
// GET_SAVED
// import CustomLoader from 'components/CustomLoader/CustomLoader';
//import : third parties

import Toast from 'react-native-toast-message';
//import : global
import Color from '../../Global/Color';
//import : styles

//import : modal
//import : redux
import { connect, useDispatch, useSelector } from 'react-redux';
//import svg
import Mycourse from '../../Global/Images/courses.svg'
import Resume from '../../Global/Images/playCircle.svg'
import Delte from '../../Global/Images/trash.svg'
import { Tuple } from '@reduxjs/toolkit';
import { setFavCount } from '../../reduxToolkit/reducer/user';
const physicianCourse = [{
    id: '1',
    title: 'Leg joints',
    status: 'Completed'
},
{
    id: '2',
    title: 'Muscle repture',
    status: 'Ongoing'
},
{
    id: '3',
    title: 'Knee aligment',
    status: 'Pending'
},
{
    id: '4',
    title: 'Disloacted bones',
    status: 'Pending'
},

]


// import {WebView} from 'react-native-webview';

const Saved = ({ navigation }) => {
    const isFocus = useIsFocused()
    const dispatch = useDispatch()
    //variables : redux

    const userToken = useSelector(state => state.user.userToken);
    //variables
    const LINE_HEIGTH = 25;
    //variables : redux

    const [showLoader, setShowLoader] = useState(false);
    const [loading, setLoading] = useState('')
    const [searchValue, setSearchValue] = useState('');
    const [categoriesData, setCategoriesData] = useState([]);
    const [filteredcategoryData, setFilteredcategoryData] = useState([]);
    const [saved, setSaved] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    useEffect(() => {

        dispatch(setFavCount((0)))

    }, []);
    const checkcon = () => {
        getCartCount();
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

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            getCartCount()

        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [isFocus]);
    

    ///get deatils
    const getCartCount = async () => {
        setLoading(true);
        var url = GET_SAVED

        console.log('mu murl===>', url);
        try {
            const resp = await getApiWithToken(userToken, url);
            console.log('get module favoritess---->', resp?.data?.data);
            // resp?.data?.data?.steps
            if (resp?.data?.status) {
                setSaved(resp?.data?.data)
                // setFvaorites(resp?.data?.data)
                // setModuleScreen(resp?.data?.data)

            } else {
                Toast.show({ text1: resp.data.message });
            }
        } catch (error) {
            console.log('error in getCartCount', error);
        }
        setLoading(false);
    };


    const RenderItemLead = ({ item }) => {
        return (
            <View style={[styles.viewContainer, { backgroundColor: 'white' }]}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.roundView}>
                        <Mycourse width={27} height={27} style={{ alignSelf: 'center' }}></Mycourse>

                    </View>
                    <MyText
                        text={item.course}
                        fontWeight="bold"
                        fontSize={14}
                        textColor={Color.LIGHT_BLACK}
                        fontFamily="Roboto"
                        marginHorizontal={12}
                        style={{
                            width: dimensions.SCREEN_WIDTH * 0.70,
                            alignSelf: 'center',

                        }}
                    />
                </View>
                <View style={styles.subHeadView}>
                    <MyText
                        text={`${item?.module}:`}
                        fontWeight="bold"
                        fontSize={14}
                        textColor={Color.LIGHT_BLACK}
                        fontFamily="Roboto"

                        style={{



                        }}
                    />
                    <MyText
                        text={item?.step}
                        fontWeight="400"
                        fontSize={14}
                        textColor={Color.LIGHT_BLACK}
                        fontFamily="Roboto"
                        marginHorizontal={12}
                        style={{

                            alignSelf: 'center',

                        }}
                    />
                </View>
                <View style={{ flexDirection: 'row', }}>
                    <TouchableOpacity style={[styles.actionButtonView,]} onPress={() => onSave('1', item?.step_id)}>
                        <Delte></Delte>
                        {/* Remove */}
                        <MyText
                            text={'Remove '}
                            fontWeight="500"
                            fontSize={14}
                            textColor={Color.WHITE}
                            fontFamily="Roboto"
                            marginHorizontal={12}
                            style={{

                                alignSelf: 'center',

                            }}
                        />
                    </TouchableOpacity>
                    {console.log('my resume step--->>', item)}
                    <TouchableOpacity style={[styles.actionButtonView, { backgroundColor: Color.PRIMARY, marginLeft: -5 }]} onPress={() => { navigation.navigate('ModuleScreen', { id: item?.step_id, type: item?.step }) }}>
                        <Resume></Resume>
                        <MyText
                            text={'Resume'}
                            fontWeight="500"
                            fontSize={14}
                            textColor={Color.WHITE}
                            fontFamily="Roboto"
                            marginHorizontal={12}
                            style={{

                                alignSelf: 'center',

                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View >
        )
    }

    //unsave 

    // save or unsave
    const onSave = async (type, id, status) => {
        console.log('on save  id--->>>', id)
        setLoading(true);
        const formdata = new FormData();
        formdata.append('type', 'unsave');
        formdata.append('step_id', id);
        // formdata.append('status', status == '1' ? '0' : '1');
        console.log('onunsave formdata', formdata);
        try {
            const resp = await postApiWithToken(
                userToken,
                // status == '1' ? Service.UNLIKE_OBJECT_TYPE : LIKE_OBJECT_TYPE,
                SAVE_LATER,
                formdata,
            );
            console.log('onLike resp', resp?.data);
            if (resp?.data?.status) {
                Toast.show({ text1: resp.data.message });
                getCartCount();
            } else {
                Toast.show({ text1: resp.data.message });
            }
        } catch (error) {
            // console.log('error in onLike', error);
        }
        setLoading(false);
    };
    //UI
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={Color.LIGHT_BLACK} />
            <View style={{
                flex: 1,
                backgroundColor: '#F7FAEB',
            }}>
                <MyHeader
                    Title={`Saved Sections`}
                    isBackButton
                />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: '20%' }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    style={{}}>
                    {console.log('saved documents--->>>', saved)}
                    <View style={{ marginTop: 10 }}>
                        <FlatList
                            horizontal={false}
                            data={saved}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={RenderItemLead}
                            ListEmptyComponent={() => (
                                <View style={{
                                    alignSelf: 'center', justifyContent: 'center', width: dimensions.SCREEN_WIDTH * 0.90, flex: 1,
                                    alignItems: 'center', height: dimensions.SCREEN_HEIGHT * 0.60
                                }}>
                                    <NoData style={{ alignSelf: 'center' }} height={119} width={119}></NoData>
                                    <MyText text={'No data found !'} fontWeight='500' fontSize={24} textColor={Color.LIGHT_BLACK} fontFamily='Roboto' style={{ alignSelf: 'center', top: 4 }} />
                                    <MyText text={'Oops! this information is not available for a moment'} fontWeight='400' fontSize={16} textColor={'#959FA6'} fontFamily='Roboto' style={{ alignSelf: 'center', textAlign: 'center', width: dimensions.SCREEN_WIDTH * 0.60, top: 4 }} />

                                </View>
                            )}
                            style={{ alignSelf: 'center' }}

                        />
                    </View>

                </ScrollView>
                {/* <CustomLoader showLoader={showLoader} /> */}
            </View>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    );
};
export default Saved

