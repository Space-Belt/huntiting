import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTSIZE} from '../../theme/theme';

type Props = {
  name: string;
  price: number;
  description: string;
  count?: number;
};

const ProductDescribe = ({name, price, description, count}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.productName}>{name}</Text>
        <View style={styles.describeContainer}>
          <Text style={styles.priceText}>가격: {price}원</Text>
          <Text style={styles.countText}>수량: {count}개</Text>
        </View>
      </View>
    </View>
  );
};

export default ProductDescribe;

const styles = StyleSheet.create({
  container: {},
  titleContainer: {
    backgroundColor: '#eee',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderColor: '#d9d7ba',
    borderWidth: 1,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  productName: {
    fontSize: FONTSIZE.size_20,
    fontWeight: '700',
    color: COLORS.Orange2,
  },
  describeContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  priceText: {
    width: '50%',
    fontSize: FONTSIZE.size_16,
    color: COLORS.Orange2,
    fontWeight: '700',
  },
  countText: {
    width: '50%',
    fontSize: FONTSIZE.size_16,
    color: COLORS.Orange2,
    fontWeight: '700',
  },
});
