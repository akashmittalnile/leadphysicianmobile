import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const CustomSlider = ({ value, onValueChange }) => {
  const trackWidth = `${value * 100}%`;

  return (
    <View style={styles.sliderContainer}>
      <TouchableOpacity
        style={[styles.track, { width: trackWidth }]}
        onPress={(e) => {
          const x = e.nativeEvent.locationX;
          const newValue = x / styles.track.width * 10; // Adjust this factor as needed
          onValueChange(newValue);
        }}
      />
      <View style={styles.thumb} />
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 15,
  },
  track: {
    height: '100%',
    backgroundColor: 'blue', // Adjust track color as needed
    borderRadius: 15,
  },
  thumb: {
    width: 30,
    height: 30,
    backgroundColor: 'red', // Adjust thumb color as needed
    borderRadius: 15,
    position: 'absolute',
  },
});

export default CustomSlider;