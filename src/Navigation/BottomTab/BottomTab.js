/* eslint-disable react/no-unstable-nested-components */
//react components
import React from 'react';
import { View, Image, Text } from 'react-native';
//custom components
import MyText from '../../Components/MyText/MyText';
//Bottom Tab
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//global
import Color from '../../Global/Color';
//styles
import { styles } from './BottomTabStyle';
//screens
import Home from '../../Screens/Home/Home';
import Course from '../../Screens/Courses/Course';
import Schedule from '../../Screens/Schedule/Schedule';
import Profile from '../../Screens/Profile/Profile';
import Chat from '../../Screens/Chat/Chat';
///svg images  29-02-2024
import ProfileActive from '../../Global/Images/activeUser.svg'
import ProfileInactive from '../../Global/Images/profileIactive.svg'
import SchduleActive from '../../Global/Images/activeSchdule.svg'
import InactiveSchdule from '../../Global/Images/inactiveschdule.svg'
import Courses from '../../Global/Images/courses.svg'
import ChatActive from '../../Global/Images/activeChat.svg'
import ChatInactive from '../../Global/Images/inactiveChat.svg'
import ActiveHome from '../../Global/Images/ActiveHome.svg'
import InactiveHome from '../../Global/Images/inactiveHome.svg'

import MyCourse from '../../Screens/MyCourses/MyCourse';
import Toast from 'react-native-toast-message';

const BottomTab = ({ userToken }) => {
    // const userInfo = useSelector(state => state.user.userInfo);
    //variables
    const Tab = createBottomTabNavigator();
    const screenOptions = {
        showLabel: false,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.navigatorStyle,
    };
    // backBehavior = order - return to previous tab (in the order they are shown in the tab bar)
    // backBehavior = history - return to last visited tab
    console.log('Bottom Tab');
    return (
        <Tab.Navigator backBehavior="history" screenOptions={screenOptions}>
            <Tab.Screen
                name={'Home'}
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabStyle}>
                            {focused ? (
                                <ActiveHome></ActiveHome>
                            ) : (
                                <InactiveHome></InactiveHome>)
                            }
                            <MyText
                                text="Home"
                                fontSize={14}
                                fontFamily="medium"
                                textColor={focused ? Color.PRIMARY : Color.LIGHT_BLACK}
                                marginTop={5}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name={'Chat'}
                component={Chat}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabStyle}>
                            {focused ? (

                                <ChatActive></ChatActive>
                            ) : (
                                <ChatInactive></ChatInactive>
                            )}
                            <MyText
                                text="Chats"
                                fontSize={14}
                                fontFamily="medium"
                                textColor={focused ? Color.PRIMARY : Color.LIGHT_BLACK}
                                marginTop={5}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name={'MyCourse'}
                component={MyCourse}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={[styles.tabStyle, { backgroundColor: Color.PRIMARY, position: 'absolute', bottom: 34, height: 66, width: 66, borderRadius: 50 }]}>
                            {focused ? (
                                <Courses width={40} height={40}></Courses>
                            ) : (
                                <Courses width={40} height={40}></Courses>
                            )}

                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name={'Schedule'}
                component={Schedule}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabStyle}>
                            {focused ? (
                                <SchduleActive></SchduleActive>
                            ) : (
                                <InactiveSchdule></InactiveSchdule>
                            )}
                            <MyText
                                text="Schedule"
                                fontSize={14}
                                fontFamily="medium"
                                textColor={focused ? Color.PRIMARY : Color.LIGHT_BLACK}
                                marginTop={5}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name={'Profile'}
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabStyle}>
                            {focused ? (
                                <ProfileActive></ProfileActive>
                            ) : (
                                <ProfileInactive></ProfileInactive>
                            )}
                            <MyText
                                text="Profile"
                                fontSize={14}
                                fontFamily="medium"
                                textColor={focused ? Color.PRIMARY : Color.LIGHT_BLACK}
                                marginTop={5}
                            />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTab;
