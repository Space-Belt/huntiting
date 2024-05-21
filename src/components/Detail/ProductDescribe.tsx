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
      <Text style={styles.productName}>{name}</Text>
    </View>
  );
};

export default ProductDescribe;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  productName: {
    fontSize: FONTSIZE.size_20,
    fontWeight: '700',
    color: COLORS.Orange2,
  },
});
