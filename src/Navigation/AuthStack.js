import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../Screens/splash';
import Welcome from '../Screens/Auth/Welcome';
import Signup from '../Screens/Auth/Signup';
import SignIn from '../Screens/Auth/Signin';
import BottomTab from './BottomTab/BottomTab';
import CourseDetail from '../Screens/CourseDetail/CourseDetail';
import ModuleScreen from '../Screens/Module/ModuleScreen';
import Summary from '../Screens/Summary/Summary';
import Favorites from '../Screens/Favorites/Favorites';
import Subscription from '../Screens/Subscription/Subscription';
import Saved from '../Screens/Saved/Saved';
import SubscriptionCard from '../Screens/SubscriptionCard/SubscriptionCard';
import Message from '../Screens/Messages/Message';
import EditProfile from '../Screens/EditProfile/EditProfile';
import ChangePassword from '../Screens/ChangePassword/ChangePassword';
import Notification from '../Notification/Notification';
import SetGoal from '../Screens/SetGoal/SetGoal';
import ModuleListing from '../ModuleListing/ModuleListing';
import GoalsList from '../Screens/GoalsList/GoalsList';
import EditGoal from '../EditGoal/EditGoal';
import ChatDetail from '../Screens/ChatDetail/ChatDetail';
import ChatSection from '../Components/Chat/ChatSection';
import TermsCondition from '../Screens/TermsCondition/TermsCondition';
import SchduleDetails from '../Screens/SchduleDetails/SchduleDetails';
import SideMenuLinks from '../Screens/SideMenuLinks/SideMenuLinks';
import AdminChat from '../Screens/AdminChat/AdminChat';
import SummaryWorksheet from '../Screens/SummaryWorksheet/SummaryWorksheet';
import CalendarListing from '../Screens/CalendarListing/CalendarListing';
import AllReviews from '../Screens/AllReviews/AllReviews';
import Payment from '../Payment/Paymnet';
import Certificate from '../Screens/Certificate/Certificate';
import ForgotPassword from '../Screens/Auth/ForgotPassword';
import VerifyCode from '../Screens/Auth/VerifyCode';
import UpdatePassword from '../Screens/Auth/UpdatePassword';
import ViewPdf from '../Screens/ViewPdf/ViewPdf';
import FullImageView from '../Screens/FullImageView/FullImageView';
import PurchaseReview from '../Screens/Purchase/Purchase';
import PaymentWebView from '../Components/PaymentWebView';

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // set the headerShown option to false to hide the header
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="VerifyCode" component={VerifyCode} />
      <Stack.Screen name="UpdatePassword" component={UpdatePassword} />

      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen name="CourseDetail" component={CourseDetail} />
      <Stack.Screen name="ModuleScreen" component={ModuleScreen} />
      <Stack.Screen name="Summary" component={Summary} />
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="Saved" component={Saved} />
      <Stack.Screen name="Subscription" component={Subscription} />
      <Stack.Screen name="SubscriptionCard" component={SubscriptionCard} />
      <Stack.Screen name="Message" component={Message} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="SetGoal" component={SetGoal} />
      <Stack.Screen name="ModuleListing" component={ModuleListing} />
      <Stack.Screen name="GoalsList" component={GoalsList} />
      <Stack.Screen name="EditGoal" component={EditGoal} />
      <Stack.Screen name="ChatDetail" component={ChatDetail} />
      <Stack.Screen name="ChatSection" component={ChatSection} />
      <Stack.Screen name="TermsCondition" component={TermsCondition} />
      <Stack.Screen name="SchduleDetails" component={SchduleDetails} />
      <Stack.Screen name="SideMenuLinks" component={SideMenuLinks} />
      <Stack.Screen name="AdminChat" component={AdminChat} />
      <Stack.Screen name="SummaryWorksheet" component={SummaryWorksheet} />
      <Stack.Screen name="AllReviews" component={AllReviews} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="CalendarListing" component={CalendarListing} />
      <Stack.Screen name="Certificate" component={Certificate} />

      <Stack.Screen name={'ViewPdf'} component={ViewPdf} />
      <Stack.Screen name={'FullImageView'} component={FullImageView} />
      <Stack.Screen name={'PurchaseReview'} component={PurchaseReview} />
      <Stack.Screen name={"PaymentWebView"} component={PaymentWebView} />
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default AuthStack;
