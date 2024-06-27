// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

// const CustomDropdown = ({ label, items, onSelectCallback }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleSelect = (item) => {
//     setSelectedItem(item);
//     setIsOpen(false);
//     onSelectCallback(item); // Call the provided callback function
//   };


//   return (
//     <View style={{backgroundColor:'red',borderRadius:4,borderWidth:1,backgroundColor:'white',height:100}}>
//       <TouchableOpacity onPress={toggleDropdown}>
//         <View style={styles.dropdownHeader}>
//           <Text>{label}</Text>
//           <Text>{selectedItem ? selectedItem.label : 'Select'}</Text>
//         </View>
//       </TouchableOpacity>
//       {isOpen && (
//         <FlatList
//           data={items}
//           keyExtractor={(item) => item.value}
//           renderItem={({ item }) => (
//             <TouchableOpacity onPress={() => handleSelect(item)}>
//               <View style={styles.dropdownItem}>
//                 <Text>{item.label}</Text>
//               </View>
//             </TouchableOpacity>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   dropdownHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#CCD2E3',
//   },
//   dropdownItem: {
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#CCD2E3',
//   },
// });

// export default CustomDropdown;


import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';

const CustomDropdown = ({  label, items, onSelectCallback,  }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
    onSelectCallback(item); // Call the provided callback function
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleDropdown}>
        <View style={styles.dropdownHeader}>
          <Text>{label}</Text>
          <View style={styles.arrowIcon}>
            {isOpen ? (
              <Image source={require('../assest/Images/arrowDown.png')} /> // Replace with your open arrow icon
            ) : (
              <Image source={require('../assest/Images/ArrowUp.png')} /> // Replace with your closed arrow icon
            )}
          </View>
        </View>
      </TouchableOpacity>
      {isOpen && (
        <FlatList
          data={items}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item)}>
              <View style={styles.dropdownItem}>
                <Text>{item.label}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCD2E3',
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCD2E3',
  },
});

export default CustomDropdown;