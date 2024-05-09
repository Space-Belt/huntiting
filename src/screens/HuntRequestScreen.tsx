import {
  ActionSheetIOS,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import WholeWrapper from '../components/WholeWrapper';
import ReusableInput from '../components/ReusableInput';
import {COLORS, FONTSIZE} from '../theme/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Photo from '../assets/icons/photo.svg';
import {
  Asset,
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

type Props = {};

const imagePickerOption = {
  mediaType: 'photo',
  maxWidth: 360,
  maxHeight: 360,
  includeBase64: Platform.OS === 'android',
};

const HuntRequestScreen = (props: Props) => {
  const [productName, setProductName] = React.useState<string>('');

  const [productPrice, setProductPrice] = React.useState<string>('');

  const [productCount, setProductCount] = React.useState<string>('');

  const [description, setDescription] = React.useState<string>('');

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const [profileImage, setProfileImage] = React.useState<Asset | null>(null);

  const onPickImage = (res: any) => {
    if (res.didCancel || !res) {
      return;
    }

    setProfileImage({
      ...res.assets[0],
      uri:
        Platform.OS === 'android'
          ? res.assets[0].uri
          : res.assets[0].uri!.replace('file://', ''),
    });
  };

  const onLaunchCamera = () => {
    launchCamera(imagePickerOption as CameraOptions, onPickImage);
  };

  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption as ImageLibraryOptions, onPickImage);
  };
  const handleModalOpen = () => {
    if (Platform.OS === 'android') {
      setModalOpen(prev => !prev);
    } else {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['사진 찍기', '사진 선택', '취소'],
          cancelButtonIndex: 2,
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            onLaunchCamera();
          } else if (buttonIndex === 1) {
            onLaunchImageLibrary();
          }
        },
      );
    }
  };

  return (
    <WholeWrapper>
      <View style={styles.container}>
        <ReusableInput
          category="물품명"
          placeholder="물품명을 입력해주세요"
          setValue={setProductName}
          value={productName}
          isMultiline={false}
        />
        <ReusableInput
          category="금액"
          placeholder="예상금액"
          setValue={setProductPrice}
          value={productPrice}
          isMultiline={false}
        />
        <ReusableInput
          category="수량"
          placeholder="필요수량"
          setValue={setProductCount}
          value={productCount}
          isMultiline={false}
        />
        <ReusableInput
          category="설명"
          placeholder="물품에 대한 설명이나 추가 설명을 해주세요"
          setValue={setDescription}
          value={description}
          isMultiline={true}
        />
        <Text style={styles.category}>상품 사진</Text>
        <View>
          <TouchableOpacity onPress={() => {}} style={styles.addImageBtn}>
            <Photo />
          </TouchableOpacity>
        </View>
      </View>
    </WholeWrapper>
  );
};

export default HuntRequestScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  category: {
    marginLeft: 10,
    marginBottom: 5,
    fontSize: FONTSIZE.size_14,
    color: COLORS.Orange,
    fontWeight: '700',
  },
  addImageBtn: {
    width: 90,
    height: 90,
    backgroundColor: '#eee',
    borderColor: '#d9d7ba',
    borderWidth: 1,
    borderRadius: 20,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
