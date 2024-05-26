import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {huntList} from '../assets/mockData/huntList';
import HuntListComponent from '../components/FlatComponent/HuntListComponent';
import ReusableHeader from '../components/ReusableHeader';
import WholeWrapper from '../components/WholeWrapper';

type Props = {};

const HuntListScreen = (props: Props) => {
  const navigation = useNavigation();
  const keyExtractor = (item: any) => {
    return `${item.id}`;
  };

  return (
    <WholeWrapper>
      <View style={styles.container}>
        <ReusableHeader
          title="요청 둘러보기"
          leftBtnIcon={<></>}
          handleBackBtn={() => navigation.goBack()}
        />
        <HuntListComponent data={huntList} />
      </View>
    </WholeWrapper>
  );
};

export default HuntListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
