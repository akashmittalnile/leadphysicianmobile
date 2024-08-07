import {View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import MyText from '../MyText/MyText';
import {styles} from '../../Notification/NotificationStyle';
import Color, {dimensions} from '../../Global/Color';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const Notification = ({id, imageUri, title, date, onSwipe}) => {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const screenWidth = responsiveWidth(100);

  const handleSwipe = () => {
    setTimeout(() => {
      if (id && onSwipe) {
        onSwipe(id);
      }
    }, 400);
  };

  const pan = Gesture.Pan()
    .minDistance(1)
    ?.failOffsetY([-10, 10])
    .onChange(value => {
      'worklet';
      if (value.translationX < 0) {
        translateX.value = value.translationX;
        if (value.translationX) {
          opacity.value = interpolate(
            -1 * value.translationX,
            [0, screenWidth],
            [1, 0],
          );
        }
      }
    })
    .onEnd(value => {
      'worklet';
      if (-1 * value.translationX >= 90) {
        translateX.value = withTiming(-screenWidth, {
          duration: 300,
        });
        runOnJS(handleSwipe)();
      } else {
        translateX.value = withTiming(0, {
          duration: 300,
        });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    right: -1 * translateX.value,
  }));

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          {position: 'relative', zIndex: 1000},
          animatedStyle,
          opacityStyle,
        ]}>
        <TouchableOpacity style={styles.scduleView}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                width: 63,
                height: 63,
                backgroundColor: '#F7FAEB',
                borderRadius: 50,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={
                  imageUri
                    ? {uri: imageUri}
                    : require('../../Global/Images/notification.png')
                }
                style={{height: 41, width: 41, borderRadius: 50}}
              />
            </View>
            <View>
              <MyText
                text={title}
                fontWeight="400"
                fontSize={14}
                textColor={Color.LIGHT_BLACK}
                fontFamily="Roboto"
                style={{
                  textAlign: 'left',
                  marginHorizontal: 16,
                  width: dimensions.SCREEN_WIDTH * 0.6,
                }}
              />
              <MyText
                text={date}
                fontWeight="400"
                fontSize={14}
                textColor={'#959FA6'}
                fontFamily="Roboto"
                style={{
                  textAlign: 'left',
                  marginHorizontal: 16,
                  width: dimensions.SCREEN_WIDTH * 0.6,
                  marginTop: 9,
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </GestureDetector>
  );
};

export default Notification;
