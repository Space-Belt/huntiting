import React from 'react';
import {ActionSheetIOS, Platform, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  Asset,
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../App';
import CloseIcon from '../assets/icons/smallClose.svg';
import RequestComponent from '../components/HuntRequest/RequestComponent';
import ReusableHeader from '../components/ReusableHeader';
import WholeWrapper from '../components/WholeWrapper';
import {useToast} from '../hooks/useToast';
import {COLORS, FONTSIZE} from '../theme/theme';
import {getLayout} from '../utils/getLayout';

type Props = {};

const imagePickerOption = {
  mediaType: 'photo',
  maxWidth: 360,
  maxHeight: 360,
  includeBase64: Platform.OS === 'android',
  selectionLimit: 5,
};

export type RequestProps = NativeStackScreenProps<
  RootStackParamList,
  'request'
>;

const HuntRequestScreen = ({route, navigation}: RequestProps) => {
  const {onToast} = useToast();

  const [productName, setProductName] = React.useState<string>('');

  const [productPrice, setProductPrice] = React.useState<string>('');

  const [productCount, setProductCount] = React.useState<string>('');

  const [description, setDescription] = React.useState<string>('');

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const [showDatePicker, setShowDatePicker] = React.useState<boolean>(false);

  const [profileImage, setProfileImage] = React.useState<Asset[]>();

  const date: Date = new Date();

  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onPickImage = (res: any) => {
    if (res.didCancel || !res) {
      return;
    }
    const temp: Asset[] = profileImage ? [...profileImage] : [];

    for (let i = 0; i < res.assets.length; i++) {
      temp.push({
        ...res.assets,
        uri:
          Platform.OS === 'android'
            ? res.assets[i].uri
            : res.assets[i].uri!.replace('file://', ''),
      });
    }

    setProfileImage(temp);
  };

  const deleteImage = (uri: string) => {
    let temp: Asset[] = profileImage ? [...profileImage] : [];
    temp = temp.filter(item => item.uri !== uri);

    setProfileImage(temp);
  };

  const onLaunchCamera = () => {
    launchCamera(imagePickerOption as CameraOptions, onPickImage);
  };

  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption as ImageLibraryOptions, onPickImage);
  };

  const modalClose = () => {
    setModalOpen(prev => !prev);
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

  const renderItem = ({item}: {item: Asset}) => {
    return (
      <View style={styles.imageWrapper}>
        <FastImage source={{uri: item.uri}} style={styles.addImageBtn} />
        <TouchableOpacity
          containerStyle={styles.editIconStyle}
          onPress={() => {
            if (item.uri !== undefined) {
              deleteImage(item.uri);
            }
          }}>
          <CloseIcon style={styles.editIconStyles} />
        </TouchableOpacity>
      </View>
    );
  };
  const keyExtractor = (item: any) => {
    return `${item.uri}`;
  };

  return (
    <WholeWrapper>
      <>
        <ReusableHeader
          title="물품찾기"
          handleBackBtn={() => navigation.goBack()}
        />
        <RequestComponent
          productName={productName}
          setProductName={setProductName}
          productPrice={productPrice}
          setProductPrice={setProductPrice}
          productCount={productCount}
          setProductCount={setProductCount}
          description={description}
          setDescription={setDescription}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
          profileImage={profileImage}
          setProfileImage={setProfileImage}
          date={date}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          handleModalOpen={handleModalOpen}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          modalClose={modalClose}
          onLaunchCamera={onLaunchCamera}
          onLaunchImageLibrary={onLaunchImageLibrary}
        />
      </>
    </WholeWrapper>
  );
};

export default HuntRequestScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 15,
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
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  imageContainer: {
    flexDirection: 'row',
  },
  imageWrapper: {
    position: 'relative',
    paddingTop: 20,
  },
  imageStyle: {
    position: 'relative',
    width: 90,
    height: 90,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  editIconStyle: {
    position: 'absolute',
    right: 2,
    top: 15,

    zIndex: 1,
  },
  editIconStyles: {
    position: 'relative',
    zIndex: 1,
  },
  datePickerContainer: {
    marginBottom: 15,
  },
  dateWrapper: {
    width: getLayout() - 130,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    lineHeight: 50,
    height: 50,
    paddingHorizontal: 15,
    fontSize: FONTSIZE.size_14,
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
    color: '#6b650e',
  },
  dateContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateBtn: {
    height: 50,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.Orange2,
    borderRadius: 15,
  },
  dateText: {
    color: COLORS.White,
    fontWeight: '700',
  },
});
