import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {huntList} from '../assets/mockData/huntList';
import HuntListComponent from '../components/FlatComponent/HuntListComponent';
import ReusableHeader from '../components/ReusableHeader';
import WholeWrapper from '../components/WholeWrapper';
import ReusableModal from '../components/ReusableModal';
import ImageSelectWayModal from '../components/Modal/ImageSelectWayModal';

type Props = {};

const HuntListScreen = (props: Props) => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
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
        <HuntListComponent
          data={huntList}
          modalOpen={() => {
            setModalOpen(prev => !prev);
          }}
        />
        <ReusableModal
          animationType="fade"
          onClose={() => setModalOpen(prev => !prev)}
          visible={modalOpen}
          children={
            <ImageSelectWayModal
              onClose={() => setModalOpen(prev => !prev)}
              onLaunchCamera={() => {}}
              onLaunchImageLibrary={() => {}}
            />
          }
        />
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
