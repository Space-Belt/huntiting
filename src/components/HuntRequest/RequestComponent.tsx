import moment from 'moment';
import React, {Dispatch, SetStateAction} from 'react';
import {
  Alert,
  FlatList,
  ListRenderItem,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Asset} from 'react-native-image-picker';
import ImageSelectWayModal from '../Modal/ImageSelectWayModal';
import ReusableBtn from '../ReusableBtn';
import ReusableInput from '../ReusableInput';
import ReusableModal from '../ReusableModal';

import Photo from '../../assets/icons/photo.svg';
import {useToast} from '../../hooks/useToast';
import {COLORS, FONTSIZE} from '../../theme/theme';
import {getLayout} from '../../utils/getLayout';
import {getPlatform} from '../../utils/getPlatform';

const imagePickerOption = {
  mediaType: 'photo',
  maxWidth: 360,
  maxHeight: 360,
  includeBase64: Platform.OS === 'android',
  selectionLimit: 5,
};

type Props = {
  productName: string;
  setProductName: Dispatch<SetStateAction<string>>;
  productPrice: string;
  setProductPrice: Dispatch<SetStateAction<string>>;
  productCount: string;
  setProductCount: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  showDatePicker: boolean;
  setShowDatePicker: Dispatch<SetStateAction<boolean>>;
  profileImage: Asset[] | undefined;
  setProfileImage: Dispatch<SetStateAction<Asset[] | undefined>>;
  date: Date;
  selectedDate: Date | undefined;
  setSelectedDate: Dispatch<SetStateAction<Date | undefined>>;
  handleModalOpen: () => void;
  renderItem: ListRenderItem<Asset>;
  keyExtractor: (item: any) => string;
  modalClose: () => void;
  onLaunchCamera: () => void;
  onLaunchImageLibrary: () => void;
};

const RequestComponent = ({
  productName,
  setProductName,
  productPrice,
  setProductPrice,
  productCount,
  setProductCount,
  description,
  setDescription,
  modalOpen,
  setModalOpen,
  showDatePicker,
  setShowDatePicker,
  profileImage,
  setProfileImage,
  date,
  selectedDate,
  setSelectedDate,
  handleModalOpen,
  renderItem,
  keyExtractor,
  modalClose,
  onLaunchCamera,
  onLaunchImageLibrary,
}: Props) => {
  const {onToast} = useToast();
  return (
    <ScrollView>
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
        title={'날짜를 선택하세요'}
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
  );
};

export default RequestComponent;

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
    lineHeight: getPlatform() === 'ios' ? 50 : 25,
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
