import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ImageAssets} from '../../assets/images/ImageAssets';
import {COLORS, FONTSIZE} from '../../theme/theme';

type Props = {
  handleNavigationProfileEdit: () => void;
};

const MyPageHeader = ({handleNavigationProfileEdit}: Props) => {
  const name: string = 'space-belt';

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <FastImage
          source={ImageAssets.profileImage}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.btnWrapper}>
        <Text style={styles.nameTextStyle}>안녕하세요! {name}님!</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={handleNavigationProfileEdit}
            style={styles.btnStyle}>
            <Text style={styles.btnText}>프로필 수정하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MyPageHeader;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
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
  profileImage: {
    width: 60,
    height: 60,
  },
  imageWrapper: {
    width: '20%',
  },
  nameTextStyle: {
    fontSize: FONTSIZE.size_16,
    fontWeight: '700',
    color: '#6b650e',
    textAlign: 'right',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btnStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: COLORS.Orange,
  },
  btnWrapper: {
    justifyContent: 'space-between',
    width: '80%',
  },
  btnText: {
    textAlign: 'center',
    color: COLORS.White,
    fontWeight: '700',
  },
});
