//react components
import React from 'react';
//navigation
import { createDrawerNavigator } from '@react-navigation/drawer';
//global
import Color from '../../Global/Color.js';
//stack
import AuthStack from '../AuthStack.js';
import CustomDrawer from './CustomDrawer.js';
import { SafeAreaView } from 'react-native';
// import {useNetworkError} from '../../hooks/useNetworkError';

const Drawer = () => {
    //variables
    const Drawer = createDrawerNavigator();
    const initialRouteName = 'AuthStack';
    const options = {
        swipeEnabled: false,
    };
    // saurabh saneja 1 Aug 23, checking if there is internet connection
    // useNetworkError();
    //function : render function
    const renderCustomDrawer = ({ navigation }) => (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomDrawer navigation={navigation} />
        </SafeAreaView>
    );
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    // backgroundColor: Colors.LITE_GREY,
                    // width: Constant.width,
                },
            }}
            initialRouteName={initialRouteName}
            drawerContent={renderCustomDrawer}>
            <Drawer.Screen
                name="AuthStack" // Provide a string name here
                options={options}
                component={AuthStack}
            />
        </Drawer.Navigator>
    );
};

export default Drawer;
