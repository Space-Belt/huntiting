import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTSIZE} from '../../theme/theme';

type Props = {
  name: string;
  description: string;
  createdAt: string;
};

const ProductDescribe = ({name, description, createdAt}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.createdAt}>{createdAt}</Text>
      </View>
      <View style={styles.descriptionWrapper}>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
    </View>
  );
};

export default ProductDescribe;

const styles = StyleSheet.create({
  container: {},
  titleContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#eee',
    borderColor: '#d9d7ba',
    borderWidth: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
  productName: {
    fontSize: FONTSIZE.size_20,
    fontWeight: '700',
    color: COLORS.Orange2,
  },
  createdAt: {
    fontSize: FONTSIZE.size_10,
    color: COLORS.Grey,
  },
  descriptionWrapper: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  descriptionText: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.Orange2,
    fontWeight: '600',
    lineHeight: 20,
  },
});
