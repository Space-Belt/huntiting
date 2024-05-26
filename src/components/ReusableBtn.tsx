import React from 'react';
import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import {COLORS, FONTSIZE} from '../theme/theme';

type Props = {
  onClick: () => void;
  isClickable: boolean;
  text: string;
};

const ReusableBtn = ({onClick, isClickable, text}: Props) => {
  const changeBtnStyle: ViewStyle = {
    backgroundColor: isClickable ? COLORS.Orange : COLORS.Grey,
  };

  return (
    <TouchableOpacity
      onPress={onClick}
      style={[styles.btnStyle, changeBtnStyle]}>
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ReusableBtn;

const styles = StyleSheet.create({
  btnStyle: {
    width: '100%',
    borderRadius: 19.5,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  btnText: {
    fontSize: FONTSIZE.size_16,
    fontWeight: '600',
    color: COLORS.White,
  },
});
