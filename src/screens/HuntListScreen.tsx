import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HuntListComponent from '../components/FlatComponent/HuntListComponent';
import ReusableHeader from '../components/ReusableHeader';
import {useNavigation} from '@react-navigation/native';
import WholeWrapper from '../components/WholeWrapper';

type Props = {};

const HuntListScreen = (props: Props) => {
  const navigation = useNavigation();

  const handleBackBtn = () => {
    navigation.navigate('detail' as never);
  };

  const renderItem = ({item}: {item: any}) => {
    return <View></View>;
  };

  const keyExtractor = () => {
    return `${i}`;
  };

  return (
    <WholeWrapper>
      <View style={styles.container}>
        <ReusableHeader title="HomeScreen" handleBackBtn={handleBackBtn} />
        <HuntListComponent
          data={[]}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
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
