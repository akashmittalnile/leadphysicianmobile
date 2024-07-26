import {StyleSheet} from 'react-native';
import Color, { dimensions } from '../../Global/Color';
import { Fonts } from '../../Global/Index';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BLACK + '66',
  },
  blurView: {
    flex: 1,
  },
  mainView: {
    padding: 20,
    margin: 20,
    borderRadius: 20,
    backgroundColor: Color.WHITE,
  },
  optionStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  ButtonView: {
    backgroundColor: Color.BLUE,
    padding: 10,
    borderRadius: 100 /2,
  },
  textStyle: {
    color:'black',
    fontFamily: Fonts.REGULAR,
  },
});
