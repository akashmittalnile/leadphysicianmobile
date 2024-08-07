import {View, StyleSheet, NativeModules} from 'react-native';
import React from 'react';
import {responsiveHeight} from 'react-native-responsive-dimensions';

const {StatusBarManager} = NativeModules;

const CustomStatusBar = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

export default CustomStatusBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBarManager?.HEIGHT,
  },
});
