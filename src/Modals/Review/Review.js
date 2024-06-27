//import : react components
import React, { useRef, useState, useEffect } from 'react';
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
import { useNavigation } from '@react-navigation/native';
//import : custom components
import MyText from '../../Components/MyText/MyText';
//import : globals
import Color from '../../Global/Color';
//import : styles
import { styles } from './ReviewStyle';
import Modal from 'react-native-modal';

import { width } from '../../Global/Constants';
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
                            style={{ marginRight: index + 1 === 5 ? 0 : 8, height: 24, width: 24, alignSelf: 'center' }}
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
                setStarRating(1);
                setReview('');
            }}
            scrollTo={() => { }}
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
                    text="Review & Rating"
                    textColor={'black'}
                    fontSize={20}
                    textAlign="center"
                    style={{ marginBottom: 20 }}
                />
                <MyText
                    text="Select stars according to your overall experience"
                    textColor={Color.BLACK}
                    fontSize={14}
                    fontFamily="regular"
                    style={{ marginBottom: 23 }}
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
                <MyButton
                    text={!isReviewed ? "Submit" : "Update"}
                    style={{
                        width: width * 0.9,
                        marginBottom: 10,
                        backgroundColor: Color.PRIMARY,
                    }}
                    onPress={submitReview}
                />
            </View>
            {/* </KeyboardAvoidingView> */}
        </Modal>
    );
};

export default Review;
