import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {FONTSIZE} from '../../theme/theme';

import Gallery from '../../assets/icons/gallery.svg';
import Camera from '../../assets/icons/photo.svg';

interface IProps {
  onClose: () => void;
  onLaunchCamera: () => void;
  onLaunchImageLibrary: () => void;
}

const imagePickerOption = {
  mediaType: 'photo',
};

const ImageSelectWayModal = ({
  onClose,
  onLaunchCamera,
  onLaunchImageLibrary,
}: IProps) => {
  return (
    <TouchableWithoutFeedback onPress={() => onClose()}>
      <View style={styles.background}>
        <View style={styles.whiteBox}>
          <Pressable
            style={styles.actionButton}
            android_ripple={{color: '#eee'}}
            onPress={() => {
              onLaunchCamera();
              onClose();
            }}>
            <Camera />
            <Text style={styles.actionText}>카메라로 촬영하기</Text>
          </Pressable>
          <Pressable
            style={styles.actionButton}
            android_ripple={{color: '#eee'}}
            onPress={() => {
              onLaunchImageLibrary();
              onClose();
            }}>
            <Gallery />
            <Text style={styles.actionText}>사진 선택하기</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ImageSelectWayModal;

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0,0,0,0,9)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBox: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 4,
    elevation: 2,
  },
  actionButton: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    fontSize: FONTSIZE.size_18,
    marginRight: 15,
  },
  text: {
    fontSize: 26,
    color: 'white',
  },
  actionText: {
    color: 'black',
  },
});
