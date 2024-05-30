import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {FONTSIZE} from '../../theme/theme';
import {getPlatform} from '../../utils/getPlatform';
import FastImage from 'react-native-fast-image';
import {getLayout} from '../../utils/getLayout';

interface IProps {
  onClose: () => void;
  image: string;
  index: number;
}

const {width, height} = Dimensions.get('window');
const ImageShowModal = ({onClose, image, index}: IProps) => {
  return (
    <TouchableWithoutFeedback onPress={() => onClose()}>
      <View style={styles.background}>
        <View style={styles.whiteBox}>
          <View style={[styles.imageWrapper]} key={`${image}_${index}`}>
            <FastImage source={{uri: image}} style={styles.imageStyle} />
          </View>

          {/* <ScrollView horizontal={true}>
            {images.length > 0 ? (
              images.map((imageEl, index) => {
                console.log(imageEl);
                return (
                  <View
                    style={[
                      styles.imageWrapper,
                      index !== images.length ? {marginRight: 100} : {},
                    ]}
                    key={`${imageEl}_${index}`}>
                    <FastImage
                      source={{uri: imageEl}}
                      style={styles.imageStyle}
                    />
                  </View>
                );
              })
            ) : (
              <></>
            )}
          </ScrollView> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ImageShowModal;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#00000092',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  whiteBox: {
    width: getLayout(),
    height: 'auto',
    backgroundColor: 'white',
    borderRadius: 4,
    elevation: 2,
  },
  imageWrapper: {},
  imageStyle: {
    width: getLayout(),
    height: height - 20,
    resizeMode: 'repeat',
  },
});
