//react components
import React, {memo} from 'react';
import {
  View,
  Text,
  Modal,
  Alert,
  Platform,
  TouchableOpacity,
} from 'react-native';
//third parties
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import {PERMISSIONS, check, RESULTS, request} from 'react-native-permissions';
//styles
import {styles} from './AttachmentStyle';
//svgs
import DocumentSvg from '../../Global/Images/docs.svg';
import GallerySvg from '../../Global/Images/image.svg';

const Attachment = ({visible, setVisibility, setImage, setDocument}) => {
  //function : modal function
  const closeModal = () => {
    setVisibility(false);
  };
  //function : imp function
  const CheckGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      openLibrary();
    } else {
      const res = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (res === RESULTS.GRANTED) {
        openLibrary();
      } else if (res === RESULTS.DENIED) {
        const res2 = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
        res2 === RESULTS.GRANTED ? openLibrary() : CheckGalleryPermission();
      } else if (res === RESULTS.BLOCKED) {
        Alert.alert(
          '',
          'To continue, Brand NUE needs your permission to access Photos.\nGo to Settings>> Brand Nue>>Photos.',
        );
        // Toast.show(
        //   'To continue, Brand NUE needs your permission to access Photos.\nGo to Settings>> Brand Nue>>Photos.',
        //   Toast.LONG,
        //   Toast.BOTTOM,
        // );
        // Alert.alert(
        //   'To continue, Brand NUE needs your permission to access Photos.',
        //   'Go to Settings>> Brand Nue>>Photos.',
        // );
      }
    }
  };
  const openLibrary = async () => {
    try {
      let value = await ImagePicker.openPicker({
        width: 1080,
        height: 1080,
        cropping: true,
        mediaType: 'photo',
        compressImageQuality: 1,
        compressImageMaxHeight: 1080 / 2,
        compressImageMaxWidth: 1080 / 2,
      }).then(image => {
        setDocument('');
        setImage(image);
        closeModal();
      });
    } catch (error) {
      console.error('error in openLibrary', error.response);
    }
  };

  // const openDocument = async () => {
  //   try {
  //     const resp = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.pdf],
  //     });
  //     setImage('');
  //     setDocument(resp);
  //     closeModal();
  //   } catch (error) {
  //     console.error('error in openDocument', error);
  //   }
  // };

  const openDocument = async (fieldId) => {
    try {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.pdf],
        });
        console.log('my response', res[0].name);
        setImage('');
            setDocument(res);
            closeModal();
    }
    catch (err) {
        if (DocumentPicker.isCancel(err)) {
            // console.log('User canceled the document picker');
        } else {
            // console.log('Error occurred:', err);
        }
    }
};











  //UI
  return (
    <Modal
      onRequestClose={closeModal}
      visible={visible}
      animationType="fade"
      transparent={true}>
      <View style={styles.container}>
        <TouchableOpacity onPress={closeModal} style={styles.blurView} />
        <View style={styles.mainView}>
          <View style={styles.flexRowView}>
            <TouchableOpacity onPress={openDocument} style={styles.optionStyle}>
              <View style={styles.ButtonView}>
                <DocumentSvg />
              </View>
              <Text style={styles.textStyle}>Document</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={CheckGalleryPermission}
              style={styles.optionStyle}>
              <View style={styles.ButtonView}>
                <GallerySvg />
              </View>
              <Text style={styles.textStyle}>Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default memo(Attachment);

//permission for camera if user discard permission
// To continue, Brand NUE needs your permission to access your photos
