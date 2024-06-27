

// import React, { useEffect, useRef } from 'react';

// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View, LogBox
// } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Drawer from './src/Navigation/Drawer/Drawer';
// import AuthStack from './src/Navigation/AuthStack';
// import { StripeProvider } from '@stripe/stripe-react-native';
// import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
// import { Provider } from 'react-redux';
// import messaging from '@react-native-firebase/messaging';
// import { store } from './src/reduxToolkit/store/store';
// import { NotificationManagerAndroid } from './src/NotificationManagerAndroid';
// import { NotificationManagerIOS } from './src/NotificationManagerIOS';
// const App = () => {
//   LogBox.ignoreAllLogs()
//   const toastConfig = {
//     success: (props) => (
//       <BaseToast
//         {...props}
//         style={
//           { borderLeftColor: '#ADC430', borderColor: '#ADC430', borderWidth: 1, height: 55, width: '90%' }}
//         contentContainerStyle={{ paddingHorizontal: 15 }}
//         text1Style={{
//           fontSize: 12,
//           fontWeight: '400'

//         }}
//       />
//     ),
//     error: (props) => (
//       <ErrorToast
//         {...props}
//         text1Style={{
//           fontSize: 12
//         }}
//         text2Style={{
//           fontSize: 12
//         }}
//       />
//     ),
//   };
//   const [isLoggedIn, setIsLoggedIn] = React.useState(false);
//   React.useEffect(() => {
//     getDeviceToken()
//     // Check if user is logged in
//     // Set isLoggedIn accordingly
//   }, []);
//   const getDeviceToken = async () => {
//     let token = await messaging().getToken();
//     console.log('my device token---->>', token);
//   }
//   React.useEffect(() => {

//     // dynamicLinks()
//     // .getInitialLink() 
//     // .then(link => {
//     //   console.log('My url is in App js ==>>',link)
//     //   // if (link.url === 'https://invertase.io/offer') {
//     //   //   // ...set initial route as offers screen
//     //   // }
//     // });

//     // Orientation.lockToPortrait();
//     NotificationManagerAndroid.createChannel();
//     NotificationManagerAndroid.configure();
//     try {
//       if (Platform.OS == 'android') {
//         requestUserPermission();
//       } else {
//         requestUserPermissionIos();
//       }
//       // PushNotificationIOS.getApplicationIconBadgeNumber(num => {
//       //  console.log('the bedge number is===',num)
//       // });
//       const unsubscribe = messaging().onMessage(async remoteMessage => {
//         JSON.stringify(remoteMessage.data);
//         const { messageId } = remoteMessage;
//         const data = remoteMessage.notification
//         if (Platform.OS === 'android') {

//           NotificationManagerAndroid.showNotification(data.title, data.body, data.subText, messageId, data);
//         }
//         else {
//           NotificationManagerIOS.showNotification(2, data.title, data.body, data, {})
//         }
//       });
//       return unsubscribe;
//     } catch (error) {
//       console.log(error.message);
//     }
//     messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//       const { data, messageId } = remoteMessage;
//       const { Title, notificationText, subText } = data;
//       if (Platform.OS === 'android') {
//         NotificationManagerAndroid.showNotification(data.title, data.body, data.subText, messageId, data);
//       }
//       else {
//         NotificationManagerIOS.showNotification(2, data.title, data.body, data, {})

//         // PushNotification.getApplicationIconBadgeNumber(badgeNumber => {
//         //   PushNotificationIOS.setApplicationIconBadgeNumber(badgeNumber + 1)
//         // })

//       }
//     });

//   }, []);

//   async function requestUserPermission() {
//     const authorizationStatus = await messaging().requestPermission({
//       sound: false,
//       announcement: true,
//     });
//   }

//   async function requestUserPermissionIos() {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     if (enabled) {
//       console.log('Authorization status:', authStatus);
//     }
//   }
//   //const Stack = createNativeStackNavigator();
//   return (
//     // <Splash></Splash> <Provider store={store}>
//     // <Provider store={store}>
//     //   <NavigationContainer>
//     //     <Drawer />
//     //     {/* <SafeAreaView style={{flex: 1}}>
//     //       <StatusBar backgroundColor={Colors.THEME_BROWN} />
//     //     </SafeAreaView> */}
//     //     <Toast config={toastConfig} />
//     //   </NavigationContainer>
//     // </Provider>

//     <StripeProvider
//       publishableKey="pk_test_51PJqDBD3Sa6XIrtnhQMUpOWKUZcl07kj7B8B7uaqmzVN4FPSlgQBNn4bqwRDzQu2Qg9zyXgZ1qbKAvtKPDWOSt9T00ys9wh8pN
//       "
//       urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
//       merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
//     >
//       <Provider store={store}>
//         <NavigationContainer>
//           <Drawer />

//           <Toast config={toastConfig} />
//         </NavigationContainer>
//       </Provider>
//     </StripeProvider>

//   );
// };

// const styles = StyleSheet.create({

// });

// export default App;
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  LogBox,
  Platform,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Drawer from './src/Navigation/Drawer/Drawer';
import { StripeProvider } from '@stripe/stripe-react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { Provider } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import { store } from './src/reduxToolkit/store/store';
import { setUserNotifications } from './src/reduxToolkit/reducer/user';
import { NotificationManagerAndroid } from './src/NotificationManagerAndroid';
import { NotificationManagerIOS } from './src/NotificationManagerIOS';

const App = () => {
  LogBox.ignoreAllLogs();

  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: '#ADC430', borderColor: '#ADC430', borderWidth: 1, height: 55, width: '90%' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{ fontSize: 12, fontWeight: '400' }}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{ fontSize: 12 }}
        text2Style={{ fontSize: 12 }}
      />
    ),
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    };

    requestUserPermission();

    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      const data = remoteMessage.data;
      if (data) {
        console.log('Foreground notification data:', data);
        dispatch(setUserNotifications(data.count || '1'));
      }
    });

    const unsubscribeOnNotificationOpenedApp = messaging().onNotificationOpenedApp(remoteMessage => {
      const data = remoteMessage.data;
      if (data) {
        console.log('Notification opened from background state:', data);
        dispatch(setUserNotifications(data.count || '1'));
      }
    });

    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        const data = remoteMessage.data;
        if (data) {
          console.log('Notification opened from quit state:', data);
          dispatch(setUserNotifications(data.count || '1'));
        }
      }
    });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpenedApp();
    };
  }, [dispatch]);

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    const { data, messageId } = remoteMessage;
    console.log('Background notification data:', data, messageId);
    if (Platform.OS === 'android') {
      NotificationManagerAndroid.showNotification(data.title, data.msg, messageId, data);
    } else {
      NotificationManagerIOS.showNotification(2, data.title, data.msg, data, {});
    }
  });

  return (
    <StripeProvider
      publishableKey="pk_test_51PJqDBD3Sa6XIrtnhQMUpOWKUZcl07kj7B8B7uaqmzVN4FPSlgQBNn4bqwRDzQu2Qg9zyXgZ1qbKAvtKPDWOSt9T00ys9wh8pN"
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
    >
      <NavigationContainer>
        <Drawer />
        <Toast config={toastConfig} />
      </NavigationContainer>
    </StripeProvider>
  );
};

const AppWrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

const styles = StyleSheet.create({
  // Define your styles here if needed
});

export default AppWrapper;

