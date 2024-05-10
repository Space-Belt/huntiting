import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {COLORS, FONTSIZE} from '../theme/theme';

type Props = {
  onClick: () => void;

  isClickable: boolean;
};

const ReusableBtn = ({onClick, isClickable}: Props) => {
  const changeBtnStyle: ViewStyle = {
    backgroundColor: isClickable ? COLORS.Orange : COLORS.Grey,
  };

  return (
    <TouchableOpacity
      onPress={onClick}
      style={[styles.btnStyle, changeBtnStyle]}>
      <Text style={styles.btnText}>Save</Text>
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
  },
  btnText: {
    fontSize: FONTSIZE.size_16,
    fontWeight: '600',
    color: COLORS.White,
  },
});
