import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import WholeWrapper from '../components/WholeWrapper';
import ReusableInput from '../components/ReusableInput';
import {COLORS, FONTSIZE} from '../theme/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Photo from '../assets/icons/photo.svg';

type Props = {};

const HuntRequestScreen = (props: Props) => {
  const [productName, setProductName] = React.useState<string>('');

  const [productPrice, setProductPrice] = React.useState<string>('');

  const [productCount, setProductCount] = React.useState<string>('');

  const [description, setDescription] = React.useState<string>('');

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
