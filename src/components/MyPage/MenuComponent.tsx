import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import RightArrow from '../../assets/icons/right_arrow.svg';
import {FONTSIZE} from '../../theme/theme';

type Props = {
  title: string;
  handleNavigate: () => void;
};

const MenuComponent = ({title, handleNavigate}: Props) => {
  return (
    <TouchableHighlight onPress={handleNavigate}>
      <View style={styles.container}>
        <Text style={styles.textStyle}>{title}</Text>
        <RightArrow />
      </View>
    </TouchableHighlight>
  );
};

export default MenuComponent;

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#d9d7ba',
    borderWidth: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  textStyle: {
    color: '#6b650e',
    fontWeight: '700',
    fontSize: FONTSIZE.size_16,
  },
});
