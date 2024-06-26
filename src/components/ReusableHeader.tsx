import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BackBtn from '../assets/icons/arrowBack.svg';
import {COLORS, FONTSIZE} from '../theme/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';

type Props = {
  leftBtnIcon?: React.ReactElement;
  handleBackBtn?: () => void;
  title?: string;
  rightBtnIcon?: React.ReactElement;
  handleRightBtn?: () => void;
};

const ReusableHeader = ({
  leftBtnIcon,
  handleBackBtn,
  title,
  rightBtnIcon,
  handleRightBtn,
}: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.leftArea}
        onPress={handleBackBtn ? handleBackBtn : () => {}}>
        {leftBtnIcon ? leftBtnIcon : <BackBtn style={styles.backBtnStyle} />}
      </TouchableOpacity>
      <View style={styles.centerArea}>
        {title ? <Text style={styles.titleStyle}>{title}</Text> : <></>}
      </View>
      <TouchableOpacity
        style={styles.rightArea}
        onPress={handleRightBtn ? handleRightBtn : () => {}}>
        {rightBtnIcon ? rightBtnIcon : <></>}
      </TouchableOpacity>
    </View>
  );
};

export default ReusableHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtnStyle: {
    width: 50,
    height: 50,
    color: COLORS.Orange,
  },
  rightArea: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerArea: {
    height: 50,
    justifyContent: 'center',
  },
  titleStyle: {
    fontSize: FONTSIZE.size_18,
    fontWeight: '700',
    color: COLORS.Orange,
  },
  leftArea: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
