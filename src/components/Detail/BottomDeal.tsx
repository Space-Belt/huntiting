import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTSIZE} from '../../theme/theme';
import {getPlatform} from '../../utils/getPlatform';

type Props = {
  price: number;
  count: number;
  onPress: () => void;
};

const BottomDeal = ({price, count, onPress}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.describeContainer}>
        <Text style={styles.priceText}>가격: {price} 원</Text>
        <Text style={styles.priceText}>수량: {count} 개</Text>
      </View>
      <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
        <Text style={styles.buttonText}>채팅하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomDeal;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: getPlatform() === 'ios' ? 60 : 80,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    backgroundColor: '#e4e4e4ea',
    borderTopWidth: 0.5,
    borderColor: '#eee',
  },

  describeContainer: {},
  priceText: {
    fontSize: getPlatform() === 'ios' ? FONTSIZE.size_14 : FONTSIZE.size_12,
    color: COLORS.Orange2,
    fontWeight: '500',
  },
  countText: {
    fontSize: getPlatform() === 'ios' ? FONTSIZE.size_16 : FONTSIZE.size_12,
    color: COLORS.Orange2,
    fontWeight: '500',
  },
  buttonStyle: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    backgroundColor: COLORS.Orange,
  },
  buttonText: {
    color: COLORS.White,
    fontSize: getPlatform() === 'ios' ? FONTSIZE.size_14 : FONTSIZE.size_10,
    fontWeight: '800',
  },
});
