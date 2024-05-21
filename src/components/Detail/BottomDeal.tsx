import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTSIZE} from '../../theme/theme';

type Props = {};

const BottomDeal = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.priceText}></Text>
      <TouchableOpacity style={styles.buttonStyle} onPress={() => {}}>
        <Text style={styles.buttonText}>채팅하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomDeal;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    backgroundColor: '#e4e4e4ea',
    borderTopWidth: 0.5,
    borderColor: '#eee',
  },
  priceText: {
    color: COLORS.Grey,
    fontSize: FONTSIZE.size_16,
    fontWeight: '700',
  },
  buttonStyle: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    backgroundColor: COLORS.Orange,
  },
  buttonText: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_14,
    fontWeight: '800',
  },
});
