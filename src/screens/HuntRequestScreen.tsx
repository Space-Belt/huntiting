import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ActionSheetIOS,
  Alert,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  Asset,
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import Photo from '../assets/icons/photo.svg';
import CloseIcon from '../assets/icons/smallClose.svg';
import ImageSelectWayModal from '../components/Modal/ImageSelectWayModal';
import ReusableBtn from '../components/ReusableBtn';
import ReusableHeader from '../components/ReusableHeader';
import ReusableInput from '../components/ReusableInput';
import ReusableModal from '../components/ReusableModal';
import WholeWrapper from '../components/WholeWrapper';
import {useToast} from '../hooks/useToast';
import {COLORS, FONTSIZE} from '../theme/theme';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import DatePickerModal from '../components/Modal/DatePickerModal';
import {getLayout} from '../utils/getLayout';

type Props = {};

const imagePickerOption = {
  mediaType: 'photo',
  maxWidth: 360,
  maxHeight: 360,
  includeBase64: Platform.OS === 'android',
  selectionLimit: 5,
};

const HuntRequestScreen = (props: Props) => {
  const navigation = useNavigation();

  const {onToast} = useToast();

  const [productName, setProductName] = React.useState<string>('');

  const [productPrice, setProductPrice] = React.useState<string>('');

  const [productCount, setProductCount] = React.useState<string>('');

  const [description, setDescription] = React.useState<string>('');

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const [showDatePicker, setShowDatePicker] = React.useState<boolean>(false);

  const [profileImage, setProfileImage] = React.useState<Asset[]>();

  const [date, setDate] = React.useState<Date>(new Date());

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
      <ScrollView>
        <ReusableHeader
          title="물품찾기"
          handleBackBtn={() => navigation.goBack()}
        />
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
          <View style={styles.datePickerContainer}>
            <Text style={styles.category}>마감기한</Text>
            <View style={styles.dateContainer}>
              <Text style={styles.dateWrapper}>
                {selectedDate
                  ? moment(selectedDate).format('YYYY/MM/DD')
                  : '날짜를 선택하세요'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowDatePicker(prev => !prev);
                }}
                style={styles.dateBtn}>
                <Text style={styles.dateText}>날짜선택</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.category}>상품 사진</Text>
          <View style={styles.imageContainer}>
            <TouchableOpacity
              onPress={() => {
                handleModalOpen();
              }}
              style={[styles.addImageBtn]}>
              <Photo />
            </TouchableOpacity>
          </View>

          {profileImage && (
            <FlatList
              data={profileImage}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              horizontal={true}
            />
          )}

          <ReusableBtn
            text={'요청하기'}
            isClickable={true}
            onClick={() => {
              onToast('요청성공하셨습니다.', 'success', true);
            }}
          />
        </View>
        <ReusableModal
          visible={modalOpen}
          onClose={modalClose}
          animationType={'fade'}
          children={
            <ImageSelectWayModal
              onClose={modalClose}
              onLaunchCamera={onLaunchCamera}
              onLaunchImageLibrary={onLaunchImageLibrary}
            />
          }
        />
        <DatePicker
          modal
          title={'selected'}
          date={selectedDate ? selectedDate : date}
          onDateChange={setSelectedDate}
          onConfirm={(select: Date) => {
            if (select < date) {
              Alert.alert('과거는 선택할수 없습니다');
              return;
            }
            setSelectedDate(select);
            setShowDatePicker(false);
          }}
          onCancel={() => setShowDatePicker(false)}
          mode={'date'}
          confirmText="설정"
          cancelText="취소"
          open={showDatePicker}
        />
      </ScrollView>
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
