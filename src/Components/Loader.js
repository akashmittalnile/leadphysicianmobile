import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Modal, dimensions } from 'react-native';
// import { dimensions } from '../utility/Mycolors';

export default class Loader extends Component {
    render() {


        return (
       

            <View style={{
                justifyContent: "center",
                alignItems: "center",
                position: 'absolute',
                marginBottom: 0,
                top: 0,   // Adjusted this to start from the top
                left: 0,  // Added this to cover the left edge
                right: 0, // Added this to cover the right edge
                bottom: 0, // Adjusted this to cover the entire height
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 999,
            }}>
                <ActivityIndicator size="large" color="#ffcc00" />
            </View >
        );
    }
}

