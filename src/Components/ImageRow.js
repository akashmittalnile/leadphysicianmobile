// import React, { useState } from 'react';
// import { View, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';

// const ImageRow = ({ images }) => {
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleImageClick = (image) => {
//     setSelectedImage(image);
//   };

//   const closeModal = () => {
//     setSelectedImage(null);
//   };

//   return (
//     <View>
//       <ScrollView horizontal>
//         {images.map((image, index) => (
//           <TouchableOpacity key={index} onPress={() => handleImageClick(image)}>
//               <Image
//                     source={require(image)}
//                     style={{height: 19, width: 19}}
//                   />
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       <Modal visible={selectedImage !== null} animationType="slide">
//         <View style={{ flex: 1 }}>
//           <TouchableOpacity onPress={closeModal}>
//           <Image source={require(image)} style={{ width: 100, height: 100 }} />
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default ImageRow;