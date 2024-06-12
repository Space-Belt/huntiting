import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {RootStackParamList} from '../App';
import FindAuthComponent from '../components/FindAuth/FindAuthComponent';
import TabPanelComponent from '../components/MyHistory/TabPanelComponent';
import ReusableHeader from '../components/ReusableHeader';
import WholeWrapper from '../components/WholeWrapper';

type Props = {};

const tabLists = [
  {
    text: '아이디 찾기',
  },
  {
    text: '비밀번호 찾기',
  },
];

const FindAuth = (props: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [selectedTabIndex, setSelectedTabIndex] = React.useState<number>(0);

  const handleBtn = () => {
    selectedTabIndex === 0
      ? navigation.navigate('FindUserNameResult' as never)
      : navigation.navigate('ChangePassword' as never);
  };

  return (
    <WholeWrapper>
      <>
        <ReusableHeader
          title="계정찾기"
          handleBackBtn={() => {
            navigation.goBack();
          }}
        />
        <TabPanelComponent
          tabLists={tabLists}
          selectedTabIndex={selectedTabIndex}
          setSelectedTabIndex={setSelectedTabIndex}
        />
        <FindAuthComponent
          selectedTabIndex={selectedTabIndex}
          handleBtn={handleBtn}
        />
      </>
    </WholeWrapper>
  );
};

export default FindAuth;

const styles = StyleSheet.create({});
