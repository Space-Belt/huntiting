import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WholeWrapper from '../components/WholeWrapper';
import FastImage from 'react-native-fast-image';
import space from '../assets/images/space.png';
import MyPageHeader from '../components/MyPage/MyPageHeader';
import ReusableHeader from '../components/ReusableHeader';
import {useNavigation} from '@react-navigation/native';
import MenuComponent from '../components/MyPage/MenuComponent';

type Props = {};

const MyPageScreen = (props: Props) => {
  const navigation = useNavigation();

  const handleBackBtn = () => {
    navigation.goBack();
  };

  return (
    <WholeWrapper>
      <View style={styles.container}>
        <ReusableHeader title="프로필" handleBackBtn={handleBackBtn} />

        <MyPageHeader />
        <View style={styles.btnWrapper}>
          <MenuComponent
            title="공지사항"
            handleNavigate={() => navigation.navigate('home' as never)}
          />
        </View>
      </View>
    </WholeWrapper>
  );
};

export default MyPageScreen;

const styles = StyleSheet.create({
  container: {},
  btnWrapper: {
    marginTop: 100,
  },
});
