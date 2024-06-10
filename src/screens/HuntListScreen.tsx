import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {huntList} from '../assets/mockData/huntList';
import HuntListComponent from '../components/FlatComponent/HuntListComponent';
import ReusableHeader from '../components/ReusableHeader';
import WholeWrapper from '../components/WholeWrapper';
import ReusableModal from '../components/ReusableModal';
import HuntEditModal from '../components/Modal/HuntEditModal';

import Request from '../assets/icons/requestAdd.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS} from '../theme/theme';

type Props = {};

const HuntListScreen = (props: Props) => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const navigation = useNavigation();

  return (
    <WholeWrapper>
      <View style={styles.container}>
        <ReusableHeader
          title="요청 둘러보기"
          leftBtnIcon={<></>}
          handleBackBtn={() => navigation.goBack()}
          rightBtnIcon={
            <TouchableOpacity
              onPress={() => navigation.navigate('request' as never)}>
              <Request style={styles.topIconStyle} />
            </TouchableOpacity>
          }
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
            <HuntEditModal isMine={false} onClose={() => setModalOpen(false)} />
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
  topIconStyle: {
    width: 40,
    height: 40,
    color: COLORS.Orange,
  },
});
