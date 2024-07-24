import { Platform, StyleSheet } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
    navigatorStyle: {
        position: 'relative',
        height: responsiveHeight(10),
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
        paddingTop: Platform.OS === 'android' ? 0 : 20
    },
});
