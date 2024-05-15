import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WholeWrapper from '../components/WholeWrapper';
import FastImage from 'react-native-fast-image';
import space from '../assets/images/space.png';
import MyPageHeader from '../components/MyPage/MyPageHeader';

type Props = {};

const MyPageScreen = (props: Props) => {
  return (
    <WholeWrapper>
      <View style={styles.container}>
        <MyPageHeader />
      </View>
    </WholeWrapper>
  );
};

export default MyPageScreen;

const styles = StyleSheet.create({
  container: {},
});
