import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import MenuComponent from '../components/MyPage/MenuComponent';
import MyPageHeader from '../components/MyPage/MyPageHeader';
import ReusableHeader from '../components/ReusableHeader';
import WholeWrapper from '../components/WholeWrapper';

type Props = {};

const MyPageScreen = (props: Props) => {
  const navigation = useNavigation();

  const handleBackBtn = () => {
    navigation.goBack();
  };

  const handleNavigationProfileEdit = () => {
    navigation.navigate('ProfileEdit' as never);
  };

  return (
    <WholeWrapper>
      <View style={styles.container}>
        <View>
          <ReusableHeader title="프로필" handleBackBtn={handleBackBtn} />
          <MyPageHeader
            handleNavigationProfileEdit={handleNavigationProfileEdit}
          />
        </View>
        <View style={styles.btnWrapper}>
          <MenuComponent
            title="나의 이용내역"
            handleNavigate={() =>
              navigation.navigate('MyHistoryScreen' as never)
            }
          />
          <MenuComponent
            title="공지사항"
            handleNavigate={() => navigation.navigate('NoticeScreen' as never)}
          />
          <MenuComponent
            title="설정"
            handleNavigate={() => navigation.navigate('Setting' as never)}
          />
          <MenuComponent
            title="약관"
            handleNavigate={() => navigation.navigate('Terms' as never)}
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
});
