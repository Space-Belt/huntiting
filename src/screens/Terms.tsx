import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WholeWrapper from '../components/WholeWrapper';
import ReusableHeader from '../components/ReusableHeader';
import TabPanelComponent, {
  ITabList,
} from '../components/MyHistory/TabPanelComponent';
import {useNavigation} from '@react-navigation/native';

type Props = {};

const tabLists: ITabList[] = [
  {
    text: '이용약관',
  },
  {
    text: '개인정보약관',
  },
  {
    text: '마케팅약관',
  },
];

const Terms = (props: Props) => {
  const navigation = useNavigation();

  const [selectedTabIndex, setSelectedTabIndex] = React.useState<number>(0);

  return (
    <WholeWrapper>
      <>
        <ReusableHeader
          title={'이용약관'}
          handleBackBtn={() => navigation.goBack()}
        />
        <TabPanelComponent
          selectedTabIndex={selectedTabIndex}
          setSelectedTabIndex={setSelectedTabIndex}
          tabLists={tabLists}
        />
      </>
    </WholeWrapper>
  );
};

export default Terms;

const styles = StyleSheet.create({});
