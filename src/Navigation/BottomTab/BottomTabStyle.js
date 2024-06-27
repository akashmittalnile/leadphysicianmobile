import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    navigatorStyle: {
        height: 70,
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    tabStyle: {
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? 0 : 20
    },
    customTabContainer: {
        position: 'absolute',
        bottom: 0,
        left: '90%', // Align to the center of the tab
        marginLeft: -33, // Adjust to center the tab,
        backgroundColor: 'green'
    },
    tabStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: Platform.OS === 'android' ? 0 : 20
    },
});
