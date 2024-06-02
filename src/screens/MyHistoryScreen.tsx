import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import TabPanelComponent, {
  ITabList,
} from '../components/MyHistory/TabPanelComponent';
import ReusableHeader from '../components/ReusableHeader';
import WholeWrapper from '../components/WholeWrapper';
import {COLORS} from '../theme/theme';
import HuntListComponent from '../components/FlatComponent/HuntListComponent';
import {IHuntList, huntList} from '../assets/mockData/huntList';

type Props = {};

const tabLists: ITabList[] = [
  {
    text: '진행중',
  },
  {
    text: '진행완료',
  },
];

const MyHistoryScreen = (props: Props) => {
  const navigation = useNavigation();

  const [selectedTabIndex, setSelectedTabIndex] = React.useState<number>(0);

  const [datas, setDatas] = React.useState<IHuntList[]>([]);

  React.useEffect(() => {
    if (selectedTabIndex === 0) {
      let tempData = [...huntList].filter(el => el.status === 'pending');
      setDatas(tempData);
    } else {
      let tempData = [...huntList].filter(el => el.status !== 'pending');
      setDatas(tempData);
    }
  }, [selectedTabIndex]);

  return (
    <WholeWrapper>
      <>
        <ReusableHeader
          title={'이용내역'}
          handleBackBtn={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <TabPanelComponent
            selectedTabIndex={selectedTabIndex}
            setSelectedTabIndex={setSelectedTabIndex}
            tabLists={tabLists}
          />
          <HuntListComponent data={datas} />
        </View>
      </>
    </WholeWrapper>
  );
};

export default MyHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#4d4b4ba1',
  },
  animateTabBox: {
    position: 'absolute',
    width: '50%',
    height: 50,
    borderBottomWidth: 1,
    backgroundColor: '#ea2f2f99',
    borderBottomColor: COLORS.Orange2,
  },
  tabBox: {
    width: '50%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabStyle: {alignItems: 'center'},
  tabText: {
    textAlign: 'center',
    fontWeight: '700',
  },
});
