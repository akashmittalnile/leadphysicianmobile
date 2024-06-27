// import { TextInput, Button, Title } from 'react-native-paper';
// import React, { useState, useEffect } from 'react';

// import {
//     SafeAreaView,
//     TouchableOpacity,
//     StyleSheet,
//     View,
//     Text,
//     ScrollView,
//     Image,
//     Dimensions
// } from 'react-native';


// import { DrawerActions, useNavigation } from '@react-navigation/native';
// import Color from '../global/Color';
// const H = Dimensions.get('screen').height;
// const W = Dimensions.get('screen').width;
// const H2 = H - 130;
// const Header = ({ hasDrawer = false, title = '' }) => {
//     const navigation = useNavigation()
//     return (
//        <View style={{ flexDirection: 'row', alignItems: 'center', height: 50, margin: 10 }}>
//             <TouchableOpacity style={{ width: 36, height: 34,  }} onPress={() => navigation.goBack()}>
//             <Image source={require('../assest/Images/arrowLeft.png')} style={{ width: 24, height: 24, marginLeft: 10, top: 3,tintColor:Color.PRIMARY }}></Image>
//                 </TouchableOpacity>
//             <Text style={{ fontWeight: '600', fontSize: 17, color: Color.BLACK }}>{title}</Text>
//         </View>
//     )
// }
// export default Header;
// const styles = StyleSheet.create({
//     logoImg: {
//         // width: 19.21,
//         // height: 16,

//     },
//     logoSign: {
//         // width: 100,
//         // height: 40,



//         backgroundColor: 'red'
//     },
//     header: { width: 19, height: 19, alignItems: 'center' },
//     bell: { width: 19, height: 20, left: W * 0.76, alignItems: 'center' }
// });


import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Color from '../Global/Color';
import MyText from './MyText/MyText';
const Header = ({ navigation, leftImage, rightImage, title, isLogoImage }) => {
  const handleBack = () => {
    navigation.goBack();
  };
  const handleNavigateToLogin = () => {
    navigation.navigate('Notificaion');

    navigation.navigate('HomeStack', {
      screen: 'Notification',

    })


    // Replace 'LoginScreen' with the actual screen name
  };
  const handleImageClick = () => {
    if (isLogoImage) {
      // Handle logo image click action here
    } else {
      // Handle other image click action here
      navigation.goBack(); // For example, navigate back when other image is clicked
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleImageClick} style={styles.leftContainer}>
        <Image
          source={leftImage}
          style={isLogoImage ? styles.logoImage : styles.image}
        />
      </TouchableOpacity>
      <View style={styles.centerContainer}>

        <MyText text={title} fontWeight='bold' fontSize={18} textColor={'#000000'} fontFamily='Roboto'
          style={{ fontWeight: '500' }} />

      </View>
      <TouchableOpacity style={styles.rightContainer} onPress={handleNavigateToLogin}>
        <Image
          source={rightImage}
          style={styles.imageRight}
          resizeMode='contain'
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  // ...styles remain the same
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 80,
    backgroundColor: '#ffffff',
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  leftContainer: {
    flex: 1,
  },
  centerContainer: {
    flex: 3,
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  image: {
    width: 24,
    height: 24,


  },
  imageRight: {
    width: 24,
    height: 24,

  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoImage: {
    width: 101, // Customize the width as needed
    height: 32, // Customize the height as needed
  },

};

export default Header;
