
import React, {useState, useEffect} from 'react';

import { View, TextInput, TouchableOpacity, StyleSheet,Image,FlatList } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome'; // Use your preferred icon library
import Color from '../global/Color';

const CustomTextInputDrop = ({ placeholder, value, onChangeText, err, secureTextEntry = false, showDropdownIcon = false, onDropdownPress }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownItems = [
        'Option 1',
        'Option 2',
        'Option 3',
        // Add more items as needed
      ];
    const handleDropdownPress = () => {
      setIsDropdownOpen(!isDropdownOpen);
      onDropdownPress && onDropdownPress(); // Optional: You can call a custom handler if needed
    };
  
    const handleItemPress = (item) => {
      setIsDropdownOpen(false); // Close the dropdown when an item is selected
      // Handle the selected item here (e.g., update the value)
      onChangeText(item); // Example: Update the input value with the selected item
    };
  
  return (
    <View style={[styles.input, { borderColor: err === 2 ? '#133072' : '#CCD2E3' }]}>
      <TextInput
        style={styles.text}
        value={value}
        secureTextEntry={secureTextEntry}
        placeholderTextColor='#000000'
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
      {showDropdownIcon && (
        <TouchableOpacity onPress={handleDropdownPress} style={styles.iconContainer}>
          <Image source={require('../assest/Images/arrowDown.png')} style={{ height: 25, width: 25 }} />
        </TouchableOpacity>
      )}
      {isDropdownOpen && (
        <View style={styles.dropdownContainer}>
          <FlatList
            data={dropdownItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleItemPress(item)} style={styles.dropdownItem}>
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default CustomTextInputDrop;

const styles = StyleSheet.create({
  input: {
    height: 47,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowRadius: 6,
    shadowOpacity: 0,
    elevation: 1,
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 5,
    backgroundColor: Color.WHITE,
    flexDirection: 'row', // Added for icon alignment
  },
  text: {
    height: 40,
    color: '#000000',
    width: '85%', // Adjusted for the icon
    fontSize: 16,
    paddingLeft: 10, // Added left padding for text input
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10, // Added right padding for icon container
  },
  dropdownContainer: {
    position: 'absolute',
    top: 50, // Adjust the position as needed
    left: 0,
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#EB001B',
    borderRadius: 10,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EB001B',
  },
});