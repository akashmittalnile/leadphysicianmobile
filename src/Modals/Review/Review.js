//import : react components
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
//import : custom components
import MyText from '../../Components/MyText/MyText';
//import : globals
import Color, { dimensions } from '../../Global/Color';
//import : styles
import {styles} from './ReviewStyle';
import Modal from 'react-native-modal';

import {width} from '../../Global/Constants';
import MyButton from '../MyButton/MyButton';

const Review = ({
  visible,
  setVisibility,
  starRating,
  setStarRating,
  review,
  setReview,
  submitReview,
  isReviewed = false,
}) => {
  //variables : navigation
  const navigation = useNavigation();
  console.log("REVIEW -isReviewed",isReviewed);
  //function : navigation function
  //function : modal function
  const closeModal = () => {
    setVisibility(false);
  };
  const Stars = () => {
    return (
      <View style={styles.starRow}>
        {[...Array(5).keys()]?.map((item, index) => (
          <TouchableWithoutFeedback
            onPress={() => {
              setStarRating(index + 1);
            }}>
            <Image
              source={
                index < starRating
                  ? require('../../Global/Images/filledGreenStart.png')
                  : require('../../Global/Images/unfilledStar.png')
              }
              style={{
                marginRight: index + 1 === 5 ? 0 : 8,
                height: 24,
                width: 24,
                alignSelf: 'center',
              }}
            />
          </TouchableWithoutFeedback>
        ))}
      </View>
    );
  };

  //UI
  return (
    <Modal
      isVisible={visible}
      swipeDirection="down"
      onBackdropPress={() => setVisibility(false)}
      onSwipeComplete={e => {
        setVisibility(false);
      }}
      onModalWillHide={() => {
        setVisibility(false);
        // setStarRating(1);
        // setReview('');
      }}
      scrollTo={() => {}}
      scrollOffset={1}
      propagateSwipe={true}
      coverScreen={false}
      backdropColor="transparent"
      style={styles.modal}>
      {/* <KeyboardAvoidingView
        style={{}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}
      <View style={styles.modalContent}>
        <MyText
          text={!isReviewed ? "Add Review" : "Update Review"}
          textColor={'black'}
          fontSize={20}
          textAlign="center"
          style={{marginBottom: 20}}
        />
        <MyText
          text="Select stars according to your overall experience"
          textColor={Color.BLACK}
          fontSize={14}
          fontFamily="regular"
          style={{marginBottom: 23}}
        />
        <Stars />
        <TextInput
          style={styles.textArea}
          underlineColorAndroid="transparent"
          placeholder={'Type your review here…'}
          placeholderTextColor="#999999"
          numberOfLines={10}
          multiline={true}
          value={review}
          onChangeText={e => setReview(e)}
        />
        {/* <MyButton
          
          text={!isReviewed ? "Submit" : "Update"}
          style={{
            width: width * 0.9,
            marginBottom: 10,
            backgroundColor: Color.PRIMARY,
          }}
          onPress={submitReview}
        /> */}
        <View style={{ height: 100, width: width * 0.9,   justifyContent: 'center' }}>
                <TouchableOpacity style={{ width: dimensions.SCREEN_WIDTH * 0.9, height: 50, backgroundColor: Color.PRIMARY, alignSelf: 'center', borderRadius: 10, justifyContent: 'center' }} onPress={submitReview}>
                    <MyText text={!isReviewed ? "Submit" : "Update"} fontWeight='700' fontSize={14} textColor={Color.WHITE} fontFamily='Roboto' style={{ alignSelf: 'center' }} />
                </TouchableOpacity>
                {/* Content for the bottom view */}
            </View>
      </View>
      {/* </KeyboardAvoidingView> */}
    </Modal>
  );
};

export default Review;
