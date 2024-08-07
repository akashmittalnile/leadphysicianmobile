import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
  NativeModules,
  RefreshControl,
} from 'react-native';
import React, {ReactNode} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
// import {globalStyles} from '../../utils/constant';
// import Header from '../Header/Header';
import MyHeader from '../../Components/MyHeader/MyHeader';
import Color from '../../Global/Color';
import { width } from '../../Global/Constants';

interface ContainerProps {
  children: ReactNode;
  headerText?: string;
  style?: ViewStyle;
  scrollViewContentContainerStyle?: ViewStyle;
  subContainerStyle?: ViewStyle;
  onRefreshHandler?: () => void;
  reloadOnScroll?: boolean;
  scrollViewStyle?: ViewStyle
}

const Container: React.FC<ContainerProps> = ({
  children,
  headerText = '',
  scrollViewContentContainerStyle,
  style,
  subContainerStyle,
  onRefreshHandler,
  reloadOnScroll = true,
  scrollViewStyle,
}) => {
  const [shouldRefresh, setshouldRefresh] = React.useState<boolean>(false);
  const onRefresh = async () => {
    setshouldRefresh(value => !value);
    if (onRefreshHandler) {
      onRefreshHandler();
    }
    setshouldRefresh(value => !value);
  };
  return (
    <View style={[styles.container, style]}>
      <View style={styles.headerContainer}>
      <MyHeader Title={headerText} isBackButton style={{width:"100%"}} />
        {/* <Header title={headerText} notificationButton={false} /> */}
      </View>
      <View style={[styles.subContainer, subContainerStyle]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            bounces={reloadOnScroll}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={shouldRefresh}
                onRefresh={onRefresh}
              />
            }
            style={{...scrollViewStyle}}
            contentContainerStyle={scrollViewContentContainerStyle}>
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#F0F0F0',
  },
  headerContainer: {
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: responsiveHeight(2),
    // paddingTop: StatusBarManager.HEIGHT,
    // backgroundColor: Color.PRIMARY,
  },
  subContainer: {
    flex: 1,
    width: responsiveWidth(95),
    // paddingTop: responsiveHeight(1.5),
  },
});
