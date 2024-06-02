import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import TabPanelComponent, {
  ITabList,
} from '../components/MyHistory/TabPanelComponent';
import ReusableHeader from '../components/ReusableHeader';
import WholeWrapper from '../components/WholeWrapper';
import {termsLists} from '../assets/mockData/TermList';
import {COLORS} from '../theme/theme';

export interface ITerm {
  content: string;
}

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
        <ScrollView style={styles.textContainer}>
          <View style={styles.textWrapper}>
            <Text>{termsLists[selectedTabIndex].content}</Text>
          </View>
        </ScrollView>
      </>
    </WholeWrapper>
  );
};

export default Terms;

const styles = StyleSheet.create({
  textContainer: {
    padding: 15,
    flex: 1,
  },
  textWrapper: {
    padding: 10,
    flex: 1,
    paddingBottom: 50,
    backgroundColor: '#eee',
    shadowColor: COLORS.Orange,
    shadowOpacity: 1,
    shadowRadius: 0.1,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
});
