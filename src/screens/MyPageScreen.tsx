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
        <View>
          <ReusableHeader title="프로필" handleBackBtn={handleBackBtn} />

          <MyPageHeader />
        </View>
        <View style={styles.btnWrapper}>
          <MenuComponent
            title="공지사항"
            handleNavigate={() => navigation.navigate('home' as never)}
          />
          <MenuComponent
            title="설정"
            handleNavigate={() => navigation.navigate('Setting' as never)}
          />
          <MenuComponent
            title="약관"
            handleNavigate={() => navigation.navigate('home' as never)}
          />
        </View>
      </View>
    </WholeWrapper>
  );
};

export default MyPageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnWrapper: {
    // marginTop: 100,
  },
});
